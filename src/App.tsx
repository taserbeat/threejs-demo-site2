import { useEffect, useRef } from "react";

import "./App.css";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const App = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateRender = () => {
      requestAnimationFrame(updateRender);
    };

    updateRender();

    return () => {};
  }, []);

  return (
    <div className="App">
      <div className="scene" ref={divRef}></div>
    </div>
  );
};

export default App;
