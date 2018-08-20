const l = console.log

class Square extends HTMLElement {
    static get observedAttributes() {
        return ['w', 'l']
    }

    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'open'})

        const div = document.createElement('div')
        const style = document.createElement('style')

        shadow.appendChild(style)
        shadow.appendChild(div)
    }

    connectedCallback() {
        l('custom square element added to page.')
        updateStyle(this)
    }

    disconnectedCallback() {
        l('custom square element removed from page.')
    }

    adoptedCallback() {
        l('custom square element moved to new page.')
    }

    attributeChangedCallback() {
        l('custom square element attributes changed.')
        updateStyle(this)
    }
}

customElements.define('custom-square', Square)

const updateStyle = elem => {
    const shadow = elem.shadowRoot
    const childNodes = Array.from(shadow.childNodes)

    childNodes.forEach(cN => {
        if(cN.nodeName === 'STYLE') {
            cN.textContent = `
                div {
                    width: ${elem.getAttribute('w')}px;
                    height: ${elem.getAttribute('l')}px;
                    background-color: ${elem.getAttribute('c')};
                }
            `
        }
    })
}

const add = document.querySelector('.add')
const update = document.querySelector('.update')
const remove = document.querySelector('.remove')
let square

update.disabled = true
remove.disabled = true

const random = (min, max) =>
    (Math.random() * (max - min + 1) + min)

add.onclick = () => {
    square = document.createElement('custom-square')
    square.setAttribute('l', 100)
    square.setAttribute('w', 200)
    square.setAttribute('c', 'hotpink')
    document.body.appendChild(square)

    update.disabled = false
    remove.disabled = false
    add.disabled = true
}

update.onclick = () => {
    square.setAttribute('w', random(20, 300))
    square.setAttribute('c', `rgb(${random(0, 155)}, ${random(0, 155)}, ${random(0, 155)})`)
}

remove.onclick = () => {
    document.body.removeChild(square)

    update.disabled = true
    remove.disabled = true
    add.disabled = false
}
