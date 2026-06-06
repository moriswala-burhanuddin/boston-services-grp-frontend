import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Why } from "@/components/site/Why";
import { Footer } from "@/components/site/Footer";
import { WhatsApp, CookieNotice } from "@/components/site/Floats";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <Services />
      <Process />
      <QuoteForm />
      <Why />
      <Footer />
      <WhatsApp />
      <CookieNotice />
    </main>
  );
}
