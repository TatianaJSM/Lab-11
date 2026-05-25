const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      --card-bg: #ffffff;
      --card-color: #1f2937;
      --card-accent: #2563eb;
    }

    .card {
      background: var(--card-bg);
      color: var(--card-color);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    img {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--card-accent);
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    p {
      margin: 0.25rem 0 0.8rem;
      color: #6b7280;
    }

    button {
      background: var(--card-accent);
      color: white;
      border: none;
      padding: 0.65rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      filter: brightness(0.9);
    }
  </style>

  <article class="card" part="card">
    <img part="avatar" />
    <section>
      <h2 part="name"></h2>
      <p part="role"></p>
      <button part="button">Saludar</button>
    </section>
  </article>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const html = template.content.cloneNode(true);
    this.shadowRoot.append(html);

    const avatar = this.getAttribute("avatar");
    const name = this.getAttribute("name") || "Usuario";
    const role = this.getAttribute("role") || "Sin rol";

    this.shadowRoot.querySelector("img").src = avatar;
    this.shadowRoot.querySelector("img").alt = name;
    this.shadowRoot.querySelector("h2").textContent = name;
    this.shadowRoot.querySelector("p").textContent = role;

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("user-greet", {
          bubbles: true,
          composed: true,
          detail: {
            message: `Hola, ${name}`,
            user: name
          }
        })
      );
    });
  }
}

customElements.define("user-card", UserCard);