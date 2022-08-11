import { useEffect, useRef } from "react";
import * as THREE from "three";

import "./App.css";
import bgJpg from "./assets/images/bg.jpg";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// シーン
const scene = new THREE.Scene();

// 背景用のテクスチャ
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load(bgJpg);

scene.background = backgroundTexture;

// カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// オブジェクトを作成
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.position.set(0, 0.5, -15);
box.rotation.set(1, 1, 0);

const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

torus.position.set(0, 1, 10);

scene.add(box, torus);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const App = () => {
  const refDiv = useRef<HTMLDivElement>(null);

  const handleOnBrowserResize = () => {
    // カメラのアスペクト比を修正
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // レンダラーを修正
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    return;
  };

  useEffect(() => {
    refDiv.current?.appendChild(renderer.domElement);

    window.addEventListener("resize", handleOnBrowserResize);

    const updateRender = () => {
      // レンダー
      renderer.render(scene, camera);

      // アニメーションを更新
      requestAnimationFrame(updateRender);
    };

    updateRender();

    return () => {
      refDiv.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleOnBrowserResize);
    };
  }, []);

  return (
    <div className="App">
      <div className="webgl" ref={refDiv}></div>

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
