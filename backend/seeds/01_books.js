
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('book').del()
    .then(function () {
      // Inserts seed entries
      return knex('book').insert([
        {
        id: 1,
        title: 'book1', 
        cover: 'cover_url_1',
        abstract: 'abstract1', 
        fact_sheet: 'factsheet1', 
        genre_id: '1',
        value: '11',
        stock: '10'},
        
        {
        id: 2,
        title: 'book2', 
        cover: 'cover_url_2',
        abstract: 'abstract2', 
        fact_sheet: 'factsheet2', 
        genre_id: '2',
        value: '22',
        stock: '20'},

        {
        id: 3,
        title: 'book3', 
        cover: 'cover_url_3',
        abstract: 'abstract3', 
        fact_sheet: 'factsheet3', 
        genre_id: '3',
        value: '33',
        stock: '30'}
      ]);
    });
};
