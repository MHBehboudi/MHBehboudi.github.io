function Tweaks({ theme, setTheme, density, setDensity }) {
  const [open, setOpen] = React.useState(true);

  if (!open) {
    return (
      <button
        className="tweaks"
        style={{ width: 'auto', padding: '10px 14px', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        ⚙ Tweaks
      </button>
    );
  }

  const themes = [
    { id: 'electric', name: 'Electric', color: 'oklch(0.92 0.20 120)' },
    { id: 'amber',    name: 'Amber',    color: 'oklch(0.82 0.18 70)' },
    { id: 'coral',    name: 'Coral',    color: 'oklch(0.75 0.20 25)' },
    { id: 'ice',      name: 'Ice',      color: 'oklch(0.85 0.15 210)' },
    { id: 'paper',    name: 'Paper',    color: '#1A1816' },
  ];

  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <div className="t">Tweaks</div>
        <button className="x" onClick={() => setOpen(false)}>×</button>
      </div>
      <div className="tweak-row">
        <div className="lbl">Accent / Theme</div>
        <div className="tweak-swatches">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`tweak-swatch ${theme === t.id ? 'active' : ''}`}
              style={{ background: t.color }}
              title={t.name}
              onClick={() => setTheme(t.id)}
            />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <div className="lbl">Density</div>
        <div className="tweak-opts">
          <button className={`tweak-opt ${density === 'comfortable' ? 'active' : ''}`} onClick={() => setDensity('comfortable')}>comfortable</button>
          <button className={`tweak-opt ${density === 'compact' ? 'active' : ''}`} onClick={() => setDensity('compact')}>compact</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = React.useState('top');
  const [theme, setTheme] = React.useState('electric');
  const [density, setDensity] = React.useState('comfortable');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-density', density);
  }, [density]);

  React.useEffect(() => {
    const opts = { rootMargin: '-30% 0px -50% 0px', threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, opts);
    window.DATA.SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const { Nav, Hero, Stats, About, PipelineSection, Research, Publications, Expertise, Education, Contact, Footer } = window.UI;

  return (
    <div className="app">
      <Nav active={active} onNav={onNav} />
      <main className="main">
        <Hero />
        <Stats />
        <About />
        <PipelineSection />
        <Research />
        <Publications />
        <Expertise />
        <Education />
        <Contact />
        <Footer />
      </main>
      <Tweaks theme={theme} setTheme={setTheme} density={density} setDensity={setDensity} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
