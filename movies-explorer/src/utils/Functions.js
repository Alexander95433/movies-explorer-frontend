export function formaTtime(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
};

export function movieSearchHandler(allMovies, query) {
    if(!allMovies) {return console.log('Не получил массив с карточками фильмов')};
    const searchResult = [...allMovies];
    const filtered = searchResult.filter((item) => 
    item.nameRU.toLowerCase().includes(query.toLowerCase()) || item.nameEN.toLowerCase().includes(query.toLowerCase()));
    return filtered
    
}

