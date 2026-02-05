import { AnimatePresence, motion } from "framer-motion";
import { systemState } from "../store/systemState";
/**
 * Props
 * visible?: boolean
 * currentLang?: "zh" | "en"
 * onChange?: (lang: "zh" | "en") => void
 * onClose?: () => void
 */

const LanguageBlock = ({
  visible = false,
  currentLang = "zh",
  onChange,
  onClose,
}) => {
  const languages = [
    { key: "zh", label: "正體中文" },
    { key: "en", label: "English" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute bottom-[24dvh] left-[12dvh] z-40 rounded-lg bg-black/90 py-2 text-sm shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {languages.map((lang) => {
            const active = currentLang === lang.key;

            return (
              <div
                key={lang.key}
                className={`relative flex items-center px-5 py-2 cursor-pointer
                  ${
                    active
                      ? "text-[#2A3B65] bg-white"
                      : "text-white hover:text-[#2A3B65] hover:bg-white/80"
                  }`}
                onClick={() => {
                  // 1. 更新 Valtio 全域狀態，讓 Info 組件偵測到語系改變
                  systemState.langID = lang.key === "zh" ? 1 : 2;

                  // 2. 執行父層傳入的切換邏輯 (如果有)
                  onChange?.(lang.key);

                  // 3. 自動關閉語系選單
                  onClose?.();
                }}
              >
                {active && (
                  <span
                    className="absolute left-2 top-1/2 -translate-y-1/2
                      w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px]
                      border-l-[#2A3B65] border-t-transparent border-b-transparent"
                  />
                )}
                <span className="ml-3 w-[80px] text-center">{lang.label}</span>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageBlock;
