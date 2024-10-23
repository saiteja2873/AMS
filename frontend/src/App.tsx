import { Routes, Route } from "react-router-dom";
import NavBarComponent from "./navBarComponent";
import Landing from "./landing";
import Servics from "./services";
import Login from "./login";
import SignUp from "./signUp";
import CostTracking from "./costTracking";
import CostCalci from "./costCalci";
import WeatherComponent from "./weatherComponent";
import CostTrackingAdm from "./costTrackingAdm";

function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Servics />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/costTracking" element={<CostTracking />}></Route>
        <Route path="/costTrackingAdm" element={<CostTrackingAdm />}></Route>
        <Route path="costCalci" element={<CostCalci />}></Route>
        <Route path="/weatherComponent" element={<WeatherComponent />}></Route>
      </Routes>
    </>
  );
}

export default App;
