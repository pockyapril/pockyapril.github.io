// Base to load the documents
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ochreContainer');
    const uuid = container.getAttribute('data-uuid');

    if (uuid === '6f18e3a7-a396-46d9-85cb-92674c24cfc0') {
        loadFirstItem(uuid);
    } else if (uuid === '50f7b9a5-329a-49ab-85e2-f8fb4ee6e867') {
        loadSecondItem(uuid);
    }
});

// Load data from webpage for the first item
function loadFirstItem(uuid) {
    const link = `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`;
    requestXML(link, parseFirstItemXML);
    console.log('Loading data for first item');
}

// Load data from wepage for the second item
function loadSecondItem(uuid) {
    const link = `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`;
    requestXML(link, parseSecondItemXML);
    console.log('Loading data for second item');
}

// Fetch XML data from the links
function requestXML(link, callback) {
    var connect = new XMLHttpRequest();
    connect.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                callback(this.responseXML, link);
            } else {
                console.error('Failed to fetch XML:', this.statusText);
            }
        }
    };
    connect.onerror = function() {
        console.error('XML request encountered a network error.');
    };
    connect.open("GET", link, true);
    connect.send();
    console.log('Request sent for:', link);
}

// Fetch information for the first item
// Update the webpage with the info
function parseFirstItemXML(sourceXML) {
    var textTitle = sourceXML.getElementsByTagName('identification');
    var title_string = document.createTextNode(textTitle[1].textContent);
    document.getElementById('title').appendChild(title_string);

    if (sourceXML.getElementsByTagName('property').length > 0) {
        const properties = sourceXML.querySelectorAll('property');
        let i = 0;
        properties.forEach(p => { // Iterates over the properties
            var tr = document.createElement('tr'); // Create a new table row for each element
            tr.setAttribute('class', 'ochreTableRows');
            tr.setAttribute('id', 'row_' + i); // "i" is used to ensure that each row has a unique ID
            document.getElementById('ochreTableBody').appendChild(tr);

            var property = document.createElement('td'); // Table data
            property.setAttribute('id', 'property_' + i);
            property.textContent = p.querySelector('string').textContent;
            document.getElementById('row_' + i).appendChild(property);

            var value = document.createElement('td');
            value.setAttribute('id', 'value_' + i);
            value.textContent = p.querySelector('value').textContent;
            document.getElementById('row_' + i).appendChild(value);
            i++;
        });
    }
}

// Fetch image for the second item
// Update the webpage with the image
function parseSecondItemXML(sourceXML, link) {
    var textTitle = sourceXML.getElementsByTagName('identification');
    if (textTitle.length > 0) {
        var title_string = document.createTextNode(textTitle[1].textContent);
        document.getElementById('title').appendChild(title_string);
    }

    var resources = sourceXML.getElementsByTagName('resource');
    if (resources.length > 0 && resources[0].getAttribute("format") === 'image/jpeg') {
        var img = document.createElement('img');
        var src = link + "&preview"; 
        img.src = src;
        document.getElementById('preview').appendChild(img);
    }
}


