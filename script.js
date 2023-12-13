// comments

// get users current location

async function getCoords (){
    let currentPos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    console.log(currentPos)
    
    return [currentPos.coords.latitude, currentPos.coords.longitude]
}

console.log(getCoords())  

// create map

const myMap = {
    coordinates: [],

    map: {},

    buildMap: function() {
        this.map = L.map('userMap').setView([this.coordinates[0], this.coordinates[1]], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        L.marker([this.coordinates[0], this.coordinates[1]]).addTo(this.map).bindPopup('<p1><b>Your Location</b></p1>').openPopup();
    }
}

// makes current coordinates available to use in create map function/object and adds the map onto the page
window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.buildMap()
    console.log(myMap)
}

