
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('author').del()
    .then(function () {
      // Inserts seed entries
      return knex('author').insert([
        {id: 1, name: 'J.R.R. Tolkien', bio: 'J.R.R. TOLKIEN (1892–1973) is the creator of Middle-earth and author of such classic and extraordinary works of fiction as The Hobbit, The Lord of the Rings, and The Silmarillion. His books have been translated into more than fifty languages and have sold many millions of copies worldwide.', photo: 'img/author/tolkien.jpg'},
        {id: 2, name: 'Isaac Asimov', bio: 'Isaac Asimov began his Foundation Series at the age of twenty-one, not realizing that it would one day be considered a cornerstone of science fiction. During his legendary career, Asimov penned over 470 books on subjects ranging from science to Shakespeare to history, though he was most loved for his award-winning science fiction sagas, which include the Robot, Empire, and Foundation series. Named a Grand Master of Science Fiction by the Science Fiction and Fantasy Writers of America, Asimov entertained and educated readers of all ages for close to five decades. He died, at the age of seventy-two, in April 1992.', photo: 'img/author/asimov.jpg'},
        {id: 3, name: 'George Orwell', bio: 'George Orwell (pseudonym for Eric Blair [1903-50]) was born in Bengal and educated at Eton; after service with the Indian Imperial Police in Burma, he returned to Europe to earn his living penning novels and essays. He was essentially a political writer who focused his attention on his own times, a man of intense feelings and intense hates. An opponent of totalitarianism, he served in the Loyalist forces in the Spanish Civil War. Besides his classic Animal Farm, his works include a novel based on his experiences as a colonial policeman, Burmese Days, two firsthand studies of poverty, Down and Out in Paris and London and The Road to Wigan Pier, an account of his experiences in the Spanish Civil War, Homage to Catalonia; and the extraordinary novel of political prophecy whose title became part of our language, 1984.', photo: 'img/author/orwell.jpg'},
        {id: 4, name: 'Stephen King', bio: 'Stephen King is the author of more than fifty books, all of them worldwide bestsellers. Among his most recent are 11/22/63; Full Dark, No Stars; Under the Dome; Just After Sunset; Duma Key; Lisey’s Story; Cell; and the concluding novels in the Dark Tower saga: Wolves of the Calla, Song of Susannah, and The Dark Tower. His acclaimed nonfiction book, On Writing, is also a bestseller. He was the recipient of the 2003 National Book Foundation Medal for Distinguished Contribution to American Letters, and in 2007, he received the Grand Master Award from the Mystery Writers of America. He lives in Maine with his wife, novelist Tabitha King.', photo: 'img/author/king.jpg'},
        {id: 5, name: 'J.K. Rowling', bio: "J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels. Loved by fans around the world, the series has sold over 500 million copies, been translated into over 80 languages, and made into eight blockbuster films. She has written three companion volumes in aid of charity: Quidditch Through the Ages and Fantastic Beasts and Where to Find Them (in aid of Comic Relief UK and Lumos), and The Tales of Beedle the Bard (in aid of Lumos), as well as a screenplay inspired by Fantastic Beasts and Where to Find Them, which marked the start of a five-film series to be written by the author. She has also collaborated on a stage play, Harry Potter and the Cursed Child Parts One and Two, which opened in London's West End in the summer of 2016 and on Broadway in the spring of 2018. In 2012 J.K. Rowling's digital company Pottermore was launched, where fans can enjoy news, features, and articles, as well as original content from J.K. Rowling. She is also the author of The Casual Vacancy, a novel for adult readers, and the Strike crime series, written under the pseudonym Robert Galbraith. She has received many awards and honors, including an OBE and Companion of Honour, France's Légion d'honneur, and the Hans Christian Andersen Award.", photo: 'img/author/rowling.jpg'},
        {id: 6, name: 'Robert Silverberg', bio: "Robert Silverberg (born January 15, 1935) is an American author and editor, best known for writing science fiction. He is a multiple winner of both Hugo and Nebula Awards, a member of the Science Fiction and Fantasy Hall of Fame, and a Grand Master of SF.[2][3][4] He has attended every Hugo Awards ceremony since the inaugural event in 1953.", photo: 'img/author/silverberg.jpg'},
        {id: 7, name: 'Jean-Michel Basquiat', bio: "Jean-Michel Basquiat (French: [ʒɑ̃ miʃɛl baskija]; December 22, 1960 – August 12, 1988) was an influential American artist of Haitian and Puerto Rican descent. Basquiat first achieved fame as part of SAMO, an informal graffiti duo who wrote enigmatic epigrams in the cultural hotbed of the Lower East Side of Manhattan during the late 1970s, where rap, punk, and street art coalesced into early hip-hop music culture. By the 1980s, his neo-expressionist paintings were being exhibited in galleries and museums internationally. The Whitney Museum of American Art held a retrospective of his art in 1992.", photo: 'img/author/basquiat.jpg'},
        {id: 8, name: 'Johannes Gutenberg', bio: "Johannes Gensfleisch zur Laden zum Gutenberg (/ˈɡuːtənbɜːrɡ/;[1] c. 1400 [2] – February 3, 1468) was a German blacksmith, goldsmith, inventor, printer, and publisher who introduced printing to Europe with the printing press. His introduction of mechanical movable type printing to Europe started the Printing Revolution and is regarded as a milestone of the second millennium, ushering in the modern period of human history.[3] It played a key role in the development of the Renaissance, Reformation, the Age of Enlightenment, and the scientific revolution and laid the material basis for the modern knowledge-based economy and the spread of learning to the masses.", photo: 'img/author/gutenberg.jpg'},
        {id: 9, name: 'Paul Duncan', bio: "Paul Andrew Duncan is a British actor. He was born in London in 1966. He studied acting at Morley Theatre School and the Atlantic Theatre Company in New York . He has also studied Fine Art at Chelsea School of Art. Duncan helped form a theatre company under the name Twice As Loud, in which he directed/produced/acted in a number of Sarah Kane plays after her death. After living for many years in New York he has recently returned to London where he continues to work in Film and on his Art.", photo: 'img/author/duncan.jpg'}
      ]);
    });
};