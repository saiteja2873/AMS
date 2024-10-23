import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
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
        const localAxios = axios.create({
            baseURL: 'http://localhost:5173',
        })
        try {
            const response = await localAxios.post('/costTracking', {
                crop: selectedCrop,
                state: selectedState,
                district: selectedDistrict,
            });
            
            // showCostCalci = true
    
            const result = response.data; // axios automatically parses JSON
            console.log(result); // Handle the response as needed
        } catch (error) {
            console.error('Error:', error); // Handle error
        }
    };
    

    return (
        <> 
        <div 
        style={{ 
                background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)', 
                height: '205vh',
                margin: 0 
            }}>
        <div className='bg-customGradient h-screen w-full brightness-105'>
        <div className='absolute top-[20%] left-[45%] font-medium text-2xl text-customWhite'>Cost Tracking</div>
            <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[50%] border border-customWhite rounded-xl hover:shadow-[0_1.2px_2.2px_rgba(255,_255,_255,_0.034),_0_2px_5.3px_rgba(255,_255,_255,_0.048),_0_2px_2px_rgba(255,_255,_255,_0.06),_0_2px_2px_rgba(255,_255,_255,_0.072),_0_2px_2px_rgba(255,_255,_255,_0.086),_0_100px_80px_rgba(255,_255,_255,_0.12)] bg-customWhite/30 backdrop-blur-lg backdrop-brightness-125">
                <form onSubmit={handleSubmit}>
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
                    <div className="absolute top-[60%] left-[25%] text-customWhite font-medium">
                        District :
                        <select 
                            className="absolute left-32 text-black rounded-lg w-44 h-7 px-3 cursor-pointer border border-black shadow-gray-600" 
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
                        className="absolute top-[80%] left-[40%] px-8 py-2 text-sm font-medium text-white hover:bg-customBlue bg-customLightLightBlue focus:ring-2 focus:outline-none focus:ring-gray-900 rounded-3xl border text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-500"
                    >
                        Submit
                    </button>
                </form>
                {/* {showCostCalci && <CostCalci />} */}
            </div>
            </div>
            </div>
        </>
    );
};

export default CostTracking;
