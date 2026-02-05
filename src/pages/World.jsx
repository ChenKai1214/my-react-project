import { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ToolBox from "../components/Toolbox";
import Info from "../components/Info";
import MiniMap from "../components/MiniMap";
import Viewer from "../components/Viewer";
import LanguageBlock from "../components/Languageblock";
import Video from "../components/Video";
import Help from "../components/Help";

import { useInfoData } from "../hooks/useInfoData";
import miniMapPoints from "../data/miniMapPoints";

export default function App() {
  const location = useLocation();

  /* ======================
      Sheet 資料 (快取優先模式)
  ====================== */
  const infoData = useInfoData();

  /* ======================
      狀態管理
  ====================== */
  const [activePointId, setActivePointId] = useState("p1");
  const [showMap, setShowMap] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [currentLang, setCurrentLang] = useState(location.state?.lang || "zh");
  const [langBlockVisible, setLangBlockVisible] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  /* ======================
      事件處理
  ===================== */
  const handleOpenInfo = (id) => {
    // 這裡現在直接從 infoData 找，第一秒就會有資料
    const data = infoData.find((item) => item.id === id);
    if (!data) return;

    setCurrentData(data);
    setInfoVisible(true);
  };

  const handleAnimalClick = (type) => {
    const targetId = `${type}_${activePointId}`;
    handleOpenInfo(targetId);
  };

  const handleToolToggle = (key) => {
    if (key === "map") setShowMap((prev) => !prev);
    else if (key === "language") setLangBlockVisible((prev) => !prev);
    else if (key === "help") setShowHelp(true);
  };

  const handleOpenVideo = (video) => {
    setSelectedVideo(video);
    setIsVideoVisible(true);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* 1. Viewer（底層） */}
      <div className="absolute inset-0 z-0">
        <Viewer
          activePointId={activePointId}
          lang={currentLang}
          onAnimalClick={handleAnimalClick}
          onOpenVideo={handleOpenVideo}
        />
      </div>

      {/* 2. Sidebar (側邊欄背景圖版本) */}
      <div className="absolute top-0 left-0 z-10 h-full">
        <Sidebar
          activePointId={activePointId}
          lang={currentLang}
          onSelectScene={(id) => setActivePointId(id)}
        />
      </div>

      {/* 3. ToolBox */}
      <div className="absolute bottom-10 right-10 z-20 flex flex-col items-end gap-4">
        <ToolBox
          onToggle={handleToolToggle}
          onEnterVR={() => console.log("enter VR")}
        />
      </div>

      {/* 4. 各類彈窗組件 */}
      <MiniMap
        visible={showMap}
        points={miniMapPoints}
        activePointId={activePointId}
        onSelect={(id) => setActivePointId(id)}
        onClose={() => setShowMap(false)}
      />

      <LanguageBlock
        visible={langBlockVisible}
        currentLang={currentLang}
        onChange={setCurrentLang}
        onClose={() => setLangBlockVisible(false)}
      />

      {/* Info 視窗：使用優化後的文字樣式 */}
      {currentData && (
        <Info
          visible={infoVisible}
          data={currentData}
          lang={currentLang}
          onClose={() => setInfoVisible(false)}
        />
      )}

      <Video
        visible={isVideoVisible}
        video={selectedVideo}
        lang={currentLang}
        onClose={() => setIsVideoVisible(false)}
      />

      <Help visible={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}
