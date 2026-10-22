import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Ylatunniste from "./components/Ylatunniste";
import GlobalState from "./context/GlobalState";
import Urheilijat from "./components/Urheilijat";
import MuokkaaUrheilija from "./components/MuokkaaUrheilija";
import LisaaUrheilija from "./components/LisaaUrheilija";
import Tietoa from "./pages/Tietoa";

function App() {
  return (
    <>
      <GlobalState>
        <BrowserRouter>
          <div className="App">
            <Ylatunniste turvataso="keskisuuri" />
            <div className="container">
              <Routes>
                <Route path="/" element={<Urheilijat />} />

                <Route path="/urheilija/lisaa" element={<LisaaUrheilija />} />

                <Route
                  path="/urheilija/muokkaa/:id"
                  element={<MuokkaaUrheilija />}
                />

                <Route path="/tietoa" element={<Tietoa />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </GlobalState>
    </>
  );
}

export default App;
