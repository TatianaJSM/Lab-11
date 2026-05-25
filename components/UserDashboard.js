const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      --dashboard-bg: #f8fafc;
      --dashboard-border: #dbe3ee;
    }

    .dashboard {
      background: var(--dashboard-bg);
      border: 2px solid var(--dashboard-border);
      border-radius: 28px;
      padding: 2rem;
      width: min(950px, 94vw);
      display: grid;
      gap: 1.5rem;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
    }

    .content {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 1.5rem;
      align-items: stretch;
    }

    ::slotted(warning-badge) {
      grid-column: 1 / -1;
    }

    @media (max-width: 760px) {
      .content {
        grid-template-columns: 1fr;
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