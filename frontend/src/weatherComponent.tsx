import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

interface WeatherData {
    city: {
        name: string;
        country: string;
    };
    list: Array<{
        dt: number;
        main: {
            temp: number;
        };
        weather: Array<{
            description: string;
        }>;
        wind: {
            speed: number;
            deg: number;
        };
    }>;
}

const WeatherComponent: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const apiKey = '80d6db588f8c6440c0a0530eace9811e';

    const fetchWeatherData = async (city: string) => {
        setError(null);
        setWeatherData(null);
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleSubmit = () => {
        fetchWeatherData(city);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const groupByDate = (data: WeatherData['list']) => {
        return data.reduce((acc, day) => {
            const date = formatDate(day.dt);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(day);
            return acc;
        }, {} as Record<string, typeof data>);
    };

    return (
        <>
        <div style={{ 
                background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)', 
                height: '460vh',
                margin: 0 
            }}>
            <h1 className='absolute left-[45%] top-[15%] font-bold text-2xl text-customWhite'>Weather Forecast</h1>
            <div className='absolute top-[27%] left-[21%] box-border w-[60%] h-[300%]'>
                <div>
                    <div className='absolute left-[11%] top-[-1%] box-border w-[78%] h-[6%] border-2 border-black bg-gray-400 rounded-xl'></div>
                    <input
                        className='absolute left-[19%] top-4 block p-2.5 w-[31%] text-sm font-medium text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        type="text"
                        value={city}
                        onChange={handleCityChange}
                        onKeyDown={handleKeyPress}  // Add this line
                        placeholder="Enter Place Name or pincode (e.g., Delhi)"
                    />
                    <button onClick={handleSubmit} className='absolute left-[57%] top-5 border-2 border-customBlue rounded-2xl px-3 py-1 hover:bg-customBlue hover:text-customWhite transition duration-500'>Get Forecast</button>

                    {error && <p className='absolute left-[20%] top-[3%]'>Error: {error}</p>}
                    
                    {loading && <p className='absolute left-[20%] top-[3%]'>Loading...</p>}

                    {weatherData && !loading && (
                        <div className='absolute top-28 left-[2%]'>
                            <h2 className='absolute top-[-1.5%] left-[16%] font-medium'>City: {weatherData.city.name}, {weatherData.city.country}</h2>
                            <table className='relative left-[-4%] top-8 min-w-full border-collapse border-1 shadow-[0_3px_20px_rgb(0,0,0,0.2)] border-customWhite rounded-xl text-customWhite font-medium'>
                                <thead>
                                    <tr>
                                        <th className='border border-customWhite px-20 py-2 text-center text-gray-900 bg-gray-400'>Date</th>
                                        <th className='border border-customWhite px-20 py-2 text-center text-gray-900 bg-gray-400'>Time</th>
                                        <th className='border border-customWhite px-10 py-2 text-center text-gray-900 bg-gray-400'>Temperature (°C)</th>
                                        <th className='border border-customWhite px-10 py-2 text-center text-gray-900 bg-gray-400'>Weather</th>
                                        <th className='border border-customWhite px-20 py-2 text-center text-gray-900 bg-gray-400'>Wind (km/h)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(groupByDate(weatherData.list)).map(([date, dayData]) => (
                                        dayData.map((day, index) => {
                                            const formattedTime = new Date(day.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                            const windSpeedKmh = (day.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
                                            
                                            return (
                                                <tr key={day.dt}>
                                                    {index === 0 && (
                                                        <td rowSpan={dayData.length} className='border border-customWhite px-10 py-2 text-center'>{date}</td>
                                                    )}
                                                    <td className='border border-customWhite px-10 py-2 text-center'>{formattedTime}</td>
                                                    <td className='border border-customWhite px-10 py-5 text-center'>{day.main.temp} °C</td>
                                                    <td className='border border-customWhite px-10 py-2 text-center'>{day.weather[0].description}</td>
                                                    <td className='border border-customWhite px-10 py-2 text-center'>{windSpeedKmh} km/h</td>
                                                </tr>
                                            );
                                        })
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </>
    );
};

export default WeatherComponent;
