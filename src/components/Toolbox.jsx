import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LanguageIcon from "../assets/language.png";
import HelpIcon from "../assets/help.png";
import MapIcon from "../assets/map.png";

const ToolBox = ({ visible = true, lang = "zh", onToggle, onEnterVR }) => {
  const [hover, setHover] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const items = [
    {
      key: "language",
      label: { zh: "語言", en: "Language" },
      icon: LanguageIcon,
    },
    { key: "help", label: { zh: "操作說明", en: "Help" }, icon: HelpIcon },
    { key: "map", label: { zh: "地圖", en: "Map" }, icon: MapIcon },
  ];

  const renderLabel = (text) => (
    <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center ml-2">
      <div className="w-3 h-px bg-black mr-2" />
      <p className="text-black text-sm whitespace-nowrap">{text}</p>
    </div>
  );

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* 左側浮動工具 */}
          <motion.div
            className="fixed bottom-6 left-4 z-40 flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {items.map((item) => (
              <div
                key={item.key}
                className="relative cursor-pointer w-[9dvh] h-[9dvh]"
                onMouseEnter={() => setHover(item.key)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onToggle?.(item.key)}
              >
                <img
                  src={item.icon}
                  alt={item.key}
                  className="w-full h-full object-contain rounded-full bg-white/20 p-2"
                />
                {hover === item.key && renderLabel(item.label[lang])}
              </div>
            ))}
          </motion.div>

          {/* 右側 Expand Panel */}
          <motion.div
            className="fixed bottom-6 right-0 z-40 bg-black/60 rounded-l-xl overflow-hidden"
            initial={{ width: 40 }}
            animate={{ width: expanded ? 160 : 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <button
              className="absolute top-3 left-2 text-white"
              onClick={() => setExpanded((v) => !v)}
            >
              ▶
            </button>

            {expanded && (
              <div className="pl-10 pr-4 py-3 text-white space-y-3 text-sm">
                <div className="cursor-pointer">
                  {lang === "zh" ? "語音導覽" : "Audio Guide"}
                </div>
                <div className="cursor-pointer">
                  {lang === "zh" ? "遊戲網站" : "Game Site"}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ToolBox;
