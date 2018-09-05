class WordCount extends HTMLElement{
    constructor() {
        super()

        const wcParent = this.parentNode

        const countWords = node => {
            const text = node.innerText || node.textContent
            return text.split(/\s+/g).length
        }

        const getCount = () => `Words: ${countWords(wcParent)}`

        const shadow = this.attachShadow({mode: 'open'})

        const text = document.createElement('span')
        text.textContent = getCount()

        shadow.appendChild(text)

        setInterval(() => {
            text.textContent = getCount()
        })
    }
}

customElements.define('word-count', WordCount)