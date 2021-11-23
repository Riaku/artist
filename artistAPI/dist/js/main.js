

const url = new URL("http://localhost:3000/api/list")

$(document).ready(function() {
    fetch('/api/list').then(function (response) {
        // The API call was successful!
        return response.text();
    }).then(function (text) {
        console.log(text);
        listedArtists = []
        text = text.split('&').forEach(function(item,i,arr) {
            console.log(item);
            listedArtists[i] = item.split(',');
            document.getElementById('main-container').innerHTML = '<table id="main" class="display" width="100%"></table>';
        });
        console.log(typeof text, text);
        $('#main').DataTable( {
            data: listedArtists,
            columns: [
                { title: "Name", width: "40%" },
                { title: "Status" },
                { title: "Website" },
                { title: "Details" },
                { title: "Art Type" }
            ]
        } );
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });    
} );