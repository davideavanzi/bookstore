
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('review').del()
    .then(function () {
      // Inserts seed entries
      return knex('review').insert([
        {star: 3, date: "June 06, 2019", title: 'Nice', content: "This was a fun, easy read with many twist and turns. I enjoyed it a lot!", id_book: 1, id_user: 1},
        {star: 1, date: "May 02, 2019", title: 'Bad', content: "This book was very poorly written with countless generic descriptions. It was full of typographical and grammar errors that took me out of the moment. The cover design and page layout were bad.", id_book: 2, id_user: 2},
        {star: 2, date: "April 13, 2019", title: 'Boring', content: "was a slow-moving, go-nowhere story that I rushed to finish. It felt like work to read.", id_book: 3, id_user: 1},
        {star: 4, date: "April 23, 2019", title: 'Awesome', content: "I absolutely love this book. The plot flowed nicely, and the characters were beautifully written. Can’t wait to read more stories by this great author!", id_book: 4, id_user: 2},
        {star: 5, date: "May 09, 2019", title: 'Superb', content: "The mark of a truly good story is that it is capable of invoking emotion well after the last chapter is finished. A tremendous amount of talent and polish went into writing this story I definitely put this one near the top of my favorites in this genre.", id_book: 5, id_user: 1},
        {star: 3, date: "February 13, 2019", title: 'Could have been better', content: "There wasn't enough time developing the characters themselves, leaving them difficult to root for. Yet, I sympathized with them, even when they conflicted with one another and the plot.", id_book: 3, id_user: 1},
        {star: 2, date: "May 20, 2019", title: 'Not so good', content: "The characters were not in sync with the plot and took me out of the moment. There didn't seem to be a larger goal, and the conclusion was not satisfying.", id_book: 4, id_user: 2},
        {star: 5, date: "May 11, 2019", title: 'Fantastic', content: "The dynamic of the main characters is heartwarming. The story is imaginative and fast-paced. I felt like the scenery and settings came alive. I would recommend it to anyone.", id_book: 5, id_user: 2},
        {star: 4, date: "June 04, 2019", title: 'Light read', content: "Take this to the beach with you or read it with the lights out at night. I enjoyed it so much I ordered another of the authors books.", id_book: 5, id_user: 2},
        {star: 3, date: "March 15, 2019", title: 'Meh', content: "The characters were two dimensional, generic, and forgettable. I struggled to relate to them, or care what happened to them, but they didn't get in the way of the story.", id_book: 6, id_user: 1},
        {star: 3, date: "March 02, 2019", title: 'Average', content: "This book was such a special read. The writing was occasionally good, with a few genuinely humourous moments and some highly quotable lines. Nothing was resolved at the ending of it. It had so much potential but ultimately let me down.", id_book: 7, id_user: 2},
        {star: 5, date: "April 24, 2019", title: 'Recommended', content: "This was a really entertaining book, I’d highly recommend it. The characters were believable, the plot was interesting. Five stars!", id_book: 8, id_user: 1},
        {star: 2, date: "May 28, 2019", title: 'Not recommended', content: "This book was too simple and naive. I often got bored and had to force myself to keep reading. When the author did describe something, it was bland and lazy, using cliche-ridden, dumbed down prose. It was a poor example of the genre. It was such a special read. The writing was occasionally good, with a few genuinely humourous moments and some highly quotable lines. Nothing was resolved at the ending of it. It had so much potential but ultimately let me down.", id_book: 9, id_user: 2},
        {star: 2, date: "February 14, 2019", title: 'Pointless', content: "The settings in This book were difficult to visualise, and there wasn't much world-building. Action scenes were hard to follow and lacked purpose.", id_book: 10, id_user: 1},
        {star: 1, date: "April 05, 2019", title: 'Poor read', content: "The prose was awkward. The descriptions were sparse. When the author did describe something, it was bland and lazy, using cliche-ridden, dumbed down prose. There were many typographical and grammar errors that took me out of the moment, and the cover design and page layout were poor.", id_book: 3, id_user: 2},
        {star: 5, date: "March 10, 2019", title: 'Very intresting', content: "This book kept me interested until the end.This book was a very good and interesting read. This book had true potential. If you want engaging material, then look no further.", id_book: 6, id_user: 1},
        {star: 4, date: "April 13, 2019", title: 'Promising', content: "This book was well written and engaging.This book evoked emotion.The story was beautifully written, with a consistent style and tone, and efficiency of description that didn't slow the pace.", id_book: 9, id_user: 1},
        {star: 4, date: "May 21, 2019", title: 'A good example of the genre', content: "This book was original, and well written. An excellent addition to the genre.This book had standard tropes delivered with a smooth writing style", id_book: 2, id_user: 2},
        {star: 2, date: "April 13, 2019", title: 'Unresolving', content: "Most of the time it felt like characters were just explaining things to each other for the whole book - meanwhile, not much was going on in terms of plot. Each scene lead toward a larger goal, but the ending left some questions unanswered. This book seems to be set up for a sequel, and didn't resolve the current plot.", id_book: 8, id_user: 2},
        
      ]);
    });
};
