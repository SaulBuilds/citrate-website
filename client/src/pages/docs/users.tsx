import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function DocsUsers() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-12 px-6 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Users</h1>
          <p className="text-white/70 text-lg">Stubbed. Wallet basics and getting started will live here.</p>
        </div>
      </section>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-muted-foreground">
          <p>For now, see the docs portal under Users.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

