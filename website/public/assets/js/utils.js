let localURL = "http://localhost:8080/v2";
let remoteURL = "https://hyp.avanzi.dev/v2";

// se localhost:8080 è raggiungibile, allora usa quella (per noi dev) 
// altrimenti usa l'url del server remoto

// ma se l'utente ha altri servizi attivi in localhost:8080?

let apiURL = localURL;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var successAlert = function success(title, message) {
    $('#messagebar').html('\
        <div class="alert alert-success" role="alert">\
            <h4 class="alert-heading">'+title+'</h4>\
            <p>'+message+'</p>\
        </div>\
    ');
}

var errorAlert = function error(title, message) {
    $('#messagebar').html('\
        <div class="alert alert-danger" role="alert">\
            <h4 class="alert-heading">'+title+'</h4>\
            <p>'+message+'</p>\
        </div>\
    ');
}

var fetchAuthorFilter = function fetchAuthorFilter() {
    //fetch all authors to filter
    $.ajax({  
        url: apiURL+'/author',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          console.log(data);
          $.each(data, function (index, author) {
            $('#author_filter').append('\<label for="author'+author.id+'" class="d-flex">\
                <input type="checkbox" id="author'+author.id+'" class="mr-2 mt-1"> <span class="text-black">'+author.name+'</span>\
              </label>\
            ');
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var fetchAllBooks = function fetchAllBooks() {
    //fetch all books
    $.ajax({  
        url: apiURL+'/books',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          console.log(data);
          $.each(data, function (index, book) {
            let authors = '';
            $.each(book.authors, function (index, author) {
              authors += author.name;
              if (index < (book.authors.length - 1)) {
                authors += ", "    
              }
            });
            $('#main_books').append('\
            <li class="col-md-6 col-lg-6">\
              <a href="shop-single.html?id='+book.id+'" class="item res">\
                <img src="/assets/'+book.cover+'" alt="Cover" class="img-fluid resized">\
                <div class="item-info">\
                  <h3 class="book-title">'+book.title+'</h3>\
                  <span class="collection d-block">'+authors+'</span>\
                  <strong class="price">€'+book.value+'</strong>\
                </div>\
              </a>\
            </li>\
            ');
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var fetchFeaturedBooks = function fetchFeaturedBooks() {
    //FEATURED BOOKS
    $.ajax({  
        url: apiURL+'/books',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          //to empty already populated carousel:
          /*
          var length = $('.item').length;
          for (var i=0; i<length; i++) {
            $(".edit-manage-carousel").trigger('remove.owl.carousel', [i])
                                      .trigger('refresh.owl.carousel');
          }
          */
          //put all books in the carousel
          $.each(data, function (index, book) {
            $('#featured_books').trigger('add.owl.carousel', ['\
            <div class="product">\
              <a href="shop-single.html?id='+book.id+'" class="item">\
                <img src="/assets/img/product_2.jpg" style="padding: 20px" alt="Cover" class="img-fluid">\
                <div class="item-info">\
                  <h3>'+book.title+'</h3>\
                  <strong class="prince">€'+book.value+'</strong>\
                </div>\
              </a>\
            </div>\
            ']).trigger('refresh.owl.carousel');
            });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
      });  
}