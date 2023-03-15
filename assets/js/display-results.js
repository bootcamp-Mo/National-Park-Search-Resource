/**const apiPKey = 'aB5JMBnZeg0gsdgC7dlA4ZY5ahcjC314ZaSmQfQl'**/

const apiPKey = 'keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc'
const apiWKey = '6a977b35e5b5da178fcf8653e1b65045'
const apiParks = 'https://developer.nps.gov/api/v1/parks'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast'

/**========================================================================
 *                           Park Data API fetch
 *========================================================================**/

const parkResultContainer = document.querySelector('#apiResults');
//const parkForecastBox = document.querySelector('#parkForecastBox');

function resultsParks(stateCode) {
    fetch(`${apiParks}?stateCode=${stateCode}&api_key=${apiPKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let parsedData = JSON.parse(JSON.stringify(data));
            for (let i = 0; i < 5; i++) {
                let resultBox = document.createElement('div');
                resultBox.classList.add('parkResults');
                let parkResultBox = document.createElement('div');
                parkResultBox.classList.add('callout', 'warning');

                let activity = parsedData.data[i].activities;
                let parkName = parsedData.data[i].fullName;
                let address =
                    parsedData.data[i].addresses[0].line1 +
                    ', ' +
                    parsedData.data[i].addresses[0].city +
                    ', ' +
                    parsedData.data[i].addresses[0].stateCode +
                    ' ' +
                    parsedData.data[i].addresses[0].postalCode;

                let postalCode = parsedData.data[i].addresses[0].postalCode;
                let contacts = parsedData.data[i].contacts;
                let description = parsedData.data[i].description;
                let designation = parsedData.data[i].designation;
                let directionsInfo = parsedData.data[i].directionsInfo;
                let directionsUrl = parsedData.data[i].directionsUrl;

                let entranceFees = document.createElement('div');
                entranceFees.innerHTML = `
                <h3>Entrance Fees:</h3>
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
                <h2>${parkName}</h2>
                <h3>Address: </h3>
                    <p>${address}</p>
                <h3>Email: </h3>
                <p><a href="mailto:${contacts.emailAddresses.length > 0 ? contacts.emailAddresses[0].emailAddress : ''}">
                  ${contacts.emailAddresses.length > 0 ? contacts.emailAddresses[0].emailAddress : 'N/A'}
                </a>
                </p>
                <h3>Phone: </h3>
                <p><a href="tel:${contacts.phoneNumbers.length > 0 ? contacts.phoneNumbers[0].phoneNumber : ''}">
                  ${contacts.phoneNumbers.length > 0 ? contacts.phoneNumbers[0].phoneNumber : 'N/A'}
                  </a>
                </p>
                <h3>Description: </h3>
                <p>${description}</p>
                <h3>Activities</h3>
                <ul>
                ${activity.slice(0, 4).map(a => `<li>${a.name}</li>`).join('')}
              </ul>
                <h3>Designation: </h3>
                <p>${designation}</p>
                <h3>Directions Info</h3>
                <p>${directionsInfo}</p>
                <p><a href="${directionsUrl}">Directions URL</a>
                </p>
                </div>
                `;

                parkResultBox.appendChild(entranceFees);
                resultBox.appendChild(parkResultBox);
                parkForecast(postalCode, resultBox);
            }
        });
}

/**=======================
 **      five day forecast
//  *
//  *========================**/


function parkForecast(zipCode, resultBox) {

    fetch(`${apiForecast}?q=${zipCode}&units=imperial&appid=${apiWKey}&amp&cnt=5`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let parsedData = JSON.parse(JSON.stringify(data));
            if (!parsedData.list) {
                throw new Error('Invalid data format');
            }

            let parkForecastBox = document.createElement('div');
            parkForecastBox.classList.add("callout", "primary");
            let forecastList = document.createElement('ul');
            let currentDate = new Date();
            parsedData.list.slice().forEach(function (forecast, index) {
                let forecastItem = document.createElement('li');
                let temperature = forecast.main.temp;
                let wind = forecast.wind.speed;
                let humidity = forecast.main.humidity;
                let date = new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString();

                forecastItem.innerHTML = `
                <div class="parkForecastItemBox">
                <h4>Date: ${date}</h4>
                <p>Temperature: ${temperature}°F</p>
                <p>Wind speed: ${wind} m/s</p>
                <p>Humidity: ${humidity}%</p>
                </div>
                `;
                forecastList.appendChild(forecastItem);
            });
            parkForecastBox.appendChild(forecastList);
            resultBox.appendChild(parkForecastBox);
            parkResultContainer.appendChild(resultBox);
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

window.onload = function () {
    let stateCode = JSON.parse(sessionStorage.getItem('stateSelected'));
    resultsParks(stateCode);

}
