import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { sceneData } from "../data/sceneData";
import videoIcon from "../assets/video.png";

const Viewer = ({ activePointId, lang, onAnimalClick, onOpenVideo }) => {
  const currentScene = sceneData[activePointId];

  // 動物方向
  const [dogDir, setDogDir] = useState(1);
  const [catDir, setCatDir] = useState(1);

  // 使用 useRef 保持同一個 controls
  const dogControlsRef = useRef(useAnimation());
  const catControlsRef = useRef(useAnimation());

  useEffect(() => {
    if (!currentScene) return;

    const dogControls = dogControlsRef.current;
    const catControls = catControlsRef.current;

    let cancelled = false;

    // 初始化方向
    setDogDir(currentScene.dogPos.initialFlip || 1);
    setCatDir(currentScene.catPos.initialFlip || 1);

    dogControls.set({ x: 0 });
    catControls.set({ x: 0 });

    // 狗動畫 loop
    const walkDog = async () => {
      while (!cancelled) {
        setDogDir(1);
        await dogControls.start({
          x: 50,
          transition: { duration: 5, ease: "linear" },
        });
        if (cancelled) break;

        setDogDir(-1);
        await dogControls.start({
          x: -50,
          transition: { duration: 5, ease: "linear" },
        });
      }
    };

    // 貓動畫 loop
    const walkCat = async () => {
      while (!cancelled) {
        setCatDir(1);
        await catControls.start({
          x: 40,
          transition: { duration: 6, ease: "linear" },
        });
        if (cancelled) break;

        setCatDir(-1);
        await catControls.start({
          x: -40,
          transition: { duration: 6, ease: "linear" },
        });
      }
    };

    walkDog();
    walkCat();

    return () => {
      cancelled = true;
      dogControls.stop();
      catControls.stop();
    };
  }, [activePointId, currentScene]);

  const VIDEO_LABEL = {
    zh: "觀看影片",
    en: "Watch Video",
  };

  if (!currentScene) {
    return (
      <div className="w-full h-full bg-red-500 text-white p-20">
        找不到資料...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black">
      {/* 除錯標籤 */}
      <div className="absolute top-4 left-4 z-50 bg-yellow-400 text-black px-2 py-1 rounded shadow-lg text-sm font-bold">
        目前位置: {activePointId}
      </div>

      {/* 背景圖片淡入淡出 */}

      <motion.img
        src={currentScene.bg}
        key={activePointId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt="background"
      />

      {/* 動物區域：不受 AnimatePresence 影響，永遠存在 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 狗 */}
        <motion.div
          className="absolute pointer-events-auto cursor-pointer group"
          style={{
            bottom: currentScene.dogPos.bottom,
            left: currentScene.dogPos.left,
            width: "12rem",
            scaleX: dogDir,
          }}
          animate={dogControlsRef.current}
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onClick={() => onAnimalClick("dog")}
        >
          <img
            src={currentScene.dog}
            className="
              w-full h-auto
              drop-shadow-2xl
              transition duration-200 ease-out
              group-hover:brightness-110
              group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]
            "
          />
        </motion.div>

        {/* 貓 */}
        <motion.div
          className="absolute pointer-events-auto cursor-pointer group"
          style={{
            bottom: currentScene.catPos.bottom,
            right: currentScene.catPos.right,
            width: "12rem",
            scaleX: catDir,
          }}
          animate={catControlsRef.current}
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onClick={() => onAnimalClick("cat")}
        >
          <img
            src={currentScene.cat}
            className="
              w-full h-auto
              drop-shadow-2xl
              transition duration-200 ease-out
              group-hover:brightness-110
              group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]
            "
          />
        </motion.div>

        {/* 影片互動點 */}
        {currentScene.videoData && (
          <div
            className="group absolute cursor-pointer z-30 flex flex-col items-center"
            style={{
              top: currentScene.videoData.pos.top,
              left: currentScene.videoData.pos.left,
              pointerEvents: "auto",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenVideo(currentScene.videoData);
            }}
          >
            <img
              src={videoIcon}
              alt="video"
              className="
                w-[15dvh] h-[15dvh] object-contain
                transition-transform transition-filter duration-200 ease-out
                group-hover:scale-110
                group-hover:brightness-110
              "
            />
            <p
              className="
                mt-2 text-white text-[19px] text-center
                bg-black/50 rounded py-1 px-2
                opacity-0 translate-y-1
                transition-all duration-200 ease-out
                group-hover:opacity-100
                group-hover:translate-y-0
              "
            >
              {VIDEO_LABEL[lang] || VIDEO_LABEL.en}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewer;
