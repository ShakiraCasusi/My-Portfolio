import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Get email configuration from environment variables
        const emailTo = process.env.EMAIL_TO || 'casusishakira@gmail.com';
        const resendApiKey = process.env.RESEND_API_KEY;

        // If using Resend API
        if (resendApiKey) {
            return await sendWithResend(name, email, message, resendApiKey, emailTo);
        }

        // If no email service is configured, log the message and return success
        console.log('📧 New Contact Form Submission:');
        console.log({
            name,
            senderemail: email,
            message,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Message received successfully! Configure RESEND_API_KEY to send actual emails.',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing message:', error);
        return NextResponse.json(
            { error: 'Failed to process message. Please try again later.' },
            { status: 500 }
        );
    }
}

async function sendWithResend(
    name: string,
    senderEmail: string,
    message: string,
    apiKey: string,
    recipientEmail: string
) {
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'portfolio@resend.dev',
                to: recipientEmail,
                replyTo: senderEmail,
                subject: `New message from ${escapeHtml(name)} - Portfolio Contact Form`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(senderEmail)}</p>
                    <hr />
                    <p><strong>Message:</strong></p>
                    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
                    <hr />
                    <p><em>This message was sent from your portfolio contact form.</em></p>
                `,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Resend API error: ${error.message}`);
        }

        return NextResponse.json(
            { success: true, message: 'Email sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Resend API error:', error);
        throw error;
    }
}

function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
