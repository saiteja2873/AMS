import React, { useState, ChangeEvent } from "react";
import axios from "axios";

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
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "80d6db588f8c6440c0a0530eace9811e";

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
      setError(err.response?.data?.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = () => {
    if (city.trim()) {
      fetchWeatherData(city.trim());
    } else {
      setError("Please enter a city name or pincode");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const groupByDate = (data: WeatherData["list"]) => {
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
    <div
      className="min-h-screen w-full flex flex-col items-center px-6 py-28"
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
      }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
        Weather Forecast
      </h1>

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 mb-12">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-900"
            placeholder="Enter Place Name or pincode (e.g., Delhi)"
            value={city}
            onChange={handleCityChange}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Forecast"}
          </button>
        </div>
        {error && (
          <p className="mt-4 text-red-400 font-medium text-center">{error}</p>
        )}
      </div>

      {weatherData && !loading && (
        <div className="w-full max-w-6xl overflow-x-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
          <h2 className="text-white font-semibold mb-6 text-center">
            City: {weatherData.city.name}, {weatherData.city.country}
          </h2>

          <table className="min-w-full border-collapse rounded-lg shadow-lg bg-white text-sm">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-6 py-3 border border-gray-700 text-center">Date</th>
                <th className="px-6 py-3 border border-gray-700 text-center">Time</th>
                <th className="px-6 py-3 border border-gray-700 text-center">
                  Temperature (°C)
                </th>
                <th className="px-6 py-3 border border-gray-700 text-center">Weather</th>
                <th className="px-6 py-3 border border-gray-700 text-center">Wind (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupByDate(weatherData.list)).map(([date, dayData]) =>
                dayData.map((day, index) => {
                  const formattedTime = new Date(day.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const windSpeedKmh = (day.wind.speed * 3.6).toFixed(1); // m/s to km/h
                  return (
                    <tr key={day.dt} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
                      {index === 0 && (
                        <td
                          rowSpan={dayData.length}
                          className="border border-gray-300 px-6 py-3 text-center font-medium"
                        >
                          {date}
                        </td>
                      )}
                      <td className="border border-gray-300 px-6 py-3 text-center">{formattedTime}</td>
                      <td className="border border-gray-300 px-6 py-3 text-center">{day.main.temp} °C</td>
                      <td className="border border-gray-300 px-6 py-3 text-center">{day.weather[0].description}</td>
                      <td className="border border-gray-300 px-6 py-3 text-center">{windSpeedKmh} km/h</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
