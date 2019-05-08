
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('author').del()
    .then(function () {
      // Inserts seed entries
      return knex('author').insert([
        {id: 1, name: 'Author1', bio: 'bio 1', photo: 'picUrl1'},
        {id: 2, name: 'Author2', bio: 'bio 2', photo: 'picUrl2'},
        {id: 3, name: 'Author3', bio: 'bio 3', photo: 'picUrl3'},
        {id: 4, name: 'Author4', bio: 'bio 4', photo: 'picUrl4'},
      ]);
    });
};
