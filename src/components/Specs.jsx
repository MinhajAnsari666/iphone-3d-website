import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Specs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title
      gsap.fromTo('.spec-title',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, ease: "power4.out", 
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } 
        }
      );

      // Animate the list items with a 3D fold-down effect
      gsap.fromTo('.spec-item',
        { opacity: 0, rotationX: -90, transformOrigin: "top center" },
        {
          opacity: 1, 
          rotationX: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.spec-container',
            start: "top 80%",
          }
        }
      );

      gsap.fromTo('.spec-button',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.5,
          scrollTrigger: {
            trigger: '.spec-button',
            start: "top 95%",
          }
        }
      )
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specs = [
    { label: "Finish", value: "(PRODUCT)RED Ceramic Shield front, Glass back and aluminum design" },
    { label: "Capacity", value: "128GB, 256GB, 512GB, 1TB" },
    { label: "Size and Weight", value: "5.78 x 2.82 x 0.31 inches, 6.07 ounces" },
    { label: "Display", value: "6.1-inch Super Retina XDR display, 2556x1179-pixel resolution at 460 ppi" },
    { label: "Water Resistance", value: "Rated IP68 (maximum depth of 6 meters up to 30 minutes)" },
    { label: "Chip", value: "A16 Bionic chip, 6-core CPU, 5-core GPU, 16-core Neural Engine" },
    { label: "Camera", value: "Advanced dual-camera system (48MP Main and 12MP Ultra Wide)" },
  ];

  return (
    <section ref={sectionRef} id="specs" className="py-20 md:py-32 px-6 md:px-20 bg-[#050505] border-t border-white/5 relative z-10" style={{ perspective: "1000px" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="spec-title text-4xl md:text-6xl border-b border-white/10 pb-6 md:pb-8 font-bold tracking-tight mb-8 md:mb-12 text-white">
          Technical Specifications
        </h2>
        
        <div className="spec-container divide-y divide-white/10">
          {specs.map((spec, i) => (
            <div key={i} className="spec-item py-6 md:py-8 flex flex-col md:flex-row md:items-start md:space-x-12 transform-gpu">
              <h3 className="text-white/60 font-medium md:w-1/3 mb-2 md:mb-0 text-xl tracking-tight">{spec.label}</h3>
              <p className="md:w-2/3 text-lg font-light leading-relaxed text-neutral-300">{spec.value}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 flex justify-center spec-button">
          <button className="bg-white text-black px-10 py-5 rounded-full font-semibold text-xl hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 duration-300">
            Buy iPhone (PRODUCT)RED
          </button>
        </div>
      </div>
    </section>
  );
}
