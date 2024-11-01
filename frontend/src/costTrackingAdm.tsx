import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const CostTrackingAdm: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedCrop, setSelectedCrop] = useState<string>(''); 
    const [seedsCost, setSeedsCost] = useState<number | undefined>();
    const [irrigationCost, setIrrigationCost] = useState<number | undefined>();
    const [fertilizerCost, setFertilizerCost] = useState<number | undefined>();
    const [labourCost, setLabourCost] = useState<number | undefined>();
    const [msp, setMsp] = useState<number | undefined>();
    const [marketPrice, setMarketPrice] = useState<number | undefined>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        if (!selectedCrop || !selectedState || !selectedDistrict || !msp || !marketPrice) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Use toast.promise for loading, success, and error handling
        toast.promise(
            axios.post('http://localhost:4000/crop', {
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
                error: "Error submitting the form"
            }
        );
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
            <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[90%] border border-customWhite rounded-xl hover:shadow-[0_1.2px_2.2px_rgba(255,_255,_255,_0.034),_0_2px_5.3px_rgba(255,_255,_255,_0.048),_0_2px_2px_rgba(255,_255,_255,_0.06),_0_2px_2px_rgba(255,_255,_255,_0.072),_0_2px_2px_rgba(255,_255,_255,_0.086),_0_100px_80px_rgba(255,_255,_255,_0.12)] bg-customWhite/30 backdrop-blur-lg backdrop-brightness-125">
                
                <form onSubmit={handleSubmit}>
                    <div className='absolute top-[6%] left-[42%] font-mona-sans text-2xl font-medium text-center text-gray-950'>Add Crops</div>
                    <div className='absolute top-[13%] left-[5%] underline w-11/12 h-0.5 bg-gray-950'></div>
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
                            type='number' 
                            value={seedsCost || ''} 
                            onChange={(e) => setSeedsCost(parseFloat(e.target.value))}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[50%] left-[25%] text-customWhite font-medium">
                        Irrigation Cost :
                        <input 
                            type='number' 
                            value={irrigationCost || ''} 
                            onChange={(e) => setIrrigationCost(parseFloat(e.target.value))}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[58%] left-[25%] text-customWhite font-medium">
                        Fertilizer Cost :
                        <input 
                            type='number' 
                            value={fertilizerCost || ''} 
                            onChange={(e) => setFertilizerCost(parseFloat(e.target.value))}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[66%] left-[25%] text-customWhite font-medium">
                        Labour Cost :
                        <input 
                            type='number' 
                            value={labourCost || ''} 
                            onChange={(e) => setLabourCost(parseFloat(e.target.value))}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[74%] left-[25%] text-customWhite font-medium">
                        MSP :
                        <input 
                            type='number' 
                            value={msp || ''} 
                            onChange={(e) => setMsp(parseFloat(e.target.value))}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <div className="absolute top-[82%] left-[25%] text-customWhite font-medium">
                        Market Price :
                        <input 
                            type='number' 
                            value={marketPrice || ''} 
                            onChange={(e) => setMarketPrice(parseFloat(e.target.value))}
                            className='absolute left-32 text-black rounded-lg w-44 h-7 px-3 border border-black shadow-gray-600'
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="absolute top-[92%] left-[40%] px-8 py-2 text-sm font-medium text-white hover:bg-customBlue bg-customLightLightBlue focus:ring-2 focus:outline-none focus:ring-gray-900 rounded-3xl border text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-500"
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
