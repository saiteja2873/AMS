import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { type Crop } from "../components/types";

const PriceTracking: React.FC = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [data, setData] = useState<Crop[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [cropNames, setCropNames] = useState<string[]>([]);

  const districtsByState: Record<string, string[]> = {
    Tamilnadu: ["Chennai", "Coimbatore", "Madurai"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
    Maharastra: ["Mumbai", "Pune", "Nagpur"],
  };

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get("https://ams-yivz.onrender.com/crop/names");
        if (response.status !== 200) throw new Error("Failed to fetch crop data");
        setCropNames(response.data.crops);
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    };
    fetchCropData();
  }, []);

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setDistricts(state ? districtsByState[state] : []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  const handleCropChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(e.target.value);
  };

  const isDataPresent = (newCropData: Crop) =>
    data.some(
      (item) =>
        item.crop === newCropData.crop &&
        item.state === newCropData.state &&
        item.district === newCropData.district
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, isSubmit: boolean) => {
    e.preventDefault();

    if (!selectedState || !selectedDistrict || !selectedCrop) {
      toast.error("Please select a crop, state, and district.");
      return;
    }

    if (isSubmit) setLoadingSubmit(true);
    else setLoadingCompare(true);

    try {
      const response = await axios.get(
        `https://ams-yivz.onrender.com/crop?crop=${selectedCrop}&state=${selectedState}&district=${selectedDistrict}`
      );

      if (response.status === 200) {
        const newCropData: Crop = {
          ...response.data.cost,
          ...response.data.crop,
        };

        if (isDataPresent(newCropData)) {
          toast.error("Data is already present in the table");
        } else {
          setData((prev) => [...prev, newCropData]);
          toast.success("Data fetched successfully");
        }

        setTimeout(() => {
          tableRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        toast.error("No Crop Data Found");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingSubmit(false);
      setLoadingCompare(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-6 py-28"
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
      }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
        Price Tracking
      </h1>

      {/* Form Card */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
        <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Crop Name</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none text-black"
              value={selectedCrop}
              onChange={handleCropChange}
            >
              <option value="">Select Crop</option>
              {cropNames.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">State</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none text-black"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {Object.keys(districtsByState).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">District</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none text-black"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!districts.length}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-6 gap-4">
            <button
              type="submit"
              disabled={loadingSubmit}
              className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow-md"
            >
              {loadingSubmit ? "Loading..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e as any, false)}
              disabled={loadingCompare}
              className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold shadow-md"
            >
              {loadingCompare ? "Loading..." : "Compare"}
            </button>
          </div>
        </form>
      </div>

      {/* Results Table */}
      {data.length > 0 && (
        <div
          className="w-full max-w-6xl mt-12 overflow-x-auto"
          ref={tableRef}
        >
          <ShowResults data={data} />
        </div>
      )}
    </div>
  );
};

function ShowResults({ data }: { data: Crop[] }) {
  const calculateComparisonSummary = (data: Crop[]) => {
    if (data.length < 2) return null;

    const highestMarketPrice = data.reduce((max, crop) =>
      crop.marketPrice > max.marketPrice ? crop : max
    , data[0]);

    return `The Crop with the Highest Market Price is ${highestMarketPrice.crop} from ${highestMarketPrice.district}, ${highestMarketPrice.state} with a Market price of Rs. ${highestMarketPrice.marketPrice}`;
  };

  return (
    <>
      <table className="min-w-full text-center border-collapse rounded-lg shadow-lg bg-white font-medium">
        <thead>
          <tr className="bg-gray-900 text-white text-sm">
            <th className="px-6 py-3 border">Crop</th>
            <th className="px-6 py-3 border">State</th>
            <th className="px-6 py-3 border">District</th>
            <th className="px-6 py-3 border">MSP (Rs)</th>
            <th className="px-6 py-3 border">Market Price (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className={`odd:bg-gray-100 even:bg-gray-50`}>
              <td className="border px-6 py-3">{item.crop}</td>
              <td className="border px-6 py-3">{item.state}</td>
              <td className="border px-6 py-3">{item.district}</td>
              <td className="border px-6 py-3">{item.msp}</td>
              <td className="border px-6 py-3">{item.marketPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 1 && (
        <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg shadow text-center">
          <strong>Comparison Summary:</strong> {calculateComparisonSummary(data)}
        </div>
      )}
    </>
  );
}

export default PriceTracking;
