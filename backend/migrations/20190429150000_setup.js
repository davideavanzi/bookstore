
exports.up = function(knex, Promise) {
    return Promise.all([
        //Authors table
        knex.schema.table('author', function(table){
            table.increments();
            table.string("name");
            table.text("bio");
            table.string("photo");
        }),
        //Books table
        knex.schema.table('book', function(table){
            table.increments(); 
            table.string("title");
            table.string("cover");
            table.text("abstract");
            table.text("fact_sheet");
            table.integer("genre_id");
            table.float("value");
            table.integer("stock");
        }),
        //Carts table
        knex.schema.table('cart', function(table){
            table.increments(); 
            table.date("date"); 
            table.integer("user_id");
        }),
        //Events table
        knex.schema.table('event', function(table){
            table.increments(); 
            table.string("title");
            table.integer("id_book");
        }),
        //Genres table
        knex.schema.table('genre', function(table){
            table.increments();
            table.string("name");
        }),
        //Interviews table
        knex.schema.table('interview', function(table){
            table.increments();
            table.string("title");
            table.text("content");
            table.string("interviewer");
            table.integer("book_id");
        }),
        //Reservations table
        knex.schema.table('reservation', function(table){
            table.increments();
            table.integer("amount");
            table.integer("book_id");
            table.integer("user_id");
        }),
        //Reviews table
        knex.schema.table('review', function(table){
            table.increments();
            table.integer("star");
            table.string("title");
            table.text("content");
            table.integer("id_user");
        }),
        //Themes table
        knex.schema.table('theme', function(table){
            table.increments();
            table.string("name");
        }),
        //Users table
        knex.schema.table('users', function(table){
            table.increments();
            table.string("name");
            table.string("email");
            table.string("phone");
            table.string("address");
            table.string("password");
        }),
        //Book-Author relation table
        knex.schema.table('book_author', function(table){
            table.integer("id_book");
            table.integer("id_author");
        }),
        //Theme-Book relation table
        knex.schema.table('theme_book', function(table){
            table.integer("id_book");
            table.integer("id_theme");
        }),
        //Cart-book relation table
        knex.schema.table('cart_book', function(table){
            table.integer("id_book");
            table.integer("id_cart");
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('author'),
        knex.schema.dropTable('book'),
        knex.schema.dropTable('cart'),
        knex.schema.dropTable('event'),
        knex.schema.dropTable('genre'),
        knex.schema.dropTable('interview'),
        knex.schema.dropTable('reservation'),
        knex.schema.dropTable('review'),
        knex.schema.dropTable('theme'),
        knex.schema.dropTable('users'),
        knex.schema.dropTable('book_author'),
        knex.schema.dropTable('theme_book'),
        knex.schema.dropTable('cart_book')
      ]);
};
