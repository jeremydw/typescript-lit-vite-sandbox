import { customElement, property, query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export enum CardAccordionItemEvent {
  OPEN = 'open',
}

@customElement('card-accordion-item')
export class CardAccordionItem extends LitElement {
  @property({ type: Boolean, reflect: true })
  open?: boolean;

  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  @query('#bodyContent')
  body?: HTMLElement;

  @state()
  private bodyContentHeight?: Number;

  handleClick() {
    this.toggle();
  }

  firstUpdated() {
    // Update the body content height when the window is resized.
    window.addEventListener('resize', () => this.updateBodyContentHeight(), {
      passive: true,
    });
  }

  updateBodyContentHeight() {
    this.bodyContentHeight = this.body?.offsetHeight;
  }

  attributeChangedCallback(name: string, _old: string, value: string): void {
    super.attributeChangedCallback(name, _old, value);
    switch (name) {
      case 'open':
        // Empty string = true for boolean properties.
        if (value === '') {
          // Dispatch `open` event when the accordion item is opened.
          this.dispatchEvent(
            new CustomEvent(CardAccordionItemEvent.OPEN, {
              detail: { event: { target: this } },
              bubbles: true,
              composed: true,
            })
          );
        }
    }
  }

  toggle() {
    this.open = !this.open;
  }

  static styles = css`
    .container {
      border: 1px solid grey;
      border-radius: 15px;
      padding: 15px;
      position: relative;
    }

    .button {
      appearance: none;
      background: none;
      border: none;
      padding: 0;
      bottom: 0;
      cursor: pointer;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    .container--open .button {
      visibility: hidden;
    }

    .body {
      opacity: 0;
      overflow: hidden;
      visibility: hidden;
      transition: all 300ms ease;
      height: 0;
    }
    
    .body--open {
      height: var(--card-accordion-item-body-height);
      opacity: 1;
      visibility: visible;
    }

    footer {
      text-align: center;
      transition: all 300ms ease;
    }

    .container--open footer {
      opacity: 0;
      visibility: hidden;
    }
  `;

  render() {
    return html`
      <div
        style=${styleMap({
          '--card-accordion-item-body-height': `${this.bodyContentHeight}px`,
        })}
        class=${classMap({
          container: true,
          'container--open': !!this.open,
        })}
      >
        <button
          class="button"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls="body"
          aria-labelledby="summary"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleClick}
        ></button>
        <header>
          <slot name="summary" id="summary" @slotchange=${() =>
            this.updateBodyContentHeight()}></slot>
        </header>
        <div
          id="body"
          class=${classMap({
            body: true,
            'body--open': !!this.open,
          })}
        >
          <div id="bodyContent">
          <slot></slot>
          </div>
        </div>
        <footer>⌄</footer>
      </div>
    `;
  }
}
