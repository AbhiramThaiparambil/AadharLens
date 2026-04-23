
const Footer = () => {
    return (

        <footer className="py-12 px-6 bg-base border-t border-secondary/20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">AadharLens</h3>
                    <p className="text-secondary text-sm"> Aadhaar OCR system (MERN stack)</p>
                </div>
                <p className="text-secondary text-sm">© {new Date().getFullYear()} AadharLens. All rights reserved.</p>
            </div>
        </footer>

    )   
}

export default Footer