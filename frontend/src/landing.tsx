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
        <div className="absolute top-[30%] left-[32%] box-border h-[50%] w-[37%] border p-3 border-black">
            <div className="absolute top-[20%] left-[18%] text-black text-2xl font-sans font-medium subpixel-antialiased">
            Agricultural Management System
            </div>
            <button className="absolute top-[70%] left-[20%] border px-6 py-2.5 border-black rounded-3xl hover:bg-black hover:text-white transition duration-700 ease-in-out"
                    onClick={scrollDown}>
                Know More
            </button>
            <button className="absolute top-[70%] left-[60%] border px-8 py-2.5 border-black rounded-3xl hover:bg-black hover:text-white transition duration-700 ease-in-out">
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
