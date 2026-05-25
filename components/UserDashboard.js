const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      --dashboard-bg: #f3c4d8;
      --dashboard-border: #c48aa5;
    }

    .dashboard {
      background: var(--dashboard-bg);
      border: 3px solid var(--dashboard-border);
      border-radius: 22px;
      padding: 2rem;
      width: min(720px, 94vw);
      min-height: 420px;
      display: grid;
      place-items: center;
      box-shadow: 0 18px 38px rgba(0, 0, 0, 0.12);
    }

    .content {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "card weather"
        "badge badge";
      gap: 3rem;
      align-items: center;
      justify-items: center;
    }

    ::slotted(user-card) {
      grid-area: card;
      width: 220px;
    }

    ::slotted(weather-time) {
      grid-area: weather;
      width: 260px;
    }

    ::slotted(warning-badge) {
      grid-area: badge;
      width: 340px;
    }

    @media (max-width: 760px) {
      .content {
        grid-template-columns: 1fr;
        grid-template-areas:
          "card"
          "weather"
          "badge";
        gap: 1.5rem;
      }
    }
  </style>

  <section class="dashboard" part="dashboard">
    <div class="content" part="content">
      <slot></slot>
    </div>
  </section>
`;

class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const html = template.content.cloneNode(true);
    this.shadowRoot.append(html);

    this.addEventListener("user-greet", event => {
      const warningBadge = this.querySelector("warning-badge");

      if (!warningBadge) return;

      warningBadge.textContent = event.detail.message;
      warningBadge.toggleAttribute("pulsing");
    });
  }
}

customElements.define("user-dashboard", UserDashboard);