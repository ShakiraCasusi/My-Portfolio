import { NextResponse } from 'next/server';

type SendEmailPayload = {
    name?: string;
    email?: string;
    message?: string;
};

const RESEND_API_URL = 'https://api.resend.com/emails';

export async function POST(request: Request) {
    let payload: SendEmailPayload;

    try {
        payload = (await request.json()) as SendEmailPayload;
    } catch {
        return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const { name, email, message } = payload;

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
        return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
        return NextResponse.json(
            { error: 'Email service is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL.' },
            { status: 500 }
        );
    }

    try {
        const resendResponse = await fetch(RESEND_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromEmail,
                to: [toEmail],
                subject: `Portfolio message from ${name}`,
                reply_to: email,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            })
        });

        if (!resendResponse.ok) {
            const resendError = await resendResponse.text();
            return NextResponse.json(
                { error: 'Failed to send email via Resend.', details: resendError },
                { status: resendResponse.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Unexpected error while sending email.',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}