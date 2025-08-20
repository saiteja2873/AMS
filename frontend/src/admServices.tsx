import { Link } from "react-router-dom";

function AdmServices() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012E40] via-[#2B5876] to-[#C637A0] px-4 py-10"
    >
      <div className="grid gap-8 sm:grid-cols-2 max-w-5xl w-full">
        {/* Add Crop Data */}
        <Link to="../admServices/costTrackingAdm">
          <div className="group relative h-56 sm:h-64 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg 
                          hover:shadow-2xl hover:scale-105 transition-all duration-500 flex items-center justify-center text-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-yellow-300 transition">
                Add Crop Data
              </h2>
              <p className="text-gray-200 text-sm sm:text-base">
                Insert new crop details with ease and accuracy.
              </p>
            </div>
          </div>
        </Link>

        {/* Update / Delete Crop Data */}
        <Link to="../admServices/admUpdateCropData">
          <div className="group relative h-56 sm:h-64 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg 
                          hover:shadow-2xl hover:scale-105 transition-all duration-500 flex items-center justify-center text-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-green-300 transition">
                Update / Delete Crop Data
              </h2>
              <p className="text-gray-200 text-sm sm:text-base">
                Manage and keep crop data accurate & up-to-date.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdmServices;
