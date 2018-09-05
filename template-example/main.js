customElements.define('my-paragraph',
    class extends HTMLElement {
        constructor() {
            super();
            const slot = document.createElement('slot')
            slot.setAttribute('name', 'my-text');

            const style = document.createElement('style')
            style.textContent = `
             p {
              color: white;
              background-color: #666;
              padding: 5px;
            }
            `;

            const template = document.createElement('template');
            const templateContent = template.content;

            templateContent.appendChild(style);
            templateContent.appendChild(slot);

            console.log(template);

            this.attachShadow({ mode: 'open' }).appendChild(
                templateContent.cloneNode(true)
            );
        }
    }
);

const slottedSpan = document.querySelector('my-paragraph p');

console.log(slottedSpan.assignedSlot);
console.log(slottedSpan.slot);