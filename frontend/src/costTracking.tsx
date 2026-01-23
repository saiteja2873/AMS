import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { type Crop } from "../components/types";

const CostTracking: React.FC = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [data, setData] = useState<Crop[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [cropNames, setCropNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get("https://ams-4-0xhb.onrender.com/crop/names");
        if (response.status !== 200) throw new Error("Failed to fetch crop data");

        setCropNames(response.data.crops);
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    };
    fetchCropData();
  }, []);

  const districtsByState: Record<string, string[]> = {
    Tamilnadu: ["Chennai", "Coimbatore", "Madurai"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
    Maharastra: ["Mumbai", "Pune", "Nagpur"],
  };

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedState(state);
    setDistricts(state ? districtsByState[state] : []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
  };

  const handleCropChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(event.target.value);
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
        `https://ams-4-0xhb.onrender.com/crop?crop=${selectedCrop}&state=${selectedState}&district=${selectedDistrict}`
      );

      if (response.status === 200) {
        const newCropData: Crop = {
          ...response.data.cost,
          ...response.data.crop,
        };

        if (isDataPresent(newCropData)) {
          toast.error("Data is already present in the table");
        } else {
          setData((prevData) => [...prevData, newCropData]);
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
      className="min-h-screen w-full flex flex-col items-center justify-start px-6 py-28"
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
      }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-10">
        🌱 Cost Tracking
      </h1>

      {/* Form Card */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
        <form
          className="space-y-6"
          onSubmit={(e) => handleSubmit(e, true)}
        >
          {/* Crop */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Crop Name
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
              value={selectedCrop}
              onChange={handleCropChange}
            >
              <option value="">Select Crop</option>
              {cropNames &&
                cropNames.map((cropname) => (
                  <option key={cropname} value={cropname}>
                    {cropname}
                  </option>
                ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-white font-semibold mb-2">
              State
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              <option value="Tamilnadu">Tamilnadu</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Kerala">Kerala</option>
              <option value="Telangana">Telangana</option>
              <option value="Maharastra">Maharastra</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-white font-semibold mb-2">
              District
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
            <button
              type="submit"
              disabled={loadingSubmit}
              className="flex-1 px-6 py-2 rounded-lg bg-indigo-500 text-white font-medium shadow-md hover:bg-indigo-600 transition"
            >
              {loadingSubmit ? "Loading..." : "Submit"}
            </button>

            <button
              type="button"
              disabled={loadingCompare}
              onClick={(e) =>
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>, false)
              }
              className="flex-1 px-6 py-2 rounded-lg bg-emerald-500 text-white font-medium shadow-md hover:bg-emerald-600 transition"
            >
              {loadingCompare ? "Loading..." : "Compare"}
            </button>
          </div>
        </form>
      </div>

      {/* Results Table */}
      {data.length > 0 && (
        <div ref={tableRef} className="w-full max-w-6xl mt-12 overflow-x-auto">
          <ShowResults data={data} />
        </div>
      )}
    </div>
  );
};

function ShowResults({ data }: { data: Crop[] }) {
  const calculateComparisonSummary = (data: Crop[]) => {
    if (data.length < 2) return null;

    const lowestCostCrop = data.reduce(
      (min, crop) => {
        const totalCost =
          crop.irrigationCost + crop.seedsCost + crop.labourCost;
        const minTotalCost = min.totalCost;

        return totalCost < minTotalCost ? { crop, totalCost } : min;
      },
      {
        crop: data[0],
        totalCost: data[0].irrigationCost + data[0].seedsCost + data[0].labourCost,
      }
    );

    return `The Crop with the Lowest Total Cost is ${lowestCostCrop.crop.crop} from ${lowestCostCrop.crop.district}, ${lowestCostCrop.crop.state} with a Total Cost of Rs. ${lowestCostCrop.totalCost}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border shadow-md border-gray-300 rounded-lg bg-white">
        <thead>
          <tr className="bg-gray-900 text-white text-sm">
            <th className="px-6 py-3 border">Crop</th>
            <th className="px-6 py-3 border">State</th>
            <th className="px-6 py-3 border">District</th>
            <th className="px-6 py-3 border">Seeds Cost (Rs/kg)</th>
            <th className="px-6 py-3 border">Irrigation Cost (Rs/acre)</th>
            <th className="px-6 py-3 border">Fertilizer Cost (Rs/kg)</th>
            <th className="px-6 py-3 border">Labour Cost (Rs/acre)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-gray-100 even:bg-gray-50 text-center text-sm"
            >
              <td className="px-6 py-3 border">{item.crop}</td>
              <td className="px-6 py-3 border">{item.state}</td>
              <td className="px-6 py-3 border">{item.district}</td>
              <td className="px-6 py-3 border">{item.seedsCost}</td>
              <td className="px-6 py-3 border">{item.irrigationCost}</td>
              <td className="px-6 py-3 border">{item.fertilizerCost}</td>
              <td className="px-6 py-3 border">{item.labourCost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length > 1 && (
        <div className="mt-6 p-4 bg-slate-800 text-white rounded-lg shadow">
          <strong>Comparison Summary:</strong>{" "}
          {calculateComparisonSummary(data)}
        </div>
      )}
    </div>
  );
}

export default CostTracking;
