
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstName: 'Davide', lastName: "Avanzi", email: "davide@avanzi.dev", password: "$2b$10$AfJFMMPyjbCAXtUddG8ab.cWbK1jpAAnHERmy9gks6XuQy.jHklcu"},
        {firstName: 'Fabrizio', lastName: "Carsenzuola", email: "info@fcarsenzuola.it", password: "$2b$10$AfJFMMPyjbCAXtUddG8ab.cWbK1jpAAnHERmy9gks6XuQy.jHklcu"},
        {firstName: 'Michele', lastName: "Vario", email: "mymail.vario@gmail.com", password: "$2b$10$b99HH5NutSn74FNPknZgKOXsmNARsq8bshRT.MW3..JMTQirZ6dHy", address: "Via Primo Levi, Milano", phone: "3345645645", zip:"21050"}
      ]);
    });
};
