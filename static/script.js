document.getElementById('fetch-tiles').addEventListener('click', () => {
    fetchTiles();
});

function fetchTiles() {
    // Simulate fetching data
    const tiles = [
        { size: 0.25, power: 2, cost: 150 },  // Tile size in square meters, power in watts per footstep, cost per tile
        { size: 0.5, power: 3.5, cost: 300 },
        { size: 1, power: 5, cost: 500 },
    ];

    let tileList = '<ul class="list-group">';
    tiles.forEach(tile => {
        tileList += `<li class="list-group-item">
                        <strong>Tile Size:</strong> ${tile.size} sqmm,
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

    // Assuming a default tile size for calculation, you can add a dropdown for tile selection
    const tileSize = 0.25; // 0.25 square meters
    const footTraffic = 100; // Approximate foot traffic per day

    const tilesNeeded = Math.ceil(area / tileSize);
    const estimatedPower = tilesNeeded * 2 * footTraffic;  // Assuming 2 W/step per tile

    const resultHTML = `<p>Total Area: ${area} sqm</p>
                        <p>Tiles Needed: ${tilesNeeded}</p>
                        <p>Estimated Power Generation: ${estimatedPower} W/day</p>`;
    
    document.getElementById('calculation-results').innerHTML = resultHTML;
});
// Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User signed up:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error signing up:', error);
        });
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User signed in:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error signing in:', error);
        });
});
