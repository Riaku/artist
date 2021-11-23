//once a user clicks the submit button verify that the input text is not empty and that it matches a valid URI
//if it is valid, then call the API and post the artist object
//if it is not valid, then display an error message

function clickSubmit() {
    var artist_handle = document.getElementById("artist_url").value;
    //if artist_handle starts with an @, remove it
    if (artist_handle.charAt(0) === '@') {
        artist_handle = artist_handle.substring(1);
    }
    var artist_medium = document.getElementById("artist_medium").value;

    var artist = {
        "name": "New Artist adding...",
        "social": "twitter.com/" + artist_handle,
        "open": "Pending...",
        "link": "placeholder",
        "details": "Details go here",
        "field1": "placeholder",
        "field2": "placeholder",
        "field3": "placeholder",
        "field4": "placeholder",
        "field5": "placeholder",
        "field6": "placeholder",
        "field7": "placeholder",
        "field8": "placeholder",
        "field9": "placeholder",
        "beware": "",
        "type": artist_medium
    }

    //call post the artist object to the server in the body of the request
    fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
    }).then(function (response) {
        if (response.ok) {
            document.getElementById("errorMessage").innerHTML = "Successfully submitted artist!";
        } else {
            document.getElementById("errorMessage").innerHTML = "Error submitting artist!";
        }
    }) 
}