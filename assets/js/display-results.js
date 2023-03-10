/**const apiPKey = 'aB5JMBnZeg0gsdgC7dlA4ZY5ahcjC314ZaSmQfQl'**/

const apiPKey = 'keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc'
const apiWKey = '6a977b35e5b5da178fcf8653e1b65045'
const apiParks = 'https://developer.nps.gov/api/v1/parks'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast'

/**========================================================================
 *                           Park Data API fetch
 *========================================================================**/

const parkResultContainer = document.querySelector('#parkResults')
const parkForecastBox = document.querySelector('#parkForecastBox');
const stateCode = '';

function resultsParks(stateCode) {
    fetch(`${apiParks}?stateCode=${stateCode}&api_key=${apiPKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let parsedData = JSON.parse(JSON.stringify(data));
            let parkResultBox = document.createElement('div');
            parkResultBox.classList.add('parkResultsData');

            let activity = parsedData.data[0].activities;
            let parkName = parsedData.data[0].fullName;
            let address =
                parsedData.data[0].addresses[0].line1 +
                ', ' +
                parsedData.data[0].addresses[0].city +
                ', ' +
                parsedData.data[0].addresses[0].stateCode +
                ' ' +
                parsedData.data[0].addresses[0].postalCode;

            let postalCode = parsedData.data[0].addresses[0].postalCode;
            let contacts = parsedData.data[0].contacts;
            let description = parsedData.data[0].description;
            let designation = parsedData.data[0].designation;
            let directionsInfo = parsedData.data[0].directionsInfo;
            let directionsUrl = parsedData.data[0].directionsUrl;

            let entranceFees = document.createElement('div');
            entranceFees.innerHTML = `
                <p>Entrance Fees:</p>
                <ul>
                    ${parsedData.data[0].entranceFees
                    .map(
                        fee =>
                            `<li>${fee.title}: $${fee.cost}</li>`
                    )
                    .join('')}
                </ul>
            `;

            parkResultBox.innerHTML = `
            <div class="parkResultsItemBox">
                <p>${parkName}</p>
                <p>${address}</p>
                <p>Email: ${contacts.emailAddresses.length > 0
                    ? contacts.emailAddresses[0].emailAddress
                    : 'N/A'
                }</p>
                <p>Phone: ${contacts.phoneNumbers.length > 0
                    ? contacts.phoneNumbers[0].phoneNumber
                    : 'N/A'
                }</p>
                <p>Description: ${description}</p>
                <p>Designation: ${designation}</p>
                <p>${directionsInfo}</p>
                <p>${directionsUrl}</p>
                </div>
            `;
            parkResultBox.appendChild(entranceFees);

            parkResultContainer.innerHTML = '';
            parkResultContainer.appendChild(parkResultBox);

            console.log(activity);
            console.log(parkName);
            console.log(address);
            console.log(contacts);
            console.log(description);
            console.log(designation);
            console.log(directionsInfo);
            console.log(directionsUrl);
            console.log(entranceFees);

            parkForecast(postalCode);
        });
}

/**=======================
 **      five day forecast
//  *
//  *========================**/


function parkForecast(zipCode) {

    fetch(`${apiForecast}?q=${zipCode}&units=imperial&appid=${apiWKey}&amp&cnt=5`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let parsedData = JSON.parse(JSON.stringify(data));
            if (!parsedData.list) {
                throw new Error('Invalid data format');
            }


            let forecastList = document.createElement('ul');
            let currentDate = new Date();
            //currentDate.setDate(currentDate.getDate() + 1);
            parsedData.list.slice().forEach(function (forecast, index) {
                let forecastItem = document.createElement('li');
                let temperature = forecast.main.temp;
                let wind = forecast.wind.speed;
                let humidity = forecast.main.humidity;
                let date = new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString();

                forecastItem.innerHTML = `
                <div class="parkForecastItemBox">
           <p>Date: ${date}</p>
           <p>Temperature: ${temperature}F</p>
           <p>Wind speed: ${wind} m/s</p>
           <p>Humidity: ${humidity}%</p>
           </div>
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
    resultsParks('CA');

}