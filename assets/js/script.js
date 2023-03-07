const searchbutton = document.querySelector('.search-button');
const URLredirect = './ other html doc';

searchbutton.addEventListener('click', (event) => {
	event.preventDefault();

	const stateselected = document.querySelector('.state-selected').value;
	console.log(stateselected);

	storage.setIem('stateselected', JSON.strigify(stateselected));

	Window.location.href = URLredirect;
});