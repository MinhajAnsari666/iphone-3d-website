import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Gallery() {
  const sectionRef = useRef(null);
  const imagesRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !imagesRefs.current.includes(el)) {
      imagesRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRefs.current.forEach((img, i) => {
        gsap.to(img, {
          yPercent: -20 * (i % 2 === 0 ? 1 : -1), // alternating parallax directions
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const galleries = [
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1600&auto=format&fit=crop", // red hue abstract
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1600&auto=format&fit=crop", // sleek tech
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop"  // dark tech
  ];

  return (
    <section ref={sectionRef} id="gallery" className="py-32 px-6 md:px-20 bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-20 text-center">
          Beauty in every detail.
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-6 justify-center items-center">
          {galleries.map((src, i) => (
            <div 
              key={i} 
              className={`w-full md:w-1/3 overflow-hidden rounded-[2rem] aspect-[4/5] ${i === 1 ? 'md:-mt-32' : 'md:mt-20'}`}
            >
              <img 
                ref={addToRefs}
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-[130%] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
