
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('theme_book').del()
    .then(function () {
      // Inserts seed entries
      return knex('theme_book').insert([
        {id_book: 1, id_theme: 8},
        {id_book: 1, id_theme: 11},
        {id_book: 1, id_theme: 1},
        {id_book: 2, id_theme: 3},
        {id_book: 2, id_theme: 1},
        {id_book: 2, id_theme: 8},
        {id_book: 2, id_theme: 11},
        {id_book: 3, id_theme: 11},
        {id_book: 4, id_theme: 3},
        {id_book: 4, id_theme: 9},
        {id_book: 4, id_theme: 10},
        {id_book: 4, id_theme: 12},
        {id_book: 5, id_theme: 4},
        {id_book: 5, id_theme: 7},
        {id_book: 5, id_theme: 9},
        {id_book: 5, id_theme: 12},
        {id_book: 6, id_theme: 13},
        {id_book: 6, id_theme: 7},
        {id_book: 7, id_theme: 7},
        {id_book: 7, id_theme: 13},
        {id_book: 8, id_theme: 1},
        {id_book: 8, id_theme: 6},
        {id_book: 8, id_theme: 8},
        {id_book: 8, id_theme: 11},
        {id_book: 9, id_theme: 1},
        {id_book: 9, id_theme: 6},
        {id_book: 9, id_theme: 8},
        {id_book: 9, id_theme: 11},
        {id_book: 10, id_theme: 9},
        {id_book: 10, id_theme: 12},
        {id_book: 11, id_theme: 14},
        {id_book: 12, id_theme: 3},
        {id_book: 12, id_theme: 8},
        {id_book: 13, id_theme: 15}
      ]);
    });
};
