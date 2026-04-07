'use client';

import Image from 'next/image';
import './Certifications.css';

interface Certification {
    id: string;
    title: string;
    description: string;
    issuer?: string;
    date?: string;
    image?: string;
}

const certifications: Certification[] = [
    {
        id: '1',
        title: 'How to design Facebook and IG stories using Canva',
        issuer: 'Coursera',
        date: '2024',
        image: '/pictures/How to Design FB and IG.jpeg',
        description: 'Learned how to use Canva to design Facebook and Instagram stories and to know the importance of using stories for social media.',
    },
    {
        id: '2',
        title: 'Foundations of User Experience (UX) Design',
        issuer: 'Google via Coursera',
        date: '2024',
        image: '/pictures/Foundations of UX.jpeg',
        description: 'Understand foundational concepts in UX design, such as user-centered design, the design process, accessibility, and equity-focused design. ',
    },
    {
        id: '3',
        title: 'Start the UX Design Process',
        issuer: 'Google via Coursera',
        date: '2024',
        image: '/pictures/UX Design Process.jpg',
        description: 'Empathize with users to understand their needs and pain points.',
    },
    {
        id: '4',
        title: 'Build Wireframes and Low-Fidelity Prototypes',
        issuer: 'Google via Coursera',
        date: '2024',
        image: '/pictures/Build Wireframes.jpg',
        description: 'Create storyboards to come up with ideas about solutions to user needs.',
    },
    {
        id: '5',
        title: 'Introduction to Cybersecurity',
        issuer: 'Cisco Networking Academy',
        date: '2025',
        image: '/pictures/Cybersec Fundamentals.jpg',
        description: 'Learn the fundamentals of cybersecurity and understand the importance of protecting digital assets.',
    },
    {
        id: '6',
        title: 'AWS Cloud Foundations',
        issuer: 'AWS Academy',
        date: '2026',
        image: '/pictures/Cloud Foundations.jpg',
        description: 'Learn the fundamentals of AWS cloud services and understand the importance of protecting digital assets.',
    },
];

export default function Certifications() {
    return (
        <section className="certifications-section">
            <div className="certifications-container">
                <div className="certifications-header">
                    <h2 className="certifications-title">Certifications</h2>
                    <div className="header-underline" />
                </div>

                <div className="certifications-grid">
                    {[...certifications].reverse().map((cert) => (
                        <div key={cert.id} className="certification-card group relative h-64 cursor-pointer rounded-lg overflow-hidden">
                            {cert.image ? (
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    className="cert-image"
                                    objectFit="contain"
                                />
                            ) : (
                                <svg className="cert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
                                </svg>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 rounded-lg bg-black/90 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="cert-title">{cert.title}</p>
                                {cert.issuer && <p className="cert-issuer">{cert.issuer}</p>}
                                {cert.date && <p className="cert-date">{cert.date}</p>}
                                <p className="cert-description">{cert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
