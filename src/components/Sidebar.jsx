import { useState } from "react";
import { motion } from "framer-motion";
import miniMapPoints from "../data/miniMapPoints";
import sidebarBg from "../assets/sidebar.png";
import dogSidebar from "../assets/dogSidebar.png";

const Sidebar = ({ lang = "zh", activePointId, onSelectScene }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarWidth = 260;

  return (
    <motion.div
      className="fixed top-0 left-0 h-screen z-40" // 改 h-full → h-screen
      initial={{ x: -sidebarWidth }}
      animate={{ x: isOpen ? 0 : -sidebarWidth }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div
        className="relative w-[260px] h-full text-white shadow-2xl backdrop-blur-md flex flex-col"
        style={{
          backgroundImage: `url(${sidebarBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0,0,0,0.5)", // 半透明黑色疊加
        }}
      >
        {/* 標題區 */}
        <div className="p-6 font-bold text-xl border-b border-white/10 text-yellow-400">
          {lang === "zh" ? "探索選單" : "Menu"}
        </div>
        {/* 列表區 */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-2">
            {miniMapPoints.map((point) => {
              const isCurrentLocation = point.id === activePointId;

              return (
                <button
                  key={point.id}
                  className={`w-full text-left cursor-pointer py-3 px-4 rounded-md transition-all duration-200 flex items-center gap-3
              ${
                isCurrentLocation
                  ? " text-black font-bold  bg-transparent"
                  : "text-blue-800 hover:bg-blue-500 hover:text-white bg-transparent" // 只有 hover 才有背景
              }`}
                  onClick={() => onSelectScene?.(point.id)}
                >
                  <span
                    className={`text-[10px] w-6 h-6 flex items-center justify-center rounded-full border 
                    ${isCurrentLocation ? "border-black bg-black/10" : "border-white/30"}`}
                  >
                    {point.label}
                  </span>

                  <span className="text-base">{point.title?.[lang]}</span>

                  {isCurrentLocation && (
                    <span className="ml-auto text-xs bg-black/20 px-2 py-0.5 rounded-full">
                      {lang === "zh" ? "目前位置" : "Current"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* Toggle 切換按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          absolute top-1/2 -right-[110px] /* 調整右移距離以容納箭頭 */
          -translate-y-1/2
          bg-transparent 
          border-none
          p-0
          cursor-pointer
          hover:scale-110
          transition-transform
          z-[-1]
          /* 讓圖片與箭頭橫向排列 */
          flex items-center gap-2
          
          outline-none 
          focus:outline-none 
          focus:ring-0 
          active:outline-none
          select-none
          [-webkit-tap-highlight-color:transparent]
        "
      >
        {/* 狗狗圖片 */}
        <img
          src={dogSidebar}
          alt="toggle sidebar"
          className="w-[80px] h-auto block"
        />

        {/* 右側箭頭 */}
        <span className="text-yellow-400 text-2xl font-bold drop-shadow-md">
          {isOpen ? "◀" : "▶"}
        </span>
      </button>
    </motion.div>
  );
};

export default Sidebar;
