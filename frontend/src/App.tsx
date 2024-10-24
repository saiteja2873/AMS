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


function App() {
  return (
    <>
      <NavBarComponent />
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Servics />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/services/costTracking" element={<CostTracking />}></Route>
        <Route path="/services/costTracking" element={<CostTrackingAdm />}></Route>
        <Route path="/services/costTrackingAdm" element={<CostTrackingAdm />}></Route>
        <Route path="costCalci" element={<CostCalci />}></Route>
        <Route path="/services/weatherComponent" element={<WeatherComponent />}></Route>
        <Route path="/services/priceTracking" element={<PriceTracking />}></Route>
      </Routes>
    </>
  );
}

export default App;
