'use client';

import { useState } from 'react';
import './Contact.css';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        frequency: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Determine which email to send to based on form content
            const isProjectRequest = formData.message.toLowerCase().includes('project');
            const recipientEmail = isProjectRequest ? 'puzzlelabs.dev@gmail.com' : 'casusishakira@gmail.com';

            // Here you would typically send the email via a backend API
            // For now, this is a placeholder
            console.log('Sending to:', recipientEmail);
            console.log('Form data:', formData);

            // Reset form after submission
            setFormData({ name: '', email: '', frequency: '', message: '' });
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="w-full max-w-6xl">
                {/* Title */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="text-white">Let's</span>{" "}
                        <span className="text-orange-500">Connect</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        I am always open to new projects or just a chat. Send your signal.
                    </p>
                </div>

                {/* Contact Container */}
                <div className="contact-container border border-orange-500/30 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md">
                    <div className="contact-grid">
                        {/* Left Column - Icons */}
                        <div className="contact-left bg-black/60 p-8 lg:p-12 flex flex-col justify-between">
                            {/* System Status */}
                            <div className="flex items-center gap-3">
                                <div className="blinking-dot"></div>
                                <span className="text-orange-500 font-bold text-sm tracking-wider">
                                    SYSTEM STATUS: ONLINE
                                </span>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-5">
                                {/* Email Card */}
                                <a
                                    href="mailto:casusishakira@gmail.com"
                                    className="contact-card group"
                                >
                                    <div className="flex items-center gap-3 p-4 rounded-lg border border-orange-400/30 hover:border-orange-400/60 hover:bg-orange-400/5 transition-all duration-300">
                                        <div className="email-icon w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                                            <p className="text-white font-medium text-xs">casusishakira@gmail.com</p>
                                        </div>
                                    </div>
                                </a>

                                {/* WhatsApp Card */}
                                <a
                                    href="https://wa.me/639482599773"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-card group"
                                >
                                    <div className="flex items-center gap-3 p-4 rounded-lg border border-orange-400/30 hover:border-orange-400/60 hover:bg-orange-400/5 transition-all duration-300">
                                        <div className="whatsapp-icon w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide">WhatsApp</p>
                                            <p className="text-white font-medium text-xs">+63 948 259 9773</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* Establishing Uplink */}
                            <div className="flex items-center gap-2 text-xs pt-4">
                                <svg className="w-4 h-4 text-gray-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                                </svg>
                                <svg className="w-4 h-4 text-gray-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                                </svg>
                                <span className="text-gray-500">ESTABLISHING UPLINK...</span>
                            </div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <div className="contact-right bg-gray-900/40 p-8 lg:p-12 flex flex-col justify-center">
                            {/* Form Header */}
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.9429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99621575 L3.03521743,10.4371088 C3.03521743,10.5942061 3.19218622,10.7513035 3.50612381,10.7513035 L16.6915026,11.5367905 C16.6915026,11.5367905 17.1624089,11.5367905 17.1624089,12.0080827 C17.1624089,12.4793748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                                </svg>
                                <h3 className="text-white font-bold uppercase tracking-wider text-sm">
                                    Initiate Data Transmission
                                </h3>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Input */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Sender ID / Name"
                                        className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2 focus:outline-none focus:border-orange-400 placeholder-gray-500 transition-colors text-sm"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Frequency"
                                        className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2 focus:outline-none focus:border-orange-400 placeholder-gray-500 transition-colors text-sm"
                                        required
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Message Transmission Data"
                                        className="w-full h-24 bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-orange-400/50 placeholder-gray-500 transition-colors resize-none text-sm"
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                                >
                                    {loading ? 'Sending...' : 'Initiate Transmission'}
                                    <span>→</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Fixed Status Indicator - Lower Left */}
                <div className="fixed bottom-4 left-4 flex items-center gap-2 text-xs">
                    <svg className="w-3 h-3 text-gray-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                    </svg>
                    <svg className="w-3 h-3 text-gray-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
