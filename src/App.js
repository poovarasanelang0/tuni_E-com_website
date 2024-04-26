import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllHomePageImport from './Pages/Home/AllHomePageImport';
import JoggerMen from './Pages/JoggerMen/JoggerMen';
import SingleProduct from './Pages/SingleProduct/SingleProduct';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
       
        
          <Route path="/" element={<AllHomePageImport />} />
          <Route path="/JoggerMen" element={<JoggerMen />} />
          <Route path="/SingleProducts/:productId" element={<SingleProduct />} />


         
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
