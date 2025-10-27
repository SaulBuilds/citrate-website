import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import FeatureCards from "@/components/FeatureCards";
import UseCases from "@/components/UseCases";
import Roadmap from "@/components/Roadmap";
import Tokenomics from "@/components/Tokenomics";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <StatsBar />
      <ProblemSection />
      <SolutionSection />
      <ArchitectureDiagram />
      <FeatureCards />
      <UseCases />
      <Roadmap />
      <Tokenomics />
      <FAQ />
      <Footer />
    </div>
  );
}
