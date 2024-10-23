import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const CostTrackingAdm: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedCrop, setSelectedCrop] = useState<string>(''); 
    const [seedsCost, setSeedsCost] = useState<string>('');
    const [irrigationCost, setIrrigationCost] = useState<string>('');
    const [fertilizerCost, setFertilizerCost] = useState<string>('');
    const [labourCost, setLabourCost] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5173/costTrackingAdm', {
                crop: selectedCrop,
                state: selectedState,
                district: selectedDistrict,
                seedsCost,
                irrigationCost,
                fertilizerCost,
                labourCost,
            });

            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error("Error submitting the form", error);
            // Handle error as needed, e.g. show error message to the user
        }
    };

    return (
        <> 
        <div 
        style={{ 
                background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)', 
                height: '145vh',
                margin: 0 
            }}>
        <div >
        <div className='absolute top-[20%] left-[45%] font-medium text-2xl text-customWhite'>Cost Tracking</div>
            <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[90%] border border-customWhite rounded-xl hover:shadow-[0_1.2px_2.2px_rgba(255,_255,_255,_0.034),_0_2px_5.3px_rgba(255,_255,_255,_0.048),_0_2px_2px_rgba(255,_255,_255,_0.06),_0_2px_2px_rgba(255,_255,_255,_0.072),_0_2px_2px_rgba(255,_255,_255,_0.086),_0_100px_80px_rgba(255,_255,_255,_0.12)] bg-customWhite/30 backdrop-blur-lg backdrop-brightness-125">
                <form onSubmit={handleSubmit}>
                    <div className='absolute top-[6%] left-[43%] text-customWhite font-mona-sans text-2xl text-center'>Admin</div>
                    <div className="absolute top-[18%] left-[25%] text-customWhite font-medium">
                        Crop Name :
                        <input 
                            type='text' 
                            value={selectedCrop} 
                            onChange={(e) => setSelectedCrop(e.target.value)}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[26%] left-[25%] text-customWhite font-medium">
                        State :
                        <input 
                            type='text' 
                            value={selectedState} 
                            onChange={(e) => setSelectedState(e.target.value)}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[34%] left-[25%] text-customWhite font-medium">
                        District :
                        <input 
                            type='text' 
                            value={selectedDistrict} 
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[42%] left-[25%] text-customWhite font-medium">
                        Seeds Cost :
                        <input 
                            type='text' 
                            value={seedsCost} 
                            onChange={(e) => setSeedsCost(e.target.value)}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[50%] left-[25%] text-customWhite font-medium">
                        Irrigation Cost :
                        <input 
                            type='text' 
                            value={irrigationCost} 
                            onChange={(e) => setIrrigationCost(e.target.value)}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[58%] left-[25%] text-customWhite font-medium">
                        Fertilizer Cost :
                        <input 
                            type='text' 
                            value={fertilizerCost} 
                            onChange={(e) => setFertilizerCost(e.target.value)}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[66%] left-[25%] text-customWhite font-medium">
                        Labour Cost :
                        <input 
                            type='text' 
                            value={labourCost} 
                            onChange={(e) => setLabourCost(e.target.value)}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="absolute top-[78%] left-[40%] px-8 py-2 text-sm font-medium text-white hover:bg-customBlue bg-customLightLightBlue focus:ring-2 focus:outline-none focus:ring-gray-900 rounded-3xl border text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
            </div>
            </div>
        </>
    );
};

export default CostTrackingAdm;
