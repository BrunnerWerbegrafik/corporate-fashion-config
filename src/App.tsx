import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { LogoFileProvider } from "./contexts/LogoFileContext";
import { StartseitePage } from "./pages/StartseitePage";
import { TextilartPage } from "./pages/TextilartPage";
import { AnfragekorbPage } from "./pages/AnfragekorbPage";
import { AnfragePage } from "./pages/AnfragePage";
import { AnfrageErfolgPage } from "./pages/AnfrageErfolgPage";
import { ImpressumPage, DatenschutzPage, AgbPage } from "./pages/LegalPages";

function App() {
  return (
    <CartProvider>
      <LogoFileProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartseitePage />} />
            <Route path="/textilart/:textileTypeId" element={<TextilartPage />} />
            <Route path="/anfragekorb" element={<AnfragekorbPage />} />
            <Route path="/anfrage" element={<AnfragePage />} />
            <Route path="/anfrage/erfolg" element={<AnfrageErfolgPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/agb" element={<AgbPage />} />
            <Route path="*" element={<StartseitePage />} />
          </Routes>
        </BrowserRouter>
      </LogoFileProvider>
    </CartProvider>
  );
}

export default App;
