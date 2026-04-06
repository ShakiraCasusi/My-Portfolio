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
        title: 'Certification Title 1',
        issuer: 'Issuing Organization',
        date: '2024',
        image: '/pictures/cert1.png',
        description: 'Add your certification description here. Describe what you learned and why it matters.',
    },
    {
        id: '2',
        title: 'Certification Title 2',
        issuer: 'Issuing Organization',
        date: '2024',
        image: '/pictures/cert2.png',
        description: 'Add your certification description here. Describe what you learned and why it matters.',
    },
    {
        id: '3',
        title: 'Certification Title 3',
        issuer: 'Issuing Organization',
        date: '2024',
        image: '/pictures/cert3.png',
        description: 'Add your certification description here. Describe what you learned and why it matters.',
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
                        <div key={cert.id} className="certification-card">
                            {cert.image ? (
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    className="cert-image"
                                    objectFit="cover"
                                />
                            ) : (
                                <svg className="cert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
                                </svg>
                            )}
                            <div className="cert-content">
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
