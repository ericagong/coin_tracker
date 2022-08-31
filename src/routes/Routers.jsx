import { BrowserRouter, Route, Routes } from "react-router-dom";

import Coins from "../pages/Coins";
import Coin from "../pages/Coin";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Coins />} />
        <Route path='/:id' element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
