import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Tokenomics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = sectionRef.current?.querySelectorAll(".token-bar");
      
      if (bars) {
        gsap.from(bars, {
          scaleX: 0,
          transformOrigin: "left",
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const allocations = [
    {
      name: "Mining Rewards",
      amount: "500M",
      percentage: 50,
      vesting: "10 years",
      purpose: "Block production, inference, storage",
      color: "bg-primary",
      testId: "allocation-mining",
    },
    {
      name: "Ecosystem Fund",
      amount: "250M",
      percentage: 25,
      vesting: "4 years",
      purpose: "Grants, partnerships, development",
      color: "bg-primary/70",
      testId: "allocation-ecosystem",
    },
    {
      name: "Team & Advisors",
      amount: "150M",
      percentage: 15,
      vesting: "3 years with 1-year cliff",
      purpose: "Core team and strategic advisors",
      color: "bg-primary/50",
      testId: "allocation-team",
    },
    {
      name: "Public Sale",
      amount: "70M",
      percentage: 7,
      vesting: "No vesting",
      purpose: "Community distribution",
      color: "bg-primary/30",
      testId: "allocation-public",
    },
    {
      name: "Liquidity",
      amount: "30M",
      percentage: 3,
      vesting: "No vesting",
      purpose: "DEX liquidity and market making",
      color: "bg-primary/20",
      testId: "allocation-liquidity",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white" data-testid="section-tokenomics">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-tokenomics-title">
          <span className="text-primary">SALT</span> Tokenomics
        </h2>
        <p className="text-xl text-center text-white/70 mb-20 max-w-3xl mx-auto">
          Total Supply: 1,000,000,000 SALT
        </p>

        <div className="max-w-5xl mx-auto space-y-6">
          {allocations.map((allocation) => (
            <div
              key={allocation.name}
              className="group hover:scale-[1.02] transition-transform duration-300"
              data-testid={allocation.testId}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{allocation.name}</h3>
                  <p className="text-sm text-white/60">{allocation.purpose}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{allocation.percentage}%</div>
                  <div className="text-sm text-white/60">{allocation.amount}</div>
                </div>
              </div>
              
              <div className="h-12 bg-white/10 rounded-full overflow-hidden relative">
                <div
                  className={`token-bar h-full ${allocation.color} rounded-full transition-all duration-300 flex items-center px-6`}
                  style={{ width: `${allocation.percentage}%` }}
                >
                  <span className="text-sm font-semibold text-white">
                    {allocation.vesting}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-zinc-800 backdrop-blur-sm border border-zinc-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Token Utility</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2 text-white">Gas Fees</h4>
                <p className="text-sm text-white/70">Transaction and inference fees paid in SALT</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2 text-white">Staking</h4>
                <p className="text-sm text-white/70">Validators stake SALT to secure the network</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2 text-white">Governance</h4>
                <p className="text-sm text-white/70">Vote on protocol upgrades and parameters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
