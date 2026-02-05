import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";

import bg from "../assets/bg.png";
import clouds from "../assets/clouds.png";
import trees from "../assets/trees.png";

import animal1 from "../assets/dog_shiba.png";
import animal2 from "../assets/dog_goldie.png";
import animal3 from "../assets/cat_calico.png";
import animal4 from "../assets/cat_tuxedo.png";

import paper from "../assets/paper.png";
import agree from "../assets/agree.png";

import chineseBtn from "../assets/chinese.png";
import englishBtn from "../assets/english.png";

export default function Home() {
  const navigate = useNavigate();

  const animals = [
    { src: animal1, className: "top-[69%] left-[89%] w-[150px]" },
    { src: animal2, className: "top-[72%] left-[43%] w-[150px]" },
    { src: animal3, className: "bottom-[6vh] left-[15%] w-[149px]" },
    { src: animal4, className: "top-[70%] left-[65%] w-[87px]" },
  ];

  const [visible, setVisible] = useState([false, false, false, false]);
  const [content, setContent] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [showAgree, setShowAgree] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);

  useEffect(() => {
    animals.forEach((_, index) => {
      setTimeout(() => {
        setVisible((prev) => {
          const copy = [...prev];
          copy[index] = true;
          return copy;
        });

        if (index === animals.length - 1) {
          setTimeout(() => setShowButtons(true), 800);
        }
      }, index * 1000);
    });
  }, []);

  useEffect(() => {
    if (!content) {
      setShowAgree(false);
      return;
    }
    // 文字出現後，延遲一點點再顯示同意按鈕
    const timer = setTimeout(() => setShowAgree(true), 600);
    return () => clearTimeout(timer);
  }, [content]);

  const chineseText =
    "養寵物前，請先認識貓狗的基本習性與需求，勿隨意搶食或抓取，讓動物有安全和舒適的環境。";
  const englishText =
    "Before raising pets, please understand the basic habits and needs of cats and dogs. Do not snatch food or grab them to ensure a safe and comfortable environment.";

  return (
    <div className="home-container">
      <img src={bg} className="bg" alt="background" />
      <img src={clouds} className="clouds far" alt="clouds-far" />
      <img src={clouds} className="clouds middle" alt="clouds-middle" />
      <img src={clouds} className="clouds center" alt="clouds-center" />
      <img src={clouds} className="clouds near" alt="clouds-near" />
      <img src={trees} className="trees" alt="trees" />

      {animals.map((animal, index) => (
        <img
          key={index}
          src={animal.src}
          alt={`animal-${index}`}
          className={`animal absolute h-auto ${animal.className} ${visible[index] ? "fade-in" : "opacity-0"}`}
        />
      ))}

      {/* 中央 UI 控制區 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <AnimatePresence mode="wait">
          {" "}
          {/* 使用 wait 模式確保舊的走完新的才來，或是拿掉 mode 做交疊 */}
          {/* 狀態 1：顯示語言選擇按鈕 */}
          {!content && showButtons && (
            <motion.div
              key="lang-btns"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // 出場時輕微放大並模糊
              transition={{ duration: 0.5 }}
              className="flex justify-center gap-12"
            >
              {[
                { btn: chineseBtn, text: chineseText, lang: "zh" },
                { btn: englishBtn, text: englishText, lang: "en" },
              ].map((item, idx) => (
                <motion.div
                  key={item.lang}
                  // 1. 把定位寫在這裡，確保整個元件（包含動畫中心）都在底部
                  className="fixed bottom-[-46dvh] cursor-pointer"
                  style={{
                    // 讓兩個按鈕水平並排，且根據索引左右偏移
                    left: idx === 0 ? "calc(50% - 100px)" : "calc(50% + 100px)",
                    translateX: "-50%",
                  }}
                  onClick={() => {
                    setSelectedLang(item.lang);
                    setContent(item.text);
                  }}
                  whileHover={{ scale: 1.1, rotate: idx === 0 ? -3 : 3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* 2. 這裡保持乾淨，圖片就會乖乖在 motion.div 的中心縮放 */}
                  <div className="w-[140px] h-[108px] flex items-center justify-center drop-shadow-lg">
                    <img
                      src={item.btn}
                      alt={item.lang}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          {/* 狀態 2：顯示資訊紙張內容 */}
          {content && (
            <motion.div
              key="paper-content"
              initial={{ opacity: 0, y: 30 }} // 從下方浮上來
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-[50dvw] min-h-[58dvh] flex flex-col items-center justify-between"
            >
              <img
                src={paper}
                alt="paper"
                className="absolute inset-0 w-full h-full object-contain z-0"
              />

              <div className="relative z-10 w-full h-full flex flex-col justify-between pt-[60px] pb-5 text-center">
                <div className="mx-auto mt-6 w-[40%] text-left text-black leading-[38px] font-medium">
                  {content}
                </div>

                <div className="h-[60px]">
                  {" "}
                  {/* 固定高度避免按鈕出現時撐開容器造成閃動 */}
                  <AnimatePresence>
                    {showAgree && (
                      <motion.img
                        src={agree}
                        alt="agree"
                        className="mx-auto w-[120px] cursor-pointer"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.08, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setTimeout(
                            () =>
                              navigate("/world", {
                                state: { lang: selectedLang },
                              }),
                            120,
                          );
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
