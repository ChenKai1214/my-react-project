import { proxy } from "valtio";

// 用於全域管理系統狀態，例如語言
export const systemState = proxy({
  langID: 1, // 1 = zh, 2 = en
});
