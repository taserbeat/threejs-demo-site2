import { useEffect, useRef } from "react";
import * as THREE from "three";

import "./App.css";
import bgJpg from "./assets/images/bg.jpg";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

/** アニメーションスクリプト */
type AnimationScript = {
  /** アニメーションが有効なスクロール開始位置[%] */
  start: number;

  /** アニメーションが有効なスクロール終了位置[%] */
  end: number;

  /** アニメーションの実装 */
  animation: () => void;
};

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

const boxInitPosition = {
  x: 0,
  y: 0.5,
  z: -15,
};

const boxInitRotation = {
  x: 1,
  y: 1,
  z: 0,
};

box.position.set(boxInitPosition.x, boxInitPosition.y, boxInitPosition.z);
box.rotation.set(boxInitRotation.x, boxInitRotation.y, boxInitRotation.z);

const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

const torusInitPosition = {
  x: 0,
  y: 1,
  z: 10,
};

torus.position.set(0, 1, 10);

scene.add(box, torus);

// スクロールアニメーション
const animationScripts: AnimationScript[] = [];

animationScripts.push({
  start: 0,
  end: 40,
  animation: () => {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);

    box.position.z = lerp(boxInitPosition.z, 2, getScrollScale(0, 40));
    torus.position.z = lerp(torusInitPosition.z, -20, getScrollScale(0, 40));
  },
});

animationScripts.push({
  start: 40,
  end: 60,
  animation: () => {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);

    box.rotation.z = lerp(boxInitRotation.x, Math.PI, getScrollScale(40, 60));
  },
});

animationScripts.push({
  start: 60,
  end: 80,
  animation: () => {
    camera.lookAt(box.position);

    camera.position.x = lerp(0, -15, getScrollScale(60, 80));
    camera.position.y = lerp(1, 15, getScrollScale(60, 80));
    camera.position.z = lerp(10, 25, getScrollScale(60, 80));
  },
});

animationScripts.push({
  start: 80,
  end: 100,
  animation: () => {
    camera.lookAt(box.position);

    box.rotation.x += 0.02;
    box.rotation.y += 0.02;
  },
});

// スクロール率
let scrollRate = 0;

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// 線形補完で滑らかに移動させる
const lerp = (x: number, y: number, a: number) => {
  return (1 - a) * x + a * y;
};

const getScrollScale = (start: number, end: number) => {
  return (scrollRate - start) / (end - start);
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const App = () => {
  const refDiv = useRef<HTMLDivElement>(null);

  const playAnimationScript = () => {
    animationScripts.forEach((script) => {
      if (scrollRate >= script.start && scrollRate <= script.end) {
        script.animation();
      }
    });
  };

  const handleOnBrowserResize = () => {
    // カメラのアスペクト比を修正
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // レンダラーを修正
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    return;
  };

  /** スクロール率を計算する */
  const handleOnScroll = () => {
    const documentElement = document.documentElement;

    // documentElementについて
    // scrollTop: 画面全体の上端から現在位置までのピクセル数
    // scrollHeight: 画面全体の上端から下端までのピクセル数 (clientHeightも含む)
    // clientHeight: 表示中の画面の縦幅

    scrollRate =
      (documentElement.scrollTop /
        (documentElement.scrollHeight - documentElement.clientHeight)) *
      100;
  };

  useEffect(() => {
    refDiv.current?.appendChild(renderer.domElement);

    window.addEventListener("resize", handleOnBrowserResize);
    window.addEventListener("scroll", handleOnScroll);

    const updateRender = () => {
      // アニメーションを再生
      playAnimationScript();

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
