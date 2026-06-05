import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------
// Premium Mock Data
// ----------------------------------------------------------------------
const mockCandidates = [
  {
    id: "c_101",
    name: "Sarah Chen",
    role: "Lead ML Architect",
    match: 98,
    status: "Top 1%",
    traits: ["Distributed Systems", "PyTorch", "Kubernetes"],
  },
  {
    id: "c_102",
    name: "Marcus Aurelius",
    role: "Product Director",
    match: 92,
    status: "Strong Fit",
    traits: ["Product Strategy", "Growth", "SQL"],
  },
  {
    id: "c_103",
    name: "Priya Nair",
    role: "Infra Lead",
    match: 89,
    status: "Viable",
    traits: ["Go", "Terraform", "Cassandra"],
  }
];

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
export default function HomePage() {
  // --- 3D Hero Interaction State ---
  const heroRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Dampen the rotation for an elegant, heavy feel
    const rotateY = (mouseX / (rect.width / 2)) * 8; 
    const rotateX = -(mouseY / (rect.height / 2)) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleHeroMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  // --- Sandbox Engine State ---
  const [activeEngineStep, setActiveEngineStep] = useState(0);
  const [weights, setWeights] = useState({ technical: 85, experience: 90, academic: 40 });

  const calculateDynamicScore = () => {
    const raw = (0.98 * weights.technical) + (0.95 * weights.experience) + (0.60 * weights.academic);
    const max = weights.technical + weights.experience + weights.academic;
    return max > 0 ? ((raw / max) * 100).toFixed(0) : 0;
  };

  // --- Global Scroll Reveal (Simulated Framer-Motion) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] font-sans selection:bg-[#09090B] selection:text-white overflow-hidden">
      
      {/* ----------------------------------------------------------------------
          INJECTED CUSTOM STYLES FOR PREMIUM SPATIAL FEEL
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1);
        }
        .spatial-parent { perspective: 2000px; }
        .spatial-child { transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .spatial-hovered { transition: transform 0.1s linear; }
        
        .layer-1 { transform: translateZ(20px); }
        .layer-2 { transform: translateZ(60px); }
        .layer-3 { transform: translateZ(100px); }
        
        .text-gradient {
          background: linear-gradient(180deg, #09090B 0%, #52525B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .reveal-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

        .slider-luxury {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          background: #E4E4E7;
          border-radius: 2px;
          outline: none;
        }
        .slider-luxury::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #09090B;
          cursor: pointer;
          border: 2px solid #FAFAFA;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: transform 0.1s;
        }
        .slider-luxury::-webkit-slider-thumb:hover { transform: scale(1.2); }
      `}} />

      {/* ----------------------------------------------------------------------
          1. SPATIAL HERO SECTION
      ---------------------------------------------------------------------- */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 overflow-visible">
        {/* Abstract Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-zinc-200/40 via-zinc-100/20 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Editorial Narrative */}
          <div className="reveal-on-scroll space-y-10 z-10">
           
            
            <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[0.95] tracking-[-0.03em] font-semibold text-zinc-900">
              AI understands <br/>
              <span className="text-zinc-400">talent better.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-500 font-light leading-relaxed max-w-md">
              Abandon manual screening. ResuRank maps raw resumes into local semantic vector spaces, surfacing your exact technical fit in milliseconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <Link to="/signup" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-8 font-medium text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative text-sm tracking-wide">Initialize Workspace</span>
              </Link>
              <a href="#engine" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors inline-flex items-center gap-2">
                Inspect architecture <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* Right: Spatial 3D Interface */}
          <div 
            ref={heroRef}
            onMouseMove={(e) => { setIsHovering(true); handleHeroMouseMove(e); }}
            onMouseLeave={handleHeroMouseLeave}
            className="spatial-parent w-full h-[600px] flex items-center justify-center relative z-10"
          >
            <div 
              className={`spatial-child relative w-full max-w-[500px] aspect-[4/5] ${isHovering ? 'spatial-hovered' : ''}`}
              style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            >
              {/* Base Glass Panel */}
              <div className="absolute inset-0 glass-panel rounded-[2rem] overflow-hidden">
                {/* Subtle top glare */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              </div>

              {/* Top Meta Bar */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center border-b border-zinc-200/50 layer-1">
                <span className="text-[10px] font-mono text-zinc-400">VECTOR_STORE: LOCAL</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute inset-0 p-8 pt-24 flex flex-col gap-6 pointer-events-none">
                
                {/* Simulated Target Profile (Background Layer) */}
                <div className="layer-1 bg-white/40 rounded-2xl p-5 border border-white/50 backdrop-blur-sm">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-2 block">Target Profile</span>
                  <div className="h-2 w-1/3 bg-zinc-200 rounded-full mb-3" />
                  <div className="h-2 w-2/3 bg-zinc-100 rounded-full" />
                </div>

                {/* Primary Extracted Candidate (Mid Layer) */}
                <div className="layer-2 bg-white rounded-2xl p-6 shadow-2xl shadow-zinc-900/5 border border-zinc-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 leading-tight">Sarah Chen</h3>
                      <p className="text-xs text-zinc-500 font-medium">Lead ML Architect</p>
                    </div>
                    {/* The Match Badge (Top Layer) */}
                    <div className="layer-3 bg-zinc-950 text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg shadow-xl shadow-zinc-900/20">
                      98% MATCH
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Vector Distance</span>
                      <span className="font-mono text-emerald-500 font-medium">0.024 (Close)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Key Overlap</span>
                      <span className="font-mono text-zinc-900">Distributed, PyTorch</span>
                    </div>
                  </div>
                </div>

                {/* Processing Indicator (Mid Layer) */}
                <div className="layer-2 absolute bottom-8 left-8 right-8 bg-zinc-900/5 backdrop-blur-xl rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">Analyzing 1,492 nodes...</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-3 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-3 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          2. TRANSFORMATION STORYTELLING (CURSOR-STYLE)
      ---------------------------------------------------------------------- */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          
          <div className="reveal-on-scroll max-w-2xl mb-24">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
              From folder chaos to structural clarity.
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              Standard ATS platforms rely on brittle keyword filters. We convert raw unstructured PDFs into intelligent data models mapped against your exact engineering requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 border border-zinc-200/60 rounded-[2rem] overflow-hidden bg-zinc-50/50">
            
            {/* The "Before" */}
            <div className="reveal-on-scroll p-12 lg:p-16 lg:border-r border-zinc-200/60 relative">
              <span className="absolute top-8 left-8 text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Legacy System</span>
              
              <div className="mt-12 relative h-[300px] w-full perspective-1000">
                {/* Messy visual of generic resumes */}
                <div className="absolute top-10 left-4 w-64 h-40 bg-white border border-zinc-200 shadow-sm rounded-xl p-4 rotate-[-6deg] opacity-70">
                  <div className="h-3 w-1/2 bg-zinc-100 mb-4" />
                  <div className="space-y-2"><div className="h-2 w-full bg-zinc-50" /><div className="h-2 w-4/5 bg-zinc-50" /></div>
                </div>
                <div className="absolute top-20 left-12 w-64 h-40 bg-white border border-zinc-200 shadow-md rounded-xl p-4 rotate-[4deg] opacity-90 z-10">
                  <div className="h-3 w-1/3 bg-zinc-100 mb-4" />
                  <div className="space-y-2"><div className="h-2 w-full bg-zinc-50" /><div className="h-2 w-5/6 bg-zinc-50" /></div>
                  <div className="mt-4 text-[10px] text-rose-500 font-mono">ERROR: Keyword 'ReactJS' not found.</div>
                </div>
                <div className="absolute top-4 left-24 w-64 h-40 bg-white border border-zinc-200 shadow-lg rounded-xl p-4 rotate-[1deg] z-20">
                  <div className="h-3 w-2/3 bg-zinc-200 mb-4" />
                  <div className="space-y-2"><div className="h-2 w-full bg-zinc-100" /><div className="h-2 w-3/4 bg-zinc-100" /></div>
                  <div className="mt-4 text-[10px] text-rose-500 font-mono">Rejected: Format unrecognized.</div>
                </div>
              </div>
            </div>

            {/* The "After" */}
            <div className="reveal-on-scroll p-12 lg:p-16 bg-white relative">
              <span className="absolute top-8 left-8 text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase">ResuRank System</span>
              
              <div className="mt-12 space-y-4">
                {/* Structured Data Nodes */}
                {[
                  { trait: "Distributed Systems", score: 0.98, node: "v_node_77a" },
                  { trait: "Machine Learning", score: 0.94, node: "v_node_42b" },
                  { trait: "System Architecture", score: 0.89, node: "v_node_11x" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900">{item.trait}</div>
                        <div className="text-[10px] font-mono text-zinc-400">ID: {item.node}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-zinc-900">{item.score}</div>
                      <div className="text-[10px] text-zinc-400">Semantic Weight</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          3. INTERACTIVE PRODUCT JOURNEY
      ---------------------------------------------------------------------- */}
      <section id="engine" className="py-32 bg-[#09090B] text-zinc-400 relative overflow-hidden">
        {/* Subtle grid line overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
          
          <div className="reveal-on-scroll mb-20">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Inspect the processing pipeline.
            </h2>
            <p className="text-lg max-w-xl">
              Interact with the simulation below to understand how candidate profiles are dynamically evaluated without relying on cloud APIs.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left: Step Controls */}
            <div className="lg:col-span-4 space-y-2">
              {[
                { title: "Document Intake", desc: "Batch ingest unstructured PDFs." },
                { title: "Vector Extraction", desc: "Parse semantic traits via local LLM." },
                { title: "Priority Weights", desc: "Adjust evaluation criteria." },
                { title: "Decision Matrix", desc: "View the final ranked layout." }
              ].map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveEngineStep(idx)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeEngineStep === idx 
                      ? "bg-zinc-800/50 border border-zinc-700/50 shadow-2xl" 
                      : "hover:bg-zinc-900 border border-transparent"
                  }`}
                >
                  <div className="text-[10px] font-mono mb-2 uppercase tracking-widest" style={{ color: activeEngineStep === idx ? "#10B981" : "#71717A" }}>
                    Stage 0{idx + 1}
                  </div>
                  <div className={`text-lg font-medium mb-1 ${activeEngineStep === idx ? "text-white" : "text-zinc-500"}`}>
                    {step.title}
                  </div>
                  <div className="text-sm">{step.desc}</div>
                </button>
              ))}
            </div>

            {/* Right: Interactive Sandbox Display */}
            <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 sm:p-12 min-h-[500px] flex flex-col relative shadow-2xl shadow-black/50">
              
              <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
                <span className="text-[11px] font-mono text-zinc-500">TERMINAL // SANDBOX_ENV</span>
                <span className="text-[11px] font-mono px-2 py-1 bg-zinc-800 rounded text-zinc-300">ACTIVE</span>
              </div>

              <div className="flex-grow flex flex-col justify-center">
                
                {/* Step 1: Intake */}
                {activeEngineStep === 0 && (
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto rounded-2xl border border-dashed border-zinc-700 bg-zinc-800/20 flex items-center justify-center mb-8">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#52525B" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    </div>
                    <div className="font-mono text-sm text-zinc-300">Drop engineering_candidates.zip here</div>
                    <div className="text-xs text-zinc-600">Local processing guarantees privacy. Files never leave your machine.</div>
                  </div>
                )}

                {/* Step 2: Extraction */}
                {activeEngineStep === 1 && (
                  <div className="space-y-4 font-mono text-sm">
                    <div className="text-zinc-500 mb-6">// Parsing: candidate_schen.pdf</div>
                    <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800/80 space-y-2 text-zinc-300">
                      <div className="flex gap-4"><span className="text-zinc-500">1</span><span><span className="text-emerald-400">const</span> candidate = {'{'}</span></div>
                      <div className="flex gap-4"><span className="text-zinc-500">2</span><span className="pl-4">name: <span className="text-rose-300">"Sarah Chen"</span>,</span></div>
                      <div className="flex gap-4"><span className="text-zinc-500">3</span><span className="pl-4">skills: [<span className="text-rose-300">"PyTorch"</span>, <span className="text-rose-300">"Distributed Systems"</span>],</span></div>
                      <div className="flex gap-4"><span className="text-zinc-500">4</span><span className="pl-4">vector_embedding: <span className="text-amber-300">[0.042, -0.912, 0.551, ...]</span></span></div>
                      <div className="flex gap-4"><span className="text-zinc-500">5</span><span>{'}'}</span></div>
                    </div>
                  </div>
                )}

                {/* Step 3: Priorities (Interactive) */}
                {activeEngineStep === 2 && (
                  <div className="space-y-8 max-w-md mx-auto w-full">
                    <div className="text-center mb-8">
                      <div className="text-sm text-zinc-300 font-medium mb-2">Adjust Vector Weights</div>
                      <div className="text-xs text-zinc-600">Recalculating database dimensions in real-time.</div>
                    </div>
                    
                    <div className="space-y-6">
                      {[
                        { label: "Technical Depth", key: "technical" },
                        { label: "Experience Fit", key: "experience" },
                        { label: "Academic Baseline", key: "academic" }
                      ].map((slider) => (
                        <div key={slider.key} className="space-y-3">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-zinc-400">{slider.label}</span>
                            <span className="text-white">{weights[slider.key]}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={weights[slider.key]}
                            onChange={(e) => setWeights(prev => ({ ...prev, [slider.key]: Number(e.target.value) }))}
                            className="slider-luxury"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Decision Matrix */}
                {activeEngineStep === 3 && (
                  <div className="space-y-4">
                    <div className="text-xs font-mono text-zinc-500 mb-4 pb-2 border-b border-zinc-800">RANKED RESULTS // BASELINE_ENGINEER_ROLE</div>
                    
                    <div className="bg-zinc-800/30 border border-emerald-500/20 rounded-xl p-5 flex justify-between items-center transition-all hover:bg-zinc-800/50 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                      <div>
                        <div className="text-white font-medium mb-1">Sarah Chen</div>
                        <div className="text-xs text-zinc-400">Lead ML Architect</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-mono text-sm">{calculateDynamicScore()}% Match</div>
                        <div className="text-[10px] text-zinc-500 mt-1">Based on custom weights</div>
                      </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex justify-between items-center opacity-60">
                      <div>
                        <div className="text-white font-medium mb-1">Marcus Aurelius</div>
                        <div className="text-xs text-zinc-500">Product Director</div>
                      </div>
                      <div className="text-right">
                        <div className="text-zinc-300 font-mono text-sm">74% Match</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          4. EDITORIAL FEATURE GRID
      ---------------------------------------------------------------------- */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          
          <div className="reveal-on-scroll mb-20 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
              Enterprise architecture, built for speed.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="reveal-on-scroll bg-zinc-50 rounded-3xl p-10 border border-zinc-100 hover:shadow-xl transition-shadow duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center mb-8">
                <div className="w-4 h-4 rounded-full bg-zinc-900" />
              </div>
              <h3 className="text-lg font-medium text-zinc-900 mb-3">Local Vector Space</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Powered by ChromaDB. Resumes are vectorized directly on your hardware. Zero data sent to external cloud APIs, ensuring strict GDPR compliance.
              </p>
            </div>

            {/* Card 2 */}
            <div className="reveal-on-scroll bg-zinc-50 rounded-3xl p-10 border border-zinc-100 hover:shadow-xl transition-shadow duration-500" style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center mb-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#09090B" strokeWidth="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              </div>
              <h3 className="text-lg font-medium text-zinc-900 mb-3">Dynamic Trait Scoring</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Roles aren't static. Shift your priority sliders between "Leadership" and "Technical Depth" and watch the entire database re-rank instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="reveal-on-scroll bg-zinc-950 rounded-3xl p-10 border border-zinc-800 shadow-2xl hover:shadow-3xl transition-shadow duration-500" style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 bg-zinc-800 rounded-2xl border border-zinc-700 flex items-center justify-center mb-8 text-white font-mono text-xs">
                {'{ }'}
              </div>
              <h3 className="text-lg font-medium text-white mb-3">Conversational Query</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Chat with your candidate database using Llama 3.2. "Who here has built payment gateways in React Native?" Get immediate, sourced answers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          5. MINIMAL CTA
      ---------------------------------------------------------------------- */}
      <section className="py-40 bg-[#FAFAFA] relative border-t border-zinc-200/50 text-center">
        <div className="max-w-2xl mx-auto px-6 relative z-10 reveal-on-scroll">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 mb-6">
            Ready to upgrade your screening?
          </h2>
          <p className="text-lg text-zinc-500 mb-10">
            Deploy the engine locally and parse your first 100 candidates in seconds.
          </p>
          <Link to="/signup" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-10 font-medium text-white shadow-xl transition-transform hover:scale-[1.02]">
             <span className="relative text-sm tracking-wide">Start Building</span>
          </Link>
        </div>
      </section>

    </div>
  );
}