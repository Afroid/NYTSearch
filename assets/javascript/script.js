$(document).ready(function () {

    function setResults(data, limit) {
        for (var item = 0; item < limit; item++) {
            var currentArticle = data.response.docs[item],
                itemNumber = $("<span>").text(item + 1);    
                result = $("<div>"),
                title = $("<h1>").addClass("title").text(itemNumber + " " + currentArticle.headline.main + ": " + currentArticle.snippet),
                author = $("<p>").addClass("author").text(currentArticle.byline.person[0].firstname + " " + currentArticle.byline.person[0].lastname),
                date = $("<p>").addClass("date").text(currentArticle.pub_date),
                link = $("a").attr("href", currentArticle.web_url);
            

            result
                .append(title)
                .append(author)
                .append(date)
                .append(link);
            $("#results").append(result);
        }
    }

    function getData(searchTerm, searchLimit, startDate, endDate,) {
        var queryString = searchTerm,
            limit = searchLimit,
            start = startDate,
            end = endDate;
        
        if (startDate != "" || startDate == null) {
            start = "&begin_date=" + startDate;
        }

        if (endDate != "" || endDate == null) {
            end = "&end_date=" + endDate;
        }

        queryString = searchTerm + start + end;
        var apiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + queryString + "&api-key=90c54821482c40c8bf03b3f3710dfede";
        $.ajax({
            url: apiUrl,
            method: "GET"
        }).done(function (data) {
            console.log(data.response.docs);
            setResults(response, limit);
        });
    }

    $("#search").on("click", function () {
        var searchTerm = $("#search-term").val(),
            searchLimit = $("#search-limit").val(),
            startYear = $("#start-year").val(),
            endYear = $("#end-year").val();
        
        getData(searchTerm, serach)

    });

    $("#clear").on("click", function () {
        $("#results").empty();
        console.log("Clearing");
    });
});