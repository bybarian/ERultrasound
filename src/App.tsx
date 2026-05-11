import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  ChevronRight, 
  PlayCircle, 
  Info, 
  BookOpen, 
  Target, 
  Activity,
  Layers,
  MousePointer2,
  Menu,
  ExternalLink,
  X
} from 'lucide-react';

// Types
type Section = 'basics' | 'guidance' | 'nerveblock';

// Component for the Header Logo
const CathayLogo = () => {
  const [logoExists, setLogoExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/logo.png';
    img.onload = () => setLogoExists(true);
    img.onerror = () => setLogoExists(false);
  }, []);

  if (logoExists) {
    return (
      <div className="p-1 bg-white rounded-lg shadow-sm">
        <img src="/logo.png" alt="CGH Logo" className="h-10 md:h-12 w-auto object-contain" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-14 bg-white border-2 border-[#ED1C24] overflow-hidden shadow-sm" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)' }}>
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
          <div className="bg-white flex items-center justify-center text-black font-sans text-lg font-bold">C</div>
          <div className="bg-[#1E8D3E] flex items-center justify-center text-black font-sans text-lg font-bold">G</div>
          <div className="bg-[#FFEB3B] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1E8D3E] fill-current">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <div className="bg-white flex items-center justify-center text-black font-sans text-lg font-bold">H</div>
        </div>
      </div>
      <span className="text-xs font-black tracking-tighter text-black mt-0.5 leading-none">EMERGENCY</span>
    </div>
  );
};

// Helper Wrapper for Editable Illustrations
const IllustrationWrapper = ({ path, type, label }: { path?: string; type: 'in' | 'off' | 'cvc' | 'supra' | 'peng'; label: string }) => {
  const [combinedExists, setCombinedExists] = useState(false);
  const [inExists, setInExists] = useState(false);
  const [offExists, setOffExists] = useState(false);
  const [pathExists, setPathExists] = useState(false);

  useEffect(() => {
    const checkImage = (p: string, setter: (val: boolean) => void) => {
      if (!p) return;
      const img = new Image();
      img.src = p;
      img.onload = () => setter(true);
      img.onerror = () => setter(false);
    };

    if (type === 'in' || type === 'off') {
      checkImage('/in-off-plane.png', setCombinedExists);
      checkImage('/in-plane.png', setInExists);
      checkImage('/off-plane.png', setOffExists);
    } else if (path) {
      checkImage(path, setPathExists);
    }
  }, [path, type]);

  if (combinedExists && (type === 'in' || type === 'off')) {
    return (
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <img src="/in-off-plane.png" alt="In-plane and Off-plane" className="w-full h-auto object-contain p-4" />
      </div>
    );
  }

  if (pathExists && path) {
    return <img src={path} alt={label} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" />;
  }

  // Type-specific fallbacks
  switch (type) {
    case 'cvc':
    case 'supra':
    case 'peng':
      return (
        <div className="flex flex-col items-center justify-center text-slate-300 p-8 text-center bg-[#F8FAFC]">
          <Layers size={48} className="opacity-10 mb-4" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Upload {path?.slice(1)}</p>
          <p className="text-[10px] opacity-40 mt-1">to replace this placeholder</p>
        </div>
      );
    case 'in':
      return inExists ? <img src="/in-plane.png" alt="In-plane" className="w-full aspect-square object-contain p-4" /> : <BasicIllustration type="in" />;
    case 'off':
      return offExists ? <img src="/off-plane.png" alt="Off-plane" className="w-full aspect-square object-contain p-4" /> : <BasicIllustration type="off" />;
    default:
      return null;
  }
};

const HeelToeWrapper = () => {
    const [exists, setExists] = useState(false);
    useEffect(() => {
      const img = new Image();
      img.src = '/heel-toe.png';
      img.onload = () => setExists(true);
      img.onerror = () => setExists(false);
    }, []);
  
    if (exists) {
      return (
        <div className="w-full h-full p-6 flex items-center justify-center">
          <img src="/heel-toe.png" alt="Heel toe maneuver" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-300">
        <Layers size={64} className="opacity-10" />
        <p className="text-sm font-bold uppercase tracking-[0.2em] mt-4">Upload heel-toe.png to public/</p>
        <div className="mt-2 text-xs text-slate-400 opacity-60">Fallback: Placeholder Active</div>
      </div>
    );
};

// SVG Illustration Component
const BasicIllustration = ({ type }: { type: 'in' | 'off' }) => (
  <div className="w-full aspect-square bg-[#F8FAFC] rounded-2xl flex items-center justify-center p-4">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Probe */}
      <rect x="75" y="20" width="50" height="60" rx="4" fill="#334155" />
      <path d="M75 80 Q100 95 125 80" fill="#334155" />
      {/* Beam */}
      <path d="M75 85 L30 180 L170 180 L125 85 Z" fill="#E2E8F0" opacity="0.5" />
      {/* Needle */}
      {type === 'in' ? (
        <line x1="10" y1="130" x2="110" y2="135" stroke="#ED1C24" strokeWidth="4" strokeLinecap="round" />
      ) : (
        <circle cx="100" cy="135" r="5" fill="#ED1C24" />
      )}
      <text x="100" y="195" textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-widest">
        {type === 'in' ? 'In-plane / Longitudinal' : 'Off-plane / Transverse'}
      </text>
    </svg>
  </div>
);

interface TopicProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  benefits?: string[];
  videoUrl?: string; // Placeholder for future use
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('basics');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1E8D3E] text-white border-b-4 border-[#FFEB3B] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 md:py-3">
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-white rounded-lg shadow-inner">
                <CathayLogo />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none uppercase">
                  Cathay <span className="text-white">General</span> Hospital
                </h1>
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/80 mt-1">
                  Emergency Medicine <span className="mx-1 opacity-40">|</span> Ultrasound Platform
                </p>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <NavButton 
                active={activeSection === 'basics'} 
                onClick={() => setActiveSection('basics')}
                label="Basics"
                icon={<Layers size={18} />}
              />
              <NavButton 
                active={activeSection === 'guidance'} 
                onClick={() => setActiveSection('guidance')}
                label="Guidance"
                icon={<Target size={18} />}
              />
              <NavButton 
                active={activeSection === 'nerveblock'} 
                onClick={() => setActiveSection('nerveblock')}
                label="Nerve Blocks"
                icon={<Activity size={18} />}
              />
            </nav>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#1E8D3E] border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                <MobileNavButton 
                  active={activeSection === 'basics'} 
                  onClick={() => { setActiveSection('basics'); setIsMenuOpen(false); }}
                  label="Basics"
                  icon={<Layers size={18} />}
                />
                <MobileNavButton 
                  active={activeSection === 'guidance'} 
                  onClick={() => { setActiveSection('guidance'); setIsMenuOpen(false); }}
                  label="Guidance"
                  icon={<Target size={18} />}
                />
                <MobileNavButton 
                  active={activeSection === 'nerveblock'} 
                  onClick={() => { setActiveSection('nerveblock'); setIsMenuOpen(false); }}
                  label="Nerve Blocks"
                  icon={<Activity size={18} />}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {activeSection === 'basics' && (
            <motion.section 
              key="basics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
                <SectionHeader 
                  title="Screening Technique" 
                  subtitle="Linear probe (5~7.5 MHz) foundational viewing planes"
                />
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-widest">Linear</div>
                  <div className="px-3 py-1 bg-[#1E8D3E] text-white rounded text-xs font-bold uppercase tracking-widest">5~7.5 MHz</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <IllustrationWrapper type="in" label="In-plane vs. Off-plane" />
                  <div className="p-8 space-y-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">In-plane vs. Off-plane</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <h4 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
                          <Target size={16} /> In-plane / Longitudinal
                        </h4>
                        <p className="text-base text-blue-800">The entire needle length is visualized within the ultrasound slice.</p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                          <MousePointer2 size={16} /> Off-plane / Transverse
                        </h4>
                        <p className="text-base text-slate-600">The needle crosses the beam perpendicularly; seen as a single dot.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-white flex items-center justify-center relative overflow-hidden group border-b border-slate-100">
                    <HeelToeWrapper />
                  </div>
                  <div className="p-8 space-y-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">Heel toe maneuver</h3>
                    <div className="space-y-4">
                      <p className="text-slate-600 text-base leading-relaxed">
                        A dynamic maneuver where the probe is tilted (rocked) along its long axis. This improves needle visualization by optimizing the incident angle of the ultrasound beam.
                      </p>
                      <div className="flex gap-4">
                        <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                          <span className="text-xs font-black uppercase text-slate-400">Rocking</span>
                        </div>
                        <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                          <span className="text-xs font-black uppercase text-slate-400">Tilting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'guidance' && (
            <motion.section 
              key="guidance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <SectionHeader 
                title="Ultrasound Guidance Procedures" 
                subtitle="Precision-guided vascular access and invasive procedures"
              />

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 md:p-12 space-y-8">
                    <div>
                      <h3 className="text-4xl font-bold mb-4">CVC Insertion (Internal Jugular)</h3>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        Central venous catheterization via the Internal Jugular Vein (IJV) is a standard procedure in the ED for resuscitation and monitoring.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h4 className="font-bold flex items-center gap-2 text-blue-600 text-lg">
                        <BookOpen size={24} /> Anatomy & Principles
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <span className="block text-sm font-bold text-slate-400 uppercase mb-1">IJV</span>
                          <p className="text-base font-medium">Compressible, oval-shaped, lateral to CA</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <span className="block text-sm font-bold text-slate-400 uppercase mb-1">Carotid Artery</span>
                          <p className="text-base font-medium">Pulsatile, thick-walled, non-compressible</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 text-[#1E8D3E]">
                        <ChevronRight size={20} /> Clinical Evidence
                      </h4>
                      <div className="space-y-6">
                        <EvidenceChart 
                          title="CVC Success & Safety Profile"
                          data={[
                            { label: "US-Guided First-Pass Success", value: 94, color: "bg-[#1E8D3E]" },
                            { label: "Landmark First-Pass Success", value: 68, color: "bg-slate-400" },
                            { label: "Artery Puncture (Lower is better)", value: 2, color: "bg-red-500" }
                          ]}
                        />
                        <div className="space-y-3">
                          <BenefitItem 
                            text="Significant increase in IJV cannulation success and reduction in complications (PMID: 17112371)" 
                            pmid="17112371"
                          />
                          <BenefitItem 
                            text="Ultrasound guidance reduces complications and improves overall success rates (Cochrane Review, PMID: 25575244)" 
                            pmid="25575244"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                    <div className="bg-slate-100 flex flex-col items-center justify-center p-6 gap-6 min-h-[400px]">
                      <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                        <IllustrationWrapper path="/cvc-anatomy.png" type="cvc" label="CVC Anatomy" />
                      </div>
                      <VideoPlayer 
                        label="CVC Procedural Video" 
                        videoId="Ao8kvSBTTTM"
                      />
                    </div>
                  </div>
                </div>
            </motion.section>
          )}

          {activeSection === 'nerveblock' && (
            <motion.section 
              key="nerveblock"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <SectionHeader 
                title="Regional Nerve Blocks" 
                subtitle="Targeted anesthesia for superior pain management in the ED"
              />

              {/* Supraclavicular Block */}
              <div className="space-y-8">
                <div className="border-l-8 border-blue-600 pl-6 space-y-2">
                  <h3 className="text-5xl font-black tracking-tight text-slate-900">
                    Supraclavicular Brachial Plexus Block
                  </h3>
                  <p className="text-xl font-medium text-slate-400 italic">The "Spinal of the Upper Extremity"</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-12">
                    {/* 1. Anatomy */}
                    <div className="space-y-4">
                      <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-base font-black uppercase tracking-widest">
                        <Layers size={20} /> 01. Anatomy
                      </h4>
                      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <p className="text-base text-slate-600 leading-relaxed">
                          The <span className="font-bold text-slate-900">brachial plexus</span> is most compactly arranged at this level. Visualized as a "bunch of grapes" (hypoechoic nodules) located lateral and superior to the <span className="font-bold text-red-600">subclavian artery</span>, resting on the <span className="font-bold text-slate-700">first rib</span>.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <AnatomyLabel label="Subclavian Artery" color="bg-red-100 text-red-700" />
                          <AnatomyLabel label="First Rib" color="bg-slate-100 text-slate-700" />
                          <AnatomyLabel label="Brachial Plexus" color="bg-yellow-100 text-yellow-700" />
                        </div>
                      </div>
                    </div>

                    {/* 2. Indication */}
                    <div className="space-y-4">
                      <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-base font-black uppercase tracking-widest">
                        <Target size={20} /> 02. Indication
                      </h4>
                      <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        Rapid and dense anesthesia for the entire upper limb distal to the shoulder. Preferred for elbow, forearm, and hand surgeries.
                      </p>
                    </div>

                    {/* 3. Procedure */}
                    <div className="space-y-4">
                      <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-base font-black uppercase tracking-widest">
                        <ChevronRight size={20} /> 03. Procedure
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SimpleCard 
                          icon={<ChevronRight size={20} />} 
                          title="Needle Approach" 
                          text="In-plane, lateral-to-medial. Orient needle parallel to the probe's long axis toward the 'corner pocket'." 
                        />
                        <SimpleCard 
                          icon={<Activity size={20} />} 
                          title="Local Anesthetic" 
                          text="Volume: 20–25 mL (e.g., 0.5% Ropivacaine or 1.5% Mepivacaine)." 
                        />
                      </div>
                    </div>

                    {/* 4. Clinical Evidence */}
                    <div className="space-y-6">
                      <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-base font-black uppercase tracking-widest">
                        <Activity size={20} /> 04. Clinical Evidence
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <EvidenceChart 
                          title="Block Success Comparison"
                          data={[
                            { label: "US-Guided Supraclavicular", value: 95, color: "bg-blue-600" },
                            { label: "Landmark Techniques", value: 78, color: "bg-slate-400" }
                          ]}
                        />
                        <div className="bg-[#1E8D3E]/5 p-6 rounded-2xl border border-[#1E8D3E]/10 space-y-4">
                           <ul className="space-y-3">
                              <BenefitItem 
                                text="Ultrasound improves block quality and reduces onset time vs nerve stimulation (PMID: 14570678)" 
                                pmid="14570678"
                              />
                              <BenefitItem 
                                text="Analysis of 510 cases supports the high success rate and clinical safety (PMID: 19282715)" 
                                pmid="19282715"
                              />
                           </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="aspect-square bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center p-4">
                        <IllustrationWrapper path="/supra-anatomy.png" type="supra" label="Supraclavicular Anatomy" />
                    </div>
                    <VideoPlayer 
                      label="Supraclavicular Block Video" 
                      videoId="m3GU11ZRzGc"
                    />
                  </div>
                </div>
              </div>

              {/* PENG Block */}
              <div className="space-y-8 pt-16 border-t border-slate-200">
                <div className="border-r-8 border-green-600 pr-6 text-right space-y-2">
                  <h3 className="text-5xl font-black tracking-tight text-slate-900">
                    The Hip (PENG) Block
                  </h3>
                  <p className="text-xl font-medium text-slate-400 italic">Pericapsular Nerve Group Approach</p>
                </div>
                
                <div className="flex justify-end">
                   <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-black uppercase tracking-widest">Fast-Track Recovery</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-12 order-last lg:order-none space-y-12">
                    {/* Multi-column grid for PENG to mix visuals and text */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-12">
                         {/* 1. Anatomy */}
                        <div className="space-y-4">
                          <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-base font-black uppercase tracking-widest">
                            <Layers size={20} /> 01. Anatomy
                          </h4>
                          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <p className="text-base text-slate-600 leading-relaxed">
                              Targets the articular branches of the nerves innervating the anterior hip capsule. The plane between the <span className="font-bold text-slate-900">iliopsoas muscle</span> and the <span className="font-bold text-slate-900">anterior hip capsule</span> at the level of the acetabulum.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-500 font-medium">
                              <li><span className="text-green-700 font-bold">Femoral Nerve:</span> Articular branches in the iliopsoas plane.</li>
                              <li><span className="text-green-700 font-bold">Obturator Nerve:</span> Anterior/medial capsule innervation.</li>
                            </ul>
                          </div>
                        </div>

                        {/* 2. Indication */}
                        <div className="space-y-4">
                          <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-base font-black uppercase tracking-widest">
                            <Target size={20} /> 02. Indication
                          </h4>
                          <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            Analgesia for hip surgery, hip fractures, and chronic hip pain. Optimized for sensory blockade with potential quadriceps sparing.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-12">
                         {/* Visual */}
                        <div className="aspect-video bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center p-4">
                            <IllustrationWrapper path="/peng-anatomy.png" type="peng" label="PENG Anatomy" />
                        </div>
                        <VideoPlayer 
                          label="PENG Procedural Video" 
                          videoId="n_esn8lMxKw"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        {/* 3. Procedure */}
                        <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-base font-black uppercase tracking-widest">
                          <ChevronRight size={20} /> 03. Procedure
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <SimpleCard 
                            icon={<Menu size={20} className="text-green-600" />} 
                            title="Transducer" 
                            text="Curvilinear or High-frequency Linear. Placed transversely over AIIS." 
                          />
                          <SimpleCard 
                            icon={<Target size={20} className="text-green-600" />} 
                            title="Target" 
                            text="Iliopsoas plane, between iliopsoas muscle and anterior hip capsule." 
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* 4. Clinical Evidence */}
                        <h4 className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-base font-black uppercase tracking-widest">
                          <Activity size={20} /> 04. Clinical Evidence
                        </h4>
                        <EvidenceChart 
                          title="Pain Control Efficiency Comparison"
                          data={[
                            { label: "Multimodal (PENG + Standard Care)", value: 88, color: "bg-green-600" },
                            { label: "Standard Care (Systemic Only)", value: 42, color: "bg-slate-400" }
                          ]}
                        />
                        <div className="bg-green-600/5 p-6 rounded-2xl border border-green-600/10 space-y-4 text-right">
                           <ul className="space-y-3">
                              <BenefitItem 
                                text="Initial description of the PENG block for superior hip fracture pain relief (PMID: 30063657)" 
                                pmid="30063657"
                              />
                              <BenefitItem 
                                text="Higher efficacy in reducing acute pain compared to standard care in hip fractures (PMID: 33637625)" 
                                pmid="33637625"
                              />
                              <BenefitItem 
                                text="Motor-sparing effect facilitates faster mobilization and functional recovery (PMID: 34196965)" 
                                pmid="34196965"
                              />
                           </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs md:text-base font-black uppercase tracking-[0.2em] text-white/60">
            2026 Cathay General Hospital Digital Technology and Internet Resource Center
          </p>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function NavButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`
        relative px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 font-bold text-base
        ${active ? 'text-[#FFEB3B]' : 'text-white/70 hover:text-white'}
      `}
    >
      {icon}
      {label}
      {active && (
        <motion.div 
          layoutId="nav-bg"
          className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/20"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

function MobileNavButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all font-bold
        ${active ? 'bg-white/20 text-[#FFEB3B]' : 'text-white active:bg-white/10'}
      `}
    >
      {icon}
      {label}
    </button>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="max-w-2xl text-slate-900">
      <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4">{title}</h2>
      <p className="text-xl md:text-2xl text-slate-500 font-medium">{subtitle}</p>
    </div>
  );
}

function ContentCard({ title, description, image, imageAlt, children }: { title: string; description: string; image: string; imageAlt: string; children: React.ReactNode }) {
  const [useFallback, setUseFallback] = useState(false);
  const [actualSrc, setActualSrc] = useState(image);

  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => setActualSrc(image);
    img.onerror = () => {
      if (image.startsWith('/')) {
         setUseFallback(true);
      }
    };
  }, [image]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500">
      <div className="aspect-video overflow-hidden bg-slate-200 flex items-center justify-center p-4">
        {useFallback ? (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
            <Layers size={48} className="opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">Image: {imageAlt}</p>
            <p className="text-[10px] opacity-50 px-8 text-center text-wrap">(To replace, upload <code className="bg-slate-300 px-1 rounded">{image.slice(1)}</code> to public/)</p>
          </div>
        ) : (
          <img 
            src={actualSrc} 
            alt={imageAlt} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
            onError={() => setUseFallback(true)}
          />
        )}
      </div>
      <div className="p-8 space-y-6">
        <div>
          <h3 className="text-3xl font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-500 leading-relaxed text-base">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function BenefitItem({ text, pmid }: { text: string; pmid?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-6 w-6 rounded-full bg-[#1E8D3E]/10 flex items-center justify-center text-[#1E8D3E] flex-shrink-0 mt-0.5">
        <ChevronRight size={14} />
      </div>
      <div className="flex-1">
        <span className="text-slate-700 font-medium leading-snug text-lg">{text}</span>
        {pmid && (
          <a 
            href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:border-b border-blue-200 hover:text-blue-800 transition-colors"
          >
            PMID: {pmid} <MousePointer2 size={10} />
          </a>
        )}
      </div>
    </div>
  );
}

function EvidenceChart({ title, data }: { title: string; data: { label: string; value: number; color: string }[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h5 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{title}</h5>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-sm font-bold uppercase">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className={`h-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnatomyLabel({ label, color }: { label: string; color: string }) {
  return (
    <div className={`px-4 py-2 ${color} rounded-xl text-sm font-bold text-center`}>
      {label}
    </div>
  );
}

function SimpleCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-3 mb-2 text-blue-600">
        {icon}
        <h5 className="font-bold">{title}</h5>
      </div>
      <p className="text-base text-slate-500 leading-snug">{text}</p>
    </div>
  );
}

function VideoPlayer({ label, videoId }: { label: string; videoId?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full space-y-4">
      {isPlaying && videoId ? (
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 bg-black relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=1`}
            title={label}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div 
          onClick={() => videoId && setIsPlaying(true)}
          className={`w-full p-8 bg-slate-900 border-2 border-[#FFEB3B]/20 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group transition-all overflow-hidden relative ${videoId ? 'cursor-pointer hover:border-[#FFEB3B]' : 'cursor-default'}`}
        >
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className={`h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${videoId ? 'group-hover:scale-110 group-hover:bg-[#ED1C24]' : 'opacity-40'}`}>
            <PlayCircle size={32} />
          </div>
          <div className="relative z-10">
            <p className="text-white font-bold text-xl">{label}</p>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-black">Official CGH ED Educational Resource</p>
            {!videoId && <p className="text-white/20 text-[10px] mt-2 italic font-medium tracking-tight">VIDEO LINK PENDING</p>}
            {videoId && <p className="text-[#FFEB3B] text-[10px] mt-2 font-black uppercase tracking-wider animate-pulse">Click to Play Preview</p>}
          </div>
        </div>
      )}
      
      {videoId && (
        <a 
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-3 px-6 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl transition-all border border-slate-200 shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ED1C24] flex items-center justify-center text-white">
               <ExternalLink size={14} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Watch directly on YouTube</span>
          </div>
          <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  );
}
