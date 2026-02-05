// data/sceneData.js
// 這是一個輔助函式，用來獲取 assets 資料夾下的圖片路徑
const getAssetUrl = (name) =>
  new URL(`../assets/${name}`, import.meta.url).href;

export const sceneData = {
  p1: {
    bg: getAssetUrl("bg9.png"),
    dog: getAssetUrl("dog1.png"),
    dogPos: { bottom: "15%", left: "10%" },
    cat: getAssetUrl("cat1.png"),
    catPos: { bottom: "12%", right: "15%", initialFlip: -1 },
    // 新增影片屬性
    videoData: {
      id: "v1",
      title: { zh: "區域 1 介紹", en: "Area 1 Intro" },
      src: "/videos/area1_cat.mp4",
      ratio: 9 / 16,
      pos: { top: "50%", left: "75%" },
    },
  },
  p2: {
    bg: getAssetUrl("bg6.png"),
    dog: getAssetUrl("dog2.png"),
    dogPos: { bottom: "25%", left: "20%" },
    cat: getAssetUrl("cat2.png"),
    catPos: { bottom: "8%", right: "30%" },
  },
  p3: {
    bg: getAssetUrl("bg7.png"),
    dog: getAssetUrl("dog3.png"),
    dogPos: { bottom: "10%", left: "40%" },
    cat: getAssetUrl("cat3.png"),
    catPos: { bottom: "40%", right: "10%", initialFlip: -1 },
  },
  p4: {
    bg: getAssetUrl("bg8.png"),
    dog: getAssetUrl("dog5.png"),
    dogPos: { bottom: "30%", left: "15%", initialFlip: -1 },
    cat: getAssetUrl("cat5.png"),
    catPos: { bottom: "20%", right: "20%", initialFlip: -1 },
    videoData: {
      id: "v1",
      title: { zh: "區域 4 介紹", en: "Area 4 Intro" },
      src: "/videos/area5_dog.mp4",
      ratio: 16 / 9,
      pos: { top: "50%", left: "65%" },
    },
  },
  p5: {
    bg: getAssetUrl("bg5.png"),
    dog: getAssetUrl("dog5.png"),
    dogPos: { bottom: "25%", left: "60%" },
    cat: getAssetUrl("cat5.png"),
    catPos: { bottom: "45%", right: "60%" },

    videoData: {
      id: "v1",
      title: { zh: "區域 5 介紹", en: "Area 1 Intro" },
      src: "/videos/area5_dog.mp4",
      ratio: 16 / 9,
      pos: { top: "50%", left: "65%" },
    },
  },
  p6: {
    bg: getAssetUrl("bg6.png"),
    dog: getAssetUrl("dog6.png"),
    dogPos: { bottom: "5%", left: "10%" },
    cat: getAssetUrl("cat6.png"),
    catPos: { bottom: "45%", right: "15%", initialFlip: -1 },
  },
  p7: {
    bg: getAssetUrl("bg7.png"),
    dog: getAssetUrl("dog7.png"),
    dogPos: { bottom: "20%", left: "45%", initialFlip: -1 },
    cat: getAssetUrl("cat7.jpg"),
    catPos: { bottom: "10%", right: "5%", initialFlip: -1 },
  },
  p8: {
    bg: getAssetUrl("bg8.png"),
    dog: getAssetUrl("dog8.png"),
    dogPos: { bottom: "35%", left: "12%", initialFlip: -1 },
    cat: getAssetUrl("cat8.jpg"),
    catPos: { bottom: "25%", right: "40%", initialFlip: -1 },
  },
  p9: {
    bg: getAssetUrl("bg9.png"),
    dog: getAssetUrl("dog9.png"),
    dogPos: { bottom: "12%", left: "5%", initialFlip: -1 },
    cat: getAssetUrl("cat9.png"),
    catPos: { bottom: "12%", right: "12%", initialFlip: -1 },

    videoData: {
      id: "v1",
      title: { zh: "區域 9 介紹", en: "Area 1 Intro" },
      src: "/videos/area9_cat.mp4",
      ratio: 9 / 16,
      pos: { top: "50%", left: "75%" },
    },
  },
};
