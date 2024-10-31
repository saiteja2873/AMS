import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { type Crop } from '../components/types';

const AdmUpdateCropData: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedCrop, setSelectedCrop] = useState<string>('');
    const [districts, setDistricts] = useState<string[]>([]);
    const [data, setData] = useState<Crop[]>([]);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [editingCrop, setEditingCrop] = useState<Crop | null>(null); // Track crop being edited
    const tableRef = useRef<HTMLDivElement>(null);

    const districtsByState: Record<string, string[]> = {
        Tamilnadu: ['Chennai', 'Coimbatore', 'Madurai'],
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
        Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
        Telangana: ['Hyderabad', 'Warangal', 'Nizamabad'],
        Maharastra: ['Mumbai', 'Pune', 'Nagpur'],
    };

    const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const state = event.target.value;
        setSelectedState(state);
        setDistricts(state ? districtsByState[state] : []);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(event.target.value);
    };

    const handleCropChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCrop(event.target.value);
    };

    const isDataPresent = (newCropData: Crop) => {
        return data.some(
            (item) =>
                item.crop === newCropData.crop &&
                item.state === newCropData.state &&
                item.district === newCropData.district
        );
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
        isSubmit: boolean
    ) => {
        e.preventDefault();

        if (!selectedState || !selectedDistrict || !selectedCrop) {
            toast.error('Please select a crop, state, and district.');
            return;
        }

        if (isSubmit) {
            setLoadingSubmit(true);
        }

        try {
            const response = await axios.get(
                `http://localhost:4000/crop?crop=${selectedCrop}&state=${selectedState}&district=${selectedDistrict}`
            );

            if (response.status === 200) {
                const newCropData: Crop = {
                    ...response.data.cost,
                    ...response.data.crop,
                };

                if (isDataPresent(newCropData)) {
                    toast.error('Data is already present in the table');
                    setTimeout(() => {
                        tableRef.current?.scrollIntoView({
                            behavior: 'smooth',
                        });
                    }, 500);
                } else {
                    setData((prevData) => [...prevData, newCropData]);
                    toast.success('Data fetched successfully');
                    setTimeout(() => {
                        tableRef.current?.scrollIntoView({
                            behavior: 'smooth',
                        });
                    }, 500);
                }
            } else {
                toast.error('No Crop Data Found');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleEditClick = (crop: Crop) => {
        setEditingCrop(crop); // Set the crop being edited
    };

    const handleUpdateSubmit = async (updatedCrop: Crop) => {
        try {
            const response = await axios.put('http://localhost:4000/crop/update', {
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
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === updatedCrop.id ? updatedCrop : item
                    )
                );
                toast.success('Crop data updated successfully');
                setEditingCrop(null); // Reset editing state
            } else {
                toast.error('Failed to update crop data');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while updating crop data');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:4000/crop/${id}`);
            setData((prevData) => prevData.filter((item) => item.id !== id));
            toast.success('Crop data deleted successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while deleting crop data');
        }
    }
    

    return (
        <>
            {/* Background and Form */}
            <div
                style={{
                    background:
                        'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)',
                    height: '160vh',
                    margin: 0,
                }}
            >
                <div className="bg-customGradient h-screen w-full brightness-105">
                    <div className="absolute top-[20%] left-[45%] font-medium text-2xl text-customWhite">
                        Update Crop Data
                    </div>
                    <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[50%] border border-customWhite rounded-xl hover:shadow-[0_1.2px_2.2px_rgba(255,_255,_255,_0.034),_0_2px_5.3px_rgba(255,_255,_255,_0.048),_0_2px_2px_rgba(255,_255,_255,_0.06),_0_2px_2px_rgba(255,_255,_255,_0.072),_0_2px_2px_rgba(255,_255,_255,_0.086),_0_100px_80px_rgba(255,_255,_255,_0.12)] bg-customWhite/30 backdrop-blur-lg backdrop-brightness-125">
                        <form onSubmit={(e) => handleSubmit(e, true)}>
                            {/* Crop Selection */}
                            <div className="absolute top-[20%] left-[25%] text-customWhite font-medium">
                                Crop Name :
                                <select
                                    className="absolute left-32 text-black rounded-lg w-44 h-7 px-3 cursor-pointer border border-black shadow-gray-600"
                                    value={selectedCrop}
                                    onChange={handleCropChange}
                                >
                                    <option value="">Select Crop</option>
                                    <option value="Paddy">Paddy</option>
                                    <option value="Wheat">Wheat</option>
                                    <option value="Cotton">Cotton</option>
                                    <option value="Mirchi">Mirchi</option>
                                    <option value="Maize">Maize</option>
                                    <option value="Barley">Barley</option>
                                </select>
                            </div>

                            {/* State Selection */}
                            <div className="absolute top-[40%] left-[25%] text-customWhite font-medium">
                                State :
                                <select
                                    className="absolute left-32 text-black rounded-lg w-44 h-7 px-3 cursor-pointer border border-black shadow-gray-600"
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

                            {/* District Selection */}
                            <div className="absolute top-[60%] left-[25%] text-customWhite font-medium">
                                District :
                                <select
                                    className="absolute left-32 text-black rounded-lg w-44 h-7 px-3 cursor-pointer border border-black shadow-gray-600"
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loadingSubmit}
                                className="absolute top-[80%] left-[41%] px-8 py-2 text-sm font-medium text-white hover:bg-customBlue bg-customLightLightBlue focus:ring-2 focus:outline-none focus:ring-gray-900 rounded-3xl border text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-500"
                            >
                                {loadingSubmit ? 'Loading...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Data Table */}
                {data.length > 0 && (
                    <div ref={tableRef}>
                        <ShowResults data={data} onEdit={handleEditClick} onDelete={handleDelete} />
                    </div>
                )}

                {/* Update Form */}
                {editingCrop && (
                    <UpdateForm crop={editingCrop} onSubmit={handleUpdateSubmit} />
                )}
            </div>
        </>
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
        <div className="p-8 flex justify-center items-center">
            <div className="">
                <table className="min-w-full border-collapse border-1 shadow-[0_3px_20px_rgb(0,0,0,0.2)] border-customWhite rounded-xl text-customWhite font-medium">
                    <thead>
                        <tr>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">Crop</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">State</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">District</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">Seeds Cost (Rs)</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">Irrigation Cost (Rs)</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">Fertilizer Cost (Rs)</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">Labour Cost (Rs)</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">MSP (Rs)</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">Market Price (Rs)</th>
                            <th className="border border-customWhite px-10 py-2 text-center bg-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="bg-white text-black">
                                <td className="border border-customWhite px-10 py-4 text-center">{item.crop}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.state}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.district}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.seedsCost}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.irrigationCost}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.fertilizerCost}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.labourCost}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.msp}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">{item.marketPrice}</td>
                                <td className="border border-customWhite px-10 py-2 text-center">
                                    <div className='flex gap-2'>
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                        Delete
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function UpdateForm({
    crop,
    onSubmit,
}: {
    crop: Crop;
    onSubmit: (updatedCrop: Crop) => void;
}) {
    const [formData, setFormData] = useState<Crop>(crop);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: parseFloat(value) });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Update Crop Data</h2>
                <label>Seeds Cost</label>
                <input name="seedsCost" value={formData.seedsCost} onChange={handleChange} />
                <label>Irrigation Cost</label>
                <input name="irrigationCost" value={formData.irrigationCost} onChange={handleChange} />
                <label>Fertilizer Cost</label>
                <input name="fertilizerCost" value={formData.fertilizerCost} type="number" onChange={handleChange} />
                <label>Labour Cost</label>
                <input name="labourCost" value={formData.labourCost} onChange={handleChange} />
                <label>MSP</label>
                <input name="msp" value={formData.msp} onChange={handleChange} />
                <label>Market Price</label>
                <input name="marketPrice" value={formData.marketPrice} onChange={handleChange} />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit</button>
            </div>
        </form>
    );
}

export default AdmUpdateCropData;
