// comments

// users current location function

async function getCoords (){
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

    buildMap: function() {
        this.displayMap = L.map('userMap').setView([this.coordinates[0], this.coordinates[1]], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.displayMap);

        L.marker([this.coordinates[0], this.coordinates[1]]).addTo(this.displayMap).bindPopup('<p1><b>Your Location</b></p1>').openPopup();
    }
}


// makes current coordinates available to use in create map function/object and adds the map onto the page
// creates a map in the div using the users current location
window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.buildMap()
    //console.log(myMap)
}

// When user selects a category from the drop down menu, show 5 closest locations that match that category. 


    //grab the select element drop down menu
    let selectCategoryElement = document.getElementById("location-category-select")

    // add event listener
   // document.getElementById("location-category-select").onchange = function() {placeSearch(this.value,currentLocationMap.coordinates)};

    // function for things to happen when category is selected
    function myFunction(val) {
    alert("The input value has changed. The new value is: " + val);
    }
    
   
    
    // buildCategoryMap:

        //grab the select element drop down menu and add event listener
        selectCategoryElement = document.getElementById("location-category-select").onchange = function() {
            placeSearch(this.value, myMap.coordinates)
            console.log("data from the element select: " , placeSearch(this.value, myMap.coordinates))
        }

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
                console.log("data inside the function: " , data)
                const businesses = data.results // an array of the 5 businesses
                console.log("business info inside function: ", businesses) 
                return businesses;
            } catch (err) {
                console.error(err);
            } 
        }

