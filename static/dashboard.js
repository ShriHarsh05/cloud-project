// Initial setup for region selection and live data fetch
document.addEventListener('DOMContentLoaded', () => {
    const regionSelector = document.getElementById('regionSelector');
    const solarOutput = document.getElementById('solarOutput');
    const costEstimation = document.getElementById('costEstimation');

    // Function to fetch live solar data and cost estimation
    async function fetchSolarData(region) {
        const apiKey = 'ceec24d724783b330d5cc4e77c39d55f';  // Replace with your third-party API key (e.g., OpenWeatherMap)
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Assuming the API returns solar radiation or energy data
            const solarIrradiance = data.main.temp;  // Replace with actual solar irradiance field from API response
            const areaSize = 100;  // Example area size in sqm
            const costPerTile = 1000;  // Example cost per tile

            // Update DOM with fetched data
            solarOutput.innerHTML = `Region: ${region} <br> Solar Irradiance: ${solarIrradiance} W/sqm`;

            // Example calculation for cost estimation (modify based on actual API data)
            const estimatedCost = areaSize * costPerTile;
            costEstimation.innerHTML = `Cost estimation for ${areaSize} sqm: $${estimatedCost}`;

        } catch (error) {
            console.error('Error fetching solar data:', error);
            solarOutput.innerHTML = 'Error fetching data.';
        }
    }

    // Event listener for region selection
    regionSelector.addEventListener('change', (event) => {
        const selectedRegion = event.target.value;
        fetchSolarData(selectedRegion);
    });

    // Initial fetch for default selected region
    fetchSolarData(regionSelector.value);
});
