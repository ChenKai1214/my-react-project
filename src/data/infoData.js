// src/data/infoData.js
const dogData = [
  {
    id: "dog_p1",
    title: { zh: "牧羊犬", en: "Shepherd" },
    subtitle: { zh: "草原的守護者", en: "Guardian of the Prairie" },
    content: {
      zh: "牠在綠意盎然的草地上奔跑，負責引導迷路的羊群回家。",
      en: "Running across the lush green grass, it guides lost sheep back home.",
    },
  },
  {
    id: "dog_p2",
    title: { zh: "黃金獵犬", en: "Golden Retriever" },
    subtitle: { zh: "陽光大男孩", en: "Sunny Boy" },
    content: {
      zh: "這隻狗狗最喜歡在河邊玩水，嘴裡總是叼著最心愛的球。",
      en: "This dog loves playing in the river, always carrying his favorite ball.",
    },
  },
  {
    id: "dog_p3",
    title: { zh: "柴犬", en: "Shiba Inu" },
    subtitle: { zh: "固執的微笑", en: "Stubborn Smile" },
    content: {
      zh: "坐在花叢中的牠，露出謎樣的微笑，說什麼也不肯回家。",
      en: "Sitting among the flowers with a mysterious smile, refusing to go home.",
    },
  },
  {
    id: "dog_p4",
    title: { zh: "警犬", en: "Police Dog" },
    subtitle: { zh: "城市小英雄", en: "City Hero" },
    content: {
      zh: "穿梭在城市巷弄間，用敏銳的嗅覺維持著這個區域的治安。",
      en: "Navigating city alleys, using a keen sense of smell to maintain order.",
    },
  },
  {
    id: "dog_p5",
    title: { zh: "貴賓犬", en: "Poodle" },
    subtitle: { zh: "優雅的模特兒", en: "Elegant Model" },
    content: {
      zh: "在噴水池旁優雅地坐著，蓬鬆的毛髮吸引了所有人的目光。",
      en: "Sitting gracefully by the fountain, its fluffy fur attracts everyone's attention.",
    },
  },
  {
    id: "dog_p6",
    title: { zh: "鬥牛犬", en: "Bulldog" },
    subtitle: { zh: "滑板高手", en: "Skateboarding Pro" },
    content: {
      zh: "別看牠腿短，牠可是公園裡最會溜滑板的帥哥。",
      en: "Don't mind the short legs; he's the coolest skateboarder in the park.",
    },
  },
  {
    id: "dog_p7",
    title: { zh: "哈士奇", en: "Husky" },
    subtitle: { zh: "冰原探險家", en: "Ice Explorer" },
    content: {
      zh: "在極光出沒的地點，牠正對著月亮發出悠長的狼嚎聲。",
      en: "Where the aurora appears, it lets out a long howl at the moon.",
    },
  },
  {
    id: "dog_p8",
    title: { zh: "博美", en: "Pomeranian" },
    subtitle: { zh: "棉花糖精靈", en: "Marshmallow Elf" },
    content: {
      zh: "小小一坨白毛躲在草叢裡，不仔細看還以為是一朵雲落了下來。",
      en: "A small tuft of white fur hiding in the bushes, looking like a fallen cloud.",
    },
  },
  {
    id: "dog_p9",
    title: { zh: "科基", en: "Corgi" },
    subtitle: { zh: "短腿的魅力", en: "Short-legged Charm" },
    content: {
      zh: "雖然底盤很低，但牠依然努力地爬上階梯，想看遠方的風景。",
      en: "Despite the low chassis, it strives to climb the stairs to see the view.",
    },
  },
].map((item) => ({ ...item, audio: { zh: "", en: "" } }));

const catData = [
  {
    id: "cat_p1",
    title: { zh: "三花貓", en: "Calico Cat" },
    subtitle: { zh: "穀倉女王", en: "Barn Queen" },
    content: {
      zh: "在穀倉頂端俯瞰著農場，守護著堆放糧食的神聖區域。",
      en: "Overlooking the farm from the top of the barn, guarding the grain.",
    },
  },
  {
    id: "cat_p2",
    title: { zh: "虎斑貓", en: "Tabby Cat" },
    subtitle: { zh: "草地獵人", en: "Grassland Hunter" },
    content: {
      zh: "壓低身體，牠正在瞄準草叢中跳動的小蚱蜢。",
      en: "Staying low, it's aiming at a small grasshopper jumping in the grass.",
    },
  },
  {
    id: "cat_p3",
    title: { zh: "波斯貓", en: "Persian Cat" },
    subtitle: { zh: "午茶夥伴", en: "Teatime Companion" },
    content: {
      zh: "在花園的石桌上小憩，等待著主人分享一點美味蛋糕。",
      en: "Napping on the stone table in the garden, waiting for a piece of cake.",
    },
  },
  {
    id: "cat_p4",
    title: { zh: "黑貓", en: "Black Cat" },
    subtitle: { zh: "影子旅行者", en: "Shadow Traveler" },
    content: {
      zh: "夜晚是牠的主場，在屋頂與煙囪之間輕盈地跳躍。",
      en: "Night is its domain, leaping gracefully between roofs and chimneys.",
    },
  },
  {
    id: "cat_p5",
    title: { zh: "橘貓", en: "Ginger Cat" },
    subtitle: { zh: "體重與力量", en: "Weight and Power" },
    content: {
      zh: "十隻橘貓九隻胖，這隻橘貓正霸佔著路中間曬太陽。",
      en: "Most ginger cats are chubby; this one is hogging the road to sunbathe.",
    },
  },
  {
    id: "cat_p6",
    title: { zh: "暹羅貓", en: "Siamese Cat" },
    subtitle: { zh: "話匣子", en: "Chatterbox" },
    content: {
      zh: "牠總是對著過往的行人喵喵叫，好像在抱怨今天的餐點。",
      en: "It always meows at passersby, as if complaining about today's meal.",
    },
  },
  {
    id: "cat_p7",
    title: { zh: "俄羅斯藍貓", en: "Russian Blue" },
    subtitle: { zh: "銀色閃光", en: "Silver Flash" },
    content: {
      zh: "優雅的灰藍色毛髮，讓牠在雪地中像是若隱若現的精靈。",
      en: "Elegant gray-blue fur makes it look like an ethereal elf in the snow.",
    },
  },
  {
    id: "cat_p8",
    title: { zh: "豹貓", en: "Bengal Cat" },
    subtitle: { zh: "野性的呼喚", en: "Call of the Wild" },
    content: {
      zh: "擁有豹紋的牠，特別喜歡攀爬高處，以此觀察周遭動向。",
      en: "With leopard spots, it loves climbing high to observe the surroundings.",
    },
  },
  {
    id: "cat_p9",
    title: { zh: "無毛貓", en: "Sphynx" },
    subtitle: { zh: "外星來客", en: "Alien Guest" },
    content: {
      zh: "雖然外型獨特，但牠其實最怕冷，總是想鑽進溫暖的被窩。",
      en: "Despite its unique look, it's very sensitive to cold and loves blankets.",
    },
  },
].map((item) => ({ ...item, audio: { zh: "", en: "" } }));

const infoData = [...dogData, ...catData];

export default infoData;

// -------------------------------------------------------- sheet
// hooks/useInfoData.js
// import { useEffect, useState } from "react";

// export function useInfoData() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("GOOGLE_SHEET_API_URL")
//       .then(res => res.json())
//       .then(raw => {
//         const formatted = raw.map(item => ({
//           id: item.id,
//           title: { zh: item.title_zh, en: item.title_en },
//           subtitle: { zh: item.subtitle_zh, en: item.subtitle_en },
//           content: { zh: item.content_zh, en: item.content_en },
//           audio: { zh: item.audio_zh, en: item.audio_en },
//         }));
//         setData(formatted);
//       });
//   }, []);

//   return data;
// }
