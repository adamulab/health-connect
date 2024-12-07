document.getElementById("findFacilities").addEventListener("click", () => {
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  // Get user's current location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Fetch nearby health facilities from the backend
      fetch(`/api/nearby-facilities?lat=${latitude}&lng=${longitude}`)
        .then((response) => response.json())
        .then((facilities) => {
          const facilitiesContainer = document.getElementById("facilities");
          facilitiesContainer.innerHTML = ""; // Clear previous results

          if (facilities.length === 0) {
            facilitiesContainer.innerHTML =
              "<p>No facilities found nearby.</p>";
            return;
          }

          // Display facilities
          facilities.forEach((facility) => {
            const div = document.createElement("div");
            div.className = "facility";
            div.innerHTML = `<strong>${facility.name}</strong><br>Distance: ${facility.distance} meters`;
            facilitiesContainer.appendChild(div);
          });
        })
        .catch((error) => console.error("Error fetching facilities:", error));
    },
    (error) => {
      alert("Unable to retrieve your location.");
      console.error(error);
    }
  );
});
