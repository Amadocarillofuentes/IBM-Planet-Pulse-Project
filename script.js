// ----- SETTINGS MODAL (unchanged) -----
const settingsIcons = document.querySelectorAll(".settings-icon");
const modal = document.getElementById("settings-modal-tcg");
const darkModeToggleModal = document.getElementById("darkModeToggleModal");

function toggleTCGSettingsModal() {
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    syncToggleWithDarkMode();
  }
}

function syncToggleWithDarkMode() {
  if (darkModeToggleModal) {
    darkModeToggleModal.checked = document.body.classList.contains("dark-mode");
  }
}

settingsIcons.forEach((icon) => {
  icon.addEventListener("click", toggleTCGSettingsModal);
});

const closeButton = document.querySelector(".close-button");
if (closeButton) {
  closeButton.addEventListener("click", toggleTCGSettingsModal);
}

// Dark mode
const savedDarkMode = localStorage.getItem("darkMode") === "enabled";
if (savedDarkMode) {
  document.body.classList.add("dark-mode");
}
if (darkModeToggleModal) {
  darkModeToggleModal.checked = savedDarkMode;
  darkModeToggleModal.addEventListener("change", () => {
    if (darkModeToggleModal.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

const cardContainer = document.getElementById("card-container");
const sortOrderSelect = document.getElementById("sort-order");

// Holds every card’s data
let cardsData = [];

async function showCountryCards() {
  try {
    // 1) Fetch country list
    const countryResp = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region"
    );
    const countries = await countryResp.json();

    // 2) Fetch GeoJSON shapes
    const geoResp = await fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    );
    const geoJson = await geoResp.json();

    // Map shapes by name for quick lookup
    const geoMap = {};
    geoJson.features.forEach((f) => {
      geoMap[f.properties.name] = f.geometry;
    });

    // 3) Build an array of promises to fetch each country’s AQI
    const fetchPromises = countries.map((country) => {
      const name = country.name.common;
      const geo = geoMap[name];
      if (!geo) return Promise.resolve(null);

      // Pick first coordinate
      let lat, lon;
      if (geo.type === "Polygon") {
        [lon, lat] = geo.coordinates[0][0];
      } else if (geo.type === "MultiPolygon") {
        [lon, lat] = geo.coordinates[0][0][0];
      } else {
        return Promise.resolve(null);
      }

      // Fetch PM₂.₅ for this country
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm2_5`;
      return fetch(url)
        .then((r) => r.json())
        .then((aqi) => {
          const arr = aqi.hourly?.pm2_5 || [];
          const latest = arr.length ? arr[arr.length - 1].toFixed(1) : "N/A";
          const pmVal = latest === "N/A" ? -1 : parseFloat(latest);

          return {
            country,
            latestPM: latest,
            pmValue: pmVal,
          };
        })
        .catch(() => ({
          country,
          latestPM: "N/A",
          pmValue: -1,
        }));
    });

    // 4) Wait for all AQI fetches to finish
    const results = await Promise.all(fetchPromises);

    // 5) Filter out any nulls (missing geometry)
    cardsData = results.filter((item) => item !== null);

    // 6) Initial render (default “desc”)
    sortAndRender();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

// Sorts cardsData & re-renders
function sortAndRender() {
  const order = sortOrderSelect.value; // "asc" or "desc"
  const sorted = cardsData.slice().sort((a, b) => {
    return order === "asc" ? a.pmValue - b.pmValue : b.pmValue - a.pmValue;
  });

  // Clear then append
  cardContainer.innerHTML = "";
  sorted.forEach((item) => {
    const { country, latestPM } = item;
    const { name, flags, population, region } = country;

    cardContainer.innerHTML += `
      <div class="card">
        <img src="${flags.png}" alt="${name.common}" />
        <p>${name.common}</p>
        <p>Population: ${population.toLocaleString()}</p>
        <p>Region: ${region}</p>
        <p>PM₂.₅: ${latestPM} µg/m³</p>
      </div>
    `;
  });
}

// Re-sort & re-render on dropdown change
sortOrderSelect.addEventListener("change", sortAndRender);

// Kick things off
showCountryCards();
