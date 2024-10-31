import { Routes, Route, Navigate } from "react-router-dom";
import NavBarComponent from "./navBarComponent";
import Landing from "./landing";
import Services from "./services"; // Ensure this is correctly named
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
import AdmUpdateCropData from "./admUpdateCropData";
import { useEffect } from "react";
// import NotFound from "./NotFound"; // Import a NotFound component

function App() {
  const authenticated = useUser((state) => state.isAuthenticated);
  const user_role = useUser((state) => state.user_role);
  const toggleAuth2 = useUser((state) => state.toggleAuth2);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      toggleAuth2();
    }
  },[])
  return (
    <>
      <NavBarComponent />
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={authenticated ? (user_role == 'ADMIN' ? <AdmServices /> : <Services />) : <Login />} />
        <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/services/costTracking" element={<CostTracking />} />
        <Route path="/admServices/costTrackingAdm" element={<CostTrackingAdm />} />
        <Route path="/admServices/admUpdateCropData" element={<AdmUpdateCropData />} />
        <Route path="/costCalci" element={<CostCalci />} />
        <Route path="/services/weatherComponent" element={<WeatherComponent />} />
        <Route path="/services/priceTracking" element={<PriceTracking />} />
        <Route path="/about" element={<About />} />
        <Route path="/admServices" element={<AdmServices />} />
        {/* <Route></> */}
        {/* <Route path="*" element={<NotFound />} /> Handle non-existing routes */}
      </Routes>
    </>
  );
}

export default App;
