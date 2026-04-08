import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Performance() {
  const sectionRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Text animation
        gsap.fromTo('.perf-text', 
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        // Bar fill animation
        gsap.fromTo('.perf-bar', 
          { width: "0%" },
          {
            width: "100%", duration: 1.5, ease: "power4.out", stagger: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        
        // Parallax background glow
        gsap.to(engineRef.current, {
           yPercent: 50,
           ease: "none",
           scrollTrigger: {
               trigger: sectionRef.current,
               start: "top bottom",
               end: "bottom top",
               scrub: true
           }
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="performance" className="py-40 px-6 md:px-20 bg-[#0A0A0C] relative z-10 border-t border-white/5 overflow-hidden">
        {/* Glow Engine element */}
        <div ref={engineRef} className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -mr-80 -mt-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="perf-text text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
          A16 Bionic.<br/> <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-[12px]">Generations ahead.</span>
        </h2>
        <p className="perf-text text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mb-24">
          The ultimate smartphone chip pushes what’s possible. With a 5-core GPU and 16-core Neural Engine, it powers complex workflows and the latest games natively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="perf-text mb-2 flex justify-between text-lg font-medium text-white">
              <span>CPU Performance</span>
              <span className="text-accent">+40%</span>
            </div>
            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="perf-bar h-full bg-gradient-to-r from-accent to-red-400 rounded-full relative">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-30"></div>
              </div>
            </div>
          </div>

          <div>
            <div className="perf-text mb-2 flex justify-between text-lg font-medium text-white">
              <span>Power Efficiency</span>
              <span className="text-accent">+30%</span>
            </div>
            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="perf-bar h-full bg-gradient-to-r from-accent to-red-400 rounded-full relative" style={{ maxWidth: '85%' }}></div>
            </div>
          </div>

          <div>
            <div className="perf-text mb-2 flex justify-between text-lg font-medium text-white">
              <span>Memory Bandwidth</span>
              <span className="text-accent">+50%</span>
            </div>
            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="perf-bar h-full bg-gradient-to-r from-accent to-red-400 rounded-full relative"></div>
            </div>
          </div>

          <div>
            <div className="perf-text mb-2 flex justify-between text-lg font-medium text-white">
              <span>Neural Engine Speed</span>
              <span className="text-accent">17 Trillion ops/s</span>
            </div>
            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="perf-bar h-full bg-gradient-to-r from-accent to-red-400 rounded-full relative" style={{ maxWidth: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
