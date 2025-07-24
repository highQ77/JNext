import { tag } from "../base/Tag.js";
import { createUIButtom } from "../ui/UIButton.js";
import { pageIndex } from "./PageIndex.js";

export let page2 = () => {

    // build UI
    let JSDOM = tag('div', 'page-2').setChildren([
        createUIButtom('btn3', 'go to page index', 'ui-button2')
    ]);

    // script for UI interaction
    let btn = JSDOM.getChildById('btn3')
    btn.on('click', (target, event) => { JSDOM.getApp().setChildren([pageIndex()]) })

    return JSDOM

}