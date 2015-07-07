function createXHR() {
    var xhr = null;
    if(typeof XMLHttpRequest != 'undefined') {
        xhr = new XMLHttpRequest();
        createXHR = function() {
            return new XMLHttpRequest();
        }
    } else {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
            createXHR = function() {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
        } catch(e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
                createXHR = function() {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            } catch(e) {
                createXHR = function() {
                    return null;
                }
            }
        }
    }
    return xhr;
}