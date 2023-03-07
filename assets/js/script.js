//Array of state objects to populate a select element on load of the page
const states = [{stateName: "Alabama", stateCode: "AL"}, {stateName: "Alaska", stateCode: "AK"}, {stateName: "Arizona", stateCode: "AZ"}, 
{stateName: "Arkansas", stateCode: "AR"}, {stateName: "California", stateCode: "CA"}, {stateName: "Colorado", stateCode: "CO"}, {stateName: "Delaware", stateCode: "DE"},
{stateName: "Florida", stateCode: "FL"}, {stateName: "Georgia", stateCode: "GA"}, {stateName: "Hawaii", stateCode: "HI"}, {stateName: "Idaho", stateCode: "ID"}, 
{stateName: "Illinois", stateCode: "IL"}, {stateName: "Indiana", stateCode: "IN"}, {stateName: "Iowa", stateCode: "IA"}, {stateName: "Kansas", stateCode: "KS"}, 
{stateName: "Kentucky", stateCode: "KY"}, {stateName: "Louisiana", stateCode: "LA"}, {stateName: "Maine", stateCode: "ME"}, {stateName: "Maryland", stateCode: "MD"}, 
{stateName: "Massachusetts", stateCode: "MA"}, {stateName: "Michigan", stateCode: "MI"}, {stateName: "Minnesota", stateCode: "MS"}, 
{stateName: "Mississippi", stateCode: "MS"}, {stateName: "Missouri", stateCode: "MO"}, {stateName: "Montana", stateCode: "MT"}, {stateName: "Nebraska", stateCode: "NE"}, 
{stateName: "Nevada", stateCode: "NV"}, {stateName: "New Hampshire", stateCode: "NH"}, {stateName: "New Jersey", stateCode: "NJ"}, 
{stateName: "New Mexico", stateCode: "NM"}, {stateName: "New York", stateCode: "NY"}, {stateName: "North Carolina", stateCode: "NC"}, 
{stateName: "North Dakota", stateCode: "ND"}, {stateName: "Ohio", stateCode: "OH"}, {stateName: "Oklahoma", stateCode: "OK"}, {stateName: "Oregon", stateCode: "OR"}, 
{stateName: "Pennsylvania", stateCode: "PA"}, {stateName: "Rhode Island", stateCode: "RI"}, {stateName: "South Carolina", stateCode: "SC"}, 
{stateName: "South Dakota", stateCode: "SD"}, {stateName: "Tennessee", stateCode: "TN"}, {stateName: "Texas", stateCode: "TX"}, 
{stateName: "Utah", stateCode: "UT"}, {stateName: "Vermont", stateCode: "VT"}, {stateName: "Virginia", stateCode: "VA"}, {stateName: "Washington", stateCode: "WA"}, 
{stateName: "West Virginia", stateCode: "WV"}, {stateName: "Wisconsin", stateCode: "WI"}, {stateName: "Wyoming", stateCode: "WY"}]

const searchbutton = document.querySelector('.search-button');
const URLredirect = './ other html doc';

searchbutton.addEventListener('click', (event) => {
	event.preventDefault();

	const stateselected = document.querySelector('.state-selected').value;
	console.log(stateselected);

	storage.setIem('stateselected', JSON.strigify(stateselected));

	Window.location.href = URLredirect;

});