
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event').del()
    .then(function () {
      // Inserts seed entries
      return knex('event').insert([
        {id: 1, id_book: 1, date: "06/08/2019, h. 18.00", title: "The Hobbit preview", location: "Via Carlo Valvassori Peroni, 56, 20133 Milano MI", content: "An overview on the new written book"},
        {id: 2, id_book: 4, date: "02/09/2019, h. 21.00", title: "I, Robot: the talk", location: "Edificio 11, Campus Bonardi, Via Andrea Maria Ampère, 2, 20131 Milano MI", content: "An overview on the new written book"},
        {id: 3, id_book: 5, date: "26/07/2019, h. 9.00", title: "1984 in Orwell's memory", location: "Via Paolo Frisi, 2/4, 20129 Milano MI", content: "An overview on the new written book"},
        {id: 4, id_book: 6, date: "27/02/2020, h. 17.30", title: "It, an horror story", location: "Edificio 11, Campus Bonardi, Via Andrea Maria Ampère, 2, 20131 Milano MI", content: "An overview on the new written book"},
        {id: 5, id_book: 9, date: "01/08/2019, h. 11.00", title: "The story about a wizard", location: "Via Carlo Valvassori Peroni, 56, 20133 Milano MI", content: "An overview on the new written book"}
      ]);
    });
};
