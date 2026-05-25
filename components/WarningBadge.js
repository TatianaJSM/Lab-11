const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      --warning-bg: #f59e0b;
      --warning-color: #111827;
    }

    .badge {
      background: var(--warning-bg);
      color: var(--warning-color);
      border-radius: 18px;
      padding: 1rem 1.3rem;
      font-weight: bold;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
      text-align: center;
    }

    :host([pulsing]) .badge {
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.04);
      }

      100% {
        transform: scale(1);
      }
    }
  </style>

  <div class="badge" part="badge">
    <slot>Advertencia</slot>
  </div>
`;

class WarningBadge extends HTMLElement {
  static get observedAttributes() {
    return ["pulsing"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const html = template.content.cloneNode(true);
    this.shadowRoot.append(html);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "pulsing" && this.shadowRoot) {
      console.log("El atributo pulsing cambió:", this.hasAttribute("pulsing"));
    }
  }
}

customElements.define("warning-badge", WarningBadge);