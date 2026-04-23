import { Cpu, FileText, ShieldCheck, Zap } from "lucide-react"

const featuresData = [
    { icon: <Cpu />, title: "OCR Extraction", desc: "Extract Name, DOB, and Aadhaar IDs with precision." },
    { icon: <FileText />, title: "Front & Back", desc: "Full support for both sides of the Aadhaar card." },
    { icon: <Zap />, title: "Lightning Fast", desc: "Backend-driven processing ensures results in milliseconds." },
    { icon: <ShieldCheck />, title: "Secure Handling", desc: "Enterprise-grade encryption for all processed documents." }
]


const Features = () => {
    return (

        <section id="features" className="py-24 px-6 bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl text-base font-bold mb-4">Powerful Features</h2>
                    <div className="h-1.5 w-20 bg-base mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
                    {featuresData.map((feature, idx) => (
                        <div key={idx} className="p-8 bg-base border border-secondary/20 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-primary text-accent rounded-lg flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-secondary">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features