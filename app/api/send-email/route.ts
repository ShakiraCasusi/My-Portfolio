import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, message' },
                { status: 400 }
            );
        }

        // Get environment variables
        const resendApiKey = process.env.RESEND_API_KEY;
        const contactToEmail = process.env.CONTACT_TO_EMAIL;
        const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'noreply@yourdomain.com';

        if (!resendApiKey) {
            console.error('RESEND_API_KEY is not set');
            return NextResponse.json(
                { error: 'Email service is not configured' },
                { status: 500 }
            );
        }

        if (!contactToEmail) {
            console.error('CONTACT_TO_EMAIL is not set');
            return NextResponse.json(
                { error: 'Email recipient is not configured' },
                { status: 500 }
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
                replyTo: email,
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <h2>New Contact Message</h2>
                    <p><strong>From:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <h3>Message:</h3>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `,
                text: `New Contact Message\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Resend API error:', errorData);
            return NextResponse.json(
                { error: 'Failed to send email' },
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
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}