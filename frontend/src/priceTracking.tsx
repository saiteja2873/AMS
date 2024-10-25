import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { type Crop } from '../components/types';

const PriceTracking: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedCrop, setSelectedCrop] = useState<string>('');
    const [districts, setDistricts] = useState<string[]>([]);
    const [data, setData] = useState<Crop[]>([]);
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/crop?crop=${selectedCrop}&state=${selectedState}&district=${selectedDistrict}`);
            if (response.status === 200) {
                toast.success('Data fetched successfully');
                setData(prevData => [...prevData, { ...response.data.cost, ...response.data.crop }]);
                tableRef.current?.scrollIntoView({ behavior: 'smooth' });
            } else {
                toast.error('Failed to fetch crop details');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleCompare = () => {
        setSelectedState('');
        setSelectedDistrict('');
        setSelectedCrop('');
    };

    return (
        <>
            <div style={{ background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)', height: '175vh', margin: 0 }}>
                <div className='bg-customGradient h-screen w-full brightness-105'>
                    <div className='absolute top-[20%] left-[45%] font-medium text-2xl text-customWhite'>Price Tracking</div>
                    <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[60%] border border-customWhite rounded-xl hover:shadow-[0_1.2px_2.2px_rgba(255,_255,_255,_0.034),_0_2px_5.3px_rgba(255,_255,_255,_0.048),_0_2px_2px_rgba(255,_255,_255,_0.06),_0_2px_2px_rgba(255,_255,_255,_0.072),_0_2px_2px_rgba(255,_255,_255,_0.086),_0_100px_80px_rgba(255,_255,_255,_0.12)] bg-customWhite/30 backdrop-blur-lg backdrop-brightness-125">
                        <form onSubmit={handleSubmit}>
                            <div className="absolute top-[20%] left-[25%] text-customWhite font-medium">
                                Crop Name:
                                <select className="absolute left-32 text-black rounded-lg w-44 h-7 px-3 cursor-pointer border border-black shadow-gray-600" value={selectedCrop} onChange={handleCropChange}>
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
                                State:
                                <select className="absolute left-32 text-black rounded-lg w-44 h-7 px-3 cursor-pointer border border-black shadow-gray-600" value={selectedState} onChange={handleStateChange}>
                                    <option value="">Select State</option>
                                    <option value="Tamilnadu">Tamilnadu</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Maharastra">Maharastra</option>
                                </select>
                            </div>
                            <div className="absolute top-[60%] left-[25%] text-customWhite font-medium">
                                District:
                                <select className="absolute left-32 text-black rounded-lg w-44 h-7 px-3 cursor-pointer border border-black shadow-gray-600" value={selectedDistrict} onChange={handleDistrictChange}>
                                    <option value="">Select District</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>{district}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="absolute top-[75%] left-[40%] px-8 py-2 text-sm font-medium text-white hover:bg-customBlue bg-customLightLightBlue focus:ring-2 focus:outline-none focus:ring-gray-900 rounded-3xl border text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-500">
                                Submit
                            </button>
                        </form>
                        <button onClick={handleCompare} className="absolute top-[85%] left-[36%] px-8 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-3xl transition duration-500">
                            Compare Crops
                        </button>
                    </div>
                </div>
                {data.length > 0 && (
                    <div ref={tableRef}>
                        <ShowResults data={data} />
                    </div>
                )}
            </div>
        </>
    );
};

function ShowResults({ data }: { data: Crop[] }) {
    const calculateComparisonSummary = (data: Crop[]) => {
        if (data.length < 2) return null;

        const highestMarketPrice = data.reduce((max, crop) => (crop.marketPrice > max.marketPrice ? crop : max), data[0]);
        return `The crop with the highest market price is ${highestMarketPrice.crop} from ${highestMarketPrice.district}, ${highestMarketPrice.state} with a market price of ${highestMarketPrice.marketPrice}.`;
    };

    return (
        <div className="p-8">
            <div className='absolute top-[100%] left-[32%]'>
                <div className='absolute text-white left-[-20%] font-medium text-2xl'>Crop Details</div>
                <table className='relative left-[-20%] top-12 min-w-full border-collapse border-1 shadow-[0_3px_20px_rgb(0,0,0,0.2)] border-customWhite rounded-xl text-customWhite font-medium'>
                    <thead>
                        <tr>
                            <th className='border border-customWhite px-10 py-2 text-center bg-gray-900'>Crop</th>
                            <th className='border border-customWhite px-10 py-2 text-center bg-gray-900'>State</th>
                            <th className='border border-customWhite px-10 py-2 text-center bg-gray-900'>District</th>
                            <th className='border border-customWhite px-10 py-2 text-center bg-gray-900'>MSP</th>
                            <th className='border border-customWhite px-10 py-2 text-center bg-gray-900'>Market Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cropData, index) => (
                            <tr key={index} className="bg-white text-black">
                                <td className='border border-customWhite px-10 py-4 text-center'>{cropData.crop}</td>
                                <td className='border border-customWhite px-10 py-2 text-center'>{cropData.state}</td>
                                <td className='border border-customWhite px-10 py-2 text-center'>{cropData.district}</td>
                                <td className='border border-customWhite px-10 py-2 text-center'>{cropData.msp}</td>
                                <td className='border border-customWhite px-10 py-2 text-center'>{cropData.marketPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.length > 1 && (
                    <div className="mt-4 p-4 relative left-[-20%] top-12 bg-gray-800 text-white rounded-lg">
                        <strong>Comparison Summary:</strong> {calculateComparisonSummary(data)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PriceTracking;
