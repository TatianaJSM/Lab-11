# Lab 11 - User Dashboard

Este laboratorio implementa Web Components usando:

- Shadow DOM
- Atributos
- Atributos reactivos
- Slots
- CSS variables
- CSS parts
- Eventos personalizados

## Estructura principal

```html
<user-dashboard>
  <user-card avatar="..." name="Alonso" role="Profesor"></user-card>
  <weather-time city="Liberia" temperature="31 °C" status="Sunny"></weather-time>
  <warning-badge pulsing>Sesión por expirar</warning-badge>
</user-dashboard>