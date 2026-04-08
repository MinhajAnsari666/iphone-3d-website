import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BuyForm() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const glowRef = useRef(null);
  const [selectedStorage, setSelectedStorage] = useState('256GB');

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Background glow pulse animation
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Intro animations for the form section
      gsap.fromTo('.buy-anim', 
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Soft 3D tilt effect for the form
  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(formRef.current, {
      rotationY: x * 0.02,
      rotationX: -y * 0.02,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    if (!formRef.current) return;
    gsap.to(formRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 0.6
    });
  };

  // High-performance Input floating label interactions
  const handleFocus = (e) => {
    gsap.to(e.target.previousSibling, { y: -26, scale: 0.85, color: '#e5e5e5', duration: 0.4, ease: 'power3.out' });
    gsap.to(e.target, { borderColor: '#ffffff', backgroundColor: 'rgba(255,255,255,0.05)', duration: 0.4 });
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      gsap.to(e.target.previousSibling, { y: 0, scale: 1, color: '#9ca3af', duration: 0.4, ease: 'power3.out' });
      gsap.to(e.target, { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'transparent', duration: 0.4 });
    } else {
      gsap.to(e.target, { borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'transparent', duration: 0.4 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    
    // Magnetic push effect on submit
    gsap.to(btn, { scale: 0.92, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    
    // Sleek success morph
    gsap.to(formRef.current, { 
      opacity: 0, 
      scale: 0.95, 
      filter: "blur(20px)",
      duration: 0.5, 
      delay: 0.2,
      onComplete: () => {
        formRef.current.innerHTML = `
          <div class='text-center py-24 flex flex-col items-center justify-center h-full'>
            <div class='w-16 h-16 rounded-full bg-white mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.5)]'>
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 class='text-4xl font-bold text-white mb-2 tracking-tight'>Order Confirmed</h3>
            <p class='text-neutral-400 text-lg font-light tracking-wide'>Welcome to the absolute bleeding edge.</p>
          </div>
        `;
        gsap.to(formRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" });
      }
    });
  };

  const storages = ["128GB", "256GB", "512GB", "1TB"];

  return (
    <section ref={sectionRef} id="buy" className="py-40 px-6 md:px-20 bg-[#050505] relative z-10 flex flex-col items-center overflow-hidden">
      
      {/* Cinematic ambient glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-zinc-800 via-neutral-600 to-white/10 blur-[120px] opacity-30 pointer-events-none mix-blend-screen"
      />

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-20 buy-anim">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Reserve Yours</p>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
            Make it yours.
          </h2>
          <p className="text-xl md:text-2xl font-light text-neutral-400 tracking-wide">Pre-order the iPhone 16 Pro today.</p>
        </div>

        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-black/60 backdrop-blur-3xl p-8 md:p-14 rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.03)] buy-anim will-change-transform"
        >
          
          {/* Storage Selection */}
          <div className="mb-14 buy-anim">
            <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-6 font-semibold">Select Capacity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {storages.map(storage => (
                <div 
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`group cursor-pointer rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                    selectedStorage === storage 
                    ? 'border-white bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                    : 'border-white/10 bg-black/40 hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  <div className="p-5 text-center relative z-10">
                    <div className={`font-medium tracking-wide transition-colors duration-300 ${
                      selectedStorage === storage ? 'text-white text-xl font-bold' : 'text-neutral-400 text-lg group-hover:text-neutral-200'
                    }`}>
                      {storage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="relative buy-anim">
              <label className="absolute left-5 top-5 text-neutral-500 font-light pointer-events-none origin-left flex items-center transition-colors">
                First Name
              </label>
              <input 
                type="text" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 pt-8 pb-3 text-white outline-none focus:ring-0 transition-all duration-300 shadow-inner"
              />
            </div>
            
            <div className="relative buy-anim">
              <label className="absolute left-5 top-5 text-neutral-500 font-light pointer-events-none origin-left flex items-center transition-colors">
                 Last Name
              </label>
              <input 
                type="text" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 pt-8 pb-3 text-white outline-none focus:ring-0 transition-all duration-300 shadow-inner"
              />
            </div>
          </div>

          <div className="relative mb-14 buy-anim">
              <label className="absolute left-5 top-5 text-neutral-500 font-light pointer-events-none origin-left flex items-center transition-colors">
                Email Address
              </label>
              <input 
                type="email" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 pt-8 pb-3 text-white outline-none focus:ring-0 transition-all duration-300 shadow-inner"
              />
          </div>

          <div className="flex justify-center buy-anim pt-4 border-t border-white/10">
            <button 
              type="submit" 
              className="mt-6 w-full relative group overflow-hidden bg-white text-black font-semibold text-xl py-5 rounded-[2rem] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10">Continue to Payment</span>
              {/* Dynamic button glow on hover */}
              <div className="absolute inset-0 max-w-full w-full h-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-50" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
