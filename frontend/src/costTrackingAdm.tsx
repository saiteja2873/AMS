import React, { useState, ChangeEvent, FormEvent } from 'react';
// import CostCalci from './costCalci'

// let showCostCalci = false
const CostTrackingAdm: React.FC = () => {
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
        <div 
        style={{ 
                background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)', 
                height: '205vh',
                margin: 0 
            }}>
        <div className='bg-customGradient h-screen w-full brightness-105'>
        <div className='absolute top-[20%] left-[45%] font-medium text-2xl text-customWhite'>Cost Tracking</div>
            <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[90%] border border-customWhite rounded-xl hover:shadow-[0_1.2px_2.2px_rgba(255,_255,_255,_0.034),_0_2px_5.3px_rgba(255,_255,_255,_0.048),_0_2px_2px_rgba(255,_255,_255,_0.06),_0_2px_2px_rgba(255,_255,_255,_0.072),_0_2px_2px_rgba(255,_255,_255,_0.086),_0_100px_80px_rgba(255,_255,_255,_0.12)] bg-customWhite/30 backdrop-blur-lg backdrop-brightness-125">
                <form onSubmit={handleSubmit}>
                    <div className='absolute top-[6%] left-[43%] text-customWhite font-mona-sans text-2xl text-center'>Admin</div>
                    <div className="absolute top-[18%] left-[25%] text-customWhite font-medium">
                        Crop Name :
                        <input type='text' className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'>
                        </input>
                    </div>
                    <div className="absolute top-[26%] left-[25%] text-customWhite font-medium">
                        State :
                        <input className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'></input>
                    </div>
                    <div className="absolute top-[34%] left-[25%] text-customWhite font-medium">
                        District :
                        <input className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'></input>
                    </div>
                    <div className="absolute top-[42%] left-[25%] text-customWhite font-medium">
                        Seeds Cost :
                        <input type='text' className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'></input>
                    </div>
                    <div className="absolute top-[50%] left-[25%] text-customWhite font-medium">
                        Irrigation Cost :
                        <input type='text' className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'></input>
                    </div>
                    <div className="absolute top-[58%] left-[25%] text-customWhite font-medium">
                        Fertilizer Cost :
                        <input type='text' className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'></input>
                    </div>
                    <div className="absolute top-[66%] left-[25%] text-customWhite font-medium">
                        Labour Cost :
                        <input type='text' className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'></input>
                    </div>
                    <button 
                        type="submit" 
                        className="absolute top-[78%] left-[40%] px-8 py-2 text-sm font-medium text-white hover:bg-customBlue bg-customLightLightBlue focus:ring-2 focus:outline-none focus:ring-gray-900 rounded-3xl border text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-500"
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

export default CostTrackingAdm;
