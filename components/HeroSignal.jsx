// Hero signal visualization — EEG-style live waveform that reacts to cursor
function HeroSignal() {
  const canvasRef = React.useRef(null);
  const mouseRef = React.useRef({ x: 0.5, y: 0.5, active: false });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const channels = 6;
    const labels = ['Fp1', 'F3', 'C3', 'P3', 'O1', 'Cz'];

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      ctx.clearRect(0, 0, W, H);

      // subtle grid
      ctx.strokeStyle = 'rgba(237,232,222,0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        const x = (W / 10) * i;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      const channelH = H / (channels + 1);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      for (let c = 0; c < channels; c++) {
        const yBase = channelH * (c + 1);
        const dist = Math.abs((c / (channels - 1)) - my);
        const amp = active ? 14 + (1 - dist) * 22 : 10;
        const freq1 = 0.018 + c * 0.004;
        const freq2 = 0.06 + c * 0.01;
        const freq3 = 0.003 + c * 0.001;

        // glow for "focused" channel near cursor
        const focused = active && dist < 0.18;
        ctx.lineWidth = focused ? 1.6 : 0.9;
        ctx.strokeStyle = focused
          ? 'oklch(0.92 0.20 120 / 0.9)'
          : 'rgba(237,232,222,0.35)';
        if (focused) {
          ctx.shadowColor = 'oklch(0.92 0.20 120 / 0.6)';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        for (let x = 0; x < W; x += 2) {
          const mouseInfluence = active
            ? Math.exp(-Math.pow((x / W - mx) * 4, 2)) * 18
            : 0;
          const v =
            Math.sin((x + t * 2) * freq1 + c) * amp +
            Math.sin((x + t * 1.5) * freq2 + c * 0.7) * (amp * 0.4) +
            Math.sin((x + t * 0.8) * freq3 + c * 2) * (amp * 0.3) +
            mouseInfluence * (1 - dist);
          if (x === 0) ctx.moveTo(x, yBase + v);
          else ctx.lineTo(x, yBase + v);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // label
        ctx.fillStyle = focused ? 'oklch(0.92 0.20 120)' : 'rgba(237,232,222,0.25)';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(labels[c], 14, yBase - 14);
      }

      // cursor dot
      if (active) {
        ctx.beginPath();
        ctx.arc(mx * W, my * H, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'oklch(0.92 0.20 120)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx * W, my * H, 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'oklch(0.92 0.20 120 / 0.4)';
        ctx.stroke();
      }

      t += 1;
      raf = requestAnimationFrame(draw);
    }
    draw();

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    }
    function onLeave() { mouseRef.current.active = false; }
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="hero-signal">
      <div className="signal-label"><span className="rec"></span>LIVE · 6-CH EEG · 500 Hz</div>
      <canvas ref={canvasRef} />
      <div className="signal-hint">hover to probe ←→</div>
    </div>
  );
}

window.HeroSignal = HeroSignal;
