import { BrowserRouter, Route, Routes } from "react-router-dom";

import Coins from "../pages/Coins";
import Coin from "../pages/Coin";
import Price from "../components/Price";
import Chart from "../components/Chart";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Coins />} />
        <Route path='/:id' element={<Coin />}>
          <Route path='price' element={<Price />} />
          <Route path='chart' element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
