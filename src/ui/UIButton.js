import { tag } from "../base/Tag.js";

export const createUIButtom = (tid, label, className) => {
    const btn = tag('div', tid).setClass(className).setChildren([
        tag('div').setText(label),
    ]);

    // 若要寫通用腳本可以在這裡撰寫
    // ex: btn.on('click',... )

    return btn
}