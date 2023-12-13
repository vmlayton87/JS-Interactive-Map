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

// create user location map

const currentLocationMap = {
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
    currentLocationMap.coordinates = coords
    currentLocationMap.buildMap()
    console.log(currentLocationMap)
}

// When user selects a category from the drop down menu, show 5 closest locations that match that category. 


    //grab the select element drop down menu
    let selectCategoryElement = document.getElementById("location-category-select")

    // add event listener
    document.getElementById("location-category-select").onchange = function() {myFunction(this.value)};

    // function for things to happen when category is selected
    function myFunction(val) {
    alert("The input value has changed. The new value is: " + val);
    }
    
   
    
    //buildCategoryMap:

