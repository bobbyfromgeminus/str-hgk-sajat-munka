(() => {
    const count = db.movies.find().count();
    const pages = Math.ceil( count / 3 );

    for (let i = 0; i < pages; i++) {
        db.movies.find()
            .skip(i*3)
            .limit(3)
            .forEach(item => {
                print(`${item.title} : ${item.category.toLowerCase()} movie`);
            });
        if (i < pages - 1) {
            print('--page over--');
        }
    }
})();