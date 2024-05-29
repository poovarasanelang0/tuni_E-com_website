import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllHomePageImport from './Pages/Home/AllHomePageImport';
import JoggerMen from './Pages/JoggerMen/JoggerMen';
import SingleProduct from './Pages/SingleProduct/SingleProduct';
import FullHandTshirt from './Pages/Tshirt/FullHandTshirt/FullHandTshirt';
import HalfHandTshirt from './Pages/Tshirt/HalfHandTshirt/HalfHandTshirt';
import CollarTshirt from './Pages/Tshirt/CollarTshirt/CollarTshirt';
import Login from './Compoment/Login/Login';
import Payment from './Pages/Payment/Payment';
import FullHandShirt from "./Pages/Shirts/FullHandShirt/FullHandShirt";
import HalfHandShirt from "./Pages/Shirts/HalfHandShirt/HalfHandShirt";
import CollarShirt from "./Pages/Shirts/CollarShirt/CollarShirt";
import RoundNeck from "./Pages/Tshirt/RoundNeck/RoundNeck";
import VNeck from "./Pages/Tshirt/VNeck/VNeck";
import WomenPant from "./Pages/Women/WomenPant/WomenPant";
import Contact from "./Pages/Contact/Contact";
import Account from "./Pages/Account/Account";
import MensCombo from "./Pages/Comboo/MensCombo/MensCombo";
import WomensCombo from "./Pages/Comboo/WomensCombo/WomensCombo";
import ComboGetSingle from "./Pages/Comboo/ComboGetSingle/ComboGetSingle";
import SingleProductCombo from "./Pages/Comboo/SingleProductCombo/SingleProductCombo";




function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<AllHomePageImport />} />
          <Route path="/JoggerMen" element={<JoggerMen />} />
          <Route path="/SingleProducts/:productId" element={<SingleProduct />} />
          <Route path="/FullHandTshirt" element={<FullHandTshirt />} />
          <Route path="/HalfHandTshirt" element={<HalfHandTshirt />} />
          <Route path="/CollarTshirt" element={<CollarTshirt />} />
          <Route path="/RoundNeck" element={<RoundNeck />} />
          <Route path="/VNeck" element={<VNeck />} />
          <Route path="/FullHandShirt" element={<FullHandShirt />} />
          <Route path="/HalfHandShirt" element={<HalfHandShirt />} />
          <Route path="/CollarShirt" element={<CollarShirt />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/WomenPant" element={<WomenPant />} />
          <Route path="/MensCombo" element={<MensCombo />} />
          <Route path="/WomensCombo" element={<WomensCombo />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/SingleProductCombo" element={<SingleProductCombo />} />
          <Route path="/Login" element={<Login />} />

         






         
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
