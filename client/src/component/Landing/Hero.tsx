
const Hero = () => {
    return (

        <section className="relative px-6 pt-20 pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-primary">
                        Smart Aadhaar OCR <br />
                        <span className="text-secondary">Made Simple</span>
                    </h1>
                    <p className="text-xl text-secondary mb-8 max-w-lg leading-relaxed">
                        Upload Aadhaar images and extract accurate data instantly - Secure, fast, and structured data at your fingertips.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-primary text-base px-16 py-4 rounded-xl text-lg font-bold hover:bg-accent hover:text-primary transition-all shadow-lg">
                            Get Started Free
                        </button>

                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl group-hover:bg-accent/30 transition-all"></div>
                    <div className="relative bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-2xl">
                        <div className="relative aspect-[1.6/1] bg-gradient-to-br from-secondary to-primary rounded-xl overflow-hidden shadow-inner">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4/5 h-3/4 border-2 border-accent rounded-lg relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_#A0D585] animate-scan"></div>
                                    <div className="absolute top-10 left-10 w-24 h-4 bg-accent/40 rounded"></div>
                                    <div className="absolute top-20 left-10 w-40 h-4 bg-accent/40 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero