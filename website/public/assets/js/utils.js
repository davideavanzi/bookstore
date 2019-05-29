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