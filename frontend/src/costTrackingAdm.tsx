import React, { useState, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";

const CostTrackingAdm: React.FC = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [seedsCost, setSeedsCost] = useState<number | undefined>();
  const [irrigationCost, setIrrigationCost] = useState<number | undefined>();
  const [fertilizerCost, setFertilizerCost] = useState<number | undefined>();
  const [labourCost, setLabourCost] = useState<number | undefined>();
  const [msp, setMsp] = useState<number | undefined>();
  const [marketPrice, setMarketPrice] = useState<number | undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCrop || !selectedState || !selectedDistrict || !msp || !marketPrice) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.promise(
      axios.post("https://ams-yivz.onrender.com/crop", {
        crop: selectedCrop,
        state: selectedState,
        district: selectedDistrict,
        msp,
        marketPrice,
        seedsCost,
        irrigationCost,
        fertilizerCost,
        labourCost,
      }),
      {
        loading: "Submitting crop data...",
        success: "Crop data submitted successfully!",
        error: "Error submitting the form",
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012E40] via-[#2B5876] to-[#C637A0] px-4 py-28">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Add Crop Data
        </h1>
        <div className="h-0.5 w-16 bg-yellow-400 mx-auto mb-8"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Crop Name */}
          <div>
            <label className="block text-white mb-2">Crop Name</label>
            <input
              type="text"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-white mb-2">State</label>
            <input
              type="text"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-white mb-2">District</label>
            <input
              type="text"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Seeds Cost */}
          <div>
            <label className="block text-white mb-2">Seeds Cost</label>
            <input
              type="number"
              value={seedsCost || ""}
              onChange={(e) => setSeedsCost(parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Irrigation Cost */}
          <div>
            <label className="block text-white mb-2">Irrigation Cost</label>
            <input
              type="number"
              value={irrigationCost || ""}
              onChange={(e) => setIrrigationCost(parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Fertilizer Cost */}
          <div>
            <label className="block text-white mb-2">Fertilizer Cost</label>
            <input
              type="number"
              value={fertilizerCost || ""}
              onChange={(e) => setFertilizerCost(parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Labour Cost */}
          <div>
            <label className="block text-white mb-2">Labour Cost</label>
            <input
              type="number"
              value={labourCost || ""}
              onChange={(e) => setLabourCost(parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* MSP */}
          <div>
            <label className="block text-white mb-2">MSP</label>
            <input
              type="number"
              value={msp || ""}
              onChange={(e) => setMsp(parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Market Price */}
          <div>
            <label className="block text-white mb-2">Market Price</label>
            <input
              type="number"
              value={marketPrice || ""}
              onChange={(e) => setMarketPrice(parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/90 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CostTrackingAdm;
