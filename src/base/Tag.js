let idCounter = 0

class Tag {
    static __app = null
    /** generate unique id in constructor, you can set id by setId function */
    __id = ''
    /** html tag instance */
    __tag = null
    /** store Tag objects */
    __children = []
    /** store parent Tag */
    __parent = null
    /** store event handler */
    __eventList = [] // 

    constructor(tag, tid) {
        this.__id = `tag-${++idCounter}`
        tid && (this.__id = tid)
        const h5tag = this.__tag = document.createElement(tag)
        tid && h5tag.setAttribute('tid', this.__id)
        if (idCounter == 1) {
            Tag.__app = this
            document.body.append(h5tag)
        }
    }

    /** release memory, clear timer, and remove event listener here  */
    remove() {
        this.removeChildren()
        this.__parent = null

        // remove event
        if (this.__eventList) {
            this.__eventList.forEach(e => this.__tag.removeEventListener(e.eventName, e.event))
            this.__eventList.length = 0
            delete this.__eventList
        }

        if (this.__tag) {
            this.__tag.remove()
            delete this.__tag
        }
    }

    /** get root app Tag */
    getApp() {
        return Tag.__app
    }

    /** set children, minimal update in JSDOM */
    setChildren(tags = []) {
        if (this.__children.length) {
            this.removeChildren()
        }
        tags.forEach(ch => {
            ch.__parent = this
            this.__tag.append(ch.__tag)
        })
        this.__children = [...tags]
        return this
    }

    /** remove children */
    removeChildren() {
        [...this.__children].forEach(ch => {
            ch.remove()
        })
        this.__children.length = 0
        return this
    }

    /** get child by tid */
    getChildById(tid) {
        if (tid == this.__id) { return this }
        let chs = this.__children
        for (let i = 0; i < chs.length; i++) {
            if (chs[i].__id == tid) return chs[i]
            let c = chs[i].getChildById(tid)
            if (c) return c
        }
        return null
    }

    /** set style */
    setStyle(styleObj) {
        Object.keys(styleObj).forEach(k => {
            this.__tag.style[k] = styleObj[k]
        })
        return this
    }

    /** set class */
    setClass(classStr) {
        this.__tag.className = classStr
        return this
    }

    /** set innerText, and setChildren can't work */
    setText(str) {
        this.setChildren = null
        this.__tag.innerText = str
        return this
    }

    /** event - auto remove event by calling destroy function */
    on(eventName, execFun) {
        const event = e => { execFun(this, e) }
        this.__tag.addEventListener(eventName, event)
        this.__eventList.push({ eventName, event })
        return this
    }
}

export const tag = function (tag = 'div', id = '') {
    return new Tag(tag, id)
}