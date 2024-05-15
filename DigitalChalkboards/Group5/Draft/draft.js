async function fetchArtistDetails(artistName) {
    const artistInput = document.getElementById('artistInput').value;
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`);
        const data = await response.json();
        const artists = data.artists;

        if (artists.length === 0) {
            resultsContainer.innerHTML = `<p>No results found for "${artistInput}".</p>`;
        } else {
            artists.forEach(artist => {
                const artistLink = document.createElement('a');
                artistLink.href = `./music.html?mbid=${artist.id}`;
                artistLink.textContent = artist.name;
                artistLink.style.display = 'block';

                resultsContainer.appendChild(artistLink);
            });
        }
    } catch (error) {
        console.error('Error fetching artist details:', error);
    }
}

async function fetchArtistDetails(mbid) {
    const resultsContainer = document.createElement('results');

    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json`);
        const artist = await response.json();

        resultsContainer.innerHTML = `
        <h2>${artist.name}</h2>
        <p>ID: ${artist.id}</p>
        <p>Type: ${artist.type || 'N/A'}</p>
        <p>Country: ${artist.country || 'N/A'}</p>
        `;
    } catch (error) {
        console.error('Error fetching artist details:', error);
    }
}

function getMbidFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('mbid');
}

document.addEventListener('DOMContentLoaded', () => {
    const mbid = getMbidFromUrl();
    if (mbid) {
        fetchArtistDetails(mbid);
    } 
});

function searchArtist() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
        alert('Please enter an artist name');
        return;
    }

    const baseUrl = 'https://musicbrainz.org/ws/2/artist/?query=';
    const format = '&fmt=json';
    const searchUrl = baseUrl + encodeURIComponent(searchInput) + format;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.artists);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displaySearchResults(artists) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    if (artists.length === 0) {
        searchResultsDiv.textContent = 'No artists found.';
        return;
    }

    const resultList = document.createElement('ul');
    artists.forEach(artist => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = artist.name;
        link.href = '#';
        link.onclick = () => fetchAlbuns(artist.id);
        listItem.appendChild(link);
        resultList.appendChild(listItem);
    });
    searchResultsDiv.appendChild(resultList);
}

function fetchAlbums(artistId) {
    const baseUrl = 'https://musicbrainz.org/ws/2/release/?artist=';
    const format = '&fmt=json';
    const albumUrl = baseUrl + artistId + format;

    fetch(albumUrl)
        .then(response => response.json())
        .then(data => {
            displayAlbumResults(data.releases);
        })
        .catch(error => {
            console.error('Error fetching albums:', error);
        });
}

function displayAlbumResults(albums) {
    const albumResultsDiv = document.getElementById('albumResults');
    albumResultsDiv.innerHTML = '';

    if (albums.length === 0) {
        albumResultsDiv.textContent = 'No albums found for this artist';
        return;
    }

    const table = document.createElement('table');
    const headRow = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.textContent = 'Release Date';
    const header2 = document.createElement('th');
    header2.textContent = 'Album Name';
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    table.appendChild(headRow);

    albums.forEach(album => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = album.data ? album.data : 'N/A';
        const cell2 = document.createElement('td');
        cell2.textContent = album.title;
        row.appendChild(cell1);
        row.appendChild(cell2);
        table.appendChild(row);
    });

    albumResultsDiv.appendChild(table);
}