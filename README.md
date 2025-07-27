# MoodDrop — Registro emocional diario en tu navegador

![MoodDrop Banner](https://img.shields.io/badge/Estado-En%20Desarrollo-blueviolet)  
*Una extensión minimalista para registrar cómo te sentís a lo largo del día y visualizar tus emociones con claridad.*

---

## 🧠 ¿Qué es MoodDrop?

**MoodDrop** es una extensión para navegadores (Chrome y Firefox) que te permite llevar un **registro emocional diario** de forma simple y visual.  
Con solo un par de clics, podés seleccionar cómo te sentís en un momento del día, y luego acceder a un **dashboard visual** con:

- 📋 Registro de emociones por hora.
- 📊 Gráfico de emociones más frecuentes (últimos 7 días).
- 📈 Tendencia emocional diaria.
- 🌟 Emoji promedio del día.
- 🗑️ Posibilidad de eliminar registros individuales.

Todo desde tu navegador, sin cuentas, sin complicaciones, 100% privado y local.

---

## ✨ Características principales

- ✅ Registro rápido de emociones con emojis.
- ✅ Dashboard visual e interactivo con [Chart.js](https://www.chartjs.org/).
- ✅ Persistencia local con `chrome.storage.sync`.
- ✅ Diseño minimalista (en desarrollo).
- ✅ Compatible con Chrome y Firefox.
- ✅ Botón de donación y feedback integrado.

---

## 📸 Capturas de pantalla

> *Próximamente se agregarán imágenes del popup y dashboard.*

---

## 🛠 Estructura del proyecto

El proyecto está organizado de forma simple y clara:

```text
mooddrop-extension/
├── manifest.json             # Configuración de la extensión (manifest V3)
├── popup.html                # Interfaz para registrar emociones
├── popup.js                  # Lógica para guardar emociones y timestamps
├── dashboard.html            # Panel visual con gráficos y estadísticas
├── dashboard.js              # Procesamiento y visualización de datos
├── styles.css                # Estilos compartidos entre popup y dashboard
├── lib/
│   └── chart.min.js          # Librería Chart.js embebida (uso offline)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
```


---

## 🚀 Cómo instalar en modo desarrollador

1. Cloná o descargá este repositorio.
2. Abrí tu navegador y entrá a:
   - **Chrome**: `chrome://extensions/`
   - **Firefox**: `about:debugging`
3. Activá el **modo desarrollador**.
4. Clic en **"Cargar sin empaquetar"** o **"Cargar complemento temporal"**.
5. Seleccioná la carpeta `mooddrop-extension`.

¡Listo! Vas a ver el ícono en tu barra de extensiones 😊

---

## ❤️ ¿Te gusta esta herramienta?

Si te resulta útil y querés apoyarme, podés invitarme un cafecito ☕  
👉 [https://cafecito.app/nicojvelazquez](https://cafecito.app/nicojvelazquez)

También podés dejar feedback o sugerencias para futuras funciones.

---

## 🧩 Próximas funcionalidades (en desarrollo)

- [ ] Vista tipo calendario emocional mensual.
- [ ] Exportación del historial a JSON.
- [ ] Recordatorios diarios para registrar emociones.
- [ ] Filtro por tipo de emoción o fecha.
- [ ] Mejora visual y animaciones suaves.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.  
Podés usarlo, modificarlo y compartirlo libremente, ¡pero estaría buenísimo que me des crédito si te sirve!

---

## ✉️ Contacto

Creado por [@njvelazquez215](https://github.com/njvelazquez215)  
📫 Podés contactarme a través de [https://cafecito.app/nicojvelazquez](https://cafecito.app/nicojvelazquez) o abrir un issue en el repo.

---

> *“El primer paso para entender cómo estás... es prestar atención.”* 💡
