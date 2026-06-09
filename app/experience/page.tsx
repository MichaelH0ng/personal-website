import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main id="main-content" className="pt-16 flex-1">
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
