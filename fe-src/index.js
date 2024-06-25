const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFyY29zcmV1cXVlbiIsImEiOiJja3UxbXBzbHQzejJvMnBwcW4yN3pqemZuIn0.z65srWhOb5sS3GilPljOpw";
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
let pictureFile = 0;

function initDropzone(){
 
}


function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-58.599566, -34.636109],
    zoom: 7,
  });
}

function initSearchForm(callback) {
  const form = document.querySelector(".search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mapboxClient.geocodeForward(
      e.target.q.value,
      {
        country: "ar",
        autocomplete: true,
        language: "es",
      },
      function (err, data, res) {
        console.log(data);
        if (!err) callback(data.features);
      }
    );
  });
}
/*
(function () {
  const myDropzone = new Dropzone(".profile-picture-container", {
    url: "/falsa",
    autoProcessQueue: false,
    clickable:true,
    thumbnailWidth: 500,
    thumbnailHeight: 500,
  });

  myDropzone.on("thumbnail", function (file) {
    // usando este evento pueden acceder al dataURL directamente
    pictureFile = file.dataURL;
    console.log(file);
  });*/
  window.map = initMap();
  initSearchForm(function (results) {
    const firstResult = results[0];

    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo(map);

    const [lng, lat] = firstResult.geometry.coordinates;
    console.log(lng, lat);

    fetch("/comercios-cerca-de?lat=" + lat + "&lng=" + lng)
      .then((res) => {
        return res.json();
      })
      .then((hits) => {
        for (const g of hits.hits) {
          const { lat, lng } = g._geoloc;

          const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(14);
  });
//})();
