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
      <div className="webgl" ref={divRef}></div>

      <main>
        <h1>ポートフォリオ</h1>

        <section>
          <h2>突き詰める最高のスキルを</h2>
        </section>

        <section>
          <h2>My Project</h2>
          <p>私の作った作品です</p>
        </section>

        <section>
          <h2>My Skills</h2>
          <p>HTML/CSS/JavaScript</p>
        </section>

        <section>
          <h2>Enginer</h2>
          <p>学び続ける好奇心</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>お問合せはこちら</p>
          <button>こちらから</button>
        </section>
      </main>
    </div>
  );
};

export default App;
