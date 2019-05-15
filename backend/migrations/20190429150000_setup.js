
exports.up = function(knex, Promise) {
    return Promise.all([
        //Authors table
        knex.schema
        .hasTable('author')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('author', function (table) {
                        table.increments('id').primary();
                        table.string("name");
                        table.text("bio");
                        table.string("photo");
                    })
                    .then(console.log('created author table'));
                }
            }),
        //Books table
        knex.schema
        .hasTable('book')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('book', function (table) {
                        table.increments('id').primary();
                        table.string("title");
                        table.string("cover");
                        table.text("abstract");
                        table.text("fact_sheet");
                        table.integer("genre_id");
                        table.float("value");
                        table.integer("stock");
                    })
                    .then(console.log('created book table'));
                }
            }),

        //Users table
        knex.schema
        .hasTable('users')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('users', function (table) {
                        table.increments('id').primary();
                        table.string("firstName");
                        table.string("lastName");
                        table.string("email");
                        table.string("phone");
                        table.string("password"); 
                        table.string("token");
                    })
                    .then(console.log('created users table'));
                }
            }),
        
        //Carts table ( must be created after users )
        knex.schema
        .hasTable('cart')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('cart', function (table) {
                        //id is foreign key from user's id, on user delete related cart is deleted too.
                        table.integer('id').unsigned();
                        table.foreign('id').references('id').inTable('users').onDelete('CASCADE');
                    })
                    .then(console.log('created cart table'));
                }
            }),
 
        //Events table
        knex.schema
        .hasTable('event')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('event', function (table) {
                        table.increments('id').primary();
                        table.string("title");
                        table.integer("id_book");
                        table.string("location");
                        table.text("content");
                    })
                    .then(console.log('created event table'));
                }
            }),
        //Genres table
        knex.schema
        .hasTable('genre')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('genre', function (table) {
                        table.increments('id').primary();
                        table.string("name");
                    })
                    .then(console.log('created genre table'));
                }
            }),
        //Interviews table
        knex.schema
        .hasTable('interview')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('interview', function (table) {
                        table.increments('id').primary();
                        table.string("title");
                        table.text("content");
                        table.string("interviewer");
                        table.integer("id_book");
                    })
                    .then(console.log('created interview table'));
                }
            }),
            
        //Reservations table
        knex.schema
        .hasTable('reservation')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('reservation', function (table) {
                        table.increments('id').primary();
                        table.integer("amount");
                        table.integer("id_book");
                        table.integer("id_user");
                        table.date("date");
                    })
                    .then(console.log('created reservation table'));
                }
            }),

        //Reviews table
        knex.schema
        .hasTable('review')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('review', function (table) {
                        table.increments('id').primary();
                        table.integer("star");
                        table.string("title");
                        table.text("content");
                        table.integer("id_book");
                        table.integer("id_user");
                    })
                    .then(console.log('created review table'));
                }
            }),

        //Themes table
        knex.schema
        .hasTable('theme')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('theme', function (table) {
                        table.increments('id').primary();
                        table.string("name");
                    })
                    .then(console.log('created theme table'));
                }
            }),

        //Book-Author relation table
        knex.schema
        .hasTable('book_author')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('book_author', function (table) {
                        table.integer("id_book");
                        table.integer("id_author");
                    })
                    .then(console.log('created book_author table'));
                }
            }),

        //Theme-Book relation table
        knex.schema
        .hasTable('theme_book')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('theme_book', function (table) {
                        table.integer("id_book");
                        table.integer("id_theme");
                    })
                    .then(console.log('created theme_book table'));
                }
            }),

        //Cart-book relation table
        knex.schema
        .hasTable('cart_book')
            .then(function (exists) {
                if (!exists) {
                return knex
                    .schema
                    .createTable('cart_book', function (table) {
                        table.integer("id_book");
                        table.integer("id_cart");
                        table.integer("amount");
                        table.date("date");
                    })
                    .then(console.log('created cart_book table'));
                }
            }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('author').then(console.log('deleted author table')),
        knex.schema.dropTable('book').then(console.log('deleted book table')),
        knex.schema.dropTable('cart').then(console.log('deleted cart table')), //must be deleted before users
        knex.schema.dropTable('event').then(console.log('deleted event table')),
        knex.schema.dropTable('genre').then(console.log('deleted genre table')),
        knex.schema.dropTable('interview').then(console.log('deleted interview table')),
        knex.schema.dropTable('reservation').then(console.log('deleted reservation table')),
        knex.schema.dropTable('review').then(console.log('deleted review table')),
        knex.schema.dropTable('theme').then(console.log('deleted theme table')),
        knex.schema.dropTable('users').then(console.log('deleted users table')),
        knex.schema.dropTable('book_author').then(console.log('deleted book_author table')),
        knex.schema.dropTable('theme_book').then(console.log('deleted theme_book table')),
        knex.schema.dropTable('cart_book').then(console.log('deleted cart_book table'))
      ]);
};
