
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event').del()
    .then(function () {
      // Inserts seed entries
      return knex('event').insert([
        {id: 1, id_book: 1, datetime: "20190806 18:00:00", title: "The Hobbit preview", location: "Via Carlo Valvassori Peroni, 56, 20133 Milano MI", content: "Bilbo, my friend"},
        {id: 2, id_book: 4, datetime: "20190904 21:30:00", title: "I, Robot: the talk", location: "Edificio 11, Campus Bonardi, Via Andrea Maria Ampère, 2, 20131 Milano MI", content: "A jump in the future"},
        {id: 3, id_book: 5, datetime: "20190721 11:00:00", title: "1984 in Orwell's memory", location: "Via Paolo Frisi, 2/4, 20129 Milano MI", content: "The Big Brother story"},
        {id: 4, id_book: 6, datetime: "20190706 10:15:00", title: "It, an horror story", location: "Edificio 11, Campus Bonardi, Via Andrea Maria Ampère, 2, 20131 Milano MI", content: "Do not open that door! Or in this case do?"},
        {id: 5, id_book: 9, datetime: "20190806 20:00:00", title: "The story about a wizard", location: "Via Carlo Valvassori Peroni, 56, 20133 Milano MI", content: "The real story of Harry Potter"},
        {id: 6, id_book: 13, datetime: "20190630 12:00:00", title: "An overview on Gutenberg", location: "Edificio 11, Campus Bonardi, Via Andrea Maria Ampère, 2, 20131 Milano MI", content: "The holy bible story"},
        {id: 7, id_book: 11, datetime: "20190506 9:30:00", title: "I love Art", location: "Via Carlo Valvassori Peroni, 56, 20133 Milano MI", content: "Art for art's sake"}
      ]);
    });
};
