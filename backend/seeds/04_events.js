
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event').del()
    .then(function () {
      // Inserts seed entries
      return knex('event').insert([
        {id: 1, id_book: 1, title: "The Hobbit preview", location: "Via Carlo Valvassori Peroni, 56, 20133 Milano MI", content: "An overview on the new written book"},
        {id: 2, id_book: 4, title: "I, Robot: the talk", location: "Edificio 11, Campus Bonardi, Via Andrea Maria Ampère, 2, 20131 Milano MI", content: "An overview on the new written book"},
        {id: 3, id_book: 4, title: "1984 in Orwell's memory", location: "Via Paolo Frisi, 2/4, 20129 Milano MI", content: "An overview on the new written book"},
        {id: 4, id_book: 6, title: "It, an horror story", location: "Edificio 11, Campus Bonardi, Via Andrea Maria Ampère, 2, 20131 Milano MI", content: "An overview on the new written book"},
        {id: 5, id_book: 9, title: "The story about a wizard", location: "Via Carlo Valvassori Peroni, 56, 20133 Milano MI", content: "An overview on the new written book"}
      ]);
    });
};
