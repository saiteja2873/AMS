import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Landing() {
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations once page mounts
    const timer = setTimeout(() => setPageLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollDown = () => {
    const targetElement = document.getElementById("scrollHere");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServicesClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/services");
    }, 800); // added slight delay for smooth UX
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
      }}
    >
      {/* Hero Section */}
      <section
        className={`flex flex-col justify-center items-center text-center px-6 py-[50%] md:py-[18%] transition-all duration-1000 ${
          pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-customWhite font-mono-sans mb-6 animate-fade-in">
          Agricultural Management System
        </h1>
        <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8 animate-fade-in delay-200">
          Efficiently manage crops, resources, and farm operations with our
          comprehensive system — designed to boost productivity and ensure
          sustainability.
        </p>

        <div
          className={`flex gap-4 flex-wrap justify-center transition-all duration-1000 delay-300 ${
            pageLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* Know More Button */}
          <button
            className="font-medium border px-6 py-2.5 border-customWhite rounded-3xl hover:bg-black text-customWhite transition duration-700 ease-in-out"
            onClick={scrollDown}
          >
            Know More
          </button>

          {/* Services Button with Loading Spinner */}
          <button
            className={`font-medium border px-6 py-2.5 border-customWhite rounded-3xl transition duration-700 ease-in-out flex items-center justify-center ${
              loading ? "bg-gray-500 cursor-not-allowed" : "hover:bg-black"
            }`}
            onClick={handleServicesClick}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-customWhite mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8V4a8 8 0 01-8 8z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              <span className="text-customWhite">Services</span>
            )}
          </button>
        </div>
      </section>

      <section
        id="scrollHere"
        className={`grid gap-6 grid-cols-1 px-6 pb-28 md:px-16 transition-all duration-1000 cursor-default ${
          pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {[
          {
            title: "Cost Tracking",
            desc: "Stay on top of your farm's expenses with real-time insights to boost profitability and improve resource allocation.",
          },
          {
            title: "Price Tracking",
            desc: "Monitor market prices and sell at the best time for maximum returns, ensuring competitive advantage.",
          },
          {
            title: "Weather Forecasting",
            desc: "Plan ahead with accurate weather predictions to safeguard your crops, optimize productivity, and reduce climate risks.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="group bg-white/5 border border-white/20 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition transform text-center duration-700 ease-in-out"
            style={{ transitionDelay: `${i * 150}ms` }} // staggered card animations
          >
            <h3 className="text-customWhite font-semibold text-xl mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Landing;
