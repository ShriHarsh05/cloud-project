document.getElementById('fetch-tiles').addEventListener('click', () => {
    fetchTiles();
});

function fetchTiles() {
    const tiles = [
        { size: 0.25, power: 2, cost: 150 },  // Tile size in square meters, power in watts per footstep, cost per tile in USD
        { size: 0.5, power: 3.5, cost: 300 },
        { size: 1, power: 5, cost: 500 },
    ];

    let tileOptions = '';
    tiles.forEach((tile, index) => {
        tileOptions += `<option value="${index}">Tile Size: ${tile.size} sqm, Power: ${tile.power} W/step, Cost: $${tile.cost}/tile</option>`;
    });
    document.getElementById('tile-selection').innerHTML = tileOptions;

    // Display tile list in a user-friendly way
    let tileList = '<ul class="list-group">';
    tiles.forEach(tile => {
        tileList += `<li class="list-group-item">
                        <strong>Tile Size:</strong> ${tile.size} sqm,
                        <strong>Power:</strong> ${tile.power} W/step,
                        <strong>Cost:</strong> $${tile.cost}/tile
                    </li>`;
    });
    tileList += '</ul>';
    document.getElementById('tile-list').innerHTML = tileList;
}

document.getElementById('area-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const area = length * width;

    const tiles = [
        { size: 0.25, power: 2, cost: 150 },  // Tile size in square meters, power in watts per footstep, cost per tile in USD
        { size: 0.5, power: 3.5, cost: 300 },
        { size: 1, power: 5, cost: 500 },
    ];

    const selectedTileIndex = document.getElementById('tile-selection').value;
    const selectedTile = tiles[selectedTileIndex];
    const tileSize = selectedTile.size;
    const tilePower = selectedTile.power;
    const tileCostUSD = selectedTile.cost;

    const tilesNeeded = Math.ceil(area / tileSize);
    const estimatedPower = tilesNeeded * tilePower * 100;  // Assuming 100 steps per day
    const conversionRate = 83;  // Example conversion rate (1 USD = 83 INR)
    const totalCostINR = tilesNeeded * tileCostUSD * conversionRate;

    const resultHTML = `<p>Total Area: ${area.toFixed(2)} sqm</p>
                        <p>Tiles Needed: ${tilesNeeded}</p>
                        <p>Estimated Power Generation: ${estimatedPower} W/day</p>
                        <p>Total Cost: ₹${totalCostINR.toFixed(2)}</p>`;
    
    document.getElementById('calculation-results').innerHTML = resultHTML;
});
