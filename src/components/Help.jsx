// components/Help.jsx
import { motion, AnimatePresence } from "framer-motion";
import HelpImage from "../assets/help2.png"; // 確保路徑正確

const Help = ({ visible, onClose }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // 全螢幕遮罩，點擊任意處（包含背景與圖片）都會觸發 onClose
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-[85%] max-h-[85%] flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            // 拿掉了 e.stopPropagation()，所以點擊圖片也會向上傳遞到外層觸發 onClose
          >
            <img
              src={HelpImage}
              alt="Help Instructions"
              className="w-full h-auto max-h-[85vh] object-contain shadow-2xl rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Help;
