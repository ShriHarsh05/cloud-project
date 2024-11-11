document.getElementById('locationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // For demonstration, we use mock data instead of calling the real API
    const data = getMockWeatherData();
    renderChart(data);
});

function getMockWeatherData() {
    // Simulate a response from OpenWeatherMap API
    return {
        lat: 40.7128,
        lon: -74.0060,
        hourly: [
            { dt: 1633071600, temp: 22, uvi: 5 },
            { dt: 1633075200, temp: 21, uvi: 4 },
            { dt: 1633078800, temp: 20, uvi: 3 },
            { dt: 1633082400, temp: 19, uvi: 2 },
            { dt: 1633086000, temp: 18, uvi: 1 },
            { dt: 1633089600, temp: 17, uvi: 0 },
            { dt: 1633093200, temp: 16, uvi: 0 }
        ]
    };
}

function renderChart(data) {
    const ctx = document.getElementById('solarChart').getContext('2d');

    const timestamps = data.hourly.map(entry => new Date(entry.dt * 1000).toLocaleDateString());
    const temperatures = data.hourly.map(entry => entry.temp);
    const solarRadiation = data.hourly.map(entry => entry.uvi); // Use uvi for solar radiation

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                },
                {
                    label: 'Solar Radiation (UV Index)',
                    data: solarRadiation,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('output').innerText = `Sample data retrieved for coordinates (${data.lat}, ${data.lon})`;
}
