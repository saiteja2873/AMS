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
        <div className="absolute top-[30%] left-[12%] box-border h-[50%] w-[80%] p-3 ">
            <div className="absolute top-[6%] left-[10%] text-customWhite text-6xl font-mono-sans font-medium subpixel-antialiased text-center">
            Agricultural Management System
            </div>
            <div className="absolute top-[30%] text-customWhite font-normal font-mona-sans text-xl text-center">Efficiently manage crops, resources, and farm operations with our comprehensive 
                Agricultural Management System, designed to boost productivity and sustainability.</div>
            <button className="absolute top-[60%] left-[37%] border w-[11%] px-6 py-2.5 border-customWhite rounded-3xl  hover:bg-black text-customWhite transition duration-700 ease-in-out"
                    onClick={scrollDown}>
                Know More
            </button>
            <button className="absolute top-[60%] left-[50%] border w-[11%] px-6 py-2.5 border-customWhite rounded-3xl hover:bg-black text-customWhite transition duration-700 ease-in-out">
                <Link to = {'./Services'}>
                Services
                </Link>
            </button>

        </div>
        <div id="scrollHere" className="absolute top-[200%] left-[50%]">
                Hello
        </div>
        </>
    );
}

export default Landing;
