import { Link } from "react-router-dom";

function ServicesAdm() {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
          height: "100vh",
          margin: 0,
        }}
      >
        <button>
          <Link to={"../services/costTracking"}>
            <div className="absolute top-[20%] left-[27%] box-border h-[30%] w-[20%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(119,154,164,1.000),_30px_1px_30px_4px_rgba(45,78,255,0.15)] rounded-md transition duration-500 ease-in-out  backdrop-blur-3xl backdrop-brightness-150">
              <div className="absolute top-[40%] left-[32%] font-mona-sans text-xl text-customWhite">
                Add Crop Data
              </div>
            </div>
          </Link>
        </button>

        
          </div>
    </>
  );
}

export default ServicesAdm;
