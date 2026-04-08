import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeText() {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Functional values let GSAP recalculate if window resizes, with safety checks for strict mode
      const getScroll1 = () => text1Ref.current ? -(text1Ref.current.scrollWidth - window.innerWidth + 200) : 0;
      const getScroll2 = () => text2Ref.current ? -(text2Ref.current.scrollWidth - window.innerWidth + 200) : 0;

      // First text row moves LEFT
      gsap.fromTo(text1Ref.current, 
        { x: 0 },
        {
          x: getScroll1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          }
      });

      // Second text row moves RIGHT
      gsap.fromTo(text2Ref.current, 
        { x: getScroll2 },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden flex flex-col justify-center gap-6"
    >
      <div 
        ref={text1Ref} 
        className="w-max text-[15vw] md:text-[10vw] font-bold uppercase tracking-tighter whitespace-nowrap leading-none text-transparent pl-4"
        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}
      >
        Designed to be Defiant • Designed to be Defiant • Designed to be Defiant • Designed to be Defiant
      </div>
      
      <div 
        ref={text2Ref} 
        className="w-max text-[15vw] md:text-[10vw] font-bold uppercase tracking-tighter whitespace-nowrap leading-none text-accent pr-4"
      >
        Pro Camera System • Pro Camera System • Pro Camera System • Pro Camera System
      </div>
    </section>
  );
}
