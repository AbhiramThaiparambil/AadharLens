import Navbar from "../component/Navbar"
import Hero from "../component/Landing/Hero";
import Features from "../component/Landing/Features";
import Footer from "../component/Footer";
import HowItWorks from "../component/Landing/HowItWorks";

const Landing = () => {
    return (
        <div className="min-h-screen font-sans text-primary bg-base">
            <Navbar links={[{ label: "Features", href: "#features", tag: "link" },
            { label: "How it Works", href: "#how-it-works", tag: "a" },]} />

            <Hero />
            <Features />
            <HowItWorks />
            <Footer />


            <style>{`
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        .animate-scan { animation: scan 2s linear infinite; }
      `}</style>
        </div>
    );
}

export default Landing