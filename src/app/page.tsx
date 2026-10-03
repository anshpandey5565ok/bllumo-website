import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GoalCards } from "@/components/GoalCards";
import { HowItWorks } from "@/components/HowItWorks";
import { Personalization } from "@/components/Personalization";
import { Adaptation } from "@/components/Adaptation";
import { Vision } from "@/components/Vision";
import { Trust } from "@/components/Trust";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FAQ } from "@/components/FAQ";
import { About } from "@/components/About";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 1. Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 2. Hero */}
        <Hero />

        {/* 3. One Platform, Many Goals */}
        <GoalCards />

        {/* 4. How Bllumo Works */}
        <HowItWorks />

        {/* 5. Personalized by Design */}
        <Personalization />

        {/* 6. Adaptive to Real Life */}
        <Adaptation />

        {/* 7. Bllumo Vision */}
        <Vision />

        {/* 8. Responsible AI / Trust */}
        <Trust />

        {/* 9. Early Access Waitlist */}
        <WaitlistForm />

        {/* 10. FAQ */}
        <FAQ />

        {/* 11. About Bllumo */}
        <About />

        {/* 12. Final CTA */}
        <FinalCTA />
      </main>

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}
