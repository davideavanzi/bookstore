
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reservation').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservation').insert([
        {id: 1, amount: 1, id_book: 1, id_user: 1},
        {id: 2, amount: 2, id_book: 1, id_user: 2},
        {id: 3, amount: 2, id_book: 10, id_user: 3}
      ]);
    });
};
