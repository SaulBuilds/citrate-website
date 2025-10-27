import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"solidity" | "typescript">("typescript");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const useCases = sectionRef.current?.querySelectorAll(".use-case");
      
      useCases?.forEach((useCase) => {
        gsap.from(useCase, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: useCase,
            start: "top 75%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const useCases = [
    {
      title: "Decentralized LLM Hosting",
      description: "Deploy and monetize AI models without centralized platforms",
      code: {
        typescript: `// Deploy Llama 3 70B
const model = await registry.registerModel({
    name: "Llama 3 70B Instruct",
    weights: "ipfs://Qm...",
    architecture: "transformer",
    accessPolicy: {
        type: "pay-per-inference",
        pricePerToken: 0.0001
    }
});

// Users pay directly to use your model
const response = await model.infer("Explain quantum computing");
// You earn 0.0001 LATT * num_tokens`,
        solidity: `contract ModelRegistry {
    function deployModel(
        bytes memory weights,
        string memory architecture,
        AccessPolicy policy
    ) external returns (ModelId);
}`,
      },
      benefits: ["Direct monetization", "No platform fees", "Global accessibility", "Automatic revenue distribution"],
      testId: "use-case-llm",
    },
    {
      title: "Verifiable AI in DeFi",
      description: "AI-powered trading strategies with on-chain verification",
      code: {
        solidity: `// AI oracle for price prediction
contract TradingBot {
    function executeTrade() external {
        // Get AI prediction with proof
        (bytes memory prediction, bytes memory proof) =
            aiOracle.predict(marketData);

        // Verify proof on-chain
        require(verifyProof(proof, prediction), "Invalid prediction");

        // Execute trade based on verified AI output
        dex.swap(tokenIn, tokenOut, amountIn);
    }
}`,
        typescript: `// Verify AI trading strategy
const prediction = await aiOracle.getPrediction(marketData);
const isValid = await verifyProof(prediction.proof);

if (isValid) {
    await dex.executeSwap(prediction.recommendation);
}`,
      },
      benefits: ["Verifiable predictions", "Trustless execution", "Automated strategies", "Cryptographic guarantees"],
      testId: "use-case-defi",
    },
    {
      title: "Federated Learning Networks",
      description: "Train models collaboratively without sharing private data",
      code: {
        typescript: `// Create federated learning job
const job = await federatedLearning.createJob({
    baseModel: "gpt-3.5-turbo",
    task: "medical-diagnosis",
    minContributors: 100,
    reward: 1000 // LATT per contributor
});

// Contributors train locally and submit gradients
await job.submitGradient({
    gradient: localGradient,
    proof: zkProof // Proves training ran correctly
});

// Aggregated model is published on-chain
const improvedModel = await job.finalizeModel();`,
        solidity: `contract FederatedLearning {
    function createJob(
        ModelId baseModel,
        uint256 minContributors
    ) external returns (JobId);
    
    function submitGradient(
        JobId job,
        bytes memory gradient,
        bytes memory proof
    ) external;
}`,
      },
      benefits: ["Privacy-preserving", "Collaborative training", "Incentivized participation", "Provable computation"],
      testId: "use-case-federated",
    },
    {
      title: "AI-Powered NFTs",
      description: "NFTs that generate dynamic content using on-chain AI",
      code: {
        solidity: `contract DynamicNFT is ERC721 {
    function tokenURI(uint256 tokenId) 
        public view returns (string memory) 
    {
        // Generate image from AI based on token properties
        bytes memory image = aiPrecompile.generateImage(
            "cyberpunk cityscape",
            tokenProperties[tokenId]
        );

        return encodeJSON(image);
    }
}`,
        typescript: `// Mint dynamic NFT
const nft = await dynamicNFT.mint({
    prompt: "cyberpunk cityscape",
    attributes: {
        mood: "neon",
        time: "night",
        weather: "rain"
    }
});

// NFT image regenerates on-chain when queried
const image = await nft.getImage(tokenId);`,
      },
      benefits: ["Generative content", "On-chain AI", "Dynamic metadata", "Truly decentralized"],
      testId: "use-case-nfts",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30" data-testid="section-use-cases" id="use-cases">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-use-cases-title">
          Real-World <span className="text-primary">Use Cases</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-20 max-w-3xl mx-auto">
          From DeFi to AI-powered NFTs, Citrate enables new possibilities
        </p>

        <div className="space-y-24">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className={`use-case grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              data-testid={useCase.testId}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{useCase.title}</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{useCase.description}</p>
                
                <div className="space-y-3 mb-8">
                  {useCase.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-border">
                  <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={activeTab === "typescript" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("typescript")}
                        className="h-7 text-xs"
                        data-testid="button-tab-typescript"
                      >
                        TypeScript
                      </Button>
                      <Button
                        variant={activeTab === "solidity" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("solidity")}
                        className="h-7 text-xs"
                        data-testid="button-tab-solidity"
                      >
                        Solidity
                      </Button>
                    </div>
                  </div>
                  <pre className="m-0 p-6 bg-[#1A1A1A] text-sm text-white/90 overflow-x-auto font-mono leading-relaxed">
                    <code>{useCase.code[activeTab]}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
