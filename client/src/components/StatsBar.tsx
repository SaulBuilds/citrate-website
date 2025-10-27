import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { StatsData } from "@shared/schema";

gsap.registerPlugin(ScrollTrigger);

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);

  const { data: stats, isLoading } = useQuery<StatsData[]>({
    queryKey: ["/api/stats"],
  });

  useEffect(() => {
    if (!stats || isLoading) return;

    const ctx = gsap.context(() => {
      const statItems = sectionRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.from(statItems, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [stats, isLoading]);

  const getTestId = (label: string) => {
    const id = label.toLowerCase().replace(/\s+/g, "-");
    return `stat-${id}`;
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white border-t border-b border-border" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-12 bg-muted/30 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-muted/20 rounded w-24 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-12 bg-white border-t border-b border-border" data-testid="section-stats">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats?.map((stat) => (
            <div key={stat.label} className="stat-item text-center" data-testid={getTestId(stat.label)}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
