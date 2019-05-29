
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('book').del()
    .then(function () {
      // Inserts seed entries
      return knex('book').insert([
        {
        id: 1,
        title: 'The Hobbit', 
        cover: 'img/cover/the_hobbit.jpg',
        abstract: 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum.', 
        fact_sheet: 'A great modern classic and the prelude to The Lord of the Rings. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum. This charming pocket-sized edition contains the complete unabridged text and features the original cover illustration, painted by J.R.R. Tolkien himself. The perfect gift for little Hobbits everywhere!',
        genre_id: 10,
        value: 11,
        stock: 0},
        
        {
        id: 2,
        title: 'The Lord of the Rings', 
        cover: 'img/cover/the_lord_of_the_rings.jpg',
        abstract: "A young Hobbit known as Frodo has been thrown on an amazing adventure, when he is appointed the job of destroying the One Ring, which was created by the Dark Lord Sauron. He is assigned with three warriors including Gandelf, Aragorn, and Boromir. But it's not going to be an easy journey for the Fellowship of the Ring, on the ultimate quest to rid the Middle-earth of all evil.",
        fact_sheet: 'The Lord of the Rings, by J.R.R. Tolkien, tells the story of the War of the Ring in the fictional world of Middle-earth. The long novel--commonly published as three volumes and mistakenly called a trilogy centers around the magical One Ring, discovered by Bilbo Baggins in the earlier novel The Hobbit. Now, the free peoples of Middle-earth, such as Men, Elves, Dwarves, and Hobbits, must overcome the dark power of Sauron by destroying the Ring.', 
        genre_id: 10,
        value: 12.2,
        stock: 20},

        {
        id: 3,
        title: 'The Silmarillion', 
        cover: 'img/cover/the_silmarillon.jpg',
        abstract: "The Silmarillion comprises five parts. The first part, Ainulindalë, tells of the creation of Eä, the 'world that is'. Valaquenta, the second part, gives a description of the Valar and Maiar, the supernatural powers in Eä. The next section, Quenta Silmarillion, which forms the bulk of the collection, chronicles the history of the events before and during the First Age, including the wars over the Silmarils that gave the book its title. The fourth part, Akallabêth, relates the history of the Downfall of Númenor and its people, which takes place in the Second Age. The final part, Of the Rings of Power and the Third Age, is a brief account of the circumstances which led to and were presented in The Lord of the Rings. The five parts were initially separate works, but it was the elder Tolkien's express wish that they be published together. Because J. R. R. Tolkien died before he finished revising the various legends, Christopher gathered material from his father's older writings to fill out the book. In a few cases, this meant that he had to devise completely new material in order to resolve gaps and inconsistencies in the narrative.", 
        fact_sheet: 'The Silmarillion is Tolkien’s first book and his last. Long preceding in its origins The Lord of the Rings, it is the story of the First Age of Tolkien’s world, the ancient drama to which characters in The Lord of the Rings look back, and in which some of them, such as Elrond and Galadriel, took part. The Silmarillion was begun in 1917, and Tolkien worked on it, changed it, and enlarged it throughout his life. Edited by his son, Christopher Tolkien, the book finally appeared four years after the author’s death.', 
        genre_id: 10,
        value: 12,
        stock: 1},
        {
        id: 4,
        title: 'I, Robot', 
        cover: 'img/cover/i_robot.jpg',
        abstract: 'The three laws of Robotics: 1) A robot may not injure a human being or, through inaction, allow a human being to come to harm. 2) A robot must obey orders given to it by human beings except where such orders would conflict with the First Law. 3) A robot must protect its own existence as long as such protection does not conflict with the First or Second Law. With these three, simple directives, Isaac Asimov changed our perception of robots forever when he formulated the laws governing their behavior. In I, Robot, Asimov chronicles the development of the robot through a series of interlinked stories: from its primitive origins in the present to its ultimate perfection in the not-so-distant future—a future in which humanity itself may be rendered obsolete.', 
        fact_sheet: "Here are stories of robots gone mad, of mind-read robots, and robots with a sense of humor. Of robot politicians, and robots who secretly run the world—all told with the dramatic blend of science fact and science fiction that has become Asmiov's trademark.", 
        genre_id: 21,
        value: 13.3,
        stock: 12},
        {
        id: 5,
        title: '1984', 
        cover: 'img/cover/1984.jpg',
        abstract: 'Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...', 
        fact_sheet: 'Written in 1948, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever.', 
        genre_id: 23,
        value: 7.3,
        stock: 23},
        {
        id: 6,
        title: 'It', 
        cover: 'img/cover/it.jpg',
        abstract: 'Stephen King’s terrifying, classic #1 New York Times bestseller, “a landmark in American literature” (Chicago Sun-Times)—about seven adults who return to their hometown to confront a nightmare they had first stumbled on as teenagers…an evil without a name: It.', 
        fact_sheet: 'Welcome to Derry, Maine. It’s a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real. They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But the promise they made twenty-eight years ago calls them reunite in the same place where, as teenagers, they battled an evil creature that preyed on the city’s children. Now, children are being murdered again and their repressed memories of that terrifying summer return as they prepare to once again battle the monster lurking in Derry’s sewers.', 
        genre_id: 12,
        value: 8.5,
        stock: 23},
        {
        id: 7,
        title: 'The Shining', 
        cover: 'img/cover/the_sshining.jpg',
        abstract: 'Signing a contract, Jack Torrance, a normal writer and former teacher agrees to take care of a hotel which has a long, violent past that puts everyone in the hotel in a nervous situation. While Jack slowly gets more violent and angry of his life, his son, Danny, tries to use a special talent, the "Shining", to inform the people outside about whatever that is going on in the hotel.', 
        fact_sheet: "The Shining is a horror novel by American author Stephen King. Published in 1977, it is King's third published novel and first hardback bestseller: the success of the book firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Townplace Suites in Williamsport, PA in 1974 and his recovery from alcoholism. The novel was followed by a sequel, Doctor Sleep, published in 2013.", 
        genre_id: 12,
        value: 6.4,
        stock: 2},
        {
        id: 8,
        title: "Harry Potter and the Philosopher's stone", 
        cover: 'img/cover/harry_potter_and_the_philosopher_stone.jpg',
        abstract: "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright. From the surprising way he is greeted by a lovable giant, to the unique curriculum and colorful faculty at his unusual school, Harry finds himself drawn deep inside a mystical world he never knew existed and closer to his own noble destiny.", 
        fact_sheet: "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.", 
        genre_id: 10,
        value: 7.9,
        stock: 3},
        {
        id: 9,
        title: 'Harry Potter and the Chamber of Secrets', 
        cover: 'img/cover/harry_potter_and_the_chamber_of_secrets.jpg',
        abstract: "The Dursleys were so mean that hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike.", 
        fact_sheet: "Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school's corridors warn that the 'Chamber of Secrets' has been opened and that the 'heir of Slytherin' would kill all pupils who do not come from all-magical families. These threats are found after attacks which leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks.", 
        genre_id: 10,
        value: 6.3,
        stock: 45},
        {
        id: 10,
        title: 'Child of time', 
        cover: 'img/cover/child_of_time.jpg',
        abstract: "Based on an Asimov short story, 'The Ugly Little Boy'. A children's nurse is hired as part of a scientific project aimed at bringing a living being from the past to the present. A four-year-old Neanderthal boy is snatched from his home and hurled 40,000 years into a terrifying future.",
        fact_sheet: "Snatching a child from the past, a four year old Neanderthal, posed a problem for his carers. At first his nurse thinks him an animal, an ugly sub-human. Then she grows to love him.",
        genre_id: 21,
        value: 9.1,
        stock: 0}
      ]);
    });
};
