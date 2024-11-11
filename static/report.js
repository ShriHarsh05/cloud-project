document.getElementById('locationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    const data = await getWeatherData(latitude, longitude);
    renderChart(data);
});

async function getWeatherData(lat, lon) {
    const apiKey = 'ceec24d724783b330d5cc4e77c39d55fY'; // Replace with your OpenWeatherMap API key
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.floor(Date.now() / 1000) - 86400 * 30}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    // Store data in JSON file (this is simulated, since we can't create files in the browser)
    console.log(JSON.stringify(data)); // This would be sent to a server in a real application

    return data;
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

    document.getElementById('output').innerText = `Data retrieved for coordinates (${data.lat}, ${data.lon})`;
}
