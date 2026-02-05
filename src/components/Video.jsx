import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * videoList structure example:
 * [
 * {
 * id: "v1",
 * title: { zh: "介紹影片", en: "Intro Video" },
 * description: { zh: "內容說明", en: "Description" },
 * src: "/videos/demo.mp4",
 * ratio: 16 / 9
 * }
 * ]
 */

const Video = ({
  visible,
  video,
  videoList = [],
  lang = "zh",
  onClose,
  onChangeVideo,
}) => {
  const videoRef = useRef(null);
  const dropdownRef = useRef(null);
  const titleRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTitleWrapped, setIsTitleWrapped] = useState(false);

  /** 播放新影片 */
  useEffect(() => {
    if (visible && video?.src && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [visible, video]);

  /** fullscreen 偵測 */
  useEffect(() => {
    const onFsChange = () => {
      const fsEl = document.fullscreenElement;
      setIsFullscreen(fsEl?.tagName === "VIDEO");
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /** dropdown 點外關閉 */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /** 標題是否換行 */
  useEffect(() => {
    if (!titleRef.current) return;

    const checkWrap = () => {
      const el = titleRef.current;
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      setIsTitleWrapped(el.offsetHeight > lh + 2);
    };

    const ro = new ResizeObserver(checkWrap);
    ro.observe(titleRef.current);
    return () => ro.disconnect();
  }, [video, lang]);

  if (!video) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            /* 修改：根據影片比例動態調整容器寬度與最大高度，避免直向影片溢出 */
            className="relative bg-black rounded-xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              width: video.ratio < 1 ? "auto" : "90%",
              maxWidth: video.ratio < 1 ? "45vh" : "960px",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            {/* Dropdown */}
            {videoList.length > 1 && (
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
                ref={dropdownRef}
              >
                <button
                  ref={titleRef}
                  className="bg-gray-700 text-white px-4 py-2 flex items-center gap-2"
                  onClick={() => setIsOpen((v) => !v)}
                >
                  <span>{video.title?.[lang]}</span>
                  <span>▼</span>
                </button>

                {isOpen && (
                  <ul className="bg-gray-800 text-white mt-1 max-h-[200px] overflow-y-auto">
                    {videoList.map((v) => (
                      <li
                        key={v.id}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          onChangeVideo?.(v);
                          setIsOpen(false);
                        }}
                      >
                        {v.title?.[lang]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Video - 修改：切換為 object-cover 並配合父層比例達成滿版 */}
            <div
              className="relative w-full overflow-hidden bg-black"
              style={{ aspectRatio: video.ratio || 16 / 9 }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </div>

            {/* Text */}
            {(video.title || video.description) && (
              <div className="p-4 text-white text-center bg-zinc-900">
                <p className="text-lg font-medium">{video.title?.[lang]}</p>
                <p className="text-sm mt-2 whitespace-pre-wrap">
                  {video.description?.[lang]}
                </p>
              </div>
            )}

            {/* Close */}
            <button
              className="absolute top-3 right-3 text-white text-xl bg-black/40 w-8 h-8 rounded-full flex items-center justify-center"
              onClick={onClose}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Video;
