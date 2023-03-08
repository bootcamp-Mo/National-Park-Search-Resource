

const apiPKey = 'aB5JMBnZeg0gsdgC7dlA4ZY5ahcjC314ZaSmQfQl'
const apiWKey = '6a977b35e5b5da178fcf8653e1b65045'
const apiParks = 'https://developer.nps.gov/api/v1/parks'
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast/daily'

/**========================================================================
 *                           Park Data API fetch
 *========================================================================**/
const parkResultContainer = document.querySelector('#parkResults')

function resultsParks(states) {
    fetch(`${apiParks}?parkCode=${states}&api_key=${apiPKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const parsedData = JSON.parse(JSON.stringify(data));
            const parkResultBox = document.createElement('div');
            parkResultBox.classList.add('parkResultsData');

            const activity = parsedData.data[0].activities;
            const parkName = parsedData.data[0].fullName;
            const address =
                parsedData.data[0].addresses[0].line1 +
                ', ' +
                parsedData.data[0].addresses[0].city +
                ', ' +
                parsedData.data[0].addresses[0].stateCode +
                ' ' +
                parsedData.data[0].addresses[0].postalCode;

            const contacts = parsedData.data[0].contacts;
            const description = parsedData.data[0].description;
            const designation = parsedData.data[0].designation;
            const directionsInfo = parsedData.data[0].directionsInfo;
            const directionsUrl = parsedData.data[0].directionsUrl;

            const entranceFees = document.createElement('div');
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
        });
}

/**=======================
 **      five day forecast
//  *
//  *========================**/
// const parkForecastBox = document.querySelector('#parkForecastBox');

// function parkForecast(states) {
//     fetch(`${apiForecast}?q=${states}&appid=${apiWKey}&units=imperial`)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             const parsedData = JSON.parse(JSON.stringify(data));

//             const forecastList = document.createElement('ul');
//             const currentDate = new Date();
//             currentDate.setDate(currentDate.getDate() + 1);
//             parsedData.list.slice(1).forEach(function (forecast, index) {
//                 const forecastItem = document.createElement('li');
//                 const temperature = forecast.main.temp;
//                 const wind = forecast.wind.speed;
//                 const humidity = forecast.main.humidity;
//                 const date = new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString();

//                 forecastItem.innerHTML = `
//            <p>Date: ${date}</p>
//            <p>Temperature: ${temperature}F</p>
//            <p>Wind speed: ${wind} m/s</p>
//            <p>Humidity: ${humidity}%</p>
//          `;

//                 forecastList.appendChild(forecastItem);
//             });

//             parkForecastBox.innerHTML = '';
//             parkForecastBox.appendChild(forecastList);
//         })
//         .catch(error => {
//             console.error(`Error: ${error}`);
//         });
// }

window.onload = function () {
    resultsParks('CA')
}