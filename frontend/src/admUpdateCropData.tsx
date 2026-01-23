import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { type Crop } from "../components/types";

const AdmUpdateCropData: React.FC = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [data, setData] = useState<Crop[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
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
        const response = await axios.get("https://ams-4-0xhb.onrender.com/crop/names");
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
          setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth" }), 500);
        } else {
          setData((prev) => [...prev, newCropData]);
          toast.success("Data fetched successfully");
          setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth" }), 500);
        }
      } else {
        toast.error("No Crop Data Found");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching crop data");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleEditClick = (crop: Crop) => {
    setEditingCrop(crop);
  };

  const handleUpdateSubmit = async (updatedCrop: Crop) => {
    try {
      const response = await axios.put("https://ams-4-0xhb.onrender.com/crop/update", {
        id: updatedCrop.id,
        crop: updatedCrop.crop,
        state: updatedCrop.state,
        district: updatedCrop.district,
        msp: updatedCrop.msp,
        marketPrice: updatedCrop.marketPrice,
        seedsCost: updatedCrop.seedsCost,
        irrigationCost: updatedCrop.irrigationCost,
        fertilizerCost: updatedCrop.fertilizerCost,
        labourCost: updatedCrop.labourCost,
      });

      if (response.status === 200) {
        setData((prev) => prev.map((item) => (item.id === updatedCrop.id ? updatedCrop : item)));
        toast.success("Crop data updated successfully");
        setEditingCrop(null);
      } else {
        toast.error("Failed to update crop data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating crop data");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://ams-4-0xhb.onrender.com/crop/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
      toast.success("Crop data deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting crop data");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#012E40] via-[#c637a4] to-[#c637a477] px-6 py-24 flex flex-col items-center"
    >
      <h1 className="text-white text-3xl font-bold mb-12">Update Crop Data</h1>

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl backdrop-brightness-125 rounded-xl p-8 shadow-lg border border-white/20 mb-12">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e, true)}>
          <div>
            <label className="block mb-2 font-medium text-white">Crop Name</label>
            <select
              value={selectedCrop}
              onChange={handleCropChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label className="block mb-2 font-medium text-white">State</label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label className="block mb-2 font-medium text-white">District</label>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!districts.length}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loadingSubmit}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loadingSubmit ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            } transition`}
          >
            {loadingSubmit ? "Loading..." : "Fetch Data"}
          </button>
        </form>
      </div>

      {data.length > 0 && (
        <div ref={tableRef} className="w-full max-w-6xl overflow-x-auto">
          <ShowResults data={data} onEdit={handleEditClick} onDelete={handleDelete} />
        </div>
      )}

      {editingCrop && (
        <UpdateForm crop={editingCrop} onSubmit={handleUpdateSubmit} onCancel={() => setEditingCrop(null)} />
      )}
    </div>
  );
};

function ShowResults({
  data,
  onEdit,
  onDelete,
}: {
  data: Crop[];
  onEdit: (crop: Crop) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <table className="min-w-full border-collapse rounded-lg shadow-lg bg-white font-medium text-center">
      <thead>
        <tr className="bg-gray-900 text-white text-sm">
          <th className="border border-gray-700 px-6 py-3">Crop</th>
          <th className="border border-gray-700 px-6 py-3">State</th>
          <th className="border border-gray-700 px-6 py-3">District</th>
          <th className="border border-gray-700 px-6 py-3">Seeds Cost (Rs)</th>
          <th className="border border-gray-700 px-6 py-3">Irrigation Cost (Rs)</th>
          <th className="border border-gray-700 px-6 py-3">Fertilizer Cost (Rs)</th>
          <th className="border border-gray-700 px-6 py-3">Labour Cost (Rs)</th>
          <th className="border border-gray-700 px-6 py-3">MSP (Rs)</th>
          <th className="border border-gray-700 px-6 py-3">Market Price (Rs)</th>
          <th className="border border-gray-700 px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="odd:bg-gray-100 even:bg-gray-50">
            <td className="border border-gray-300 px-6 py-3">{item.crop}</td>
            <td className="border border-gray-300 px-6 py-3">{item.state}</td>
            <td className="border border-gray-300 px-6 py-3">{item.district}</td>
            <td className="border border-gray-300 px-6 py-3">{item.seedsCost}</td>
            <td className="border border-gray-300 px-6 py-3">{item.irrigationCost}</td>
            <td className="border border-gray-300 px-6 py-3">{item.fertilizerCost}</td>
            <td className="border border-gray-300 px-6 py-3">{item.labourCost}</td>
            <td className="border border-gray-300 px-6 py-3">{item.msp}</td>
            <td className="border border-gray-300 px-6 py-3">{item.marketPrice}</td>
            <td className="border border-gray-300 px-6 py-3">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 text-white transition"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-white transition"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UpdateForm({
  crop,
  onSubmit,
  onCancel,
}: {
  crop: Crop;
  onSubmit: (updatedCrop: Crop) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Crop>(crop);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 space-y-6 relative"
      >
        <h2 className="text-2xl font-bold mb-4">Update Crop Data</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Seeds Cost</label>
            <input
              type="number"
              name="seedsCost"
              value={formData.seedsCost}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Irrigation Cost</label>
            <input
              type="number"
              name="irrigationCost"
              value={formData.irrigationCost}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Fertilizer Cost</label>
            <input
              type="number"
              name="fertilizerCost"
              value={formData.fertilizerCost}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Labour Cost</label>
            <input
              type="number"
              name="labourCost"
              value={formData.labourCost}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">MSP</label>
            <input
              type="number"
              name="msp"
              value={formData.msp}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Market Price</label>
            <input
              type="number"
              name="marketPrice"
              value={formData.marketPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdmUpdateCropData;
