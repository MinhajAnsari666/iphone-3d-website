import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BuyForm() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [selectedStorage, setSelectedStorage] = useState('256GB');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations for the form section
      gsap.fromTo('.buy-anim', 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFocus = (e) => {
    gsap.to(e.target.previousSibling, { y: -24, scale: 0.85, color: '#00D6FF', duration: 0.3, ease: 'power2.out' });
    gsap.to(e.target, { borderColor: '#00D6FF', duration: 0.3 });
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      gsap.to(e.target.previousSibling, { y: 0, scale: 1, color: '#9ca3af', duration: 0.3, ease: 'power2.out' });
    }
    gsap.to(e.target, { borderColor: 'rgba(255,255,255,0.2)', duration: 0.3 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    gsap.to(btn, { scale: 0.95, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
    // Fake success animation
    gsap.to(formRef.current, { opacity: 0, scale: 0.95, duration: 0.5, onComplete: () => {
      formRef.current.innerHTML = "<div class='text-center py-20'><h3 class='text-3xl font-bold text-accent mb-4'>Order Confirmed</h3><p class='text-neutral-400'>Welcome to the absolute bleeding edge.</p></div>";
      gsap.to(formRef.current, { opacity: 1, scale: 1, duration: 0.5 });
    }});
  };

  const storages = ["128GB", "256GB", "512GB", "1TB"];

  return (
    <section ref={sectionRef} id="buy" className="py-32 px-6 md:px-20 bg-[#0A0A0C] border-t border-white/5 relative z-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16 buy-anim">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
            Make it yours.
          </h2>
          <p className="text-xl text-neutral-400">Pre-order the iPhone 16 Pro today.</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="bg-[#050505] p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl buy-anim">
          
          {/* Storage Selection */}
          <div className="mb-10 buy-anim">
            <h3 className="text-xl font-medium mb-4 text-white">Select Storage</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {storages.map(storage => (
                <div 
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`cursor-pointer rounded-xl border p-4 text-center transition-all duration-300 ${
                    selectedStorage === storage 
                    ? 'border-cyan text-cyan bg-cyan/5 shadow-[0_0_15px_rgba(0,214,255,0.15)]' 
                    : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-lg">{storage}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input Group */}
            <div className="relative buy-anim">
              <label className="absolute left-4 top-4 text-neutral-400 font-light pointer-events-none origin-left flex items-center">
                First Name
              </label>
              <input 
                type="text" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:ring-0 transition-shadow"
              />
            </div>
            
            <div className="relative buy-anim">
              <label className="absolute left-4 top-4 text-neutral-400 font-light pointer-events-none origin-left flex items-center">
                 Last Name
              </label>
              <input 
                type="text" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:ring-0 transition-shadow"
              />
            </div>
          </div>

          <div className="relative mb-12 buy-anim">
              <label className="absolute left-4 top-4 text-neutral-400 font-light pointer-events-none origin-left flex items-center">
                Email Address
              </label>
              <input 
                type="email" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:ring-0 transition-shadow"
              />
          </div>

          <div className="flex justify-center buy-anim">
            <button 
              type="submit" 
              className="w-full md:w-1/2 bg-white text-black font-bold text-lg py-5 rounded-full hover:bg-neutral-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
