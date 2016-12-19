var Book = (function() {
    // private static attributes
    var numOfBooks = 0

    // private static method
    function checkIsbn(isbn) {}

    // return the constructor
    return function(newIsbn, newTitle, newAuthor) {
        // private attributes
        var isbn, title, author

        // privileged methods
        this.getIsbn = function() {
            return isbn
        }

        this.setIsbn = function(newIsbn) {
            if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.')
            isbn = newIsbn
        }
        
        this.getTitle = function() {
            return title
        }

        this.setTitle = function(newTitle) {
            title = newTitle || 'No title specified'
        }

        this.getAuthor = function() {
            return author
        }

        this.setAuthor = function(newAuthor) {
            author = newAuthor || 'No author specified'
        }

        // constructor code
        numOfBooks++

        if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be created.')

        this.setIsbn(newIsbn)
        this.setTitle(newTitle)
        this.setAuthor(newAuthor)
    }
})()

// Public static method
Book.convertToTitleCase = function(inputString) {}

// Public, non-privileged methods
Book.prototype = {
    display: function() {}
}