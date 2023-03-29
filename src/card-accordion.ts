import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import {
  CardAccordionItem,
  CardAccordionItemEvent,
} from './card-accordion-item';

@customElement('card-accordion')
class CardAccordion extends LitElement {
  static styles = css`
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;
      justify-content: center;
      align-items: center;
    }
  `;

  get items() {
    return [
      ...this.querySelectorAll('card-accordion-item'),
    ] as CardAccordionItem[];
  }

  firstUpdated() {
    this.addEventListener('toggle', (e: Event) => {
      this.handleItemOpened(e.target as CardAccordionItem);
    });
  }

  handleItemOpened(openedItem: CardAccordionItem) {
    console.log(openedItem);
    // this.items.forEach((item) => (item.open = item === openedItem));
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}
