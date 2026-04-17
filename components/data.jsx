const SECTIONS = [
  { id: 'top', num: '01', label: 'Intro' },
  { id: 'about', num: '02', label: 'About' },
  { id: 'pipeline', num: '03', label: 'Foundation Models' },
  { id: 'research', num: '04', label: 'Research' },
  { id: 'publications', num: '05', label: 'Publications' },
  { id: 'expertise', num: '06', label: 'Expertise' },
  { id: 'education', num: '07', label: 'Education' },
  { id: 'contact', num: '08', label: 'Contact' },
];

const RESEARCH = [
  {
    num: '01',
    title: 'Cross-Frequency Connectivity Algorithm (MDPC)',
    desc: 'A novel Time-Lagged Cross-Frequency MDPC method that characterizes dynamic information flow across brain networks. A full tri-language pipeline (Python + MATLAB + R) with automated preprocessing, spectral decomposition, and mixed-effects statistical modeling. Adopted by multiple research groups.',
    tags: ['MDPC', 'Wavelets', 'PLV/wPLI', 'Graph Theory'],
    link: 'https://github.com/MHBehboudi/EEG_CrossFrequency_MDPC',
  },
  {
    num: '02',
    title: 'AI-Driven Sleep Apnea Diagnosis',
    desc: 'Clinical diagnostic system using complexity features (fractals, Hurst exponent, entropy measures) with mRMR feature selection and SVM/KNN classifiers from single-channel recordings. 95% diagnostic accuracy — two peer-reviewed publications.',
    tags: ['Entropy', 'mRMR', 'SVM', 'Clinical'],
    link: 'https://doi.org/10.1007/978-3-031-06242-1_8',
  },
  {
    num: '03',
    title: 'Unified Biosignal Data Infrastructure',
    desc: 'Universal data readers and preprocessing pipelines handling EDF, BDF, BrainVision, and HDF5 across multiple recording systems — different sampling rates, channel counts, reference schemes. Automated artifact detection at scale for 100+ participants.',
    tags: ['Python', 'MNE', 'HDF5', 'Cross-device'],
    link: 'https://github.com/MHBehboudi',
  },
  {
    num: '04',
    title: 'Mobile Biosignal Collection Platform',
    desc: 'A portable stimulus and data-synchronization system for collecting neural recordings outside controlled lab environments — getting ecologically valid data from places labs can\'t reach.',
    tags: ['Python', 'Tkinter', 'Portable HW'],
    link: 'https://github.com/MHBehboudi/mobile-eeg-stimulus-presenter',
  },
];

const PUBS = {
  Published: [
    { y: '2024', t: 'Neural oscillations during predictive sentence processing in young children.', a: 'Benítez-Barrera, <b>Behboudi</b>, Maguire', v: 'Brain & Language', l: 'https://doi.org/10.1016/j.bandl.2024.105437' },
    { y: '2024', t: 'Taking culture and context into account: SES and brain development.', a: 'Schneider, <b>Behboudi</b>, Maguire', v: 'Brain Sciences', l: 'https://doi.org/10.3390/brainsci14040392' },
    { y: '2024', t: 'Rethinking household size and children\'s language environment.', a: 'Poudel et al. incl. <b>Behboudi</b>', v: 'Developmental Psychology', l: 'https://doi.org/10.1037/dev0001650' },
    { y: '2023', t: 'Gamma oscillation during sentence processing in early adolescence.', a: '<b>Behboudi</b>, Castro, Chalamalasetty, Maguire', v: 'Brain Sciences', l: 'https://doi.org/10.3390/brainsci13121639' },
    { y: '2022', t: 'Sleep apnea diagnosis using complexity features.', a: 'Gholami, <b>Behboudi</b> et al.', v: 'Springer LNCS', l: 'https://doi.org/10.1007/978-3-031-06242-1_8' },
    { y: '2021', t: 'Diagnosis of sleep apnea using different entropy measures.', a: 'Gholami, <b>Behboudi</b> et al.', v: 'IEEE ICSPIS', l: 'https://doi.org/10.1109/ICSPIS54653.2021.9729367' },
  ],
  'Under Review': [
    { y: '2025', t: 'Novel word inferencing in noisy environments for non-native speakers.', a: 'Benítez-Barrera, <b>Behboudi</b> et al.', v: 'Language and Speech', l: '#' },
  ],
};

const EXPERTISE = [
  { h: 'Foundation Models & Deep Learning', d: 'Self-supervised pretraining (masked modeling, contrastive learning), <strong>VQ-VAE tokenization</strong>, Transformer encoders, Graph Neural Networks, 1D-CNNs, LSTMs. Variable-channel attention masks, mixed-precision training, distributed HPC workflows.' },
  { h: 'Signal Processing & Data Engineering', d: 'Multi-channel preprocessing, <strong>artifact detection</strong> (ICA, spectral, threshold), cross-device normalization, montage mapping, time-frequency decomposition (FFT, STFT, wavelets), connectivity (coherence, PLV, wPLI), cross-frequency coupling.' },
  { h: 'Classical ML & Statistics', d: 'SVM, KNN, ensemble methods (RUSBoost), feature engineering & selection (<strong>mRMR</strong>, mutual information), mixed-effects models, ANOVA / MANOVA, permutation & bootstrap inference, power analysis, IRB-compliant protocol design.' },
  { h: 'Languages & Infrastructure', d: '<strong>Python</strong> (PyTorch, MNE, scikit-learn, SciPy, pandas, h5py), <strong>MATLAB</strong> (EEGLAB, FieldTrip), <strong>R</strong> (lme4, tidyverse), Git, Bash, SLURM HPC, FreeSurfer, SPM.' },
];

const EDUCATION = [
  { yr: '2021 — 2026', d: 'Ph.D., Cognition & Neuroscience', s: 'University of Texas at Dallas · Callier Center', w: 'Richardson, TX' },
  { yr: '2021 — 2024', d: 'M.Sc., Applied Cognition & Neuroscience', s: 'University of Texas at Dallas', w: 'Richardson, TX' },
  { yr: '2015 — 2020', d: 'B.Sc., Electrical Engineering', s: 'K. N. Toosi University of Technology', w: 'Tehran, Iran' },
];

window.DATA = { SECTIONS, RESEARCH, PUBS, EXPERTISE, EDUCATION };
