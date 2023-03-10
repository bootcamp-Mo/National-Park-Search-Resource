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

//Jquery for to select the selector element
const stateSelector = $("#stateSelector");
const searchButton = $("#search-button");
const URLredirect = 'results.html';

searchButton.on('click', (event) => {
	event.preventDefault();

	let stateSelected = document.querySelector('#stateSelector').value;
	console.log(stateSelected);
    if(stateSelected !== "00"){
        //localStorage.setItem('stateSelected', JSON.stringify(stateSelected));
        sessionStorage.setItem('stateSelected', JSON.stringify(stateSelected));
        window.location.href = URLredirect;
    }
});

//function that creates the option elements for the state elements
function populateSelector() {
    let optionEl = document.createElement("option");
    optionEl.innerHTML = "Select State";
    optionEl.setAttribute('value', '00');
    stateSelector.append(optionEl);
    for (let i = 0; i < states.length; i++) {
        let optionEl = document.createElement("option");
        optionEl.innerHTML = states[i].stateName;
        optionEl.setAttribute('value', states[i].stateCode);
        stateSelector.append(optionEl);
    }
}

//Calls the populate selector function on window load
window.addEventListener('load', populateSelector);
