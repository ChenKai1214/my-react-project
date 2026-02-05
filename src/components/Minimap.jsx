import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import mapImage from "../assets/minimap.png";
import closeMap from "../assets/closeMap.png";
/**
 * Props
 * visible?: boolean
 * mapImage: string
 * points: { id: string; x: number; y: number; label?: string }[]
 * activePointId?: string
 * fov?: { x: number; y: number; angle: number; rotation: number }
 * onSelect?: (id: string) => void
 * onClose?: () => void
 */

const useElementSize = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
};

const Fan = ({ angle }) => {
  const radius = 50;
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <svg viewBox="0 0 100 100">
      <path
        d={`M 0 0 L ${radius} 0 A ${radius} ${radius} 0 ${largeArc} 1 ${
          radius * Math.cos((angle * Math.PI) / 180)
        } ${radius * Math.sin((angle * Math.PI) / 180)} Z`}
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
};

const MiniMap = ({
  visible = false,
  points = [],
  activePointId,
  fov,
  onSelect,
  onClose,
}) => {
  const [mapRef, { width, height }] = useElementSize();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 z-50 rounded-lg bg-black/70 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute right-2 top-[-5dvh] z-10 w-10 h-10 p-0 z-20"
            onClick={onClose}
          >
            <img
              src={closeMap}
              alt="Close map"
              className="w-full h-full object-contain"
            />
          </button>

          <div className="relative w-[320px]" ref={mapRef}>
            {/* FOV */}
            {fov && (
              <motion.div
                className="absolute z-10"
                style={{
                  left: `${(fov.x / 100) * width}px`,
                  top: `${(fov.y / 100) * height}px`,
                  rotate: fov.rotation,
                }}
              >
                <Fan angle={fov.angle} />
              </motion.div>
            )}

            {/* Dots */}
            <svg
              className="absolute inset-0 z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {points.map((p) => (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y}
                  r={2}
                  fill={p.id === activePointId ? "#ff0" : "#fff"}
                  stroke="#000" // 黑色邊框
                  strokeWidth={0.5} // 邊框粗細，可調整
                  onClick={() => onSelect?.(p.id)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </svg>

            {/* 直接使用內部 import 的圖片 */}
            <img src={mapImage} alt="Mini map" className="w-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniMap;
