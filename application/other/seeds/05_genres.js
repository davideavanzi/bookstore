
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('genre').del()
    .then(function () {
      // Inserts seed entries
      return knex('genre').insert([
        {id: 1, name: 'Action and Adventure'},
        {id: 2, name: 'Anthology'},
        {id: 3, name: 'Classic'},
        {id: 4, name: 'Comic and Graphic Novel'},
        {id: 5, name: 'Crime and Detective'},
        {id: 6, name: 'Drama'},
        {id: 7, name: 'Fable'},
        {id: 8, name: 'Fairy Table'},
        {id: 9, name: 'Fan-Fiction'},
        {id: 10, name: 'Fantasy'},
        {id: 11, name: 'Historical Fction'},
        {id: 12, name: 'Horror'},
        {id: 13, name: 'Humor'},
        {id: 14, name: 'Legend'},
        {id: 15, name: 'Magical Realism'},
        {id: 16, name: 'Mystery'},
        {id: 17, name: 'Mythology'},
        {id: 18, name: 'Realistic Fiction'},
        {id: 19, name: 'Romance'},
        {id: 21, name: 'Science Fiction'},
        {id: 22, name: 'Short Story'},
        {id: 23, name: 'Thriller'},
      ]);
    });
};
