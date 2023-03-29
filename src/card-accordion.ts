import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
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
    // When an item is opened, close the others.
    this.addEventListener('open', (e: Event) => {
      this.handleItemOpened(e.target as CardAccordionItem);
    });
  }

  handleItemOpened(openedItem: CardAccordionItem) {
    // Close all other items.
    this.items.forEach((item) => {
      if (item !== openedItem) {
        item.open = false;
      }
    });
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}
