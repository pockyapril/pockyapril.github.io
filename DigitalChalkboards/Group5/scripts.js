// search for an artist
async function searchArtist() {
    const input = document.getElementById('artistInput').value;
    const apiUrl = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(input)}&fmt=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayResults(data.artists);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

// display artist results
function displayResults(artists) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    artists.forEach(artist => {
        const artistLink = document.createElement('a');
        artistLink.href = '#';
        artistLink.textContent = artist.name;
        artistLink.onclick = () => fetchAlbums(artist.id);
        resultsContainer.appendChild(artistLink);
        resultsContainer.appendChild(document.createElement('br'));
    });
}

// fetch albums from musicbrainz
async function fetchAlbums(artistId) {
    const apiUrl = `https://musicbrainz.org/ws/2/release-group/?query=arid:${artistId}&fmt=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayAlbums(data['release-groups']);
    } catch (error) {
        console.error('Error fetching albums: ', error);
    }
}

// display the album results in a table
function displayAlbums(albums) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<h2>Albums</h2>';

    const table = document.createElement('table');
    const header = table.createTHead();
    const headerRow = header.insertRow();
    const dateHeader = headerRow.insertCell();
    dateHeader.textContent = 'Release Date';
    const titleHeader = headerRow.insertCell();
    titleHeader.textContent = 'Album Title';

    const tbody = table.createTBody();
    albums.forEach(album => {
        const row = tbody.insertRow();
        const dateCell = row.insertCell();
        dateCell.textContent = album['first-release-date'] || 'N/A';
        const nameCell = row.insertCell();
        nameCell.textContent = album.title;
    });
    resultsContainer.appendChild(table);
}

