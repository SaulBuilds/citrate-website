import { db } from "./db";
import { blogPosts } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  const existingPosts = await db.select().from(blogPosts);
  
  if (existingPosts.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  const samplePosts = [
    {
      title: 'Introducing Citrate: The First AI-Native Blockchain',
      slug: 'introducing-citrate',
      content: `We're thrilled to announce Citrate, the world's first AI-native Layer-1 blockchain that fundamentally reimagines how artificial intelligence and blockchain technology can work together.

After two years of research and development, we've built a platform that combines three groundbreaking innovations: GhostDAG consensus for 10,000+ TPS throughput, full EVM compatibility through our Citrate Virtual Machine (CVM), and native integration with the Model Context Protocol (MCP) for standardized AI operations.

**Why AI Needs Its Own Blockchain**

Current blockchains were designed for financial transactions and smart contracts, not AI workloads. Training and inference require massive computational resources, fast finality, and standardized APIs—capabilities that existing chains simply don't provide.

Citrate addresses these challenges head-on with:
- **10,000+ TPS** through parallel block production
- **Sub-12 second finality** for responsive AI applications
- **Native AI precompiles** for efficient model deployment
- **MCP integration** for OpenAI/Anthropic compatibility

**What This Means for Developers**

If you're building AI applications, Citrate gives you:
1. Deploy existing Ethereum contracts without changes
2. Access AI models through familiar APIs
3. Verify inference results cryptographically
4. Scale to millions of users

**Join the Testnet**

Our testnet is live and ready for builders. Get started today at testnet.citrate.network and be part of the AI-blockchain revolution.`,
      excerpt: 'After two years of development, we\'re launching the first blockchain built specifically for artificial intelligence workloads, combining 10,000+ TPS, EVM compatibility, and native AI support.',
      author: 'Alex Chen',
      publishedAt: '2024-10-15',
      category: 'Announcement',
      tags: ['launch', 'ai', 'blockchain'],
      featured: 1,
    },
    {
      title: 'Deep Dive: How GhostDAG Powers 10,000+ TPS',
      slug: 'ghostdag-deep-dive',
      content: `GhostDAG (Greedy Heaviest Observed SubDAG) is the consensus algorithm that enables Citrate's massive throughput without sacrificing security or decentralization.

**The Problem with Traditional Blockchains**

Bitcoin and Ethereum process blocks sequentially—one block at a time. This creates a fundamental bottleneck: you can only have as many transactions as fit in a single block, limited by block size and block time.

**Parallel Block Production**

GhostDAG allows multiple blocks to be produced simultaneously. Instead of a chain, we have a directed acyclic graph (DAG) of blocks. Validators can create blocks in parallel, dramatically increasing throughput.

**Total Ordering for Smart Contracts**

The key innovation is maintaining total ordering for smart contract execution while allowing parallel block creation. GhostDAG uses a greedy algorithm to determine a linear ordering of all blocks, ensuring deterministic execution.

**Security Guarantees**

Despite parallel production, GhostDAG maintains the same 51% security threshold as traditional PoW chains. The algorithm is proven secure under standard assumptions.

**Performance Metrics**

In our testnet, we've consistently achieved:
- 10,000+ transactions per second
- 11.2 second average finality
- 99.99% uptime
- Sub-second block times

This makes Citrate suitable for high-frequency AI applications that require instant feedback.`,
      excerpt: 'Understanding the consensus algorithm that enables Citrate to process 10,000+ transactions per second while maintaining security and total ordering for smart contracts.',
      author: 'Dr. Sarah Williams',
      publishedAt: '2024-10-20',
      category: 'Technical',
      tags: ['ghostdag', 'consensus', 'performance'],
      featured: 0,
    },
    {
      title: 'Building Your First AI-Powered DApp on Citrate',
      slug: 'first-ai-dapp-tutorial',
      content: `In this tutorial, we'll build a simple sentiment analysis DApp that demonstrates Citrate's AI capabilities.

**Prerequisites**

- Node.js 18+
- MetaMask or similar wallet
- Basic knowledge of Solidity and React

**Step 1: Deploy the Smart Contract**

Our contract will store text and request sentiment analysis. The AI precompile makes it easy to call AI models directly from Solidity.

**Step 2: Build the Frontend**

We'll use React and ethers.js to interact with the contract and display results in a clean, responsive interface.

**Step 3: Test and Deploy**

Once your contract is ready, deploy it to the Citrate testnet and start analyzing sentiment in real-time.`,
      excerpt: 'Step-by-step guide to building your first AI-powered decentralized application using Citrate\'s native AI capabilities and smart contracts.',
      author: 'Marcus Rodriguez',
      publishedAt: '2024-10-25',
      category: 'Tutorial',
      tags: ['tutorial', 'ai', 'dapp', 'smart-contracts'],
      featured: 0,
    },
    {
      title: 'Citrate Testnet Reaches 1 Million Transactions',
      slug: 'testnet-milestone',
      content: `We're excited to announce that the Citrate testnet has processed over 1 million transactions from developers building AI-powered applications.

**By the Numbers**

- 1,042,357 total transactions
- 2,847 unique addresses
- 412 deployed contracts
- 156 AI models registered

**What Developers Are Building**

The creativity of our developer community has been amazing. Here are some highlights:

1. **DeFi-AI Hybrid**: Automated trading strategies using on-chain sentiment analysis
2. **Content Moderation**: Decentralized content filtering using verifiable AI inference
3. **Predictive Analytics**: Sports betting markets powered by ML models
4. **Gaming**: AI NPCs with personalities stored on-chain

**What's Next**

We're preparing for our mainnet launch in Q2 2025. Current focus areas:
- Security audits with Trail of Bits and Certora
- Validator onboarding program
- Developer grant program

Join us at testnet.citrate.network to start building!`,
      excerpt: 'The Citrate testnet has processed over 1 million transactions as developers build the next generation of AI-powered decentralized applications.',
      author: 'Alex Chen',
      publishedAt: '2024-10-28',
      category: 'Announcement',
      tags: ['testnet', 'milestone', 'community'],
      featured: 0,
    },
  ];

  await db.insert(blogPosts).values(samplePosts);
  console.log("Database seeded with sample blog posts");
}
