// Base
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

function requestXML(link, callback) {
    var connect = new XMLHttpRequest();
    connect.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseXML);
        }
    };
    connect.open("GET", link, true);
    connect.send();
    console.log('Request sent for:', link);
}

function parseFirstItemXML(sourceXML) {
    var textTitle = sourceXML.getElementsByTagName('identification');
    var title_string = document.createTextNode(textTitle[1].textContent);
    document.getElementById('title').appendChild(title_string);

    if (sourceXML.getElementsByTagName('property').length > 0) {
        const properties = sourceXML.querySelectorAll('property');
        let i = 0;
        properties.forEach(p => {
            var tr = document.createElement('tr');
            tr.setAttribute('class', 'ochreTableRows');
            tr.setAttribute('id', 'row_' + i);
            document.getElementById('ochreTableBody').appendChild(tr);

            var property = document.createElement('td');
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

function parseSecondItemXML(sourceXML) {
    var textTitle = sourceXML.getElementsByTagName('identification');
    var title_string = document.createTextNode(textTitle[1].textContent);
    document.getElementById('title').appendChild(title_string);

    if (sourceXML.getElementsByTagName('source')[0].getAttribute("format") == 'image/jpeg') {
        var img = document.createElement('img');
        var src = link + "&preview";
        img.src = src;
        document.getElementById('preview').appendChild(img);
    }
};
