window.onload = function() {


    $('#createGif').on('click', function() {
        premadeGif.push(newGif.value);
        createButtons();
        giphyClick();
        return false;
    });

    var premadeGif = ["fail", "kitty", "puppy", "space", "trippy", "overwatch", "xfiles", "spooky", "shrug", "snl", "dali", ];

    function createButtons() {
        $('#gifButtons').empty();

        for (var i = 0; i < premadeGif.length; i++) {
            $('#gifButtons').append('<button class="giphy btn-primary" data-state="still" data-reaction="' + premadeGif[i] + '">' + premadeGif[i] + '</button');
        }
    };

    function giphyClick() {
        $('.giphy').on('click', function() {
            $('#giphyGen').html('');
            var r = $(this).data('reaction');
            var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + r + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                    url: queryUrl,
                    method: 'GET'
                })
                .done(function(response) {
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $('<div class="item">');
                        var rating = results[i].rating;
                        var p = $('<p>').text("Rating: " + rating);

                        var newGif = $('<img>');
                        newGif.attr('class', 'clicky');
                        newGif.attr('data-state', 'still');
                        newGif.attr('src', results[i].images.fixed_height.url);
                        newGif.attr('data-still', results[i].images.fixed_height_still.url);
                        newGif.attr('data-animate', results[i].images.fixed_height.url);

                        gifDiv.append(p);
                        gifDiv.append(newGif);
                        $('#giphyGen').prepend(gifDiv);
                    }
                });
        });
    };




    createButtons();
    giphyClick();
    // jQuery
    var $container = jQuery('#masonry-grid');
    // initialize
    $container.masonry({
      columnWidth: 200,
      itemSelector: '.grid-item'
    });




};
