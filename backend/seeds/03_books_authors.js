
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('book_author').del()
    .then(function () {
      // Inserts seed entries
      return knex('book_author').insert([
        {id_book: 1, id_author: 1},
        {id_book: 2, id_author: 1},
        {id_book: 3, id_author: 1},
        {id_book: 4, id_author: 2},
        {id_book: 5, id_author: 3},
        {id_book: 6, id_author: 4},
        {id_book: 7, id_author: 4},
        {id_book: 8, id_author: 5},
        {id_book: 9, id_author: 5},
        {id_book: 10, id_author: 2},
        {id_book: 10, id_author: 6},
      ]);
    });
};
