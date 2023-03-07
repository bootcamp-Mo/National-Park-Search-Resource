

const apiPKey = 'aB5JMBnZeg0gsdgC7dlA4ZY5ahcjC314ZaSmQfQl';
const apiWKey = '4cafa176959ccc9551eb2fd2139e4ce4';
const apiParks = 'https://developer.nps.gov/api/v1/parks';
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast';

function resultsParks(states) {
    fetch(`${apiParks}?parkCode=${states}&api_key=${apiPKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const parsedData = JSON.parse(JSON.stringify(data));

            const activity = parsedData.data[0].activities;
            const parkName = parsedData.data[0].fullName;
            const address = parsedData.data[0].addresses[0].line1 + ", " + parsedData.data[0].addresses[0].city + ", " + parsedData.data[0].addresses[0].stateCode + " " + parsedData.data[0].addresses[0].postalCode;
            const contacts = parsedData.data[0].contacts
            const description = parsedData.data[0].description
            const designation = parsedData.data[0].designation
            const directionsInfo = parsedData.data[0].directionsInfo
            const directionsUrl = parsedData.data[0].directionsUrl
            const entranceFees = parsedData.data[0].entranceFees

            localStorage.setItem(parkName, JSON.stringify({
                parkName,
                activity,
                address,
                contacts,
                description,
                designation,
                directionsInfo,
                directionsUrl,
                entranceFees
            }));

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
window.onload = function () {
    resultsParks('CA')
}