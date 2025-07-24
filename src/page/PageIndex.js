import { tag } from "../base/Tag.js";
import { createUIButtom } from "../ui/UIButton.js";
import { page2 } from "./Page2.js";

export let pageIndex = () => {

    // build UI
    let JSDOM = tag('div', 'page-index').setChildren([
        tag('div').setText('Hi').setClass('text-3xl font-bold underline'), // tailwind class 使用範例
        tag('div', 'o').setStyle({ background: 'orange' }).setText('Click Here to Remove!'),
        createUIButtom('btn', 'go to page 2', 'ui-button'), // 封裝按鈕程式
    ]);

    // script for UI interaction
    let o = JSDOM.getChildById('o')
    o.on('click', (target, event) => { o.remove() })

    let btn = JSDOM.getChildById('btn')
    btn.on('click', (target, event) => { JSDOM.getApp().setChildren([page2()]) })

    return JSDOM

}