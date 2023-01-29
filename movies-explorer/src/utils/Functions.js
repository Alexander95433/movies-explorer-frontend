
export function formaTtime(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
};

export function movieSearchHandler(allMovies, query) {
    if (!allMovies) { return console.log('Не получил массив с карточками фильмов') };
    const searchResult = [...allMovies];
    const filtered = searchResult.filter((item) =>
        item.nameRU.toLowerCase().includes(query.toLowerCase()) || item.nameEN.toLowerCase().includes(query.toLowerCase()));
    return filtered
}

export function searchFilter(array,  short) {
    if (!array) { return []; }
    let filtered = [...array];
    if (short) { return filtered.filter((element) => element.duration <= 40); }
    return filtered;
}


export function deleteSavedFilmsFromLocalStorege(data) {
    // debugger
    let savedMoviess = JSON.parse(localStorage.getItem('savedMovies'));
    let index = {}
    for (let i = 0; i < savedMoviess.length; i += 1) {
        let movie = savedMoviess[i];
        if (movie.nameRU === data.card.nameRU && movie.description === data.card.description) { index = i; }
        // debugger
    }
    savedMoviess.splice(index, 1);
    localStorage.setItem('savedMovies', JSON.stringify(savedMoviess))
    // debugger
}


