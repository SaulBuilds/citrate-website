import { db } from "./db";
import { 
  users, 
  faqs, 
  blogPosts,
  contacts,
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type FAQ,
  type InsertFAQ,
  type Contact,
  type InsertContact,
  type FAQItem,
  type StatsData
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getNetworkStats(): Promise<StatsData[]>;
  getFAQs(): Promise<FAQItem[]>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  getAllFAQsFromDB(): Promise<FAQ[]>;
  createFAQ(faq: InsertFAQ): Promise<FAQ>;
  updateFAQ(id: string, faq: Partial<InsertFAQ>): Promise<FAQ | undefined>;
  deleteFAQ(id: string): Promise<boolean>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class DBStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getNetworkStats(): Promise<StatsData[]> {
    return [
      { value: "10,000+", label: "TPS Throughput" },
      { value: "< 12s", label: "Finality Time" },
      { value: "100%", label: "EVM Compatible" },
      { value: "Native", label: "AI Support" },
    ];
  }

  async getFAQs(): Promise<FAQItem[]> {
    const dbFaqs = await db.select().from(faqs).orderBy(faqs.order);
    
    if (dbFaqs.length === 0) {
      const defaultFaqs: InsertFAQ[] = [
        {
          question: "What is Citrate?",
          answer: "Citrate is the first AI-native Layer-1 blockchain built specifically for artificial intelligence workloads. It combines GhostDAG consensus for 10,000+ TPS throughput, EVM-compatible execution layer (100% Solidity compatible), Model Context Protocol (MCP) integration for standardized AI APIs, and native AI operations via precompiles for model deployment and inference.",
          order: 1,
        },
        {
          question: "How is Citrate different from other blockchains?",
          answer: "Citrate is the only blockchain that combines high throughput (10,000+ TPS), EVM compatibility, and native AI support. While Ethereum has a rich ecosystem but only 15 TPS, and Solana has high throughput but no EVM compatibility or AI features, Citrate offers the best of all worlds.",
          order: 2,
        },
        {
          question: "What is GhostDAG?",
          answer: "GhostDAG (Greedy Heaviest Observed SubDAG) is a consensus algorithm that allows multiple blocks to be produced simultaneously without conflicts. Unlike traditional blockchains where blocks are sequential, GhostDAG enables parallel block production, achieving 10,000+ TPS while maintaining security and total ordering for smart contracts.",
          order: 3,
        },
        {
          question: "Is Citrate really EVM-compatible?",
          answer: "Yes, 100%. The Citrate Virtual Machine (CVM) executes the same bytecode as Ethereum. All Solidity code, Hardhat, Foundry, MetaMask, and Ethereum tools work without modification. You can deploy existing Ethereum contracts directly to Citrate.",
          order: 4,
        },
        {
          question: "How are AI models stored on-chain?",
          answer: "Model weights are stored off-chain on IPFS or Arweave (models can be 100+ GB). Only metadata is stored on-chain, including the model hash, IPFS CID, architecture, owner, version, access policy, and usage stats. This ensures verifiability while keeping costs low.",
          order: 5,
        },
        {
          question: "What is the Model Context Protocol (MCP)?",
          answer: "MCP is an open standard developed by Anthropic for AI model orchestration. Citrate is the first blockchain to natively integrate MCP, providing OpenAI and Anthropic-compatible endpoints, on-chain model discovery, verifiable inference, and standardized APIs across all models.",
          order: 6,
        },
        {
          question: "How does verifiable inference work?",
          answer: "Citrate offers three proof types: Signature-based (lightweight, 1ms), Optimistic (challenge period), and ZK Proof (cryptographic guarantee). Each has different security/cost tradeoffs. For DeFi and critical applications, ZK proofs provide cryptographic guarantees that inference ran correctly.",
          order: 7,
        },
        {
          question: "When is mainnet launch?",
          answer: "Mainnet launch is planned for Q2 2025. We're currently in Phase 4 (Model Marketplace) with the testnet already live. Phase 5 will bring advanced features like federated learning and ZK proofs, followed by security audits and mainnet genesis in Phase 6.",
          order: 8,
        },
      ];

      await db.insert(faqs).values(defaultFaqs);
      const insertedFaqs = await db.select().from(faqs).orderBy(faqs.order);
      return insertedFaqs.map(faq => ({ question: faq.question, answer: faq.answer }));
    }

    return dbFaqs.map(faq => ({ question: faq.question, answer: faq.answer }));
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }

  async getAllFAQsFromDB(): Promise<FAQ[]> {
    return db.select().from(faqs).orderBy(faqs.order);
  }

  async createFAQ(faq: InsertFAQ): Promise<FAQ> {
    const [created] = await db.insert(faqs).values(faq).returning();
    return created;
  }

  async updateFAQ(id: string, faq: Partial<InsertFAQ>): Promise<FAQ | undefined> {
    const [updated] = await db.update(faqs).set(faq).where(eq(faqs.id, id)).returning();
    return updated;
  }

  async deleteFAQ(id: string): Promise<boolean> {
    await db.delete(faqs).where(eq(faqs.id, id));
    return true;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [created] = await db.insert(contacts).values(contact).returning();
    return created;
  }

  async getAllContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }
}

export const storage = new DBStorage();
