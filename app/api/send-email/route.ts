import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return entities[character];
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const name = typeof body?.sender_name === 'string'
            ? body.sender_name.trim().replace(/[\r\n]+/g, ' ')
            : '';
        const email = typeof body?.sender_email === 'string'
            ? body.sender_email.trim()
            : '';
        const message = typeof body?.message === 'string'
            ? body.message.trim()
            : '';

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Please provide your name, email address, and message.' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        const contactToEmail = process.env.CONTACT_TO_EMAIL;
        const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

        if (!resendApiKey || !contactToEmail) {
            return NextResponse.json(
                { error: 'Email configuration missing on server. Check Environment Variables.' },
                { status: 500 }
            );
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>');

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: contactFromEmail,
                to: contactToEmail,
                reply_to: email,
                subject: `New Portfolio Inquiry from ${name} | Shakira Casusi Portfolio`,
                html: `
                    <h2>New Portfolio Inquiry</h2>
                    <p><strong>Name:</strong> ${safeName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                    <p><strong>Message:</strong></p>
                    <p>${safeMessage}</p>
                `,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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