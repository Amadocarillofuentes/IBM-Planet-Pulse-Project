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

//bouns animtion with interval

const heroSectBtn = document.getElementById("heroSectBtn");

setInterval(() => {
  heroSectBtn.classList.add("bouns");
  setTimeout(() => heroSectBtn.classList.remove("bouns"), 1500); // match animation duration
}, 6000); // run every 5 seconds

//card creation

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Grab key DOM elements
  const cardContainer = document.getElementById("card-container");
  const sortOrderSelect = document.getElementById("sort-order");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const loadingDiv = document.getElementById("loading");
  loadingDiv.classList = "smoke";

  let cardsData = [];

  showCountryCards();

  sortOrderSelect.addEventListener("change", () => {
    sortAndRender(searchInput.value.trim().toLowerCase());
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sortAndRender(searchInput.value.trim().toLowerCase());
    }
  });

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sortAndRender(searchInput.value.trim().toLowerCase());
  });

  // Main data-fetching

  async function showCountryCards() {
    // Show loading text and disable the controls
    loadingDiv.classList.remove("hidden");
    sortOrderSelect.disabled = true;
    searchInput.disabled = true;
    searchBtn.disabled = true;

    try {
      // a) Fetch basic country info
      const countryResp = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3"
      );
      const countries = await countryResp.json();

      // b) Fetch GeoJSON polygons to pick lat/lon
      const geoResp = await fetch(
        "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
      );
      const geoJson = await geoResp.json();

      const geoMap = {};
      geoJson.features.forEach((f) => {
        geoMap[f.properties.name] = f.geometry;
      });

      // c) For each country, fetch its latest PM₂.₅ value
      const fetchPromises = countries.map((country) => {
        const name = country.name.common;
        const geo = geoMap[name];
        if (!geo) return Promise.resolve(null);

        // Extract one lat/lon point from the polygon
        let lon, lat;
        if (geo.type === "Polygon") {
          [lon, lat] = geo.coordinates[0][0];
        } else if (geo.type === "MultiPolygon") {
          [lon, lat] = geo.coordinates[0][0][0];
        } else {
          return Promise.resolve(null);
        }

        // Build and call the air-quality API
        const url =
          `https://air-quality-api.open-meteo.com/v1/air-quality` +
          `?latitude=${lat}&longitude=${lon}&hourly=pm2_5`;

        return fetch(url)
          .then((r) => r.json())
          .then((aqi) => {
            const arr = aqi.hourly?.pm2_5 || [];
            // Find the last non-null reading
            let rawLatest = null;
            for (let i = arr.length - 1; i >= 0; i--) {
              if (arr[i] != null) {
                rawLatest = arr[i];
                break;
              }
            }
            if (rawLatest == null) {
              return { country, latestPM: "N/A", pmValue: -1 };
            } else {
              const latest = rawLatest.toFixed(1);
              return {
                country,
                latestPM: latest,
                pmValue: parseFloat(latest),
              };
            }
          })
          .catch(() => ({
            country,
            latestPM: "N/A",
            pmValue: -1,
          }));
      });

      // Wait for all PM₂.₅ fetches to finish
      const results = await Promise.all(fetchPromises);
      cardsData = results.filter((x) => x !== null);

      // Hide loading and re-enable UI
      loadingDiv.classList.add("hidden");
      sortOrderSelect.disabled = false;
      searchInput.disabled = false;
      searchBtn.disabled = false;

      // First render (no filter)
      sortAndRender("");
    } catch (err) {
      console.error("Error loading data:", err);
      loadingDiv.classList.add("hidden");
      sortOrderSelect.disabled = false;
      searchInput.disabled = false;
      searchBtn.disabled = false;
    }
  }

  // Sort, filter, and render the cards

  function sortAndRender(filterTerm = "") {
    const order = sortOrderSelect.value; // "asc" or "desc"

    // Filter by country name if needed
    const filtered = filterTerm
      ? cardsData.filter(({ country }) =>
          country.name.common.toLowerCase().includes(filterTerm)
        )
      : cardsData.slice();

    // Sort by pmValue
    filtered.sort((a, b) =>
      order === "asc" ? a.pmValue - b.pmValue : b.pmValue - a.pmValue
    );

    //If nothing matches, show a message
    if (filtered.length === 0) {
      cardContainer.innerHTML = `
            <div class="no-results">
              No countries found for “${filterTerm}”.
            </div>
          `;
      return;
    }

    // Build HTML for each card
    let rank = 1;
    const html = filtered
      .map(({ country, latestPM }) => {
        const { name, flags, population, region, cca3 } = country;
        return `
              <div class="card">
                <p class="rank-cell">${rank++}</p>
                <div class="country-cell">
                  <img src="${flags.png}" alt="Flag of ${name.common}" />
                  <span>${name.common}</span>
                </div>
                <p class="population-cell"> ${population.toLocaleString()}</p>
                <p class="region-cell">${region}</p>
                <p class="aqi-cell">PM₂.₅: ${latestPM} µg/m³</p>
                <button class="details-btn" data-cca3="${cca3}">
                  Details
                </button>
                <div class="details"></div>
              </div>
            `;
      })
      .join("");

    cardContainer.innerHTML = html;

    // 5. Wire up detail buttons again
    document.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.dataset.cca3;
        const detailsDiv = btn.nextElementSibling;

        if (detailsDiv.style.display === "block") {
          detailsDiv.style.display = "none";
          detailsDiv.innerHTML = "";
          return;
        }

        // Otherwise, show a loader & open it
        detailsDiv.innerHTML = "<p>Loading details…</p>";
        detailsDiv.style.display = "block";

        showCountryDetails(code, detailsDiv);
      });
    });
  }

  // Fetch World Bank indicators (forest+renew)

  async function fetchIndicator(countryCode, indicator) {
    const url =
      `https://api.worldbank.org/v2/country/${countryCode}` +
      `/indicator/${indicator}?format=json&date=2021&per_page=1`;

    const resp = await fetch(url);
    const json = await resp.json();
    if (json[1] && json[1].length > 0 && json[1][0].value != null) {
      return parseFloat(json[1][0].value).toFixed(2);
    }
    return "N/A";
  }

  // Fetch latest pollution news via RSS proxy

  async function fetchPollutionNews(countryName, count = 5) {
    const rssUrl =
      `https://news.google.com/rss/search?q=` +
      encodeURIComponent(`pollution+${countryName}`) +
      `&hl=en-US&gl=US&ceid=US:en`;

    // Use a public proxy to avoid CORS issues
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      rssUrl
    )}`;

    const xmlText = await fetch(proxy).then((r) => r.text());
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    const items = Array.from(doc.querySelectorAll("item"))
      .slice(0, count)
      .map((item) => ({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || "",
      }));
    return items;
  }

  // Show details for one country card

  async function showCountryDetails(countryCode, container) {
    // 1) Insert Close button + placeholder
    container.innerHTML = `
    <button class="close-detail">&#10005;</button>
    <p>Loading details…</p>
  `;

    // 2) Wire up that Close button
    container.querySelector(".close-detail").addEventListener("click", () => {
      container.style.display = "none";
      container.innerHTML = "";
    });

    // 3) Now fetch your 3 bits of data in parallel
    try {
      const countryObj = cardsData.find(
        (x) => x.country.cca3 === countryCode
      ).country;
      const countryName = countryObj.name.common;

      const [forestPct, renewPct, newsItems] = await Promise.all([
        fetchIndicator(countryCode, "AG.LND.FRST.ZS"),
        fetchIndicator(countryCode, "EG.FEC.RNEW.ZS"),
        fetchPollutionNews(countryName, 5),
      ]);

      // 4) Build the real details HTML (below the Close button)
      let html = `
      <p>Forest Area (% land): ${forestPct}</p>
      <p>Renewable Energy (% total): ${renewPct}</p>
      <h4>Latest Pollution News for ${countryName}</h4>
    `;

      if (newsItems.length) {
        html += "<ul>";
        newsItems.forEach((item) => {
          const date = new Date(item.pubDate).toLocaleDateString();
          html += `
          <li>
            <a href="${item.link}" target="_blank" rel="noopener">
              ${item.title}
            </a>
            <div class="pubDate">${date}</div>
          </li>
        `;
        });
        html += "</ul>";
      } else {
        html += "<p>No recent pollution news found.</p>";
      }

      // 5) Replace the placeholder with the real details
      //    (but leave the Close button in place!)
      container.innerHTML =
        `<button class="close-detail">&#10005;</button>` + html;

      // 6) Re-wire up the Close button on the newly injected HTML
      container.querySelector(".close-detail").addEventListener("click", () => {
        container.style.display = "none";
        container.innerHTML = "";
      });
    } catch (err) {
      console.error("Error loading details:", err);
      container.innerHTML = `<button class="close-detail">&#10005;</button>
      <p>Error loading details.</p>`;
      container.querySelector(".close-detail").addEventListener("click", () => {
        container.style.display = "none";
        container.innerHTML = "";
      });
    }
  }
});
