import ParkingComponenet from "./Component/ParkingApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parkingsloat from "./Component/ParkingLots";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ParkingComponenet />}></Route>
            <Route path="/ParkingLots" element={<Parkingsloat />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
