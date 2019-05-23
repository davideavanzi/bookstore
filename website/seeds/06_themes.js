
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('theme').del()
    .then(function () {
      // Inserts seed entries
      return knex('theme').insert([
        {id: 1, name: 'friendship'},
        {id: 2, name: 'vendetta'},
        {id: 3, name: 'war'},
        {id: 4, name: 'love'},
        {id: 5, name: 'family'},
        {id: 6, name: 'childhood'},
        {id: 7, name: 'mistery'},
        {id: 8, name: 'adventure'},
        {id: 9, name: 'realism'},
        {id: 10, name: 'science'},
        {id: 11, name: 'magic'},
        {id: 12, name: 'future'},
        {id: 13, name: 'fear'}
      ]);
    });
};
