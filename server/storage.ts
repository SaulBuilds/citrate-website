import { type User, type InsertUser, type NetworkStats, type StatsData, type FAQItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getNetworkStats(): Promise<StatsData[]>;
  getFAQs(): Promise<FAQItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private stats: StatsData[];
  private faqs: FAQItem[];

  constructor() {
    this.users = new Map();
    
    this.stats = [
      { value: "10,000+", label: "TPS Throughput" },
      { value: "< 12s", label: "Finality Time" },
      { value: "100%", label: "EVM Compatible" },
      { value: "Native", label: "AI Support" },
    ];

    this.faqs = [
      {
        question: "What is Citrate?",
        answer: "Citrate is the first AI-native Layer-1 blockchain built specifically for artificial intelligence workloads. It combines GhostDAG consensus for 10,000+ TPS throughput, EVM-compatible execution layer (100% Solidity compatible), Model Context Protocol (MCP) integration for standardized AI APIs, and native AI operations via precompiles for model deployment and inference.",
      },
      {
        question: "How is Citrate different from other blockchains?",
        answer: "Citrate is the only blockchain that combines high throughput (10,000+ TPS), EVM compatibility, and native AI support. While Ethereum has a rich ecosystem but only 15 TPS, and Solana has high throughput but no EVM compatibility or AI features, Citrate offers the best of all worlds.",
      },
      {
        question: "What is GhostDAG?",
        answer: "GhostDAG (Greedy Heaviest Observed SubDAG) is a consensus algorithm that allows multiple blocks to be produced simultaneously without conflicts. Unlike traditional blockchains where blocks are sequential, GhostDAG enables parallel block production, achieving 10,000+ TPS while maintaining security and total ordering for smart contracts.",
      },
      {
        question: "Is Citrate really EVM-compatible?",
        answer: "Yes, 100%. The Citrate Virtual Machine (CVM) executes the same bytecode as Ethereum. All Solidity code, Hardhat, Foundry, MetaMask, and Ethereum tools work without modification. You can deploy existing Ethereum contracts directly to Citrate.",
      },
      {
        question: "How are AI models stored on-chain?",
        answer: "Model weights are stored off-chain on IPFS or Arweave (models can be 100+ GB). Only metadata is stored on-chain, including the model hash, IPFS CID, architecture, owner, version, access policy, and usage stats. This ensures verifiability while keeping costs low.",
      },
      {
        question: "What is the Model Context Protocol (MCP)?",
        answer: "MCP is an open standard developed by Anthropic for AI model orchestration. Citrate is the first blockchain to natively integrate MCP, providing OpenAI and Anthropic-compatible endpoints, on-chain model discovery, verifiable inference, and standardized APIs across all models.",
      },
      {
        question: "How does verifiable inference work?",
        answer: "Citrate offers three proof types: Signature-based (lightweight, 1ms), Optimistic (challenge period), and ZK Proof (cryptographic guarantee). Each has different security/cost tradeoffs. For DeFi and critical applications, ZK proofs provide cryptographic guarantees that inference ran correctly.",
      },
      {
        question: "When is mainnet launch?",
        answer: "Mainnet launch is planned for Q2 2025. We're currently in Phase 4 (Model Marketplace) with the testnet already live. Phase 5 will bring advanced features like federated learning and ZK proofs, followed by security audits and mainnet genesis in Phase 6.",
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getNetworkStats(): Promise<StatsData[]> {
    return this.stats;
  }

  async getFAQs(): Promise<FAQItem[]> {
    return this.faqs;
  }
}

export const storage = new MemStorage();
