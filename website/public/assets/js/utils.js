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
                  <strong class="price">€'+(book.value).toFixed(2)+'</strong>\
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
                  <strong class="prince">€'+(book.value).toFixed(2)+'</strong>\
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


var fetchCart = function fetchCart() {
    $.ajax({  
        url: apiURL+'/cart',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          console.log(data);
          $('#cart').empty();
          $.each(data, function (index, book) {
            $('#cart').append('\
            <tr id="book'+book.id+'">\
                <td class="product-thumbnail">\
                    <img src="/assets/'+book.cover+'" alt="Image" class="img-fluid">\
                </td>\
                <td class="product-name">\
                    <h2 class="h5 text-black"><a href="shop-single.html?id='+book.id+'">'+book.title+'</a></h2>\
                </td>\
                <td>€'+book.value.toFixed(2)+'</td>\
                <td>\
                    <div class="input-group mb-3" style="max-width: 120px;">\
                        <div class="input-group-prepend">\
                            <button class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>\
                        </div>\
                        <input type="text" class="form-control text-center" value="'+book.amount+'" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">\
                        <div class="input-group-append">\
                            <button class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>\
                        </div>\
                    </div>\
                </td>\
                <td>€'+(book.value*book.amount).toFixed(2)+'</td>\
                <td><button class="btn btn-primary height-auto btn-sm" onClick="removeBookFromCart('+book.id+')">X</button></td>\
            </tr>\
            ');
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in fetching books');  
        }
    }); 
}

var updateTotals = function updateTotals() {
    $.ajax({  
        url: apiURL+'/cart',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
            var subtotal = 0;
            $.each(data, function (index, book) {
                subtotal += (book.value*book.amount);
            });
          $('#subtotal').text(subtotal.toFixed(2));
          $('#total').text((subtotal*1.22).toFixed(2));
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in calculating cart toal.');  
        }
    }); 
}


var removeBookFromCart = function removeBookFromCart(bookId) {
    $.ajax({ 
        url: "http://localhost:8080/v2/cart/removeBook?bookId="+bookId,
        type: "PUT",
        contentType: "application/json",
        success: function() {
            //successAlert("All Good!","This book was removed from your cart!");
            //remove book from table
            var rowId = "book"+bookId;
            $("div[id*="+rowId+"]").remove();
            updateTotals();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                errorAlert("Error", "You are not authorized to perform this action!");
            } else if (jqXHR.status == 401) {
                errorAlert("Whoops!", "Data provided are invalid, try again!");
            } else {
                errorAlert("Whoops!", "An error occurred, pleasy try again!");
            }
        }
    });
    //scroll smoothly to the top
    //$("html, body").animate({ scrollTop: 0 }, "slow");
    return false;

}