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
import { publicReleasePolicy } from "@/lib/releasePolicy";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 1. Navigation */}
      <Navbar />

      {/* Main Content Sections with Accessible Target Anchor */}
      <main id="main-content" className="flex-grow">
        {/* 2. Hero */}
        <Hero />

        {/* 3. Product Scope & Initial Audience */}
        <GoalCards />

        {/* 4. How Bllumo Works */}
        <HowItWorks />

        {/* 5. Approach & Differentiation */}
        <Personalization />

        {/* 6. Real-World Adaptation */}
        <Adaptation />

        {/* 7. Long-Term Vision */}
        <Vision />

        {/* 8. Responsible AI & Safeguards */}
        <Trust />

        {/* 9. Early Access Waitlist */}
        <WaitlistForm enabled={publicReleasePolicy().enabled} />

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
