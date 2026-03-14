import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyProofly from "../components/WhyProofly";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
export default function Home() {
    return (
        <div>
            <Hero />
            <div className="home-part-2">
                <Services />
                <WhyProofly />
                <Features />
                <Testimonials />
                <Pricing />
                <FAQ />
            </div>
        </div>
    );
}