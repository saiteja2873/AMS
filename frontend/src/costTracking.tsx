import React, { useState, ChangeEvent, FormEvent } from 'react';
// import CostCalci from './costCalci'

// let showCostCalci = false
const CostTracking: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedCrop, setSelectedCrop] = useState<string>(''); // State for the selected crop
    const [districts, setDistricts] = useState<string[]>([]);

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/costTracking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                crop: selectedCrop,
                state: selectedState,
                district: selectedDistrict,
            }),
        }
    );
    // showCostCalci = true

        const data = await response.json();
        console.log(data); // Handle the response as needed
    };

    return (
        <> 
            <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[50%] border border-black rounded-xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-customLightBlue">
                <form onSubmit={handleSubmit}>
                    <div className="absolute top-[20%] left-[20%] text-customWhite font-medium">
                        Crop Name
                        <select 
                            className="absolute left-32 text-black rounded-xl w-40 h-7 px-3 cursor-pointer border border-black shadow-gray-600" 
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
                    <div className="absolute top-[40%] left-[20%] text-customWhite font-medium">
                        State
                        <select 
                            className="absolute left-32 text-black rounded-xl w-40 h-7 px-3 cursor-pointer border border-black shadow-gray-600" 
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
                    <div className="absolute top-[60%] left-[20%] text-customWhite font-medium">
                        District
                        <select 
                            className="absolute left-32 text-black rounded-xl w-40 h-7 px-3 cursor-pointer border border-black shadow-gray-600" 
                            value={selectedDistrict} 
                            onChange={handleDistrictChange}
                        >
                            <option value="">Select District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="absolute top-[80%] left-[43%] px-8 py-2 text-sm font-medium text-white hover:bg-customBlue bg-customLightLightBlue focus:ring-2 focus:outline-none focus:ring-gray-900 rounded-3xl border text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-500"
                    >
                        Submit
                    </button>
                </form>
                {/* {showCostCalci && <CostCalci />} */}
            </div>
        </>
    );
};

export default CostTracking;
