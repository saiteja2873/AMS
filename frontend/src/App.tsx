import { Routes, Route } from "react-router-dom";
import NavBarComponent from "./navBarComponent";
import Landing from "./landing";
import Servics from "./services";
import Login from "./login";
import SignUp from "./signUp";
import CostTracking from "./costTracking";
import PriceTracking from "./priceTracking";
import CostCalci from "./costCalci";
import WeatherComponent from "./weatherComponent";
import CostTrackingAdm from "./costTrackingAdm";
import { Toaster } from "sonner";
import useUser from '../components/state';
import About from "./about";


function App() {
  const {isAuthenticated} = useUser((state : any) => state.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <>
      <NavBarComponent />
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={isAuthenticated ? <Servics /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/services/costTracking" element={<CostTracking />} /> {/* Keep only one */}
        <Route path="/services/costTrackingAdm" element={<CostTrackingAdm />} />
        <Route path="/costCalci" element={<CostCalci />} /> {/* Corrected path */}
        <Route path="/services/weatherComponent" element={<WeatherComponent />} />
        <Route path="/services/priceTracking" element={<PriceTracking />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
