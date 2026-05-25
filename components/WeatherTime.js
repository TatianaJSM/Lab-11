const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      --weather-bg: #c7f2d4;
      --weather-color: #1f2937;
    }

    .weather {
      background: var(--weather-bg);
      color: var(--weather-color);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
      text-align: center;
    }

    h2 {
      margin: 0;
      font-size: 1.6rem;
    }

    .temperature {
      font-size: 2.2rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .status {
      margin: 0;
      opacity: 0.9;
    }
  </style>

  <section class="weather" part="weather">
    <h2 part="city">Cargando...</h2>
    <p class="temperature" part="temperature">-- °C</p>
    <p class="status" part="status">Consultando clima</p>
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

    this.loadWeather();
  }

  async loadWeather() {
    const city = this.getAttribute("city") || "Liberia";

    try {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=10.635&longitude=-85.4377&current_weather=true";

      const response = await fetch(url);
      const data = await response.json();

      const temperature = data.current_weather.temperature;
      const weatherCode = data.current_weather.weathercode;

      this.shadowRoot.querySelector("h2").textContent = city;
      this.shadowRoot.querySelector(".temperature").textContent = `${temperature} °C`;
      this.shadowRoot.querySelector(".status").textContent = this.getWeatherStatus(weatherCode);
    } catch (error) {
      this.shadowRoot.querySelector("h2").textContent = city;
      this.shadowRoot.querySelector(".temperature").textContent =
        this.getAttribute("temperature") || "31 °C";
      this.shadowRoot.querySelector(".status").textContent =
        this.getAttribute("status") || "Sunny";
    }
  }

  getWeatherStatus(code) {
    const statuses = {
      0: "Sunny",
      1: "Mostly clear",
      2: "Partly cloudy",
      3: "Cloudy",
      45: "Fog",
      48: "Fog",
      51: "Light drizzle",
      61: "Rain",
      63: "Moderate rain",
      65: "Heavy rain",
      80: "Rain showers",
      95: "Thunderstorm"
    };

    return statuses[code] || "Weather available";
  }
}

customElements.define("weather-time", WeatherTime);