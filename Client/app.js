(function ($) {
    movies = []
    selectedMovieId = -1;
    function UpdateMovie(e) {
        var movie = {
            MovieId: selectedMovieId,
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value,
            ImagePath: this["imagePath"].value
        };

        $.ajax({
            url: `https://localhost:44325/api/movie`,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function (data, textStatus, jQxhr) {
                $('#response pre').html(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).then(function () {
            GetAllMovies();
        })

        e.preventDefault();
    }

    $('#update-form').submit(function(e){
        e.preventDefault();
        UpdateMovie();
        $('#modal-id').style.display === "none";
    });
        
    
    // $('#button').submit(function(e) {
    //     e.preventDefault();
    //     // Coding
    //     $('#IDModal').modal('toggle'); //or  $('#IDModal').modal('hide');
    //     return false;
    // });

    function SearchForm(e) {
        let filtered = [];    
        let searchOption = document.getElementById('select-option').value;
        let textValue = document.getElementById('text-input').value;
        switch (searchOption) {
            case "title":
                filtered = movies.filter(m => m.title.includes(textValue));
                break;
            case "genre":
                filtered = movies.filter(m => m.genre.includes(textValue));
                break;
            case "director":
                filtered = movies.filter(m => m.director.includes(textValue));
                break;
            default:
                
                break;
        }
            $('.movieData').html('');
            $.each(filtered, function (index, value) {
                $('.movieData').append(
                    '<tr>' +
                    '<td>' + value.title + '</td>' +
                    '<td>' + value.genre + '</td>' +
                    '<td>' + value.director + '</td>' +
                    `<td><button type="button" value="Details" onclick="UnhideDetails(${value.movieId}, '${value.title}', '${value.genre}', '${value.director}', '${value.imagePath}')">Details</button></td>` +
                    `<td><button type="button" value="Update" onclick="UnhideUpdate(${value.movieId}, '${value.title}', '${value.genre}', '${value.director}', '${value.imagePath}')">Update</button></td>` +
                    '</tr>'
                );
            });
            e.preventDefault();
        };

    $('#searchForm').submit(SearchForm);

    function processForm(e) {
        var dict = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value,
            ImagePath: this["imagePath"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                $('#response pre').html(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    // $('#add-movie-form').submit(function(e){
    //     processForm();
    // });

    $('#addForm').submit(processForm);

    function GetAllMovies() {
        $(document).ready(function () {
            $.ajax({
                type: 'GET',
                url: "https://localhost:44325/api/movie",
                dataType: 'json',
                success: function () {
                    $('.movieData').html('');
                }
            })
                .then(function (data) {
                    movies = data
                    $.each(data, function (index, value) {
                        $('.movieData').append(
                            '<tr>' +
                            '<td>' + value.title + '</td>' +
                            '<td>' + value.genre + '</td>' +
                            '<td>' + value.director + '</td>' +
                            `<td><button type="button" value="Details" onclick="UnhideDetails(${value.movieId}, '${value.title}', '${value.genre}', '${value.director}', '${value.imagePath}')">Details</button></td>` +
                            `<td><button type="button" value="Update" onclick="UnhideUpdate(${value.movieId}, '${value.title}', '${value.genre}', '${value.director}', '${value.imagePath}')">Update</button></td>` +
                            '</tr>'
                        );


                    });
                });

        });
    }
    
$(document).ready(GetAllMovies());
})(jQuery);

function UnhideUpdate(movieId, title, genre, director, imagePath) {
    this.selectedMovieId = movieId;

    var x = document.getElementById("updateForm");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById('title').value = title;
        document.getElementById('genre').value = genre;
        document.getElementById('director').value = director;
        document.getElementById('imagePath').value = imagePath;
    } else {
        x.style.display = "none";
    }
}

function UnhideDetails(movieId, title, genre, director, imagePath) {
    this.selectedMovieId = movieId;
    var details = document.getElementById("view-movie-info");
    if (details.style.display === "none") {
        details.style.display = "block";
        document.getElementById('movie-name').innerHTML = "Movie Name: " + title;
        document.getElementById('movie-genre').innerHTML = "Movie Genre: " + genre;
        document.getElementById('movie-director').innerHTML = "Movie Director: " + director;
        document.getElementById('movie-picture').src = imagePath;
    } else {
        details.style.display = "none";
    }
}