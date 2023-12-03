const locations = document.getElementById('MainHeading');
const url = "https://api.irail.be/liveboard/?id=BRU&station=Brussels&arrdep=departure&format=json";


// creating the dynamic html elemnts and put data of API
async function fetchedData() {
    try {
        // fetching the data of Bruussels
        const response = await fetch(url);
        const data = await response.json();

        // Extracting the data of Brussels-staiion/time
        const stationName = data.stationinfo.name;
        // putting station name to our locations variable "as a main heading"
        locations.innerText = stationName;

        // gathering all the departures
        const departures = data.departures.departure;

        // Get the table body element
        const tableBody = document.querySelector('tbody');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Loop through each departure and add a new row to the table
        departures.forEach((departure, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${departure.station}</td>
                <td>${new Date(departure.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.log("Fetching error", error);
    }
}

fetchedData();