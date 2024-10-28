"use strict";
const map = L.map("map").setView([51.5074, -0.1278], 12);
// Define initial tile layer
let currentLayer = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
).addTo(map);

// Function to change the tile layer
// Function to change the tile layer and adjust styles
// Function to change the tile layer and adjust styles based on active layer
function changeMapLayer() {
    // Remove the current layer
    map.removeLayer(currentLayer);
  
    // Toggle between tile layers and apply corresponding styles
    if (currentLayer === layer1) {
      currentLayer = layer2;
      
      // Style for layer2: Dark mode
      document.body.style.backgroundColor = "black";
      document.querySelector("h1").style.color = "#00ab64";
    } else {
      currentLayer = layer1;
      
      // Style for layer1: Light mode
      document.body.style.backgroundColor = "white";
      document.querySelector("h1").style.color = "black";
    }
  
    // Add the new layer to the map
    currentLayer.addTo(map);
  }
  
  // Attach the click event to the button
  document
    .getElementById("changeLayerBtn")
    .addEventListener("click", changeMapLayer);
  
  

// Add another tile layer (you can customize this)
const layer1 = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
);

const layer2 = L.tileLayer(
  "https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}",
  {
    attribution:
      '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    accessToken:
      "D9ppo0gRCJyJ34oliY1QlXRZbNEJHm8E7F7pa9XYuEgJh1qgnub7HYksOW08kaiJ",
  }
);

// Custom icon for the tree marker
const treeIcon = L.icon({
  iconUrl: "images/icons8-tree-48.png", // Path to your custom icon
  iconSize: [48, 48], // Size of the icon [width, height]
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // Point from which the popup should open relative to the iconAnchor
});

// Fetch data from Strapi backend
fetch("https://oldtrees.onrender.com/api/treess")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); 
    if (data.data) {
      data.data.forEach((tree) => {
       
        const { Name, Species, Age, Latitude, Longitude } = tree;
       
        const marker = L.marker([Latitude, Longitude], {
          icon: treeIcon,
        }).addTo(map);
        marker.bindPopup(`
                  <b>${Name}</b><br>
                  Species: ${Species}<br>
                  Age: ${Age !== null ? `${Age} years` : "🫠"}                `);
      });
    } else {
      console.error("No data found:", data);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
