import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="pt-16 flex-1 flex flex-col">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}