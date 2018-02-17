var api = 'https://newsapi.org/v2/top-headlines?sources=';
var apiKey = '&apiKey=029ff94a1d7f4eeebd7f0268aabb442c';

var inputSource;


function getNewsInfo(inputSource) {

    var request=new XMLHttpRequest();
    //url = api + inputSource + apiKey;
    var url = api + inputSource + apiKey;
    request.open('GET',url,false);
    request.send();
    return request;
}

function showUser(data) {
    var article = data.articles;
    var text = "";

    for (var i = 0; i < article.length; i++) {

        var imgtag= '<a href="' + article[i].url + '" target="_blank"><img src="' + article[i].urlToImage + '" height = "500px" width="500px"></a>';
        var a = '<a href="'+article[i].url+'"" target="_blank" >'+article[i].url+'</a>';
            text +=  "Title: "+article[i].title+"<br>"+ "Description: "+article[i].description+"<br>"+ "Published Date:"+article[i].publishedAt+"<br>"+
            "Link to News:"+a+"<br>"+ imgtag+"<br>";

    }
    document.getElementById("demo1").innerHTML = text;
}

function noSuchUser(inputSource) {
    //3. set the elements such that a suitable message is displayed
    alert("No sources with this query! - "+inputSource)

}


$(document).ready(function(){
    $(document).on('keypress', '#source', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            inputSource = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getNewsInfo(inputSource);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(inputSource);
            }
        }
    })
});