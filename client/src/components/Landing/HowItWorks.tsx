const works = [
    { step: "01", title: "Upload Images", desc: "Drag and drop your Aadhaar photos." },
    { step: "02", title: "AI Processing", desc: "Our neural network extracts text fields." },
    { step: "03", title: "View Output", desc: "Download the structured JSON data." }
]
const HowItWorks = () => {
    return (

        <section id="how-it-works" className="py-24 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-16 text-primary">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-secondary/20 -z-10"></div>
                    {works.map((item, idx) => (
                        <div key={idx} className="bg-base p-6">
                            <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg">
                                {item.step}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                            <p className="text-secondary text-lg">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks