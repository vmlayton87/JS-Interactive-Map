// comments

// users current location function

async function getCurrentCoords (){
    let currentPos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    //console.log(currentPos)
    
    return [currentPos.coords.latitude, currentPos.coords.longitude]
}

//console.log(getCoords())  

// user location map object

const myMap = {
    coordinates: [],
    displayMap: {},
    businessObject: {}, // object from foursquare function. now I need to filter out the lat and long, and location info
    businessInfo: [],
    
    buildMap: function() {
        this.displayMap = L.map('userMap').setView([this.coordinates[0], this.coordinates[1]], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.displayMap);

        L.marker([this.coordinates[0], this.coordinates[1]]).addTo(this.displayMap).bindPopup('<p1><b>Your Location</b></p1>').openPopup();
    },
    // creates an array of the 5 closest businesses and adds markers to the map. 
    addBusinessInfo: function(objectName) {
        for (i=0; i< objectName.length; i++) {
            this.businessInfo[i]= ({
                name: objectName[i].name,
                address: objectName[i].location.formatted_address,
                lat: objectName[i].geocodes.main.latitude,
                long: objectName[i].geocodes.main.longitude
            })
        }
        for (i=0; i< this.businessInfo.length; i++) {
            L.marker([this.businessInfo[i].lat, this.businessInfo[i].long]).addTo(this.displayMap).bindPopup('<p1><b>"${this.businessInfo[i].name"}</b></p1>').openPopup()
        }
        console.log("business info after addBusinessInfo function for loop: ", this.businessInfo)
    },

}

// makes current coordinates available to use in create map function/object and adds the map onto the page
// creates a map in the div using the users current location
window.onload = async () => {
    const coords = await getCurrentCoords()
    myMap.coordinates = coords
    myMap.buildMap()
    //console.log(myMap)
}

async function getBusinessMarkers (category,latLong){
    const businessData = await placeSearch(category,latLong)
    myMap.businessObject = businessData
    // console.log("inside get business marker function: business object inside myMap object", myMap.businessObject)
    // console.log("business info object initial keys: ", myMap.businessInfo)
    myMap.addBusinessInfo(myMap.businessObject)
    
}
let selectCategoryElement = document.getElementById("location-category-select")
selectCategoryElement.onchange = function() {getBusinessMarkers(this.value, myMap.coordinates)}




        async function placeSearch (category,latLong) {
            try {
                const searchParams = new URLSearchParams({
                  query: category,
                  ll: latLong,
                  open_now: 'true',
                  sort: 'DISTANCE',
                  limit: 5
                });
                const results = await fetch(
                  `https://api.foursquare.com/v3/places/search?${searchParams}`,
                  {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      Authorization: 'fsq31kaK6M0eHOYrzVjc66oAKgQ7sAg6pwkxvyqH+F3ixUU=',
                    }
                  }
                );
                const data = await results.json();
                console.log("data inside the foursquare function: " , data)
                const businesses = data.results // an object of the 5 businesses
                console.log("business info inside foursquare function: ", businesses) 
                return businesses;
            } catch (err) {
                console.error(err);
            } 
        }

