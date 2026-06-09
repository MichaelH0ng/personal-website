import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <About />
      </main>
      <Footer />
    </div>
  );
}
