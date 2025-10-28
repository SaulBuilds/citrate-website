import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Mail, MessageCircle, Building2 } from "lucide-react";

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = heroRef.current?.querySelector(".hero-title");
      const formCard = document.querySelector(".contact-form-card");
      
      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (formCard) {
        gsap.from(formCard, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: InsertContact) => {
    setIsSubmitting(true);
    try {
      await apiRequest("/api/contact", "POST", data);
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll be in touch soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Have questions about Citrate? Want to become a validator or build on our platform? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card border-2 border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">hello@citrate.network</p>
            </div>

            <div className="bg-card border-2 border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Community</h3>
              <p className="text-muted-foreground text-sm">Discord & Telegram</p>
            </div>

            <div className="bg-card border-2 border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Partnerships</h3>
              <p className="text-muted-foreground text-sm">partners@citrate.network</p>
            </div>
          </div>

          <div className="contact-form-card bg-card border-2 border-border rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Send us a message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company" {...field} value={field.value || ""} data-testid="input-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project or inquiry..." 
                          className="min-h-[150px]" 
                          {...field} 
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full" 
                  disabled={isSubmitting}
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
