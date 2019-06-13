let localURL = "http://localhost:8080/v2";
let remoteURL = "https://hyp.avanzi.dev/v2";

// se localhost:8080 è raggiungibile, allora usa quella (per noi dev) 
// altrimenti usa l'url del server remoto

// ma se l'utente ha altri servizi attivi in localhost:8080?

/**
 * TODO: 
 * + update book amounts in cart icon in the menu
 * + edit live book stock after adding to cart?
 * + server API is adding books to cart with 0 stock
 * + show active filter in all books page
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
    $('#messagebar').append('\
        <div class="alert alert-success" role="alert">\
            <h4 class="alert-heading">'+title+'</h4>\
            <p>'+message+'</p>\
        </div>\
    ');
}

var warningAlert = function warning(title, message) {
    $('#messagebar').append('\
        <div class="alert alert-warning alert-dismissible fade show" role="alert">\
            <h4 class="alert-heading">'+title+'</h4>\
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                <span aria-hidden="true">&times;</span>\
            </button>\
            <p>'+message+'</p>\
        </div>\
    ');
}


var errorAlert = function error(title, message) {
    $('#messagebar').append('\
        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
            <h4 class="alert-heading">'+title+'</h4>\
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                <span aria-hidden="true">&times;</span>\
            </button>\
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
            $('#author_filter').append('\
            <li class="mb-1">\
                <a href="shop.html?authorid='+author.id+'" class="d-flex"><span>'+author.name+'</span> \
                <span class="text-black ml-auto">(5)</span></a></li>\
            ');
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var fetchGenreFilter = function fetchGenreFilter() {
    //fetch all genres to filter
    $.ajax({  
        url: apiURL+'/genre',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          console.log(data);
          $.each(data, function (index, genre) {
            $('#genre_filter').append('\
            <li class="mb-1">\
                <a href="shop.html?genreid='+genre.id+'" class="d-flex"><span>'+genre.name+'</span> \
                <span class="text-black ml-auto">(5)</span></a></li>\
            ');
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var fetchThemeFilter = function fetchThemeFilter() {
    //fetch all themes to filter
    $.ajax({  
        url: apiURL+'/theme',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          console.log(data);
          $.each(data, function (index, theme) {
            $('#theme_filter').append('\
            <li class="mb-1">\
                <a href="shop.html?themeid='+theme.id+'" class="d-flex"><span>'+theme.name+'</span> \
                <span class="text-black ml-auto">(5)</span></a></li>\
            ');
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var setPagination = function setPagination(page, limit, totalElements) {
    var pagesAmount = Math.ceil(totalElements/limit);
    $('#pagination').empty();
    console.log("PAGESAMOUNT: "+pagesAmount);
    if(page > 1){
        $('#pagination').append('<li><a href="?p='+(parseInt(page)-1)+'">&lt;</a></li>');
    }
    for (var i = 1; i <= pagesAmount; i++) {
        if (i == page) {
            $('#pagination').append('<li class="active"><span>'+i+'</span></li>');
        } else {
            $('#pagination').append('<li><a href="?p='+i+'">'+i+'</a></li>');
        }
    }
    if(page < pagesAmount){
        $('#pagination').append('<li><a href="?p='+(parseInt(page)+1)+'">&gt;</a></li>');
    }
    
}

var getBooksTotal = function getBooksTotal(authorId, genreId, themeId) {
    //fetch all books, with optional filters
    return new Promise(function(resolve, reject) {
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
                resolve(data.length);
            },  
            error: function (xhr, textStatus, errorThrown) {  
                console.log('Error in Operation');  
            }
        }); 
    });
}

var getAuthorsTotal = function getAuthorsTotal() {
    //fetch all authors
    return new Promise(function(resolve, reject) {
        $.ajax({ 
            url: apiURL+'/author?',  
            type: 'GET',  
            dataType: 'json',  
            success: function (data, textStatus, xhr) { 
                resolve(data.length);
            },  
            error: function (xhr, textStatus, errorThrown) {  
                console.log('Error in Operation');  
            }
        }); 
    });


}



var fetchAllBooks = function fetchAllBooks(limit, offset, authorId, genreId, themeId) {
    //fetch all books, with optional filters
    var params = {};
    if (limit) {
        params.limit = limit;
    }
    if (offset) {
        params.offset = offset;
    }
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
          $('#main_books').empty();
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
        url: apiURL+'/books?limit=4',  
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
                <img src="/assets/'+book.cover+'" style="padding: 20px" alt="Cover" class="img-fluid">\
                <div class="item-info carousel-caption">\
                  <h3>'+book.title+'</h3>\
                  <strong class="price">€'+(book.value).toFixed(2)+'</strong>\
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

var displayCartBadge = function displayCartBadge() {
    $.ajax({  
        url: apiURL+'/cart',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
            if(data.length > 0) {
                $('#cartIcon').append('<span class="number">'+data.length+'</span>')
            }
        },  
        error: function (xhr, textStatus, errorThrown) {  
            //User may not be authenticated, in this case we do nothing
            //TODO maybe check error codes?
            //console.log('Error in fetching cart');  
            setCookie("loggedin","false","1");
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
            console.log('Error in fetching cart');  
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
            if(amount > bookStock) {
                warningAlert("Attention!",'You tried to buy more books than available, we added the maximum quantity we have in stock! <a href="/assets/pages/cart.html" class="alert-link">Check your cart</a>');
            } else {
                successAlert("All Good!",'This book was added to your cart! <a href="/assets/pages/cart.html" class="alert-link">Go to your cart</a>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status == 403) {
              errorAlert("Whoops!", "You need to be logged in to buy books!");
          } else if (jqXHR.status == 401) {;
              errorAlert("Whoops!", "Data provided are invalid, try again!");
          } else if (jqXHR.status == 406) {;
            errorAlert("Whoops!", "You are trying to buy a book which is out of stock!");
          } else {
              errorAlert("Whoops!", "An error occurred, pleasy try again!");
          }
        }
    });
    return false;
}

var fetchSingleBook = function fetchSingleBook(bookid) {
    $.ajax({  
        url: apiURL+'/books/'+bookid,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
            //TODO: calc stars mean? (Ooof) 
            //TODO: add shadow around book cover?
            console.log(data);  
            document.title = data.title;
            bookStock = data.stock;
            if (bookStock > 0) {
                $( "#reserve" ).prop( "disabled", true );
            }
            $('#price').html(data.value.toFixed(2));
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
              fetchInterview(bookid, "<a href=\"author.html?id="+author.id+"\">"+author.name+"</a>", author.id, author.photo);
            });
             //id_book, authRef, authId, authCover
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }  
    }); 
}

var fetchAllEvents = function fetchAllEvents(month, authorId, past, current) {
    //fetch all events
    var filled=false;
    var i = 0;
    $.ajax({  
        url: apiURL+'/event',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) {
            curMonth = new Date(data[0].datetime+1);
            $.each(data, function (index, event) {
                $.ajax({
                    url: apiURL+'/books/'+event.id_book,  
                    type: 'GET',  
                    dataType: 'json',
                    success : function(book, textStatus, xhr){
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        if(i%2){
                            var fadeDir = 'fade-right';
                            var offset = 'offset-sm-6 ';
                        }
                        else {
                            var fadeDir = 'fade-left';
                            var offset = '';                    
                        }
                        var authRef = '';
                        $.each(book.authors, function (index, author) {
                            if (index < (book.authors.length - 1)) {
                                authRef += ", "    
                            }
                            authRef += '<a href=author.html?id='+author.id+'>'+author.name+'</a>'
                            $('#author_filter').append('<li class="mb-1"><a href="events.html?author='+author.id+'" class="d-flex"><span>'+author.name+'</span> <span class="text-black ml-auto">(2,220)</span></a></li>');
                        });
                        date = new Date(event.datetime);
                        var html = '\
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
                                                        <li><a href="event-single.html?id='+event.id+'" class="importo">"'+event.title+'"</a></li>\
                                                        <li>'+authRef+' </li>\
                                                        <li id="aaa"><span>'+event.content+'</span> </li>\
                                                        <br>\
                                                        <br>\
                                                        <li>\
                                                            <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i>'+date+' '+event.location+'</small></p>\
                                                        </li>\
                                                    </div>\
                                                    <div class="clear"></div>\
                                                </ul>\
                                            </div>\
                                        </div>\
                                    </div>\
                                  </div>\
                                </div>\
                            </div>';
                        var htmlMonth = '<div class="row timeline-movement timeline-movement-top id="asd">\
                        					<a href="events.html?month='+eval(date.getMonth()+1)+'">\
                                                <div class="timeline-badge timeline-future-movement">\
                                                    <p>'+months[date.getMonth()]+'</p>\
                                                </div>\
                                            </a>\
                                        </div>';
                        
                        if(!past && !current && date.getTime() > (new Date()).getTime()){
	                        if(month){
	                            if(month == date.getMonth()+1){
	                                i++;
	                                if(date.getMonth()+1 != curMonth){
	                                    curMonth = date.getMonth()+1;
	                                    $('#timeline').append(htmlMonth);
	                                }
	                                $('#timeline').append(html);
	                                filled = true;
	                            }
	                        } else if(authorId){
	                            for(var a = 0; a < book.authors.length; a++){
	                                if(authorId == book.authors[a].id){
	                                    i++;
	                                    if(date.getMonth()+1 != curMonth){
	                                        curMonth = date.getMonth()+1;
	                                        $('#timeline').append(htmlMonth);
	                                    }
	                                    $('#timeline').append(html); 
	                                    filled = true;
	                                }
	                            }
	                        } else {
	                            i++;
	                            if(date.getMonth()+1 != curMonth){
	                                curMonth = date.getMonth()+1;
	                                $('#timeline').append(htmlMonth);
	                            }                            
	                            $('#timeline').append(html);
	                            filled = true;
	                        }
	                    } else if(past && date.getTime() < (new Date()).getTime()){
	                    	i++;
                            if(date.getMonth()+1 != curMonth){
                                curMonth = date.getMonth()+1;
                                $('#timeline').append(htmlMonth);
                            }                            
                            $('#timeline').append(html);
                            filled = true;
	                    } else if (current){
	                    	if ((date.getMonth() == (new Date()).getMonth()) && (date.getYear() == (new Date()).getYear())){
	                    		i++;
	                            if(date.getMonth()+1 != curMonth){
	                                curMonth = date.getMonth()+1;
	                                $('#timeline').append(htmlMonth);
	                            }                            
	                            $('#timeline').append(html);
	                            filled = true;
	                        }
	                    }
                        
                    },async: false //make this ajax synchronous because need to preserve ordination
                });
            }); 
            if(!filled){
                $('#timeline').remove();
                warningAlert('Whoops!','No events planned in this month, try another one!')
            }
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var fetchSingleEvent = function fetchSingleEvent(eventId){	
    $.ajax({	
        url: apiURL+'/event/' + eventId,	
        type: 'GET',	
        dataType: 'json',	
        success: function(event, textStatus, xhr) {
            $('#single-event').html(event[0].title);	
            $.ajax({	
                url: apiURL+'/books/'+event[0].id_book,  //TODO: remove [0]	
                type: 'GET',  	
                dataType: 'json',	
                success : function(book, textStatus, xhr){	
                var authRef = '';	
                var authCover = '';	
                $.each(book.authors, function (index, author) {	
                  if (index < (book.authors.length - 1)) {	
                    authors += ", ";    	
                  }	
                  authRef += '<a href=author.html?id='+author.id+'>'+author.name+'</a>'	
                  authId = author.id;	
                  authCover = author.photo;	
                });	
                $('#event').append('\
                    <div class="col-md-6">\
                        <div class="border">\
                            <img id="cover" src="/assets/'+book.cover+'" style="align-content: bottom" alt="Image" class="img-fluid">\
                        </div>\
                    </div>\
                    <div class="col-md-6">\
                        <h1 class="text-black" id="title">'+event[0].title+'</h1>\
                        <h2 class="text-back" style="font-size: 20px" id="date">'+new Date(event[0].datetime)+'</a></h2>\
                        <h2 class="text-back" style="font-size: 20px" id="location">'+event[0].location+'</a></h2>\
                        <br>\
                        <br>\
                        <br>\
                        <p id="content">'+event[0].content+'</p>\
                        <br>\
                    </div>\
                ');
                fetchInterview(book.id, authRef, authId, authCover);
	  
              }	
            });
        },	
        error: function(xhr, textStatus, errorThrown) {	
            console.log('Error in Operation');	
        }	
    });	
}

var fetchInterview = function fetchInterview(id_book, authRef, authId, authCover){
    $.ajax({    
        url: apiURL+'/interview',     
        type: 'GET',      
        dataType: 'json', 
        success : function(interview, textStatus, xhr){   
        for(i = 0; i< interview.length; i++){   
                if(id_book == interview[i].id_book){  
                    $('#interview').append('\
                        <section id="ABC">\
                        <div class="container">\
                            <div class="row" id="interview">\
                                <div class="col-lg-8 ">\
                                    <h2><span  style="font-size: 60px">What '+authRef+' says</span></h2>\
                                    <p class="lead my-3">'+interview[i].content+'</p>\
                                    <p class="lead mb-0">'+authRef+'</p>\
                                </div>\
                            <div class="col-md-4 ">\
                                <a href=author.html?id='+authId+'><img id="photo" src="/assets/'+authCover+'" style="border-radius: 50%" alt="Image" class="img-fluid"></a>\
                            </div>\
                            <div class="row mb-2">\
                                <div class="col-md-6">\
                                </div>\
                                <div class="col-md-6">\
                                </div>\
                            </div>\
                        </section>\
                    ');                              
                } 
            }   
        } 
    }); 
}	


var fetchAllAuthors = function fetchAllAuthors(limit, offset) {
    //fetch all authors
    var params = {};
    if (limit) {
        params.limit = limit;
    }
    if (offset) {
        params.offset = offset;
    }
    var paramStr = jQuery.param(params);
    $.ajax({  
        url: apiURL+'/author?'+paramStr,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          console.log(data);
          $.each(data, function (index, author) {
            $('#main_authors').append('\
            <div class="col-12 col-md-6 col-lg-4 col-sm-12">\
                <a href="author.html?id='+author.id+'" class="item res">\
                    <img src="/assets/'+author.photo+'" style="padding:60px" alt="Image" class="img-fluid">\
                    <h3>'+author.name+'</h3>\
                </a>\
            </div>\
            ');
          });
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var fetchReviews = function fetchReviews(bookId) {
    //fetch all reviews of a book
    $('#book_reviews').empty();
    $.ajax({  
        url: apiURL+'/review?bookId='+bookId,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
            var starsBreakdown = [0, 0, 0, 0, 0];
            console.log(data);
            $.each(data, function (index, review) {
                var reviewElement = $('\
                    <div class="row">\
                        <div class="col-sm-3">\
                            <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" style="border-radius: 50%" class="img-rounded">\
                            <div class="review-block-name"><a href="#">'+review.username+'</a></div>\
                            <div class="review-block-date">'+review.date+'</div>\
                        </div>\
                        <div class="col-sm-9">\
                            <div class="review-block-rate" id="rateBlock">\
                            </div>\
                            <div class="review-block-title">'+review.title+'</div>\
                            <div class="review-block-description">'+review.content+'</div>\
                        </div>\
                    </div>\
                ');
                //render stars
                $('#book_reviews').append(reviewElement);
                for (var i = 0, acc = review.star; i < 5; i++) {
                    if (acc > 0) {
                        $(reviewElement).find('#rateBlock').append('\
                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">\
                            <span class="fa fa-star checked"></span>\
                        </button>\
                    ');
                    acc--;
                    } else {
                        $(reviewElement).find('#rateBlock').append('\
                        <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">\
                            <span class="fa fa-star checked"></span>\
                        </button>\
                    ');
                    }
                }
                //statistics
                starsBreakdown[review.star-1]++;
                //add separation line between reviews
                if (index < (data.length - 1)) {
                    $('#book_reviews').append('<hr/>');   
                }
            });
            if(data.length > 0) { 
                //generate statistics (change bar# width and pull# text)
                var starsPercentages = [];
                var acc = 0;
                for (var i = 0; i < 5; i++) {
                    if(starsBreakdown[i] > 0) {
                        acc += (i+1)*starsBreakdown[i];
                        starsPercentages[i]=(starsBreakdown[i]/data.length)*100;
                        star = i+1;
                        $('#bar'+star).width(starsPercentages[i].toFixed(0)+'%');
                        $('#pull'+star).text(starsBreakdown[i]);
                    }
                }
                var average = (acc/data.length).toFixed(1);
                $('#average').text(average);
                for (var i = 0, acc = average; i < 5; i++) {
                    if (acc > 0) {
                        $('#average_container').append('\
                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">\
                            <span class="fa fa-star checked"></span>\
                        </button>\
                    ');
                    acc--;
                    } else {
                        $('#average_container').append('\
                        <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">\
                            <span class="fa fa-star checked"></span>\
                        </button>\
                    ');
                    }
                }
            }
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }
    }); 
}

var fetchSingleAuthor = function fetchSingleAuthor(authorId) {
    $.ajax({  
        url: apiURL+'/author/'+authorId,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) { 
          //TODO: calc stars mean? (Ooof) 
          //TODO: add shadow around book cover?
          console.log(data);  
          document.title = data.name;
          $('#name').html(data.name);
          $('#breadcrumbr').html(data.name);
          $('#bio').html(data.bio);
          $('#photo').attr("src","/assets/"+data.photo);
          $('#authors').empty();
          $.each(data.authors, function (index, author) {
            $('#authors').append("<a href=\"#\">"+author.name+"</a>");
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

var fetchBooksOfAuthor = function fetchBooksOfAuthor(authorId) {
    $.ajax({  
        url: apiURL+'/books?authorId='+authorId,  
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
          $.each(data, function (index, book) {
            $('#featured_books').trigger('add.owl.carousel', ['\
            <div class="product">\
              <a href="shop-single.html?id='+book.id+'" class="item">\
                <img src="/assets/'+book.cover+'" style="padding: 20px" alt="Cover" class="img-fluid">\
                <div class="item-info carousel-caption">\
                  <h3>'+book.title+'</h3>\
                  <strong class="price">€'+(book.value).toFixed(2)+'</strong>\
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

var addBookReview = function addBookReview(bookId, title, content, star) {
    var review = {};
    review.id_book = parseInt(bookId);
    review.title = title;
    review.content = content;
    review.star = parseInt(star);
    $.ajax({
        url: apiURL+"/review",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(review),
        success: function(data, textStatus, jqXHR) {
            successAlert("All Good!",'Your review was inserted! <a href="javascript:window.location.reload(true)">Reload</a> the page to see it.');
            $('#review').trigger("reset");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                errorAlert("Whoops!", "You need to login to post reviews!");
                $('#review').trigger("reset");
            } else if (jqXHR.status == 401) {
                errorAlert("Whoops!", "You inserted invalid data, try again!");
                $('#review').trigger("reset");
            } else {
                errorAlert("Whoops!", "An error occurred, pleasy try again!");
                $('#review').trigger("reset");
            }
        }
    });
    return false;
}

// COOKIE UTILITIES

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}