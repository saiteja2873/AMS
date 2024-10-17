import { Link } from "react-router-dom"

function Services() {
    return (
        <>
        <button>
        <Link to = {'../costTracking'}>
        <div className="absolute top-[20%] left-[27%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500 ease-in-out ">
            <div className="absolute top-[40%] left-[35%] font-medium">

                    Cost Tracking
            </div>
            {/* <img className = "absolute "src="./public/COST_TRACKING.png"></img> */}
        </div>
        </Link>
        </button>

        <button>
        <div className="absolute top-[20%] left-[55%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500">
            Box2
        </div>
        </button>

        <button>
        <div className="absolute top-[55%] left-[27%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500">
            Box3
        </div>
        </button>

        <button>
        <div className="absolute top-[55%] left-[55%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500">
        <div className="absolute top-[40%] left-[30%] font-medium">
                <Link to = {'../weatherComponent'}>
                    Weather Forecasting
                </Link>
            </div>        </div>
        </button>
        </>
    )
}

export default Services