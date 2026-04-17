function Socials() {
  return (
    <div className="socials">
      <a href="https://github.com/MHBehboudi" target="_blank" rel="noopener" title="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 007.86 10.92c.58.11.79-.25.79-.55v-2.1c-3.2.7-3.87-1.34-3.87-1.34-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.8 0c2.2-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/mohammad-hossein-behboudi/" target="_blank" rel="noopener" title="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.73V1.73C24 .77 23.19 0 22.22 0z"/></svg>
      </a>
      <a href="https://scholar.google.com/citations?user=e81fVS0AAAAJ&hl=en" target="_blank" rel="noopener" title="Google Scholar">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 2zm6.82 7L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73V12.1l5 2.73 5-2.73v3.89z"/></svg>
      </a>
      <a href="https://orcid.org/0000-0003-1335-3617" target="_blank" rel="noopener" title="ORCID">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 18.33h-1.8V7.62h1.8v10.71zM6.47 6.86a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1zm12.23 6.41c0 3.06-2.03 5.06-5.25 5.06h-4.24V7.62h4.24c3.22 0 5.25 2.59 5.25 5.65zm-1.83 0c0-2.06-1.27-3.98-3.42-3.98h-2.44v7.95h2.44c2.15 0 3.42-1.93 3.42-3.97z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/mohammad-hossein-behboudi/" title="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
      </a>
    </div>
  );
}

function Nav({ active, onNav }) {
  return (
    <aside className="nav">
      <div className="brand">
        <span className="brand-dot"></span> Mohammad Hossein. Behboudi
      </div>
      <div className="nav-items">
        {window.DATA.SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`nav-item ${active === s.id ? 'active' : ''}`}
            onClick={() => onNav(s.id)}
          >
            <span className="num">{s.num}</span>
            <span className="label">{s.label}</span>
          </button>
        ))}
      </div>
      <div className="nav-bottom">
        <div className="status">
          <span className="status-dot"></span>
        </div>
        <div style={{ marginTop: 8 }}></div>
        <Socials />
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-meta">
        <span>[ 01 / INTRO ]</span>
        <div className="right">
          <span>lat </span>
          <span></span>
          <span></span>
        </div>
      </div>
      <h1 className="hero-name">
        Mohammad<br />
        <span className="italic">Hossein</span> Behboudi<span className="accent">.</span>
      </h1>
      <div className="hero-bottom">
        <div>
          <p className="hero-intro">
            I'm a Ph.D. candidate building <strong>foundation models for neural signals</strong> — the computational stack that turns raw physiological recordings into representations transferable across subjects, devices, and any downstream task.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#pipeline" onClick={(e) => { e.preventDefault(); document.getElementById('pipeline').scrollIntoView({ behavior: 'smooth' }); }}>
              See the pipeline <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#" onClick={(e) => e.preventDefault()}>
              Download CV <span className="arrow">↓</span>
            </a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/mohammad-hossein-behboudi/">
              Get in touch
            </a>
          </div>
        </div>
        <window.HeroSignal />
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: '1st', u: '', l: 'LibriBrain Long\nAcquisition Track' },
    { v: '0.85', u: '', l: 'Macro-F1\nCompetition Score' },
    { v: '7', u: '+', l: 'Peer-Reviewed\nPublications' },
    { v: '500', u: ' GB', l: 'Neural Data\nProcessed' },
    { v: '200', u: '+', l: 'IRB-Compliant\nSessions Run' },
  ];
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <div className="v">{s.v}<span className="unit">{s.u}</span></div>
          <div className="l">{s.l.split('\n').map((line, j) => <div key={j}>{line}</div>)}</div>
        </div>
      ))}
    </div>
  );
}

function SectionHead({ num, title, italic, accent, aside }) {
  return (
    <div className="section-head">
      <div className="section-num">[ {num} ]</div>
      <div className="section-title">
        {title}
        {italic && <span className="italic">{italic}</span>}
        {accent && <span className="accent">{accent}</span>}
      </div>
      <div className="section-aside">{aside}</div>
    </div>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <SectionHead
        num="02"
        title="About"
        italic=" me."
        aside="Ph.D. candidate · Electrical Engineer by training"
      />
      <p className="intro-text">
        I live at the intersection of <em>electrical engineering</em>, <em>cognitive neuroscience</em>, and <em>machine learning</em> — building foundation-model infrastructure that lets one pretrained encoder transfer across <span className="tag">EEG</span><span className="tag">MEG</span><span className="tag">ECG</span> any subject, any device, any task.
      </p>
      <p className="intro-sub">
        My work sits on both sides of the stack. On one end: universal data readers, automated preprocessing across EDF/BDF/HDF5/BrainVision, and reproducible pipelines that have processed <strong style={{ color: 'var(--paper)' }}>500+ GB</strong> across heterogeneous recording systems. On the other: self-supervised Transformer architectures, VQ-VAE tokenizers, and GNN spatial modules that won the LibriBrain Long Acquisition track at Macro-F1 = 0.85. I also happen to have built a novel cross-frequency connectivity algorithm (MDPC) adopted by several research groups, and a clinical diagnostic system that hits 95% accuracy on sleep apnea from a single channel.
      </p>
    </section>
  );
}

function PipelineSection() {
  return (
    <section className="section" id="pipeline">
      <SectionHead
        num="03"
        title="Foundation"
        italic=" Models"
        accent="."
        aside="Click a stage or press play ↓"
      />
      <window.Pipeline />
    </section>
  );
}

function Research() {
  return (
    <section className="section" id="research">
      <SectionHead num="04" title="Selected" italic=" research." aside="Github & papers linked below" />
      <div style={{ marginLeft: 160 }}>
        <div className="research-grid">
          {window.DATA.RESEARCH.map((r, i) => (
            <div className="research-card" key={i}>
              <div className="rc-num">RESEARCH / {r.num}</div>
              <div className="rc-title">{r.title}</div>
              <div className="rc-desc">{r.desc}</div>
              <div className="rc-tags">
                {r.tags.map((t, j) => <span className="rc-tag" key={j}>{t}</span>)}
              </div>
              <a className="rc-link" href={r.link} target="_blank" rel="noopener">
                view project <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Publications() {
  return (
    <section className="section" id="publications">
      <SectionHead num="05" title="Publications" accent="." aside="Google Scholar profile linked in nav" />
      <p className="pubs-intro">
        Peer-reviewed work spanning developmental neuroscience, language processing, and biomedical signal processing — plus ongoing work on foundation models for neural decoding.
      </p>
      <div className="pubs">
        {Object.entries(window.DATA.PUBS).map(([group, items]) => (
          <React.Fragment key={group}>
            <div className="pub-group-label">{group} · {items.length}</div>
            {items.map((p, i) => (
              <div className="pub-item" key={i}>
                <div className="pub-year">{p.y}</div>
                <div className="pub-body">
                  <div className="title">{p.t}</div>
                  <div className="authors" dangerouslySetInnerHTML={{ __html: p.a }} />
                  <div className="venue">{p.v}</div>
                </div>
                {p.l !== '#' ? (
                  <a className="pub-link" href={p.l} target="_blank" rel="noopener">doi ↗</a>
                ) : (
                  <span className="pub-link">in review</span>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="section" id="expertise">
      <SectionHead num="06" title="Technical" italic=" stack." aside="Full-stack: signal processing to distributed training" />
      <div className="exp-grid">
        {window.DATA.EXPERTISE.map((e, i) => (
          <div className="exp-block" key={i}>
            <div className="h">{e.h}</div>
            <div className="d" dangerouslySetInnerHTML={{ __html: e.d }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section" id="education">
      <SectionHead num="07" title="Education" accent="." aside="EE → ML → Cognitive Neuroscience" />
      <div className="edu-list">
        {window.DATA.EDUCATION.map((e, i) => (
          <div className="edu-item" key={i}>
            <div className="edu-yr">{e.yr}</div>
            <div>
              <div className="edu-degree">{e.d}</div>
              <div className="edu-school">{e.s}</div>
            </div>
            <div className="edu-where">{e.w}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-num" style={{ marginBottom: 40 }}>[ 08 / CONTACT ]</div>
      <h2 className="contact-big">
        Let's build <span className="italic">foundation models</span> that actually<br />
        generalize<span className="accent">.</span>
      </h2>
      <div className="contact-meta">
        <div className="cm-item">
          <div className="k">Email</div>
          <div className="v"><a href="https://www.linkedin.com/in/mohammad-hossein-behboudi/"></a></div>
        </div>
        <div className="cm-item">
          <div className="k">Based in</div>
          <div className="v">Open to relocate</div>
        </div>
        <div className="cm-item">
          <div className="k"></div>
          <div className="v"></div>
        </div>
        <div className="cm-item">
          <div className="k">CV</div>
          <div className="v"><a href="https://www.linkedin.com/in/mohammad-hossein-behboudi/">Link</a></div>
        </div>
        <div className="cm-item">
          <div className="k">Scholar</div>
          <div className="v"><a href="https://scholar.google.com/citations?user=e81fVS0AAAAJ&hl=en" target="_blank" rel="noopener">citations ↗</a></div>
        </div>
        <div className="cm-item">
          <div className="k">ORCID</div>
          <div className="v"><a href="https://orcid.org/0000-0003-1335-3617" target="_blank" rel="noopener">0000-0003-1335-3617 ↗</a></div>
        </div>
      </div>
      <div style={{ marginTop: 60 }}><Socials /></div>
    </section>
  );
}

function Footer() {
  return (
    <div className="footer">
      <span>© Mohammad Hossein Behboudi </span>
      <span>Designed & built with signal &amp; spectrum.</span>
    </div>
  );
}

window.UI = { Nav, Hero, Stats, About, PipelineSection, Research, Publications, Expertise, Education, Contact, Footer, Socials };
