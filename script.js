window.addEventListener('load', () => {

    const overlay = document.querySelector('.overlay');
    const btn = overlay.querySelector('.btn');

    btn.addEventListener('click', () => {
        overlay.classList.add('js-fade-out');
        setTimeout(() => {
            overlay.parentNode.removeChild(overlay);
        }, 3000);
    });
    /////////////////////////////////////////////////

    // making a map an tiles
    const mymap = L.map('issMap').setView([0, 0], 1);

    // contribution for getting the tiles from openstreetmap org
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });

    tiles.addTo(mymap);

    // making a market with an image of iss png
    const issIcon = L.icon({
        iconUrl: 'img/iss.png',
        iconSize: [120, 100],
        iconAnchor: [60, 50]
    });

    const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

    // a variable for setting map only the first time
    let firstTime = true;

    async function getISS() {
        const response = await fetch(api_url);
        const data = await response.json();
        const { longitude, latitude } = data;

        // setting where the marker is
        marker.setLatLng([latitude, longitude]);
        // setting how the map is displayed at start
        if (firstTime) {
            mymap.setView([latitude, longitude], 5);
            firstTime = false;
        }
    }    

    getISS();

    // to update satelite possition every second
    setInterval(getISS, 1000);
    
});