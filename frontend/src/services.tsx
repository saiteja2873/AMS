import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; 

function Services() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    const loadingToast = toast.loading("Loading...", {
      style: {
        background:
          "linear-gradient(126.3deg, rgba(242,227,213,1) 80.2%, rgba(242,227,213,1))",
      },
    });

    setTimeout(() => {
      navigate(path);
      toast.dismiss(loadingToast);
    }, 500);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 sm:py-16"
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1,46,64,1) 30%, rgba(198,55,160,0.46) 100%)",
      }}
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-12 tracking-tight text-center">
        🌟 Our Services
      </h1>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {/* Card 1 */}
        <button
          onClick={() => handleNavigation("../services/costTracking")}
          className="group bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-lg border border-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition">
              💰
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Cost Tracking
            </h2>
            <p className="text-slate-300 text-center text-sm leading-relaxed">
              Monitor your farm’s expenses with real-time insights to maximize
              efficiency and profitability.
            </p>
          </div>
        </button>

        {/* Card 2 */}
        <button
          onClick={() => handleNavigation("../services/priceTracking")}
          className="group bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-lg border border-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition">
              📈
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Price Tracking
            </h2>
            <p className="text-slate-300 text-center text-sm leading-relaxed">
              Stay ahead in the market by tracking real-time price changes &
              selling at the right time.
            </p>
          </div>
        </button>

        {/* Card 3 */}
        <button
          onClick={() => handleNavigation("../services/weatherComponent")}
          className="group bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-lg border border-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition">
              🌦️
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Weather Forecast
            </h2>
            <p className="text-slate-300 text-center text-sm leading-relaxed">
              Safeguard your crops with reliable weather forecasts that help you
              plan better and reduce risks.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Services;
