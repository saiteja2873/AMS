import {  useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Make sure to import the toast library

function Services() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleNavigation = (path : any) => {
    // Show loading toast
    const loadingToast = toast.loading("Loading...", {
      style:{background: "linear-gradient(126.3deg, rgba(242,227,213,1.000) 80.2%, rgba(242,227,213,1.000)"} // Optional: apply custom styles
    });

    // Delay navigation to show the loading toast
    setTimeout(() => {
      navigate(path);
      toast.dismiss(loadingToast); // Dismiss the loading toast after navigation
    }, 500); // Adjust the delay time as needed
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
        height: "110vh",
        margin: 0,
      }}
    >
      <button onClick={() => handleNavigation("../services/costTracking")}>
        <div className="absolute top-[20%] left-[27%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(119,154,164,1.000),_30px_1px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500 ease-in-out  backdrop-blur-3xl backdrop-brightness-150">
          <div className="absolute top-[40%] left-[32%] font-mona-sans text-xl text-customWhite">
            Cost Tracking
          </div>
        </div>
      </button>

      <button onClick={() => handleNavigation("../services/priceTracking")}>
        <div className="absolute top-[20%] left-[55%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(119,154,164,1.000),_30px_1px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500 backdrop-blur-3xl backdrop-brightness-150">
          <div className="absolute top-[40%] left-[30%] font-mona-sans text-xl text-customWhite">
            Price Tracking
          </div>
        </div>
      </button>

      <button onClick={() => handleNavigation("../services/weatherComponent")}>
        <div className="absolute top-[57%] left-[41%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(119,154,164,1.000),_30px_1px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500 backdrop-blur-3xl backdrop-brightness-150">
          <div className="absolute top-[40%] left-[25%] font-mona-sans text-xl text-customWhite">
            Weather Forecast
          </div>
        </div>
      </button>
    </div>
  );
}

export default Services;
