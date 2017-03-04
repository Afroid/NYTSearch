$(document).ready(function () {

    function setResults(data) {
        for (var item = 0; item < data.length; item++) {
            var currentArticle = data[item],
                itemNumber = item + 1;    
                result = $("<div>"),
                title = $("<h2>").addClass("title").text(itemNumber + " " + currentArticle.headline.main + ": " + currentArticle.snippet),
                // author = $("<p>").addClass("author").text(currentArticle.byline.person[0].firstname + " " + currentArticle.byline.person[0].lastname),
                date = $("<p>").addClass("date").text(currentArticle.pub_date),
                    link = $("a").attr("href", currentArticle.web_url);
                console.log(currentArticle);
            
            result
                .append(title)
                // .append(author)
                .append(date)
                .append(link);
            $("#results").append(result);
        }
    }

    function getData(searchTerm, startDate, endDate) {
        var queryString = searchTerm;
            start = startDate,
            end = endDate;
        
        if (startDate != "" || startDate == null) {
            start = "&begin_date=" + startDate;
        }

        if (endDate != "" || endDate == null) {
            end = "&end_date=" + endDate;
        }

        queryString = searchTerm;
        var apiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + queryString + "&api-key=90c54821482c40c8bf03b3f3710dfede";
        $.ajax({
            url: apiUrl,
            method: "GET"
        }).done(function (data) {
            console.log(data);
            setResults(data.response.docs);
        });
    }

    $("#search").on("click", function () {
        var searchTerm = $("#search-term").val(),
            startYear = $("#start-year").val(),
            endYear = $("#end-year").val();
            console.log(searchTerm);
        
        getData(searchTerm, startYear, endYear);
    });
  
    $("#clear").on("click", function () {
        $("#results").empty();
        console.log("Clearing");
    });
});