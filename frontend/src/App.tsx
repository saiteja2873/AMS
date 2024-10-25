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
import AdmServices from "./admServices";

function App() {
  const authenticated = useUser((state) => state.isAuthenticated);
  const user_role = useUser((state) => state.user_role);

  return (
    <>
      <NavBarComponent />
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={authenticated ? (user_role === 'ADMIN' ? <AdmServices/> : <Servics />) : <Login />} />
        <Route path="/login" element={authenticated ? < Landing/> : <Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/services/costTracking" element={<CostTracking />} /> {/* Keep only one */}
        <Route path="/admServices/costTrackingAdm" element={<CostTrackingAdm />} />
        <Route path="/costCalci" element={<CostCalci />} /> {/* Corrected path */}
        <Route path="/services/weatherComponent" element={<WeatherComponent />} />
        <Route path="/services/priceTracking" element={<PriceTracking />} />
        <Route path="/about" element={<About />} />
        <Route path="/admServices" element={<AdmServices/>}/>
      </Routes>
    </>
  );
}

export default App;
