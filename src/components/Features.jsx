import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Battery, Camera, Cpu } from 'lucide-react';

export default function Features() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        const icon = card.querySelector('.feature-icon');
        const title = card.querySelector('.feature-title');
        const text = card.querySelector('.feature-text');

        // Main card entrance
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );

        // Inner children stagger
        gsap.fromTo([icon, title, text],
          { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.2, // wait for card to start rising
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-accent" />,
      title: "A16 Bionic",
      description: "The ultimate smartphone chip. Unmatched speed and efficiency for gaming and computational photography."
    },
    {
      icon: <Camera className="w-8 h-8 text-cyan" />,
      title: "Pro Camera System",
      description: "Capture the impossible. 48MP Main camera with advanced quad-pixel sensor for 4x the resolution."
    },
    {
      icon: <Battery className="w-8 h-8 text-green-400" />,
      title: "All-Day Battery",
      description: "Up to 29 hours of video playback. Fast charge capabilities to keep you moving."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Super Retina XDR",
      description: "Brighter than ever in the sun. Absolute blacks and dazzling whites. Up to 2000 nits peak brightness."
    }
  ];

  return (
    <section ref={sectionRef} id="technology" className="py-32 px-6 md:px-20 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Pro capabilities.<br/> <span className="text-neutral-500 text-3xl md:text-5xl">Unapologetically powerful.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              ref={addToRef}
              className="bg-[#0a0a0c] p-10 md:p-14 rounded-[2rem] border border-white/[0.02] hover:border-white/10 transition-colors duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="feature-icon mb-8 p-4 bg-white/5 rounded-2xl inline-block backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="feature-title text-2xl font-semibold mb-4 tracking-tight">{feature.title}</h3>
                <p className="feature-text text-neutral-400 text-lg leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
