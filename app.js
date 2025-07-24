import { tag } from "./src/base/Tag.js";
import { pageIndex } from "./src/page/PageIndex.js";

// 🟢 有鑒於現代前端框架複雜度劇增，個人希望能開發出簡單易學且能快速開發的框架
// 🟢 本引擎仍在開發中，為個人趣味研究，不完整的地方，請多多包涵與指教
// 🟢 與傳統 html 差別在標籤生成全在 js 裡完成
// 🟢 支援程式碼提示可參考 src/base/Tag.js 的 API
// 🟢 模組化與封裝元件如 createUIButtom (src/ui/UIButton.js)
// 🟢 Router 使用方式跟取代子節點都是使用 JSDOM.setChildren([...]) 
// 🟢 JNext 可以整合 tailwind 與其他 css 框架

// build UI
let JSDOM = tag('div', 'app').
    setClass('app').
    setChildren([pageIndex()])// 設定首頁

// tag('div', 'app') 用以新增標籤在 dom 裡，參數1是標籤種類，參數2是標籤id
// setClass 是 dom 物件的 className
// app.setChildren([pageIndex()]); 是新增一個陣列並安插一個 pageIndex() 返回 的 tag 元素