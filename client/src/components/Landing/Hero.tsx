const Hero = () => {
    return (
        <section className="relative px-6  lg:py-32 overflow-hidden  flex items-center">
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-primary">
                        Smart Aadhaar OCR <br />
                        <span className="text-secondary">Made Simple</span>
                    </h1>
                    
                    <p className="text-xl text-secondary/80 mb-10 max-w-lg leading-relaxed">
                        Upload images and extract accurate data instantly. Secure, fast, and structured data at your fingertips.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button className="bg-primary text-white px-12 py-4 rounded-xl text-lg font-bold hover:bg-accent hover:text-primary transition-all shadow-xl active:scale-95">
                            Get Started Free
                        </button>
                    </div>
                </div>

                <div className="relative group flex justify-center items-center">
                    <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-3xl group-hover:bg-accent/30 transition-all duration-500"></div>
                    
                    <div className="relative w-full max-w-xl lg:max-w-none transform transition-transform duration-500 group-hover:scale-[1.02]">
                        <img 
                            src="/hero.png" 
                            className="w-full h-auto drop-shadow-2xl" 
                            alt="Dashboard Preview" 
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero