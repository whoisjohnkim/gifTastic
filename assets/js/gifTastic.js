// API KEY: EVjjnZ50jeS8CowAn09WpfphaeNpOgSI

var topics = ["Parks and Rec", "Black Mirror", "SpongeBob", "Jimmy Neutron", "Game of Thrones", "The Office", "House of Cards"];
renderButtons();
function renderButtons(){
    $("#buttonContainer").empty();
    for(var i = 0; i < topics.length; i++){
        var newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.addClass("btn");
        newButton.addClass("btn-secondary");
        newButton.addClass("gifButton");
        newButton.attr("type", "button");
        newButton.attr("data-show", topics[i]);
        $("#buttonContainer").append(newButton);
    }

    $(".gifButton").on("click", function() {
        // alert($(this).attr("data-show"));
        var show = $(this).attr("data-show");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          show + "&api_key=EVjjnZ50jeS8CowAn09WpfphaeNpOgSI&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            for(var i = 0; i < results.length; i++){
                var tvDiv = $("<div>");
                var p = $("<p>");
                p.text("Rated: " + results[i].rating);
                var tvImage = $("<img>");
                tvImage.attr("src", results[i].images.fixed_height_still.url);
                tvImage.attr("data-show", show);
                tvImage.attr("currentState", "still");
                tvImage.attr("stillsrc", results[i].images.fixed_height_still.url);
                tvImage.attr("movesrc", results[i].images.fixed_height.url)
                tvImage.addClass("gif");
                tvDiv.append(p);
                tvDiv.append(tvImage);
                $("#gifContainer").prepend(tvDiv);
            }
            // If you click on a gif switch bettween active animation and still image
            $(".gif").on("click", function(){
                if($(this).attr("currentState") === "still"){
                    console.log("I am here");
                    $(this).attr("src", $(this).attr("movesrc"));
                    $(this).attr("currentState", "move");
                }
                else{
                    $(this).attr("src", $(this).attr("stillsrc"));
                    $(this).attr("currentState", "still");
                }
            })
        });
    });
}





// Submit button to create to push onto topic and re-render buttons
$("#submitButton").on("click", function(){
    // event.preventDefault();
    // Make sure that the search term isn't empty
    if($("#gifSearchTerm").val() !== ""){
        topics.push($("#gifSearchTerm").val());
        $("#gifSearchTerm").val("");
        renderButtons();
    }
})