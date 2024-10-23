import { Link } from "react-router-dom";

function Landing() {
    const scrollDown = () => {
        const targetElement = document.getElementById("scrollHere"); // ID of the element to scroll to
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
        <div 
            style={{ 
                background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)', 
                height: '205vh',
                margin: 0 
            }}>
            <div className="absolute top-[30%] left-[12%] box-border h-[50%] w-[80%] p-3 ">
                <div className="absolute top-[6%] left-[10%] text-customWhite text-6xl font-mono-sans font-medium subpixel-antialiased text-center">
                    Agricultural Management System
                </div>
                <div className="absolute top-[30%] text-slate-300 font-normal font-custom text-xl text-center">
                    Efficiently manage crops, resources, and farm operations with our comprehensive Agricultural Management System, designed to boost productivity and sustainability.
                </div>
                <button className="absolute top-[60%] font-medium left-[37%] border w-[11%] px-6 py-2.5 border-customWhite rounded-3xl hover:bg-black text-customWhite transition duration-700 ease-in-out"
                    onClick={scrollDown}>
                    Know More
                </button>
                <button className="absolute top-[60%] font-medium left-[50%] border w-[11%] px-6 py-2.5 border-customWhite rounded-3xl hover:bg-black text-customWhite transition duration-700 ease-in-out">
                    <Link to={'./Services'}>
                        Services
                    </Link>
                </button>

                <div className="group absolute top-[190%] left-[-1%] transition-transform duration-300 transform hover:scale-105 hover:translate-y-[-5%] box-border h-[30%] w-[100%] px-5 py-5 border rounded-md hover:backdrop-blur-lg hover:border-2 hover:shadow-custom-dark">
                    <div className="text-customWhite font-medium text-2xl">
                        Cost Tracking
                    </div>
                    <div className="relative top-3 font-medium text-lg text-slate-300">
                        Stay on top of your farm's expenses with real-time insights to boost profitability and improve resource allocation.
                    </div>
                </div>

                <div className="group absolute top-[240%] left-[-1%] transition-transform duration-300 transform hover:scale-105 hover:translate-y-[-5%] box-border h-[30%] w-[100%] px-5 py-5 border rounded-md hover:backdrop-blur-lg hover:border-2 hover:shadow-custom-dark">
                    <div className="text-customWhite font-medium text-2xl">
                        Price Tracking
                    </div>
                    <div className="relative top-3 font-medium text-lg text-slate-300">
                        Monitor market prices and sell at the best time for maximum returns, ensuring competitive advantage.
                    </div>
                </div>

                <div className="group absolute top-[290%] left-[-1%] transition-transform duration-300 transform hover:scale-105 hover:translate-y-[-5%] box-border h-[30%] w-[100%] px-5 py-5 border rounded-md hover:backdrop-blur-lg hover:border-2 hover:shadow-custom-dark">
                    <div className="text-customWhite font-medium text-2xl">
                        Weather Forecasting
                    </div>
                    <div className="relative top-3 font-medium text-lg text-slate-300">
                        Plan ahead with accurate weather predictions to safeguard your crops, optimize productivity, and reduce climate risks.
                    </div>
                </div>
            </div>
        
        <div id="scrollHere" className="absolute top-[200%] left-[50%]">
        </div>
        </div>

        </>
    );
}

export default Landing;
