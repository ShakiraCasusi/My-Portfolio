import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate required fields (email is optional)
        if (!name || !message) {
            return NextResponse.json(
                { error: 'Please provide your name and message' },
                { status: 400 }
            );
        }

        // Use provided email or a placeholder for reply
        const senderEmail = email || 'noreply@contact-form.local';

        // Validate email format only if provided
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { error: 'Invalid email address' },
                    { status: 400 }
                );
            }
        }

        // Get environment variables
        const resendApiKey = process.env.RESEND_API_KEY;
        const contactToEmail = process.env.CONTACT_TO_EMAIL;
        const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'noreply@yourdomain.com';

        // Log the message for debugging
        console.log('Contact form submission:', { name, email: email || 'Not provided', message });

        // If Resend API is not configured, just log and return success (for development)
        if (!resendApiKey || !contactToEmail) {
            console.warn('Email service not fully configured. Contact info logged to console.');
            console.log('Message from', name, email ? '(' + email + ')' : '(No email provided):', message);

            return NextResponse.json(
                {
                    success: true,
                    message: 'Message received! Thank you for reaching out.'
                },
                { status: 200 }
            );
        }

        // Send email using Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: contactFromEmail,
                to: contactToEmail,
                replyTo: email || 'noreply@contact-form.local',
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <h2>New Contact Message</h2>
                    <p><strong>From:</strong> ${name}</p>
                    ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
                    <h3>Message:</h3>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `,
                text: `New Contact Message\n\nFrom: ${name}${email ? '\nEmail: ' + email : ''}\n\nMessage:\n${message}`,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Resend API error:', errorData);
            return NextResponse.json(
                { error: 'Failed to send email. Please try again later.' },
                { status: 500 }
            );
        }

        const data = await response.json();
        return NextResponse.json(
            {
                success: true,
                message: 'Email sent successfully',
                emailId: data.id
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Send email error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}