const API_URL = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", function () {
  //NAMAKKAL -11.219382573978306, 78.16782586596578
  const DEFAULT_LAT = 11.2193; // Replace with Namakkal's latitude
  const DEFAULT_LNG = 78.1678; // Replace with Namakkal's longitude
  const map = L.map("map").setView([DEFAULT_LAT, DEFAULT_LNG], 13); // Centered on Namakkal
  const originalIcons = new Map(); // Global variable to store original icons
  let selectedPin = null; // Global variable to store the selected pin ID
  let selectedMarker = null; // Global variable to store the selected marker
  let routingControl = null; // To store the routing control instance
  let startPoint = null;
  let endPoint = null;
  let locationMarker = null; // To store the user's location marker
  let pathLine = null; // To store the path line
  let startMarker = null; // To store the start point marker
  let endMarker = null; // To store the end point marker

  // Define custom icons for start and end markers
  const startIcon = L.icon({
    iconUrl: "red-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -32],
  });

  const endIcon = L.icon({
    iconUrl: "red-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -32],
  });

  const esriLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ",
      maxZoom: 18,
    }
  ).addTo(map);

  const roadsLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, NAVTEQ",
      maxZoom: 18,
      opacity: 1,
    }
  ).addTo(map);

  const labelsLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, HERE, DeLorme, USGS, Intermap, increment P Corp.",
      maxZoom: 18,
      opacity: 1,
    }
  ).addTo(map);

  // Add a polygon
  const polygon = L.polygon(
    [
      [11.357760412408611, 77.89230200431227],
      [11.357635652202449, 77.8922547070341],
      [11.357562783384227, 77.8923515538418],
      [11.357695272130792, 77.8924337610158],
    ],
    {
      color: "green",
      fillColor: "#0f3",
      fillOpacity: 0.5,
    }
  ).addTo(map);

  // Load pins on page load
  window.onload = function () {
    loadPins();
  };

  // Function to locate the user's position
  function showLocation() {
    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", function (e) {
      if (locationMarker) {
        map.removeLayer(locationMarker); // Remove previous location marker
      }

      locationMarker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup("You are here!")
        .openPopup();

      // Optional: add a circle around the location
      L.circle(e.latlng, { radius: e.accuracy }).addTo(map);

      checkDeviation(e.latlng); // Check if user deviates from the path
    });

    map.on("locationerror", function () {
      alert("Unable to retrieve your location");
    });
  }

  // Function to start route selection
  // Function to start route selection
  function startRouteSelection() {
    alert("Click on the map to select the starting point of the route.");
    map.on("click", selectStartPoint);
  }

  // Function to select start point
  // Function to select start point
  function selectStartPoint(e) {
    startPoint = e.latlng;
    alert(
      "Starting point selected. Now click on the map to select the ending point."
    );
    map.off("click", selectStartPoint); // Remove the start point listener
    map.on("click", selectEndPoint); // Add end point listener

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // Remove previous start marker if it exists
    if (startMarker) {
      map.removeLayer(startMarker);
    }

    // Create a new marker with the start icon and add it to the map
    startMarker = L.marker([lat, lng], {
      icon: startIcon,
    }).addTo(map);
  }

  // Function to select end point and create the route
  function selectEndPoint(e) {
    endPoint = e.latlng;
    alert("Ending point selected. Calculating routes...");

    if (routingControl) {
      map.removeControl(routingControl); // Remove any existing routing control
    }

    // Define waypoints for routes
    const waypoints = [
      L.latLng(startPoint.lat, startPoint.lng),
      L.latLng(endPoint.lat, endPoint.lng),
    ];

    // Create and add the routing control
    routingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
      createMarker: function () {
        return null;
      },
      plan: L.Routing.plan(waypoints, {
        createMarker: function () {
          return null;
        },
        geocoder: L.Control.Geocoder.nominatim(),
      }),
    }).addTo(map);

    map.off("click", selectEndPoint); // Remove the end point listener

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // Remove previous end marker if it exists
    if (endMarker) {
      map.removeLayer(endMarker);
    }

    // Create a new marker with the end icon and add it to the map
    endMarker = L.marker([lat, lng], {
      icon: endIcon,
    }).addTo(map);
  }

  // Function to clear the route
  function clearRoute() {
    if (routingControl) {
      map.removeControl(routingControl); // Remove the routing control from the map
      routingControl = null; // Reset the routing control variable
      alert("Route cleared.");
    }

    // Remove the start and end markers if they exist
    if (startMarker) {
      map.removeLayer(startMarker);
      startMarker = null;
    }
    if (endMarker) {
      map.removeLayer(endMarker);
      endMarker = null;
    }
  }

  // Function to check if the user deviates from the path
  function checkDeviation(userLocation) {
    if (!pathLine) return; // If no path is set, do nothing

    let deviationDetected = false;
    const thresholdDistance = 50; // Set threshold distance in meters

    // Calculate the nearest distance between user and the path
    for (let i = 0; i < pathLine.length - 1; i++) {
      const segmentStart = pathLine[i];
      const segmentEnd = pathLine[i + 1];

      const distanceToSegment = pointToSegmentDistance(
        userLocation,
        L.latLng(segmentStart.lat, segmentStart.lng),
        L.latLng(segmentEnd.lat, segmentEnd.lng)
      );

      if (distanceToSegment > thresholdDistance) {
        deviationDetected = true;
        break;
      }
    }

    if (deviationDetected) {
      alert("You have deviated from the path!");
    }
  }

  // Function to calculate distance from a point to a segment
  function pointToSegmentDistance(point, segmentStart, segmentEnd) {
    const segmentLength = segmentStart.distanceTo(segmentEnd);
    if (segmentLength === 0) return point.distanceTo(segmentStart);

    const projection =
      ((point.lat - segmentStart.lat) * (segmentEnd.lat - segmentStart.lat) +
        (point.lng - segmentStart.lng) * (segmentEnd.lng - segmentStart.lng)) /
      segmentLength;

    const projectedPoint = L.latLng(
      segmentStart.lat +
        (projection * (segmentEnd.lat - segmentStart.lat)) / segmentLength,
      segmentStart.lng +
        (projection * (segmentEnd.lng - segmentStart.lng)) / segmentLength
    );

    return point.distanceTo(projectedPoint);
  }

  // Function to toggle controls visibility
  document
    .getElementById("toggleControls")
    .addEventListener("click", function () {
      const inputDiv = document.getElementById("input");
      if (inputDiv.classList.contains("hidden")) {
        inputDiv.classList.remove("hidden");
        this.textContent = "Hide Controls";
      } else {
        inputDiv.classList.add("hidden");
        this.textContent = "Show Controls";
      }
    });

  // Load existing pins from the server
  function loadPins() {
    // Clear all existing markers on the map
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Fetch pins from the server and add them to the map
    fetch(`${API_URL}/pins`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((pin) => {
          const lat = parseFloat(pin.latitude);
          const lng = parseFloat(pin.longitude);
          const label = pin.label || "No label";
          const description = pin.description || "No description";
          const type = pin.type || "default";

          console.log(
            `Adding pin: Label=${label}, Lat=${lat}, Lng=${lng}, Type=${type}`
          );

          if (isValidLatLng(lat, lng)) {
            const iconUrl =
              type === "person" ? "red-marker.png" : "black-marker.png";
            const marker = L.marker([lat, lng], {
              icon: L.icon({
                iconUrl: iconUrl,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -32],
              }),
            })
              .addTo(map)
              .bindPopup(
                `<b>Type:</b> ${type}<br><b>Label:</b> ${label}<br><b>Description:</b> ${description}<br><b>Latitude:</b> ${lat}<br><b>Longitude:</b> ${lng}`
              );

            // Store the original icon in the map
            originalIcons.set(marker, iconUrl);

            // Attach the click event to each marker
            marker.on("click", function (e) {
              e.originalEvent.stopPropagation(); // Prevent map click
              selectPin(marker, pin._id); // Pass the pin's ID here
            });

            // Automatically select the new pin if it's newly added
            selectPin(marker, pin._id);
          } else {
            console.error("Invalid LatLng:", lat, lng);
          }
        });
      })
      .catch((err) => console.error("Error loading pins:", err));
  }

  function isValidLatLng(lat, lng) {
    return (
      typeof lat === "number" &&
      !isNaN(lat) &&
      typeof lng === "number" &&
      !isNaN(lng)
    );
  }

  // Function to add a pin
  function addPin(pin) {
    const lat = parseFloat(pin.latitude);
    const lng = parseFloat(pin.longitude);
    const label = pin.label || "No label";
    const description = pin.description || "No description";
    const type = pin.type || "default";

    console.log(
      `Adding pin: Label=${label}, Lat=${lat}, Lng=${lng}, Type=${type}`
    );

    if (isValidLatLng(lat, lng)) {
      // Center the map on the new pin
      map.setView([lat, lng], 13);
      const iconUrl = type === "person" ? "red-marker.png" : "black-marker.png";
      const marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: iconUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -32],
        }),
      })
        .addTo(map)
        .bindPopup(
          `<b>Type:</b> ${type}<br><b>Label:</b> ${label}<br><b>Description:</b> ${description}<br><b>Latitude:</b> ${lat}<br><b>Longitude:</b> ${lng}`
        );

      // Store the original icon in the map
      originalIcons.set(marker, iconUrl);

      // Attach the click event to each marker
      marker.on("click", function (e) {
        e.originalEvent.stopPropagation(); // Prevent map click
        selectPin(marker, pin._id); // Pass the pin's ID here
      });

      // Automatically select the new pin if it's newly added
      selectPin(marker, pin._id);
    } else {
      console.error("Invalid LatLng:", lat, lng);
    }
  }

  // Function to add a pin to the map and server
  function addPinToMap(pinData) {
    fetch(`${API_URL}/pins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pinData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          addPin(data); // Use the newly added pin's data to create a marker
        } else {
          console.error("Failed to retrieve pin ID:", data);
        }
      })
      .catch((err) => console.error("Error adding pin:", err));
  }

  // Function to handle pin selection
  function selectPin(marker, id) {
    // Reset the icon for the previously selected marker, if any
    if (selectedMarker) {
      // Check if the previously selected marker is different from the current marker
      if (selectedMarker !== marker) {
        // Restore the original icon of the previously selected marker
        const originalIconUrl = originalIcons.get(selectedMarker);
        selectedMarker.setIcon(
          L.icon({
            iconUrl: originalIconUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -32],
          })
        );
      }
    }

    // Update the currently selected marker and type
    selectedMarker = marker;
    selectedMarkerType = marker.options.icon.options.iconUrl.includes(
      "red-marker"
    )
      ? "person"
      : "location";

    // Change the icon of the newly selected marker to indicate selection
    marker.setIcon(
      L.icon({
        iconUrl: "blue-marker.png", // Use a distinct color for selection
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -32],
      })
    );

    selectedPin = id;
    console.log("Selected Pin ID:", selectedPin);
  }

  // Function to add a pin using the input values
  window.addPin = function () {
    const type = document.getElementById("type").value;
    const latitude = parseFloat(document.getElementById("latitude").value);
    const longitude = parseFloat(document.getElementById("longitude").value);
    const label = document.getElementById("label").value;
    const description = document.getElementById("description").value;

    // Clear the input fields after getting the values
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("label").value = "";
    document.getElementById("description").value = "";

    // Check for valid inputs before adding a pin
    if (!isNaN(latitude) && !isNaN(longitude) && label.trim() !== "") {
      // Add the pin data to the server
      addPinToMap({ latitude, longitude, label, description, type });
    } else {
      alert("Please enter valid latitude, longitude, and label values.");
    }
  };

  // Function to delete selected pin
  window.deletePin = function () {
    if (selectedPin) {
      fetch(`${API_URL}/pins/${selectedPin}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Pin deleted successfully");
            if (selectedMarker) {
              map.removeLayer(selectedMarker); // Remove the marker from the map
            }
            selectedPin = null;
            selectedMarker = null;
            loadPins(); // Reload pins to update the map
          } else {
            alert("Error deleting pin");
          }
        })
        .catch((err) => alert("Error deleting pin:", err));
    } else {
      alert("No pin selected to delete");
    }
  };

  window.suggestAreas = function () {
    const input = document.getElementById("areaName").value.trim();
    const suggestionsList = document.getElementById("suggestions");

    if (input.length < 3) {
      // Only suggest after typing at least 3 characters
      suggestionsList.innerHTML = "";
      return;
    }

    // Use Nominatim's API for suggestions
    const suggestUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      input
    )}&addressdetails=1`;

    fetch(suggestUrl)
      .then((response) => response.json())
      .then((data) => {
        suggestionsList.innerHTML = "";

        if (data.length > 0) {
          data.forEach((item) => {
            const suggestion = document.createElement("li");
            suggestion.textContent = item.display_name;
            suggestion.dataset.lat = item.lat;
            suggestion.dataset.lon = item.lon;
            suggestion.addEventListener("click", function () {
              selectSuggestedArea(item.lat, item.lon, item.display_name);
            });
            suggestionsList.appendChild(suggestion);
          });
        } else {
          suggestionsList.innerHTML = "<li>No suggestions found</li>";
        }
      })
      .catch((err) => console.error("Error fetching suggestions:", err));
  };

  function selectSuggestedArea(lat, lon, displayName) {
    const foundMarker = L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<b>Area:</b> ${displayName}`)
      .openPopup();

    // Center the map on the selected area
    map.setView([lat, lon], 15);

    // Clear suggestions and input field
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("areaName").value = "";

    // Remove previous selected marker, if any
    if (selectedMarker) {
      map.removeLayer(selectedMarker);
    }
    selectedMarker = foundMarker;
    if (
      map.on(click, function () {
        if (selectedMarker) {
          selectedMarker = null;
        }
      })
    );
  }

  // Add click event to the map to deselect the pin
  map.on("click", function () {
    if (selectedMarker) {
      const originalIconUrl = originalIcons.get(selectedMarker);

      selectedMarker.setIcon(
        L.icon({
          iconUrl: originalIconUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -32],
        })
      );
      selectedMarker = null;
      selectedPin = null;
    }
  });

  // Bind functions to buttons
  document
    .getElementById("routeButton")
    .addEventListener("click", startRouteSelection);
  document
    .getElementById("clearRouteButton")
    .addEventListener("click", clearRoute);
  document
    .getElementById("locateButton")
    .addEventListener("click", showLocation);
});
