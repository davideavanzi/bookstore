let localURL = "http://localhost:8080/v2";
let remoteURL = "https://hyp.avanzi.dev/v2";

// se localhost:8080 è raggiungibile, allora usa quella (per noi dev) 
// altrimenti usa l'url del server remoto

// ma se l'utente ha altri servizi attivi in localhost:8080?

/**
 * TODO: 
 * + update book amounts in cart incon in the menu
 * + edit live book stock after adding to cart
 * + server is adding books to cart with 0 stock
 */

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

var fetchAllBooks = function fetchAllBooks(authorId, genreId, themeId) {
    //fetch all books, with optional filters
    var params = {};
    if(authorId) {
        params.authorId = authorId;
    }
    if(genreId) {
        params.genreId = genreId;
    }
    if(themeId) {
        params.themeId = themeId;
    }
    var paramStr = jQuery.param(params);
    $.ajax({  
        url: apiURL+'/books?'+paramStr,  
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

var loadMenu = function loadMenu() {
    var $menu = $('#menu_container')
    $menu.load("menu.html", function(){
        var $genres = $menu.find("[id=genres_menu]");
        $.ajax({  
            url: apiURL+'/genre',  
            type: 'GET',  
            dataType: 'json',  
            success: function (data, textStatus, xhr) { 
                console.log(data);
                $.each(data, function (index, genre) {
                    $genres.append('\
                    <li><a href="/assets/pages/shop.html?genreid='+genre.id+'">'+genre.name+'</a></li>');
                });
            },  
            error: function (xhr, textStatus, errorThrown) {  
                console.log('Error in Operation');  
            }
        });  

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
        url: apiURL+"/cart/removeBook?bookId="+bookId,
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

var addBookToCart = function addBookToCart(bookid, amount) {
    $.ajax({ 
        url: apiURL+"/cart/addBook?bookId="+bookid+"&amount="+amount,
        type: "PUT",
        contentType: "application/json",
        success: function() {
          successAlert("All Good!","This book was added to your cart!");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status == 403) {
              errorAlert("Whoops!", "You need to be logged in to buy books!");
          } else if (jqXHR.status == 401) {
              //alert("You inserted invalid data, try again!");
              errorAlert("Whoops!", "Data provided are invalid, try again!");
          } else {
              errorAlert("Whoops!", "An error occurred, pleasy try again!");
          }
        }
    });
    return false;
}

var fetchSingleBook = function fetchSingleBook(bookid) {
    $.ajax({  
        url: 'http://localhost:8080/v2/books/'+bookid,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
            //TODO: calc stars mean? (Ooof) 
            //TODO: add shadow around book cover?
            console.log(data);  
            document.title = data.title;
            $('#price').html(data.value);
            $('#title').html(data.title);
            $('#stock').text(data.stock);
            $('#cover').attr("src","/assets/"+data.cover);
            $('#book_bc').text(data.title);
            $('#abstract').html(data.abstract);
            $('#factsheet').html(data.fact_sheet);
            $('#authors').empty();
            $.each(data.authors, function (index, author) {
              $('#authors').append("<a href=\"author.html?id="+author.id+"\">"+author.name+"</a>");
              if (index < (data.authors.length - 1)) {
                $('#authors').append(", ");
              }
            });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }  
    }); 
}

var fetchAllEvents = function fetchAllEvents() {
    //fetch all events
    $.ajax({  
        url: apiURL+'/event',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          var i = 0;  
          $.each(data, function (index, event) {
            $.ajax({
                url: 'http://localhost:8080/v2/books/'+event.id_book,  
                type: 'GET',  
                dataType: 'json',
                success : function(book, textStatus, xhr){
                    if(i%2){
                        var fadeDir = 'fade-right';
                        var offset = 'offset-sm-6 ';
                    }
                    else {
                        var fadeDir = 'fade-left';
                        var offset = '';                    
                    }
                    var authors = '';
                    var authRef = '';
                    $.each(book.authors, function (index, author) {
                      i++;
                      authors += author.name;
                      if (index < (book.authors.length - 1)) {
                        authors += ", "    
                      }
                      authRef += '<a href=author.html?id='+author.id+'>'+author.name+'</a>'
                    });
                    $('#timeline').append('\
                        <div class="row timeline-movement">\
                            <div class="timeline-badge center-left">\
                            </div>\
                            <div data-aos="'+fadeDir+'"> <!-- se a sx: fade-right -->\
                              <div class="'+offset+' col-sm-6 timeline-item"> <!-- se a sx: col-sm-6  timeline-item -->\
                                <div class="row">\
                                    <div class="col-sm-11">\
                                        <div class="timeline-panel credits  anim animate fadeInLeft">\
                                            <ul class="timeline-panel-ul">\
                                                <div class="lefting-wrap">\
                                                    <li class="img-wraping">\
                                                        <a href="event-single.html?id='+event.id+'"><img src="/assets/'+book.cover+'" alt="Cover" class="img-responsive" alt="user-image" /></a>\
                                                    </li>\
                                                </div>\
                                                <div>\
                                                    <li><a href="shop-single.html?id='+event.id+'" class="importo">"'+event.title+'"</a></li>\
                                                    <li>'+authRef+' </li>\
                                                    <li><span>'+event.content+'</span> </li>\
                                                    <br>\
                                                    <li>\
                                                        <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 05/05/19, 2 P.M., '+event.location+'</small></p>\
                                                    </li>\
                                                </div>\
                                                <div class="clear"></div>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                              </div>\
                            </div>\
                        </div>\
                    ');
                }
            });
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}