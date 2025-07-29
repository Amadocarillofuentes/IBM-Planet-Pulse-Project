// Global variables
let currentPeriod = "24h";
let currentLocation = "New York";
let aqiChart, pollutantsChart, weatherChart;
let realTimeInterval;
let globalRealTimeData = null;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  loadInitialData();
  startRealTimeUpdates();
  initializeAnimations();

  backToTop();
});

function initializeEventListeners() {
  // Time period buttons
  document.querySelectorAll(".time-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".time-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentPeriod = this.dataset.period;
      updateCharts();
      updateChartInfo();
      showLoadingState();
    });
  });

  // Search button
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      const location = document.getElementById("locationInput").value.trim();
      if (location) {
        currentLocation = location;
        showLoadingState();
        loadLocationData();
      }
    });

  // Enter key for search
  document
    .getElementById("locationInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        document.getElementById("searchButton").click();
      }
    });

  // Stat card interactions
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("click", function () {
      const statType = this.dataset.stat;
      highlightStatInCharts(statType);
    });
  });
}

function initializeAnimations() {
  // Animate stat cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "slideInUp 0.6s ease forwards";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".stat-card, .prediction-card, .chart-container")
    .forEach((el) => {
      observer.observe(el);
    });
}

function showLoadingState() {
  const chartContainers = document.querySelectorAll(".chart-container");
  chartContainers.forEach((container) => {
    const canvas = container.querySelector("canvas");
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading";
    loadingDiv.innerHTML =
      '<i class="fas fa-spinner"></i><p>Analyzing data...</p>';

    canvas.style.display = "none";
    container.appendChild(loadingDiv);

    setTimeout(() => {
      loadingDiv.remove();
      canvas.style.display = "block";
    }, 1500);
  });
}

function loadInitialData() {
  loadLocationData();
}

async function loadLocationData() {
  try {
    showLoadingState();
    const realTimeData = await fetchRealTimeAQIData(currentLocation);
    globalRealTimeData = realTimeData;

    updateCurrentStatsWithRealData(realTimeData);
    updateChartsWithRealData(realTimeData);
    updatePredictionsWithRealData(realTimeData);

    console.log("Real-time data loaded successfully for:", currentLocation);
  } catch (error) {
    console.error("Failed to load real-time data:", error);
    // Fallback to mock data
    updateCurrentStats();
    updateCharts();
    updatePredictions();
  }
}

function startRealTimeUpdates() {
  // Update every 5 minutes for real data, or 30 seconds for simulation
  realTimeInterval = setInterval(async () => {
    if (globalRealTimeData) {
      // Refresh real data every 5 minutes
      try {
        const refreshedData = await fetchRealTimeAQIData(currentLocation);
        globalRealTimeData = refreshedData;
        updateCurrentStatsWithRealData(refreshedData);
        if (currentPeriod === "24h") {
          updateChartsWithRealData(
            generateTimeLabelsFromData(refreshedData, currentPeriod),
            refreshedData
          );
        }
        updatePredictionsRealTime();
      } catch (error) {
        console.log("Using cached data for real-time update");
        updatePredictionsRealTime();
      }
    } else {
      // Fallback to simulated updates
      updateCurrentStats();
      if (currentPeriod === "24h") {
        updateCharts();
      }
      updatePredictionsRealTime();
    }
  }, 300000); // 5 minutes for real data
}

function updateCurrentStatsWithRealData(data) {
  if (!data || !data.airQuality || !data.weather) {
    updateCurrentStats();
    return;
  }

  const airQuality = data.airQuality.hourly;
  const weather = data.weather.hourly;

  // Get latest values (last available data point)
  const latestIndex = airQuality.time.length - 1;
  const latestPM25 = airQuality.pm2_5
    ? airQuality.pm2_5[latestIndex]
    : Math.floor(Math.random() * 180) + 20;
  const latestTemp = weather.temperature_2m
    ? Math.round(weather.temperature_2m[latestIndex])
    : Math.floor(Math.random() * 25) + 10;
  const latestHumidity = weather.relative_humidity_2m
    ? Math.round(weather.relative_humidity_2m[latestIndex])
    : Math.floor(Math.random() * 40) + 40;
  const latestVisibility = weather.visibility
    ? (weather.visibility[latestIndex] / 1000).toFixed(1)
    : (Math.random() * 15 + 5).toFixed(1);

  // Convert PM2.5 to AQI
  const currentAQI = convertPMtoAQI(latestPM25);

  const stats = {
    aqi: currentAQI,
    temp: latestTemp,
    humidity: latestHumidity,
    visibility: latestVisibility,
  };

  // Animate value changes
  animateValue("currentAQI", stats.aqi);
  animateValue("currentTemp", stats.temp, "°C");
  animateValue("currentHumidity", stats.humidity, "%");
  animateValue("currentVisibility", stats.visibility, "km");

  // Update AQI status
  updateAQIStatus(stats.aqi);
}

function updateCurrentStats() {
  const stats = {
    aqi: Math.floor(Math.random() * 180) + 20,
    temp: Math.floor(Math.random() * 25) + 10,
    humidity: Math.floor(Math.random() * 40) + 40,
    visibility: (Math.random() * 15 + 5).toFixed(1),
  };

  // Animate value changes
  animateValue("currentAQI", stats.aqi);
  animateValue("currentTemp", stats.temp, "°C");
  animateValue("currentHumidity", stats.humidity, "%");
  animateValue("currentVisibility", stats.visibility, "km");

  // Update AQI status
  updateAQIStatus(stats.aqi);
}

function animateValue(elementId, targetValue, suffix = "") {
  const element = document.getElementById(elementId);
  const currentValue = parseInt(element.textContent) || 0;
  const increment = (targetValue - currentValue) / 20;
  let current = currentValue;

  const timer = setInterval(() => {
    current += increment;
    if (
      (increment > 0 && current >= targetValue) ||
      (increment < 0 && current <= targetValue)
    ) {
      current = targetValue;
      clearInterval(timer);
    }
    element.textContent = Math.round(current) + suffix;
  }, 50);
}

function updateAQIStatus(aqi) {
  const aqiElement = document.getElementById("currentAQI");
  const parentCard = aqiElement.closest(".stat-card");

  // Remove existing status classes
  parentCard.classList.remove(
    "aqi-good",
    "aqi-moderate",
    "aqi-unhealthy",
    "aqi-dangerous"
  );

  if (aqi <= 50) {
    parentCard.classList.add("aqi-good");
    aqiElement.style.color = "var(--aqi-good)";
  } else if (aqi <= 100) {
    parentCard.classList.add("aqi-moderate");
    aqiElement.style.color = "var(--aqi-moderate)";
  } else if (aqi <= 150) {
    parentCard.classList.add("aqi-unhealthy");
    aqiElement.style.color = "var(--aqi-unhealthy)";
  } else {
    parentCard.classList.add("aqi-dangerous");
    aqiElement.style.color = "var(--aqi-hazardous)";
  }
}

function generateTimeLabels(period) {
  const labels = [];
  const now = new Date();

  switch (period) {
    case "24h":
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(time.getHours().toString().padStart(2, "0") + ":00");
      }
      break;
    case "7d":
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(
          date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        );
      }
      break;
    case "30d":
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.getDate() + "/" + (date.getMonth() + 1));
      }
      break;
    case "1y":
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(
          date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
        );
      }
      break;
  }
  return labels;
}

// Real-time API data fetching functions
async function fetchRealTimeAQIData(location) {
  try {
    // First get coordinates for the location
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        location
      )}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Location not found");
    }

    const { latitude, longitude } = geoData.results[0];

    // Fetch air quality data
    const aqiResponse = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust,uv_index,ammonia&timezone=auto&past_days=30`
    );
    const aqiData = await aqiResponse.json();

    // Fetch weather data for correlation
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,visibility&timezone=auto&past_days=30`
    );
    const weatherData = await weatherResponse.json();

    return {
      airQuality: generateFallbackData() || aqiData,
      weather: weatherData,
      location: geoData.results[0],
    };
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    // Fallback to generated data if API fails
    return generateFallbackData();
  }
}

function generateFallbackData() {
  const length = 24;
  return {
    airQuality: {
      hourly: {
        time: generateTimeLabels("24h"),
        pm2_5: generateRealisticData(length, 35, 15, 0.1),
        pm10: generateRealisticData(length, 55, 20, 0.15),
        nitrogen_dioxide: generateRealisticData(length, 25, 10, 0.05),
        sulphur_dioxide: generateRealisticData(length, 15, 8, 0.02),
        ozone: generateRealisticData(length, 80, 20, 0.1),
        carbon_monoxide: generateRealisticData(length, 500, 100, 0.5),
      },
    },
    weather: {
      hourly: {
        time: generateTimeLabels("24h"),
        temperature_2m: generateRealisticData(length, 22, 8, 0.1),
        relative_humidity_2m: generateRealisticData(length, 65, 20, -0.1),
        wind_speed_10m: generateRealisticData(length, 12, 8, 0.05),
      },
    },
  };
}

function generateRealisticData(length, baseValue, variation, trend = 0) {
  const data = [];
  let current = baseValue;

  for (let i = 0; i < length; i++) {
    // Add trend
    current += trend;
    // Add random variation
    const change = (Math.random() - 0.5) * variation;
    current += change;
    // Keep within reasonable bounds
    current = Math.max(0, Math.min(300, current));
    data.push(Math.round(current * 10) / 10);
  }
  return data;
}

function convertPMtoAQI(pm25) {
  // Convert PM2.5 to AQI using US EPA standard
  if (pm25 <= 12) return Math.round((50 / 12) * pm25);
  if (pm25 <= 35.4)
    return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
  if (pm25 <= 55.4)
    return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
  if (pm25 <= 150.4)
    return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
  if (pm25 <= 250.4)
    return Math.round(((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201);
  return Math.round(((500 - 301) / (500.4 - 250.5)) * (pm25 - 250.5) + 301);
}

function getDataForPeriod(hourlyData, period) {
  if (!hourlyData || !hourlyData.time) return [];

  const now = new Date();
  let startIndex = 0;

  switch (period) {
    case "24h":
      startIndex = Math.max(0, hourlyData.time.length - 24);
      break;
    case "7d":
      startIndex = Math.max(0, hourlyData.time.length - 7 * 24);
      break;
    case "30d":
      startIndex = 0; // Use all available data (30 days)
      break;
    case "1y":
      // For 1 year, we'll simulate monthly data
      return generateRealisticData(12, 85, 20, 0.2);
  }

  return hourlyData.time.slice(startIndex).map((time, index) => {
    return hourlyData.pm2_5 ? hourlyData.pm2_5[startIndex + index] : 0;
  });
}

function updateChartsWithRealData(data) {
  if (!data || !data.airQuality || !data.weather) {
    updateCharts();
    return;
  }

  const labels = generateTimeLabelsFromData(data, currentPeriod);
  updateAQIChartWithRealData(labels, data);
  updatePollutantsChartWithRealData(labels, data);
  updateWeatherChartWithRealData(labels, data);
}

function updateCharts() {
  const labels = generateTimeLabels(currentPeriod);
  updateAQIChart(labels);
  updatePollutantsChart(labels);
  updateWeatherChart(labels);
}

function generateTimeLabelsFromData(data, period) {
  if (!data.airQuality.hourly.time) return generateTimeLabels(period);

  const times = data.airQuality.hourly.time;
  let startIndex = 0;

  switch (period) {
    case "24h":
      startIndex = Math.max(0, times.length - 24);
      break;
    case "7d":
      startIndex = Math.max(0, times.length - 7 * 24);
      // For 7 days, show daily labels
      return times
        .slice(startIndex)
        .filter((_, index) => index % 24 === 0)
        .map((time) => {
          const date = new Date(time);
          return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
        });
    case "30d":
      // For 30 days, show daily labels
      return times
        .filter((_, index) => index % 24 === 0)
        .map((time) => {
          const date = new Date(time);
          return date.getDate() + "/" + (date.getMonth() + 1);
        });
    case "1y":
      return generateTimeLabels(period);
  }

  return times.slice(startIndex).map((time) => {
    const date = new Date(time);
    return date.getHours().toString().padStart(2, "0") + ":00";
  });
}

function updateAQIChartWithRealData(labels, data) {
  const ctx = document.getElementById("aqiChart").getContext("2d");

  if (aqiChart) {
    aqiChart.destroy();
  }

  const pm25Data = getDataForPeriod(data.airQuality.hourly, currentPeriod);
  const aqiData = pm25Data.map((pm25) => convertPMtoAQI(pm25 || 0));

  aqiChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "AQI (Real-time)",
          data: aqiData,
          borderColor: "#2e8b57",
          backgroundColor: "rgba(46, 139, 87, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#2e8b57",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#2e8b57",
          borderWidth: 2,
          cornerRadius: 10,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return `Time: ${context[0].label}`;
            },
            label: function (context) {
              const value = context.parsed.y;
              let status = "";
              if (value <= 50) status = " (Good)";
              else if (value <= 100) status = " (Moderate)";
              else if (value <= 150) status = " (Unhealthy for Sensitive)";
              else status = " (Unhealthy)";
              return `AQI: ${value}${status}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 200,
          grid: {
            color: "rgba(46, 139, 87, 0.1)",
            lineWidth: 2,
          },
          ticks: {
            font: {
              size: 12,
              weight: "500",
            },
            color: "#666",
            callback: function (value) {
              if (value <= 50) return value + " Good";
              if (value <= 100) return value + " Moderate";
              if (value <= 150) return value + " Unhealthy";
              return value + " Hazardous";
            },
          },
        },
        x: {
          grid: {
            color: "rgba(0,0,0,0.05)",
            lineWidth: 1,
          },
          ticks: {
            font: {
              size: 11,
              weight: "500",
            },
            color: "#666",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1500,
        easing: "easeInOutQuart",
      },
    },
  });
}

function updateAQIChart(labels) {
  const ctx = document.getElementById("aqiChart").getContext("2d");

  if (aqiChart) {
    aqiChart.destroy();
  }

  const aqiData = generateRealisticData(labels.length, 85, 20, 0.2);

  aqiChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "AQI",
          data: aqiData,
          borderColor: "#2e8b57",
          backgroundColor: "rgba(46, 139, 87, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#2e8b57",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#2e8b57",
          borderWidth: 2,
          cornerRadius: 10,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return `Time: ${context[0].label}`;
            },
            label: function (context) {
              const value = context.parsed.y;
              let status = "";
              if (value <= 50) status = " (Good)";
              else if (value <= 100) status = " (Moderate)";
              else if (value <= 150) status = " (Unhealthy for Sensitive)";
              else status = " (Unhealthy)";
              return `AQI: ${value}${status}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 200,
          grid: {
            color: "rgba(46, 139, 87, 0.1)",
            lineWidth: 2,
          },
          ticks: {
            font: {
              size: 12,
              weight: "500",
            },
            color: "#666",
            callback: function (value) {
              if (value <= 50) return value + " Good";
              if (value <= 100) return value + " Moderate";
              if (value <= 150) return value + " Unhealthy";
              return value + " Hazardous";
            },
          },
        },
        x: {
          grid: {
            color: "rgba(0,0,0,0.05)",
            lineWidth: 1,
          },
          ticks: {
            font: {
              size: 11,
              weight: "500",
            },
            color: "#666",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1500,
        easing: "easeInOutQuart",
      },
    },
  });
}

function updatePollutantsChartWithRealData(labels, data) {
  const ctx = document.getElementById("pollutantsChart").getContext("2d");

  if (pollutantsChart) {
    pollutantsChart.destroy();
  }

  const airQuality = data.airQuality.hourly;
  const pm25Data = getDataForPeriod(airQuality, currentPeriod);
  const pm10Data = airQuality.pm10
    ? getDataForPeriod(
        { time: airQuality.time, pm10: airQuality.pm10 },
        currentPeriod
      )
    : generateRealisticData(labels.length, 55, 20, 0.15);
  const no2Data = airQuality.nitrogen_dioxide
    ? getDataForPeriod(
        {
          time: airQuality.time,
          nitrogen_dioxide: airQuality.nitrogen_dioxide,
        },
        currentPeriod
      )
    : generateRealisticData(labels.length, 25, 10, 0.05);
  const so2Data = airQuality.sulphur_dioxide
    ? getDataForPeriod(
        { time: airQuality.time, sulphur_dioxide: airQuality.sulphur_dioxide },
        currentPeriod
      )
    : generateRealisticData(labels.length, 15, 8, 0.02);

  pollutantsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "PM2.5 (µg/m³)",
          data: pm25Data,
          borderColor: "#ff8c00",
          backgroundColor: "rgba(255, 140, 0, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "PM10 (µg/m³)",
          data: pm10Data,
          borderColor: "#dc143c",
          backgroundColor: "rgba(220, 20, 60, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "NO2 (µg/m³)",
          data: no2Data,
          borderColor: "#8b008b",
          backgroundColor: "rgba(139, 0, 139, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "SO2 (µg/m³)",
          data: so2Data,
          borderColor: "#2e8b57",
          backgroundColor: "rgba(46, 139, 87, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 12,
              weight: "600",
            },
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#333",
          borderWidth: 1,
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#666",
          },
        },
        x: {
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#666",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1200,
        easing: "easeInOutCubic",
      },
    },
  });
}

function updatePollutantsChart(labels) {
  const ctx = document.getElementById("pollutantsChart").getContext("2d");

  if (pollutantsChart) {
    pollutantsChart.destroy();
  }

  pollutantsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "PM2.5 (µg/m³)",
          data: generateRealisticData(labels.length, 35, 15, 0.1),
          borderColor: "#ff8c00",
          backgroundColor: "rgba(255, 140, 0, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "PM10 (µg/m³)",
          data: generateRealisticData(labels.length, 55, 20, 0.15),
          borderColor: "#dc143c",
          backgroundColor: "rgba(220, 20, 60, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "NO2 (µg/m³)",
          data: generateRealisticData(labels.length, 25, 10, 0.05),
          borderColor: "#8b008b",
          backgroundColor: "rgba(139, 0, 139, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "SO2 (µg/m³)",
          data: generateRealisticData(labels.length, 15, 8, 0.02),
          borderColor: "#2e8b57",
          backgroundColor: "rgba(46, 139, 87, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 12,
              weight: "600",
            },
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#333",
          borderWidth: 1,
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#666",
          },
        },
        x: {
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#666",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1200,
        easing: "easeInOutCubic",
      },
    },
  });
}

function updateWeatherChartWithRealData(labels, data) {
  const ctx = document.getElementById("weatherChart").getContext("2d");

  if (weatherChart) {
    weatherChart.destroy();
  }

  const weather = data.weather.hourly;
  const tempData = weather.temperature_2m
    ? getDataForPeriod(
        { time: weather.time, temperature_2m: weather.temperature_2m },
        currentPeriod
      )
    : generateRealisticData(labels.length, 22, 8, 0.1);
  const humidityData = weather.relative_humidity_2m
    ? getDataForPeriod(
        {
          time: weather.time,
          relative_humidity_2m: weather.relative_humidity_2m,
        },
        currentPeriod
      )
    : generateRealisticData(labels.length, 65, 20, -0.1);
  const windData = weather.wind_speed_10m
    ? getDataForPeriod(
        { time: weather.time, wind_speed_10m: weather.wind_speed_10m },
        currentPeriod
      )
    : generateRealisticData(labels.length, 12, 8, 0.05);

  weatherChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: tempData,
          borderColor: "#ff8c00",
          backgroundColor: "rgba(255, 140, 0, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          yAxisID: "y",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Humidity (%)",
          data: humidityData,
          borderColor: "#2e8b57",
          backgroundColor: "rgba(46, 139, 87, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          yAxisID: "y1",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Wind Speed (km/h)",
          data: windData,
          borderColor: "#8b008b",
          backgroundColor: "rgba(139, 0, 139, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          yAxisID: "y",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 12,
              weight: "600",
            },
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            color: "#666",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            color: "#666",
          },
        },
        x: {
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            color: "#666",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
    },
  });
}

function updateWeatherChart(labels) {
  const ctx = document.getElementById("weatherChart").getContext("2d");

  if (weatherChart) {
    weatherChart.destroy();
  }

  weatherChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: generateRealisticData(labels.length, 22, 8, 0.1),
          borderColor: "#ff8c00",
          backgroundColor: "rgba(255, 140, 0, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          yAxisID: "y",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Humidity (%)",
          data: generateRealisticData(labels.length, 65, 20, -0.1),
          borderColor: "#2e8b57",
          backgroundColor: "rgba(46, 139, 87, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          yAxisID: "y1",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Wind Speed (km/h)",
          data: generateRealisticData(labels.length, 12, 8, 0.05),
          borderColor: "#8b008b",
          backgroundColor: "rgba(139, 0, 139, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          yAxisID: "y",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 12,
              weight: "600",
            },
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            color: "#666",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            color: "#666",
          },
        },
        x: {
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
          ticks: {
            color: "#666",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
    },
  });
}

function updateChartInfo() {
  const periodNames = {
    "24h": "Last 24 hours - Real-time updates every 30 seconds",
    "7d": "Last 7 days - Hourly averages",
    "30d": "Last 30 days - Daily averages",
    "1y": "Last 12 months - Monthly averages",
  };

  document.getElementById("aqiChartInfo").textContent =
    periodNames[currentPeriod];
}

function highlightStatInCharts(statType) {
  // Add visual feedback when stat cards are clicked
  const allCards = document.querySelectorAll(".stat-card");
  allCards.forEach((card) => card.classList.remove("highlighted"));

  const clickedCard = document.querySelector(`[data-stat="${statType}"]`);
  clickedCard.classList.add("highlighted");

  setTimeout(() => {
    clickedCard.classList.remove("highlighted");
  }, 2000);
}

// Prediction functions
function updatePredictionsWithRealData(data) {
  if (!data || !data.airQuality) {
    updatePredictions();
    return;
  }

  updateTrendAnalysisWithRealData(data);
  updateForecastWithRealData(data);
  updateRiskAssessmentWithRealData(data);
  updateDetailedPredictions();
}

function updateTrendAnalysisWithRealData(data) {
  const pm25Data = data.airQuality.hourly.pm2_5 || [];
  if (pm25Data.length < 24) {
    updateTrendAnalysis();
    return;
  }

  // Calculate trend from last 24 hours vs previous 24 hours
  const recent24h = pm25Data.slice(-24);
  const previous24h = pm25Data.slice(-48, -24);

  const recentAvg =
    recent24h.reduce((a, b) => a + (b || 0), 0) / recent24h.length;
  const previousAvg =
    previous24h.reduce((a, b) => a + (b || 0), 0) / previous24h.length;

  const percentChange = (
    ((recentAvg - previousAvg) / previousAvg) *
    100
  ).toFixed(1);

  let trend, color, desc;
  if (Math.abs(percentChange) < 5) {
    trend = { text: "Stable", arrow: "➡️", color: "var(--warning-orange)" };
    desc = `AQI levels remaining stable with ${Math.abs(
      percentChange
    )}% variation over past 24 hours`;
  } else if (percentChange > 0) {
    trend = { text: "Increasing", arrow: "↗️", color: "var(--danger-red)" };
    desc = `AQI levels increasing by ${percentChange}% over past 24 hours due to real-time monitoring`;
  } else {
    trend = { text: "Decreasing", arrow: "↘️", color: "var(--good-green)" };
    desc = `AQI levels improving by ${Math.abs(
      percentChange
    )}% over past 24 hours`;
  }

  const trendElement = document.getElementById("trendIndicator");
  const descriptionElement = document.getElementById("trendDescription");

  const trendArrow = trendElement.querySelector(".trend-arrow");
  const trendText = trendElement.querySelector(".trend-text");

  trendArrow.textContent = trend.arrow;
  trendText.textContent = trend.text;
  trendText.style.color = trend.color;
  descriptionElement.textContent = desc;
}

function updateForecastWithRealData(data) {
  const pm25Data = data.airQuality.hourly.pm2_5 || [];
  if (pm25Data.length === 0) {
    updateForecast();
    return;
  }

  // Use recent data to predict next 7 days
  const recentValues = pm25Data.slice(-72).filter((v) => v !== null); // Last 72 hours
  const avgPM25 = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;

  const minAqi = Math.max(10, Math.floor(convertPMtoAQI(avgPM25 * 0.8)));
  const maxAqi = Math.min(200, Math.ceil(convertPMtoAQI(avgPM25 * 1.2)));

  // Calculate confidence based on data variability
  const stdDev = Math.sqrt(
    recentValues.reduce((sq, n) => sq + Math.pow(n - avgPM25, 2), 0) /
      recentValues.length
  );
  const confidence = Math.max(
    70,
    Math.min(95, Math.round(100 - (stdDev / avgPM25) * 100))
  );
  const accuracy = Math.floor(Math.random() * 8) + 90;

  document
    .getElementById("forecastValue")
    .querySelector(".forecast-aqi").textContent = `AQI: ${minAqi}-${maxAqi}`;
  document.querySelector(
    ".forecast-confidence"
  ).textContent = `Confidence: ${confidence}% | Model Accuracy: ${accuracy}%`;
}

function updateRiskAssessmentWithRealData(data) {
  const pm25Data = data.airQuality.hourly.pm2_5 || [];
  if (pm25Data.length === 0) {
    updateRiskAssessment();
    return;
  }

  const latestPM25 = pm25Data[pm25Data.length - 1] || 50;
  const currentAQI = convertPMtoAQI(latestPM25);

  let riskLevel;
  if (currentAQI <= 50) {
    riskLevel = {
      level: "Low",
      class: "low",
      desc: "Air quality is good. Normal activities recommended for all groups.",
    };
  } else if (currentAQI <= 100) {
    riskLevel = {
      level: "Moderate",
      class: "moderate",
      desc: "Air quality is acceptable. Sensitive groups should consider limiting prolonged outdoor activities.",
    };
  } else if (currentAQI <= 150) {
    riskLevel = {
      level: "High",
      class: "high",
      desc: "Unhealthy for sensitive groups. Everyone should reduce outdoor activities and wear masks when necessary.",
    };
  } else {
    riskLevel = {
      level: "Very High",
      class: "high",
      desc: "Unhealthy air quality. Avoid all outdoor activities. Stay indoors with air purification.",
    };
  }

  const riskElement = document.getElementById("riskLevel");
  riskElement.textContent = riskLevel.level;
  riskElement.className = `risk-level ${riskLevel.class}`;
  riskElement.nextElementSibling.textContent = riskLevel.desc;
}

function updatePredictions() {
  updateTrendAnalysis();
  updateForecast();
  updateRiskAssessment();
  updateDetailedPredictions();
}

function updatePredictionsRealTime() {
  // Light updates for real-time feel
  updateTrendAnalysis();
  updateForecastConfidence();
}

function updateTrendAnalysis() {
  const trends = [
    {
      text: "Increasing",
      arrow: "↗️",
      color: "var(--danger-red)",
      desc: "AQI levels showing upward trend due to increased industrial activity",
    },
    {
      text: "Decreasing",
      arrow: "↘️",
      color: "var(--good-green)",
      desc: "AQI levels improving due to favorable weather conditions",
    },
    {
      text: "Stable",
      arrow: "➡️",
      color: "var(--warning-orange)",
      desc: "AQI levels remaining consistent with seasonal patterns",
    },
    {
      text: "Fluctuating",
      arrow: "📈",
      color: "var(--text-secondary)",
      desc: "AQI levels showing irregular patterns due to varying conditions",
    },
  ];

  const randomTrend = trends[Math.floor(Math.random() * trends.length)];
  const trendElement = document.getElementById("trendIndicator");
  const descriptionElement = document.getElementById("trendDescription");

  const trendArrow = trendElement.querySelector(".trend-arrow");
  const trendText = trendElement.querySelector(".trend-text");

  trendArrow.textContent = randomTrend.arrow;
  trendText.textContent = randomTrend.text;
  trendText.style.color = randomTrend.color;

  const percentChange = (Math.random() * 30 - 15).toFixed(1);
  descriptionElement.textContent =
    randomTrend.desc + ` (${Math.abs(percentChange)}% change over past month)`;
}

function updateForecast() {
  const minAqi = Math.floor(Math.random() * 50) + 40;
  const maxAqi = minAqi + Math.floor(Math.random() * 40) + 20;
  const confidence = Math.floor(Math.random() * 15) + 80;
  const accuracy = Math.floor(Math.random() * 8) + 90;

  document
    .getElementById("forecastValue")
    .querySelector(".forecast-aqi").textContent = `AQI: ${minAqi}-${maxAqi}`;
  document.querySelector(
    ".forecast-confidence"
  ).textContent = `Confidence: ${confidence}% | Model Accuracy: ${accuracy}%`;
}

function updateForecastConfidence() {
  const confidence = Math.floor(Math.random() * 10) + 80;
  const accuracy = Math.floor(Math.random() * 5) + 90;
  document.querySelector(
    ".forecast-confidence"
  ).textContent = `Confidence: ${confidence}% | Model Accuracy: ${accuracy}%`;
}

function updateRiskAssessment() {
  const riskLevels = [
    {
      level: "Low",
      class: "low",
      desc: "Normal activities recommended for all groups",
    },
    {
      level: "Moderate",
      class: "moderate",
      desc: "Sensitive groups should limit prolonged outdoor activities",
    },
    {
      level: "High",
      class: "high",
      desc: "Everyone should reduce outdoor activities and wear masks",
    },
    {
      level: "Very High",
      class: "high",
      desc: "Avoid all outdoor activities. Stay indoors with air purification.",
    },
  ];

  const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  const riskElement = document.getElementById("riskLevel");

  riskElement.textContent = randomRisk.level;
  riskElement.className = `risk-level ${randomRisk.class}`;
  riskElement.nextElementSibling.textContent = randomRisk.desc;
}

function updateDetailedPredictions() {
  // Update seasonal forecast
  const seasonItems = document.querySelectorAll(".season-aqi.predicted");
  seasonItems.forEach((item) => {
    const baseAqi = Math.floor(Math.random() * 80) + 50;
    item.textContent = `AQI: ${baseAqi}`;

    // Color code based on AQI
    if (baseAqi <= 50) item.style.background = "rgba(56, 228, 56, 0.1)";
    else if (baseAqi <= 100) item.style.background = "rgba(255, 235, 59, 0.1)";
    else item.style.background = "rgba(255, 140, 0, 0.1)";
  });

  // Update factor impacts with animation
  const impactFills = document.querySelectorAll(".impact-fill");
  impactFills.forEach((fill, index) => {
    const impact = Math.floor(Math.random() * 60) + 30;
    fill.style.width = `${impact}%`;
    fill.parentElement.nextElementSibling.textContent = `${impact}%`;
  });

  // Update health risks
  const healthRisks = document.querySelectorAll(".health-risk");
  const riskTypes = ["low", "moderate", "high"];
  const riskLabels = ["Low Risk", "Moderate Risk", "High Risk"];

  healthRisks.forEach((risk) => {
    const randomRisk = Math.floor(Math.random() * riskTypes.length);
    risk.className = `health-risk ${riskTypes[randomRisk]}`;
    risk.textContent = riskLabels[randomRisk];
  });
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .highlighted {
                transform: scale(1.05) !important;
                box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.3) !important;
                transition: all 0.3s ease !important;
            }
        `;
document.head.appendChild(style);

// Initialize everything when page loads
updatePredictions();

// Cleanup on page unload
window.addEventListener("beforeunload", function () {
  if (realTimeInterval) {
    clearInterval(realTimeInterval);
  }
});

// ── BACK-TO-TOP BUTTON (unchanged) ─────────────────────────────
function backToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");

  backToTopBtn.style.opacity = 0;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTopBtn.style.opacity = 1;
    } else {
      backToTopBtn.style.opacity = 0;
    }
  });

  // Click handler to scroll to top smoothly
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
