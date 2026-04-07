import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TextHighlight() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Enter animation for the whole section (Parallax smooth reveal)
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 150 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: 1,
          }
        }
      );

      // 2. Word-by-word lighting up logic
      const words = textRef.current.querySelectorAll('.word');
      gsap.fromTo(words, 
        { opacity: 0.1, color: '#333' },
        {
          opacity: 1,
          color: '#ffffff',
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraph = "The absolute pinnacle of engineering. Forged in fire. Machined with microscopic precision. Every curve, sensor, and atom is obsessively designed to shatter the boundary between hardware and pure magic.";

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-6 md:px-20 bg-[#050505] relative z-10 flex items-center justify-center min-h-[50vh] md:min-h-[70vh] border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center transform-gpu">
        <p ref={textRef} className="text-3xl md:text-6xl font-semibold tracking-tighter leading-tight flex flex-wrap justify-center gap-x-2 md:gap-x-4">
          {paragraph.split(' ').map((word, i) => (
            <span key={i} className="word transition-colors duration-300">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
