'use client';

import BorderGlow from '../../BorderGlow';
import './TechStack.css';
import type { ReactNode } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaGithub, FaAws, FaCode } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiSupabase, SiFigma, SiCanva, SiNotion } from 'react-icons/si';
import { MdSecurity, MdInsights } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { RiRobot2Line } from 'react-icons/ri';
import { BsMeta } from 'react-icons/bs';
import { HiOutlineVideoCamera } from 'react-icons/hi';

interface TechItem {
  icon: ReactNode;
  label: string;
  category: string;
}

const techItems: TechItem[] = [
  { icon: <FaHtml5 />, label: 'HTML', category: 'Frontend' },
  { icon: <FaCss3Alt />, label: 'CSS', category: 'Frontend' },
  { icon: <FaJs />, label: 'JavaScript', category: 'Frontend' },
  { icon: <FaReact />, label: 'React', category: 'Frontend Library' },
  { icon: <SiNextdotjs />, label: 'Next.js', category: 'Framework' },
  { icon: <SiTailwindcss />, label: 'Tailwind', category: 'CSS Framework' },
  { icon: <FaBootstrap />, label: 'Bootstrap', category: 'CSS Framework' },

  { icon: <MdSecurity />, label: 'Helmet.js', category: 'Security' },
  { icon: <SiMongodb />, label: 'MongoDB', category: 'Database' },
  { icon: <SiSupabase />, label: 'Supabase', category: 'Backend Service' },

  { icon: <FaGitAlt />, label: 'Git', category: 'Version Control' },
  { icon: <FaGithub />, label: 'GitHub', category: 'Repository' },
  { icon: <FaCode />, label: 'VS Code', category: 'Code Editor' },
  { icon: <FaAws />, label: 'AWS', category: 'Cloud' },

  { icon: <SiFigma />, label: 'Figma', category: 'UI/UX Design' },
  { icon: <SiCanva />, label: 'Canva', category: 'Design Tool' },
  { icon: <HiOutlineVideoCamera />, label: 'CapCut', category: 'Video Editing' },

  { icon: <FcGoogle />, label: 'Google Workspace', category: 'Productivity' },
  { icon: <MdInsights />, label: 'Data Viz', category: 'Data Visualization' },
  { icon: <SiNotion />, label: 'Notion', category: 'Documentation' },

  { icon: <RiRobot2Line />, label: 'AI Tools', category: 'AI' },
  { icon: <BsMeta />, label: 'Meta Business Suite', category: 'Marketing' },
];

export default function TechStack() {
  return (
    <section className="tech-stack-section">
      <div className="tech-stack-container">
        <div className="tech-stack-header">
          <h2 className="tech-stack-title">Creative & Tech Stack</h2>
          <div className="header-underline" />
        </div>

        <div className="tech-grid">
          {techItems.map((item, index) => (
            <BorderGlow
              key={index}
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="#0a0015"
              borderRadius={16}
              glowRadius={30}
              glowIntensity={0.8}
              coneSpread={25}
              animated={false}
              colors={['#c084fc', '#f472b6', '#38bdf8']}
              fillOpacity={0.3}
              className="tech-card"
            >
              <div className="tech-card-content">
                <div className="tech-icon">{item.icon}</div>
                <h3 className="tech-label">{item.label}</h3>
                <p className="tech-category">{item.category}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

