import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./db-storage";
import { insertBlogPostSchema, insertFAQSchema, insertContactSchema } from "@shared/schema";
import type { RealtimeNetworkData } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getNetworkStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch network stats" });
    }
  });

  app.get("/api/faq", async (_req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
    try {
      const allowedFields = ['title', 'slug', 'content', 'excerpt', 'author', 'category', 'tags', 'featured'];
      const updates = Object.keys(req.body)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => ({ ...obj, [key]: req.body[key] }), {});
      
      const post = await storage.updateBlogPost(req.params.id, updates);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.get("/api/admin/faqs", async (_req, res) => {
    try {
      const faqs = await storage.getAllFAQsFromDB();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  app.post("/api/admin/faqs", async (req, res) => {
    try {
      const validatedData = insertFAQSchema.parse(req.body);
      const faq = await storage.createFAQ(validatedData);
      res.status(201).json(faq);
    } catch (error) {
      res.status(400).json({ error: "Invalid FAQ data" });
    }
  });

  app.patch("/api/admin/faqs/:id", async (req, res) => {
    try {
      const faq = await storage.updateFAQ(req.params.id, req.body);
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
      res.json(faq);
    } catch (error) {
      res.status(500).json({ error: "Failed to update FAQ" });
    }
  });

  app.delete("/api/admin/faqs/:id", async (req, res) => {
    try {
      await storage.deleteFAQ(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete FAQ" });
    }
  });

  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: "/ws/stats" });

  function generateRealtimeStats(): RealtimeNetworkData {
    return {
      timestamp: new Date().toISOString(),
      tps: Math.round(8000 + Math.random() * 4000),
      finality: parseFloat((10 + Math.random() * 4).toFixed(1)),
      activeValidators: 2847 + Math.round(Math.random() * 20 - 10),
      uptime: 99.99,
      peakTPS: 12487,
      avgBlockTime: 0.8,
      totalBlocks: 8234567 + Math.round(Math.random() * 100),
      activeNodes: 4921 + Math.round(Math.random() * 10),
      networkHashRate: "42.5 PH/s",
      mempoolSize: 1000 + Math.round(Math.random() * 500),
    };
  }

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected to /ws/stats");

    ws.send(JSON.stringify(generateRealtimeStats()));

    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(generateRealtimeStats()));
      }
    }, 2000);

    ws.on("close", () => {
      console.log("WebSocket client disconnected from /ws/stats");
      clearInterval(interval);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clearInterval(interval);
    });
  });

  app.get("/api/network/current", (_req, res) => {
    res.json(generateRealtimeStats());
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, message: "Thank you for contacting us! We'll be in touch soon." });
    } catch (error) {
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  app.get("/api/admin/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  return httpServer;
}
