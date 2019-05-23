
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('review').del()
    .then(function () {
      // Inserts seed entries
      return knex('review').insert([
        {id: 1, star: 1, title: 'Very Bad', content: "I very dislike this book", id_book: 1, id_user: 1},
        {id: 2, star: 2, title: 'Bad', content: "I dislike this book", id_book: 2, id_user: 2},
        {id: 3, star: 3, title: 'Standard', content: "This book is meh", id_book: 3, id_user: 1},
        {id: 4, star: 4, title: 'Awesome', content: "I like this book", id_book: 4, id_user: 2},
        {id: 5, star: 5, title: 'Very awesome', content: "I very like this book", id_book: 5, id_user: 1},
      ]);
    });
};
