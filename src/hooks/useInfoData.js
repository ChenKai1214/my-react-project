// src/hooks/useInfoData.js
import { useEffect, useState } from "react";
import infoDataStatic from "../data/infoData"; // 確保路徑正確

export function useInfoData() {
  // 1. 初始化：優先讀快取，沒快取讀預設檔，保證 data 永不為空
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("sheet_data_cache");
      return saved ? JSON.parse(saved) : infoDataStatic;
    } catch (e) {
      return infoDataStatic;
    }
  });

  useEffect(() => {
    // 2. 只有在真正需要更新時才連線 API
    fetch(
      "https://script.google.com/macros/s/AKfycbwkSEJ40Q7oyr1NeSyqpVYYx2jQEO5T4CYp34EqdrZBcAQYbcGF688Epli7JOpia0yg/exec",
    )
      .then((res) => res.json())
      .then((raw) => {
        const formatted = raw.map((item) => ({
          id: item.id,
          title: { zh: item.title_zh, en: item.title_en },
          subtitle: { zh: item.subtitle_zh, en: item.subtitle_en },
          content: { zh: item.content_zh, en: item.content_en },
          audio: { zh: item.audio_zh || "", en: item.audio_en || "" },
        }));

        // 3. 同步資料與快取
        setData(formatted);
        localStorage.setItem("sheet_data_cache", JSON.stringify(formatted));
        console.log("✅ 資料已同步 (來源: Google Sheet)");
      })
      .catch((err) => {
        console.warn("⚠️ API 連線逾時或失敗，使用本地資料:", err);
      });
  }, []);

  return data;
}
