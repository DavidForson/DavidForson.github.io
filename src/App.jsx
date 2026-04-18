import { useState, useEffect, useRef } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const UI = {
  en: {
    status: 'CONNECTED TO THE WIRED',
    node: 'NODE_01',
    sections: { about: 'ABOUT', projects: 'PROJECTS', links: 'LINKS' },
    bio: `b.s. computer science && b.s. mathematics and statistics. \n
          university of missouri–kansas city, 2025.  \n\n
          m.s. computer science.\n
          university of missouri–kansas city, 2027.\n\n
          software developer focused on systems-level programming.\n\n
          the closer to the metal, the better.`,
  },
  jp: {
    status: 'ワイヤードに接続中',
    node: 'ノード_01',
    sections: { about: '概要', projects: 'プロジェクト', links: 'リンク' },
    bio: `コンピュータサイエンス && 数学・統計学（学士）。  \n
         ミズーリ大学カンザスシティ校 2025。\n\n
         コンピュータサイエンス（修士）。\n
         ミズーリ大学カンザスシティ校 2027。\n\n
         システムレベルプログラミング志向のソフトウェア開発者。 \n\n
         金属に近いほど良い。`,
  },
};

const PROJECTS = [
  {
    name: 'Project 1',
    en: { desc: 'p1 desc' },
    jp: { desc: 'p1 desc' },
    tags: ['c', 'c++', 'vulkan'],
    demo: 'https://youtube.com',
    github: 'https://github.com',
    img: '/images/proj1.png',
  },
  {
    name: 'Project 2',
    en: { desc: 'p2 desc' },
    jp: { desc: 'p2 desc' },
    tags: ['python', 'synthesis'],
    demo: 'https://youtube.com',
    github: 'https://github.com',
    img: '/images/proj2.png',
  },
  {
    name: 'Project 3',
    en: { desc: 'p3 desc' },
    jp: { desc: 'p3 desc' },
    tags: ['go', 'terminal', 'open source'],
    demo: 'https://youtube.com',
    github: 'https://github.com',
    img: '/images/proj3.png',
  },
];

const LINKS = [
  { label: 'github',   href: 'https://github.com/DavidForson',      icon: 'github'   },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/davidforson/', icon: 'linkedin' },
  { label: 'email',    href: 'mailto:forson.davidm@gmail.com',             icon: 'email'    },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 24 17" fill="currentColor">
      <path d="M23.495 2.656a3.016 3.016 0 0 0-2.122-2.136C19.505.114 12 .114 12 .114s-7.505 0-9.373.406A3.016 3.016 0 0 0 .505 2.656 31.808 31.808 0 0 0 .114 8.5a31.808 31.808 0 0 0 .391 5.844 3.016 3.016 0 0 0 2.122 2.136C4.495 16.886 12 16.886 12 16.886s7.505 0 9.373-.406a3.016 3.016 0 0 0 2.122-2.136A31.808 31.808 0 0 0 23.886 8.5a31.808 31.808 0 0 0-.391-5.844zM9.545 12.023V4.977L15.818 8.5l-6.273 3.523z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>
  );
}

const ICON_MAP = {
  github:   <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  email:    <EmailIcon />,
};

// ─── DITHERED IMAGE ───────────────────────────────────────────────────────────
function DitheredImage({ src, width, height, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext('2d');
      octx.drawImage(img, 0, 0, width, height);
      const { data: pixels } = octx.getImageData(0, 0, width, height);

      const gray = new Float32Array(width * height);
      for (let i = 0; i < gray.length; i++) {
        gray[i] = (0.299 * pixels[i*4] + 0.587 * pixels[i*4+1] + 0.114 * pixels[i*4+2]) / 255;
      }

      const err = new Float32Array(width * height);
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const out = ctx.createImageData(width, height);
      const d = out.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = y * width + x;
          const old = Math.max(0, Math.min(1, gray[i] + err[i]));
          const nw = old > 0.5 ? 1 : 0;
          const qe = old - nw;
          if (x + 1 < width)                   err[i + 1]         += qe * 7/16;
          if (x - 1 >= 0 && y + 1 < height)    err[i + width - 1] += qe * 3/16;
          if (y + 1 < height)                   err[i + width]     += qe * 5/16;
          if (x + 1 < width && y + 1 < height) err[i + width + 1] += qe * 1/16;
          d[i*4]   = nw ? 176 : 16;
          d[i*4+1] = nw ? 176 : 16;
          d[i*4+2] = nw ? 200 : 28;
          d[i*4+3] = 255;
        }
      }
      ctx.putImageData(out, 0, 0);
    };
  }, [src, width, height]);

  return <canvas ref={canvasRef} className={className} />;
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
function Section({ id, title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sec">
      <button
        className={`tog${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="arr">▶</span>
        <span><span className="pre">{id} // </span>{title}</span>
      </button>
      {open && <div className="sec-body">{children}</div>}
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ name, en, jp, tags, demo, github, img, lang }) {
  const t = lang === 'jp' ? jp : en;
  return (
    <div className="proj-card">
      <img src={img} alt={name} className="proj-img" />
      <div className="proj-content">
        <div className="proj-name">// {name}</div>
        <p className="proj-desc">{t.desc}</p>
        <div className="proj-tags">
          {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="proj-links">
          <a href={demo} target="_blank" rel="noreferrer" className="proj-link">
            <YouTubeIcon />
            <span>{lang === 'jp' ? 'デモ' : 'demo'}</span>
          </a>
          <a href={github} target="_blank" rel="noreferrer" className="proj-link">
            <GitHubIcon />
            <span>{lang === 'jp' ? 'ソース' : 'source'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [lang, setLang] = useState('en');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const pad = n => String(n).padStart(2, '0');
      return `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = UI[lang];

  return (
    <div className="root">
      <div className="scanlines" />
      <div className="card">

        <header className="card-header">
          <div className="corner tl" />
          <div className="corner br" />
          <div className="header-left">
            <div className="glitch">{lang === 'en' ? 'David Forson' : 'フォーソン　デイビッド'}</div>
            <div className="sub">
              <span className="pulse" />
              {t.status} // {t.node}
              <span className="blink">_</span>
            </div>
          </div>
          <button
            className="lang-toggle"
            onClick={() => setLang(l => l === 'en' ? 'jp' : 'en')}
          >
            {lang === 'en' ? '日本語' : 'EN'}
          </button>
        </header>

        <Section id="01" title={t.sections.about} defaultOpen>
          <div className="about-inner">
            <div className="pfp-wrap">
              <DitheredImage
                src="/images/profile.jpg"
                width={48}
                height={48}
                className="pfp-canvas"
              />
            </div>
            <p className="about-text">
              {t.bio.split('\n').map((line, i) =>
                line === '' ? <br key={i} /> : <span key={i}>{line}<br /></span>
              )}
            </p>
          </div>
        </Section>

        <Section id="02" title={t.sections.projects}>
          <div className="projects-list">
            {PROJECTS.map(p => (
              <ProjectCard key={p.name} lang={lang} {...p} />
            ))}
          </div>
        </Section>

        <Section id="03" title={t.sections.links}>
          <div className="links-list">
            {LINKS.map(({ label, href, icon }) => (
              <a key={label} href={href} className="soc-link" target="_blank" rel="noreferrer">
                {ICON_MAP[icon]}
                <span>{label}</span>
              </a>
            ))}
          </div>
        </Section>

        <div className="status-bar">
          <span>LAYER_07 :: PROTOCOL ACTIVE</span>
          <span>{time}</span>
        </div>

      </div>
    </div>
  );
}

export default App;