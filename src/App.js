import Checkout from "./checkout.js";
import Confirmation from "./confirmation.js";
import Products from "./products.js";
import { useState } from "react";

function App() {
  // User Info Handler
  const [dataF, setDataF] = useState({});

  // Cart Info Handler
  const [cart, setCart] = useState([]);

  //View Handler
  const [viewer, setViewer] = useState(0);

  return (
    <div>
      {viewer === 0 && (
        <Products
          dataF={dataF}
          setDataF={setDataF}
          viewer={viewer}
          setViewer={setViewer}
          cart={cart}
          setCart={setCart}
        />
      )}
      {viewer === 1 && (
        <Checkout
          dataF={dataF}
          setDataF={setDataF}
          viewer={viewer}
          setViewer={setViewer}
          cart={cart}
          setCart={setCart}
        />
      )}
      {viewer === 2 && (
        <Confirmation
          dataF={dataF}
          setDataF={setDataF}
          viewer={viewer}
          setViewer={setViewer}
          cart={cart}
          setCart={setCart}
        />
      )}
    </div>
  );
}

export default App;
