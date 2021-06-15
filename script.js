const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const field = document.querySelector("#ip-search");
  const validate = ValidateIPaddress(field.value);
  if (validate) {
    getIp(field.value);
  }
});

async function getIp(ip) {
  let response = null;
  let json = null;
   response = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_fhzybzQwKriv9VyWNokNd5sklFy14&ipAddress=${ip}`
  );
   json = await response.json();
  mapIp(json.location.lat, json.location.lng);
}

function mapIp(lat, long) {
  var mymap = L.map("mapid").setView([lat, long], 15);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(mymap);
  var marker = L.marker([lat, long]).addTo(mymap);
}

function ValidateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  alert("You have entered an invalid IP address!");
  return false;
}

//  201.182.48.70
