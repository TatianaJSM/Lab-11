const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      --weather-bg: #0ea5e9;
      --weather-color: white;
    }

    .weather {
      background: var(--weather-bg);
      color: var(--weather-color);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
    }

    .temperature {
      font-size: 2.4rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .status {
      margin: 0;
      opacity: 0.9;
    }
  </style>

  <section class="weather" part="weather">
    <h2 part="city"></h2>
    <p class="temperature" part="temperature"></p>
    <p class="status" part="status"></p>
  </section>
`;

class WeatherTime extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const html = template.content.cloneNode(true);
    this.shadowRoot.append(html);

    this.shadowRoot.querySelector("h2").textContent =
      this.getAttribute("city") || "Ciudad";

    this.shadowRoot.querySelector(".temperature").textContent =
      this.getAttribute("temperature") || "-- °C";

    this.shadowRoot.querySelector(".status").textContent =
      this.getAttribute("status") || "Sin estado";
  }
}

customElements.define("weather-time", WeatherTime);