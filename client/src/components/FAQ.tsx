import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@shared/schema";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data: faqs, isLoading } = useQuery<FAQItem[]>({
    queryKey: ["/api/faq"],
  });

  const getTestId = (question: string) => {
    const id = question.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `faq-${id}`;
  };

  if (isLoading || !faqs) {
    return (
      <section className="py-24 bg-white" data-testid="section-faq" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-faq-title">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Everything you need to know about Citrate
          </p>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="border-2 border-border rounded-lg p-6">
                <div className="h-6 bg-muted/30 rounded mb-3 animate-pulse" />
                <div className="h-4 bg-muted/20 rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white" data-testid="section-faq" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-faq-title">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-16">
          Everything you need to know about Citrate
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50"
              data-testid={getTestId(faq.question)}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                data-testid={`button-faq-${index}`}
              >
                <span className="text-xl font-bold pr-8">{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t-2 border-border pt-6">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
