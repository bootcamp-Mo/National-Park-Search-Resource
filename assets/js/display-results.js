

const apiPKey = 'aB5JMBnZeg0gsdgC7dlA4ZY5ahcjC314ZaSmQfQl'
const apiWKey = '6a977b35e5b5da178fcf8653e1b65045'
const apiParks = 'https://developer.nps.gov/api/v1/parks'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast/daily'

/**========================================================================
 *                           Park Data API fetch
 *========================================================================**/

function resultsParks(states) {
    fetch(`${apiParks}?parkCode=${states}&api_key=${apiPKey}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            const parsedData = JSON.parse(JSON.stringify(data))

            const activity = parsedData.data[0].activities
            const parkName = parsedData.data[0].fullName
            const address =
                parsedData.data[0].addresses[0].line1
                + ", " + parsedData.data[0].addresses[0].city
                + ", " + parsedData.data[0].addresses[0].stateCode
                + " " + parsedData.data[0].addresses[0].postalCode

            const contacts = parsedData.data[0].contacts
            const description = parsedData.data[0].description
            const designation = parsedData.data[0].designation
            const directionsInfo = parsedData.data[0].directionsInfo
            const directionsUrl = parsedData.data[0].directionsUrl
            const entranceFees = parsedData.data[0].entranceFees

            console.log(activity)
            console.log(parkName)
            console.log(address)
            console.log(contacts)
            console.log(description)
            console.log(designation)
            console.log(directionsInfo)
            console.log(directionsUrl)
            console.log(entranceFees)

            displayPark({
                parkName,
                activity,
                address,
                contacts,
                description,
                designation,
                directionsInfo,
                directionsUrl,
                entranceFees
            })
        })
}


// /**========================================================================
//  *                           Display Parks
//  *========================================================================**/

const parkResults = document.querySelector('#parkResults')

function displayPark(statesData) {
    if (!statesData) return

    const parkList = document.createElement('ul')
    const parkName = document.createElement('li')
    parkName.textContent = `Park Name: ${statesData.parkName}`
    const activity = document.createElement('li')
    activity.textContent = `Activities: ${statesData.activity.map(a => a.name).join(', ')}`
    const address = document.createElement('li')
    address.textContent = `Address: ${statesData.address}`
    const contacts = document.createElement('li');
    contacts.textContent = 'Contact Information:'
    const contactsList = document.createElement('ul')
    Object.entries(statesData.contacts).forEach(([key, value,]) => {
        const contact = document.createElement('li')
        contact.textContent = `${key}: ${value} `
        contactsList.appendChild(contact)

    })
    contacts.appendChild(contactsList)
    const description = document.createElement('li')
    description.textContent = `Description: ${statesData.description}`

    const designation = document.createElement('li')
    designation.textContent = `Designation: ${statesData.designation}`

    const directionsInfo = document.createElement('li')
    directionsInfo.textContent = `Directions Info: ${statesData.directionsInfo}`

    const directionsUrl = document.createElement('li')
    directionsUrl.textContent = `Directions URL: ${statesData.directionsUrl}`

    const entranceFees = document.createElement('li')
    entranceFees.textContent = 'Entrance Fees:'
    const entranceFeesList = document.createElement('ul')
    statesData.entranceFees.forEach(fee => {
        const feeItem = document.createElement('li')
        feeItem.textContent = `${fee.title}: $${fee.cost}`
        entranceFeesList.appendChild(feeItem)
    })
    entranceFees.appendChild(entranceFeesList)

    parkList.appendChild(parkName)
    parkList.appendChild(activity)
    parkList.appendChild(address)
    parkList.appendChild(contacts)
    parkList.appendChild(description)
    parkList.appendChild(designation)
    parkList.appendChild(directionsInfo)
    parkList.appendChild(directionsUrl)
    parkList.appendChild(entranceFees)

    parkResults.innerHTML = ''
    parkResults.appendChild(parkList)
}




//Array of state objects to populate a select element on load of the page
const states = [{ stateName: "Alabama", stateCode: "AL" }, { stateName: "Alaska", stateCode: "AK" }, { stateName: "Arizona", stateCode: "AZ" },
{ stateName: "Arkansas", stateCode: "AR" }, { stateName: "California", stateCode: "CA" }, { stateName: "Colorado", stateCode: "CO" }, { stateName: "Delaware", stateCode: "DE" },
{ stateName: "Florida", stateCode: "FL" }, { stateName: "Georgia", stateCode: "GA" }, { stateName: "Hawaii", stateCode: "HI" }, { stateName: "Idaho", stateCode: "ID" },
{ stateName: "Illinois", stateCode: "IL" }, { stateName: "Indiana", stateCode: "IN" }, { stateName: "Iowa", stateCode: "IA" }, { stateName: "Kansas", stateCode: "KS" },
{ stateName: "Kentucky", stateCode: "KY" }, { stateName: "Louisiana", stateCode: "LA" }, { stateName: "Maine", stateCode: "ME" }, { stateName: "Maryland", stateCode: "MD" },
{ stateName: "Massachusetts", stateCode: "MA" }, { stateName: "Michigan", stateCode: "MI" }, { stateName: "Minnesota", stateCode: "MS" },
{ stateName: "Mississippi", stateCode: "MS" }, { stateName: "Missouri", stateCode: "MO" }, { stateName: "Montana", stateCode: "MT" }, { stateName: "Nebraska", stateCode: "NE" },
{ stateName: "Nevada", stateCode: "NV" }, { stateName: "New Hampshire", stateCode: "NH" }, { stateName: "New Jersey", stateCode: "NJ" },
{ stateName: "New Mexico", stateCode: "NM" }, { stateName: "New York", stateCode: "NY" }, { stateName: "North Carolina", stateCode: "NC" },
{ stateName: "North Dakota", stateCode: "ND" }, { stateName: "Ohio", stateCode: "OH" }, { stateName: "Oklahoma", stateCode: "OK" }, { stateName: "Oregon", stateCode: "OR" },
{ stateName: "Pennsylvania", stateCode: "PA" }, { stateName: "Rhode Island", stateCode: "RI" }, { stateName: "South Carolina", stateCode: "SC" },
{ stateName: "South Dakota", stateCode: "SD" }, { stateName: "Tennessee", stateCode: "TN" }, { stateName: "Texas", stateCode: "TX" },
{ stateName: "Utah", stateCode: "UT" }, { stateName: "Vermont", stateCode: "VT" }, { stateName: "Virginia", stateCode: "VA" }, { stateName: "Washington", stateCode: "WA" },
{ stateName: "West Virginia", stateCode: "WV" }, { stateName: "Wisconsin", stateCode: "WI" }, { stateName: "Wyoming", stateCode: "WY" }]

/**=======================
 **      five day forecast
 *
 *========================**/
const parkForecastBox = document.querySelector('#parkForecastBox');

function parkForecast(states) {
    fetch(`${apiForecast}?q=${states}&appid=${apiWKey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const parsedData = JSON.parse(JSON.stringify(data));

            const forecastList = document.createElement('ul');
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            parsedData.list.slice(1).forEach(function (forecast, index) {
                const forecastItem = document.createElement('li');
                const temperature = forecast.main.temp;
                const wind = forecast.wind.speed;
                const humidity = forecast.main.humidity;
                const date = new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString();

                forecastItem.innerHTML = `
           <p>Date: ${date}</p>
           <p>Temperature: ${temperature}F</p>
           <p>Wind speed: ${wind} m/s</p>
           <p>Humidity: ${humidity}%</p>
         `;

                forecastList.appendChild(forecastItem);
            });

            parkForecastBox.innerHTML = '';
            parkForecastBox.appendChild(forecastList);
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

window.onload = function () {
    parkForecast('CA')
}