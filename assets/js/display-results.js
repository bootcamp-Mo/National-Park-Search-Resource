const apiPKey = 'aB5JMBnZeg0gsdgC7dlA4ZY5ahcjC314ZaSmQfQl';
const apiWKey = '4cafa176959ccc9551eb2fd2139e4ce4';
const apiParks = 'https://developer.nps.gov/api/v1/parks';
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast';

function resultsParks(park) {
    fetch(`${apiParks}?parkCode=${park}&api_key=${apiPKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const parsedData = JSON.parse(JSON.stringify(data));

            const activity = parsedData.data[0].activities;
            const parkName = parsedData.data[0].fullName;

            localStorage.setItem(parkName, JSON.stringify({
                activity,
                parkName
            }));

            console.log(activity);
            console.log(parkName);
        });
}
window.onload = function () {
    resultsParks('CA')
}