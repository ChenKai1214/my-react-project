import { useState, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";
import infoBg from "../assets/info.png";
import closeMap from "../assets/closeMap.png";

import { systemState } from "../store/systemState";

// const Info = ({ visible, onClose, data }) => {
//   const { langID } = useSnapshot(systemState);
//   const audioRef = useRef(null);
//   const [currentPlaying, setCurrentPlaying] = useState(null);

//   const langMap = ["zh", "en"];
//   const langKey = langMap[langID - 1] || "zh";
const Info = ({ visible, onClose, data, lang }) => {
  const langKey = lang || "zh";

  /** 音檔互斥播放 */
  const handlePlay = (ref) => {
    if (currentPlaying && currentPlaying !== ref.current) {
      currentPlaying.pause();
    }
    setCurrentPlaying(ref.current);
  };

  const handleAudioEnd = (ref) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.pause();
    }
  };

  return (
    <AnimatePresence>
      {visible && data && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-[380px] flex flex-col"
            initial={{ x: 380 }}
            animate={{ x: 0 }}
            exit={{ x: 380 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage: `url(${infoBg})`,
              backgroundSize: "cover", // 或 cover，看你圖比例
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* 關閉按鈕 */}
            <img
              src={closeMap}
              alt="close"
              className="
    absolute top-4 right-4
    w-[10dvh] h-auto
    cursor-pointer
    transition-all duration-200
    hover:scale-110 hover:rotate-6 hover:brightness-110
    active:scale-95
  "
              onClick={onClose}
            />

            {/* 內容 */}
            <div className="h-full px-6 pt-[7.5rem] pb-6 flex flex-col">
              <h2
                className="text-[40px] font-extrabold text-black leading-tight tracking-wide mb-1"
                style={{
                  textShadow:
                    "2px 2px 0px rgba(0,0,0,0.1), 4px 4px 10px rgba(0,0,0,0.05)",
                }}
              >
                {data?.title?.[langKey]}
              </h2>

              <p className="text-[18px] text-gray-700 font-bold mb-6 opacity-80">
                {data.subtitle?.[langKey]}
              </p>
              {/* 內容區塊可滾動 */}
              <div className="flex-1 overflow-y-auto">
                <p
                  className="leading-[1.7] whitespace-pre-wrap text-[22px] font-bold text-[#1a1a1a] tracking-wide"
                  style={{
                    // 稍微加強一點點陰影來撐托粗體字，但保持透明度
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  {data.content?.[langKey]}
                </p>

                {data.audio?.[langKey] && (
                  <div className="mt-6">
                    <audio
                      ref={audioRef}
                      controls
                      onPlay={() => handlePlay(audioRef)}
                      onEnded={() => handleAudioEnd(audioRef)}
                      src={data.audio[langKey]}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Info;
