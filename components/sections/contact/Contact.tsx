'use client';

import { useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const CONTACT_EMAIL = ['casusishakira28', 'gmail.com'].join('@');

type FormData = {
    sender_name: string;
    sender_email: string;
    message: string;
};

export function Contact() {
    const [formData, setFormData] = useState<FormData>({
        sender_name: '',
        sender_email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleCopyEmail = async () => {
        setEmailCopied(false);
        setCopyError(false);

        if (!navigator.clipboard?.writeText) {
            setCopyError(true);
            return;
        }

        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
            setEmailCopied(true);
        } catch (error) {
            console.error('Unable to copy the contact email:', error);
            setCopyError(true);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setFeedback(null);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({ sender_name: '', sender_email: '', message: '' });
                setFeedback({ type: 'success', message: "Message sent successfully! I'll be in touch soon." });
                setTimeout(() => setFeedback(null), 5000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || 'Failed to send your message. Please try again.';
                setFeedback({ type: 'error', message: errorMessage });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setFeedback({ type: 'error', message: 'Network error. Please check your connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="w-full max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="text-white">Let&apos;s</span>{' '}
                        <span className="text-orange-500">Connect</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Have a project in mind or want to collaborate? I&apos;d love to hear from you.
                    </p>
                </div>

                <div className="contact-container border border-orange-500/30 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md">
                    <div className="contact-grid">
                        <div className="contact-left bg-black/60 p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-10">
                            <div className="flex items-center gap-3">
                                <div className="blinking-dot" />
                                <span className="text-orange-500 font-bold text-sm tracking-wider">
                                    SYSTEM STATUS: ONLINE
                                </span>
                            </div>

                            <div className="space-y-5">
                                <div className="contact-card rounded-xl border border-orange-400/30 bg-white/[0.03] p-5 transition-colors hover:border-orange-400/60 hover:bg-orange-400/5">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-orange-400/20 text-orange-400">
                                            <Mail size={20} aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-semibold text-white">Email</h3>
                                            <p className="mt-1 text-sm leading-relaxed text-gray-400">
                                                Copy my email address to get in touch.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={handleCopyEmail}
                                                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-orange-400/40 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-200 transition-colors hover:border-orange-300 hover:bg-orange-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
                                                aria-label={emailCopied ? 'Email address copied' : 'Copy email address'}
                                            >
                                                {emailCopied ? (
                                                    <Check size={16} aria-hidden="true" />
                                                ) : (
                                                    <Copy size={16} aria-hidden="true" />
                                                )}
                                                {emailCopied ? 'Email Copied' : 'Copy Email'}
                                            </button>
                                            {copyError && (
                                                <p className="mt-2 text-xs text-orange-200" role="status">
                                                    Clipboard unavailable. Please use the contact form.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-card rounded-xl border border-orange-400/30 bg-white/[0.03] p-5">
                                    <h3 className="text-sm font-semibold text-white">Professional Socials</h3>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <a
                                            href="https://www.linkedin.com/in/shakira-casusi-31612631a/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-orange-400/50 hover:text-orange-200"
                                        >
                                            <FaLinkedin size={18} aria-hidden="true" />
                                            LinkedIn
                                        </a>
                                        <a
                                            href="https://github.com/ShakiraCasusi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-orange-400/50 hover:text-orange-200"
                                        >
                                            <FaGithub size={18} aria-hidden="true" />
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-medium tracking-wide text-gray-400">
                                <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.7)]" />
                                <span>OPEN FOR PROJECTS &amp; COLLABORATIONS</span>
                            </div>
                        </div>

                        <div className="contact-right bg-gray-900/40 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400/15 text-orange-400">
                                    <Mail size={19} aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    Send a Message
                                </h3>
                            </div>

                            {feedback && (
                                <div
                                    className={`mb-5 rounded-lg border p-3 text-sm ${feedback.type === 'success'
                                        ? 'border-green-500/50 bg-green-500/20 text-green-300'
                                        : 'border-red-500/50 bg-red-500/20 text-red-300'
                                        }`}
                                    role={feedback.type === 'success' ? 'status' : 'alert'}
                                >
                                    {feedback.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="sender_name" className="block text-sm font-medium text-gray-200">
                                        Your Name
                                    </label>
                                    <input
                                        id="sender_name"
                                        type="text"
                                        name="sender_name"
                                        value={formData.sender_name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        autoComplete="name"
                                        className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors placeholder:text-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="sender_email" className="block text-sm font-medium text-gray-200">
                                        Your Email Address
                                    </label>
                                    <input
                                        id="sender_email"
                                        type="email"
                                        name="sender_email"
                                        value={formData.sender_email}
                                        onChange={handleChange}
                                        placeholder="Your Email Address"
                                        autoComplete="email"
                                        className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors placeholder:text-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Enter your message..."
                                        rows={5}
                                        className="w-full resize-y rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors placeholder:text-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="contact-submit-button inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-orange-950/30 transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                                    {!loading && <Send size={17} aria-hidden="true" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
