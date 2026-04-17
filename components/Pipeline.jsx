// Interactive foundation model pipeline — clickable stages with per-stage viz

const STAGES = [
  {
    num: '01',
    title: 'Raw Acquisition',
    short: 'Heterogeneous neural recordings',
    serif: 'From wire to',
    italic: ' waveform.',
    desc: 'I build universal readers that ingest EDF, BDF, BrainVision, and HDF5 across devices with different sampling rates, channel counts, and reference schemes. No format left behind.',
    meta: [
      ['Formats', 'EDF · BDF · HDF5'],
      ['Channels', '14 – 306'],
      ['Subjects', '100+'],
    ],
    viz: 'raw',
    metric: '500 GB processed',
  },
  {
    num: '02',
    title: 'Preprocessing',
    short: 'ICA · filtering · artifact rejection',
    serif: 'Clean, at',
    italic: ' scale.',
    desc: 'Automated artifact detection (ICA, spectral, threshold), cross-device normalization, and montage mapping. Runs as a reproducible pipeline across hundreds of sessions without manual babysitting.',
    meta: [
      ['Methods', 'ICA · wavelets'],
      ['Artifacts', 'EOG · EMG · 60 Hz'],
      ['Sessions', '200+ IRB'],
    ],
    viz: 'clean',
    metric: 'SNR +14 dB',
  },
  {
    num: '03',
    title: 'VQ-VAE Tokenizer',
    short: 'Discrete neural vocabulary',
    serif: 'A vocabulary of the',
    italic: ' brain.',
    desc: 'A VQ-VAE learns a codebook of 8,192 discrete neural tokens from Fourier-spectrum targets. Straight-through estimator, L2-normalized cosine quantization (BEiT v2 style). Turns continuous biosignals into a vocabulary the Transformer can learn.',
    meta: [
      ['Codebook', '8,192 × 64'],
      ['Target', 'FFT magnitude + phase'],
      ['Utilization', '94.2%'],
    ],
    viz: 'tokens',
    metric: '8,192 tokens',
  },
  {
    num: '04',
    title: 'Self-Supervised Pretraining',
    short: 'Masked signal modeling',
    serif: 'Learning without',
    italic: ' labels.',
    desc: 'Masked signal modeling over 65% of patches — the Transformer learns to predict the missing tokens from context. No labels needed. Variable-channel attention masks make mixed-montage data a first-class citizen.',
    meta: [
      ['Mask ratio', '0.65'],
      ['Arch', 'Transformer · d=256 · 8 heads'],
      ['Objective', 'Cross-entropy over tokens'],
    ],
    viz: 'mask',
    metric: 'Loss ↓ 3.42',
  },
  {
    num: '05',
    title: 'GNN Spatial Module',
    short: 'Sensor-topology aware',
    serif: 'Anatomy as',
    italic: ' graph.',
    desc: 'A graph neural network over electrode topology lets the model reason about spatial relationships between sensors — even when the montage changes between sessions. Scalp becomes a graph, not a grid.',
    meta: [
      ['Nodes', 'Electrodes (variable)'],
      ['Edges', 'Euclidean + functional'],
      ['Layers', '3 GCN blocks'],
    ],
    viz: 'graph',
    metric: '306 → 14 channels',
  },
  {
    num: '06',
    title: 'Downstream Fine-tune',
    short: 'Any biosignal task',
    serif: 'One model,',
    italic: ' many tasks.',
    desc: 'The pretrained encoder transfers to any downstream task — BCI decoding, clinical diagnostics, wearable health. On the LibriBrain Long Acquisition benchmark: Macro-F1 = 0.85, first place.',
    meta: [
      ['Benchmark', 'LibriBrain Long'],
      ['Macro-F1', '0.85'],
      ['Place', '🏆 1st'],
    ],
    viz: 'result',
    metric: 'F1 = 0.85',
  },
];

// Per-stage visualizations — each tells a micro-story
function StageViz({ stage }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      ctx.clearRect(0, 0, W, H);

      if (stage.viz === 'raw') {
        // messy raw signals with artifacts
        const chans = 5;
        const cH = H / (chans + 1);
        for (let c = 0; c < chans; c++) {
          const y = cH * (c + 1);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(237,232,222,0.45)';
          ctx.lineWidth = 0.9;
          for (let x = 0; x < W; x += 2) {
            let v =
              Math.sin((x + t) * 0.04 + c) * 10 +
              Math.sin((x + t) * 0.12 + c * 2) * 6 +
              (Math.random() - 0.5) * 4;
            // occasional spike artifact
            if (Math.random() > 0.997) v += (Math.random() - 0.5) * 40;
            if (x === 0) ctx.moveTo(x, y + v);
            else ctx.lineTo(x, y + v);
          }
          ctx.stroke();
        }
      } else if (stage.viz === 'clean') {
        const chans = 5;
        const cH = H / (chans + 1);
        for (let c = 0; c < chans; c++) {
          const y = cH * (c + 1);
          ctx.beginPath();
          ctx.strokeStyle = c === 2 ? 'oklch(0.92 0.20 120 / 0.85)' : 'rgba(237,232,222,0.5)';
          ctx.lineWidth = c === 2 ? 1.4 : 0.9;
          for (let x = 0; x < W; x += 2) {
            const v =
              Math.sin((x + t) * 0.03 + c) * 12 +
              Math.sin((x + t) * 0.08 + c * 1.3) * 5;
            if (x === 0) ctx.moveTo(x, y + v);
            else ctx.lineTo(x, y + v);
          }
          ctx.stroke();
        }
      } else if (stage.viz === 'tokens') {
        // codebook grid lighting up
        const cols = 24, rows = 10;
        const cw = W / cols, ch = H / rows;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const phase = Math.sin(t * 0.04 + i * 0.3 + j * 0.5);
            const active = phase > 0.7;
            ctx.fillStyle = active
              ? `oklch(0.92 0.20 120 / ${(phase - 0.7) * 2})`
              : 'rgba(237,232,222,0.05)';
            ctx.fillRect(i * cw + 2, j * ch + 2, cw - 4, ch - 4);
          }
        }
      } else if (stage.viz === 'mask') {
        // patches with masked ones blacked out / predicted
        const cols = 16, rows = 5;
        const cw = W / cols, ch = H / rows;
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const key = (i + j * 3) % 10;
            const masked = key < 6; // ~65% masked
            if (masked) {
              const pred = Math.sin(t * 0.05 + i + j) > 0;
              ctx.fillStyle = pred ? 'oklch(0.92 0.20 120 / 0.3)' : 'rgba(237,232,222,0.04)';
              ctx.fillRect(i * cw + 1, j * ch + 1, cw - 2, ch - 2);
              if (pred) {
                ctx.strokeStyle = 'oklch(0.92 0.20 120 / 0.7)';
                ctx.lineWidth = 1;
                ctx.strokeRect(i * cw + 1, j * ch + 1, cw - 2, ch - 2);
              }
            } else {
              // visible patch with mini-waveform
              ctx.strokeStyle = 'rgba(237,232,222,0.6)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              for (let x = 0; x < cw - 4; x += 1) {
                const v = Math.sin((x + t) * 0.3 + i + j) * (ch / 4);
                const px = i * cw + 2 + x;
                const py = j * ch + ch / 2 + v;
                if (x === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              }
              ctx.stroke();
            }
          }
        }
      } else if (stage.viz === 'graph') {
        // sensor graph over head outline
        const cx = W / 2, cy = H / 2;
        const nodes = [];
        const N = 14;
        for (let i = 0; i < N; i++) {
          const a = (i / N) * Math.PI * 2;
          const rr = Math.min(W, H) * 0.32;
          nodes.push({
            x: cx + Math.cos(a) * rr,
            y: cy + Math.sin(a) * rr * 0.85,
          });
        }
        nodes.push({ x: cx, y: cy - 10 });
        nodes.push({ x: cx - 30, y: cy + 20 });
        nodes.push({ x: cx + 30, y: cy + 20 });

        // head outline
        ctx.strokeStyle = 'rgba(237,232,222,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.min(W, H) * 0.4, Math.min(W, H) * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
        // nose
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy - Math.min(W, H) * 0.33);
        ctx.lineTo(cx, cy - Math.min(W, H) * 0.38);
        ctx.lineTo(cx + 6, cy - Math.min(W, H) * 0.33);
        ctx.stroke();

        // pulse through random edges
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < Math.min(W, H) * 0.3) {
              const pulse = (Math.sin(t * 0.03 + i * 0.5 + j * 0.3) + 1) / 2;
              ctx.strokeStyle = `oklch(0.92 0.20 120 / ${pulse * 0.4})`;
              ctx.lineWidth = 0.5 + pulse * 0.8;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }
        for (const n of nodes) {
          ctx.fillStyle = 'var(--paper)';
          ctx.fillStyle = 'oklch(0.92 0.20 120)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (stage.viz === 'result') {
        // confusion-matrix-ish grid with diagonal glow
        const N = 8;
        const cw = W / N, ch = H / N;
        for (let i = 0; i < N; i++) {
          for (let j = 0; j < N; j++) {
            const isDiag = i === j;
            const v = isDiag
              ? 0.7 + Math.sin(t * 0.05 + i) * 0.2
              : 0.02 + Math.random() * 0.04;
            ctx.fillStyle = isDiag
              ? `oklch(0.92 0.20 120 / ${v})`
              : `rgba(237,232,222,${v})`;
            ctx.fillRect(i * cw + 1, j * ch + 1, cw - 2, ch - 2);
          }
        }
      }

      t += 1;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [stage]);

  return <canvas ref={ref} />;
}

function Pipeline() {
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((a) => {
        if (a >= STAGES.length - 1) {
          setPlaying(false);
          return a;
        }
        return a + 1;
      });
    }, 2400);
    return () => clearInterval(id);
  }, [playing]);

  const stage = STAGES[active];

  return (
    <div className="pipeline">
      <div className="pipeline-header">
        <div className="pipeline-title">
          <span className="trophy">🏆 LibriBrain · Long Acquisition · 1st place</span>
          <span>foundation_model_pipeline.py</span>
        </div>
        <div className="pipeline-controls">
          <button
            className="pipeline-btn play"
            onClick={() => {
              if (active >= STAGES.length - 1) setActive(0);
              setPlaying(!playing);
            }}
          >
            {playing ? '❚❚ pause' : '▶ play pipeline'}
          </button>
          <button
            className="pipeline-btn"
            onClick={() => { setActive(0); setPlaying(false); }}
          >
            reset
          </button>
        </div>
      </div>
      <div className="pipeline-body">
        <div className="pipeline-stages">
          {STAGES.map((s, i) => (
            <div
              key={i}
              className={`stage ${i === active ? 'active' : ''} ${i < active ? 'done' : ''}`}
              onClick={() => { setActive(i); setPlaying(false); }}
            >
              <div className="s-num">STAGE {s.num}</div>
              <div className="s-title">{s.title}</div>
              <div className="s-desc">{s.short}</div>
            </div>
          ))}
        </div>
        <div className="pipeline-detail">
          <div className="pd-stage-title">
            {stage.serif}<span className="italic">{stage.italic}</span>
          </div>
          <div className="pd-stage-desc">{stage.desc}</div>
          <div className="pd-viz">
            <div className="pd-viz-label">{stage.title.toUpperCase()}</div>
            <StageViz stage={stage} />
            <div className="pd-viz-metric">{stage.metric}</div>
          </div>
          <div className="pd-meta">
            {stage.meta.map(([k, v], i) => (
              <div className="pd-meta-item" key={i}>
                <div className="k">{k}</div>
                <div className="v">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Pipeline = Pipeline;
