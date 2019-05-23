
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart_book').del()
    .then(function () {
      // Inserts seed entries
      return knex('cart_book').insert([
        {id_book: 2, id_cart: 1, amount: 2},
        {id_book: 3, id_cart: 2, amount: 1},
        {id_book: 4, id_cart: 1, amount: 1}
      ]);
    });
};
