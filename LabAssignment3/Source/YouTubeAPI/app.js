// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAOAJ-Tdx3Wy1TGFdvpFPwCoVygMthks4E');
}

// Called when the search button is clicked in the html code
function search() {
    var query = document.getElementById('query').value;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:query,
        type : 'video',
        order: "viewCount",
        maxResults : '10'
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}
// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
 //   var responseString = JSON.stringify(response, '', 2);
    var item = response.items;
    var res = "";
    for(var i=0;i<item.length;i++){
        var video = '<iframe class="video w100" width="640" height="360" src="//www.youtube.com/embed/'+item[i].id.videoId+'" frameborder="0" allowfullscreen> </iframe>';
        console.log(item[i].snippet.title);
        res += "<strong><em>Title: "+item[i].snippet.title+"</em></strong><br>"+video+"<br>";
    }
    document.getElementById("response").innerHTML = res;

}