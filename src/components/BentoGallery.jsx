import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BentoGallery() {
  const sectionRef = useRef(null);
  const itemsRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !itemsRefs.current.includes(el)) {
      itemsRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Loop through each bento item and apply a unique scrubbed animation
      itemsRefs.current.forEach((item, index) => {
        // Create an alternating scale and Y-axis translation based on index
        const yOffset = index % 2 === 0 ? 150 : 250;
        const scaleOffset = index % 3 === 0 ? 0.8 : 0.9;
        const rotationOffset = index % 2 === 0 ? 5 : -5;
        
        gsap.fromTo(item, 
          { 
            y: yOffset,
            scale: scaleOffset,
            rotation: rotationOffset,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%", // start animation when top of section hits 80% of viewport
              end: "center center", // end when center of section hits center of viewport
              scrub: 1, // 1 second latency for buttery smooth scrubbing
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bentoItems = [
    {
      size: "col-span-12 md:col-span-8 row-span-2",
      bg: "https://images.unsplash.com/photo-1621330396167-e31ce55ebbc3?q=80&w=1600&auto=format&fit=crop",
      title: "Titanium Strength.",
      text: "Forged in extreme heat for maximum durability.",
    },
    {
      size: "col-span-12 md:col-span-4 row-span-1",
      bg: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop",
      title: "Action Button.",
      text: "A shortcut to your favorite feature.",
    },
    {
      size: "col-span-12 md:col-span-4 row-span-2",
      bg: "https://images.unsplash.com/photo-1616423641403-248dd908be59?q=80&w=800&auto=format&fit=crop",
      title: "ProRes 4K.",
      text: "Cinematic quality anywhere you go.",
    },
    {
      size: "col-span-12 md:col-span-8 row-span-1 text-center flex flex-col justify-center items-center bg-[#111113]",
      bg: null,
      title: "Unprecedented Capability.",
      text: "The new standard for creators.",
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="bento" 
      className="py-20 md:py-32 px-6 md:px-20 bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-10 md:mb-16 text-center text-white">
          Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-400">mastery.</span>
        </h2>

        <div className="grid grid-cols-12 gap-6 auto-rows-[250px]">
          {bentoItems.map((item, i) => (
            <div 
              key={i}
              ref={addToRefs}
              className={`${item.size} rounded-[2rem] overflow-hidden relative group transform-gpu`}
            >
              {/* Background */}
              {item.bg ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.bg})` }}
                  aria-hidden="true"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-900 border border-white/10" />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none" />

              {/* Content */}
              <div className={`relative h-full flex flex-col p-8 md:p-12 z-10 ${item.bg ? 'justify-end' : 'justify-center items-center'}`}>
                <h3 className={`text-3xl font-bold mb-3 ${item.bg ? 'text-white' : 'text-accent'}`}>
                  {item.title}
                </h3>
                <p className="text-neutral-300 text-lg font-light">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
