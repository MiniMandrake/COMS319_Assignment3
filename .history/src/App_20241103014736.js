import Payment from "./MyPayment.js";
import Summary from "./MySummary.js";
import { useState } from "react";

function App() {
  // Data Handler
  const [dataF, setDataF] = useState({});

  //View Handler
  const [viewer, setViewer] = useState(0);

  return (
    <div>
      {viewer === 0 && (
        <Payment
          dataF={dataF}
          setDataF={setDataF}
          viewer={viewer}
          setViewer={setViewer}
        />
      )}
      {viewer === 1 && (
        <Summary
          dataF={dataF}
          setDataF={setDataF}
          viewer={viewer}
          setViewer={setViewer}
        />
      )}
    </div>
  );
}

export default App;
