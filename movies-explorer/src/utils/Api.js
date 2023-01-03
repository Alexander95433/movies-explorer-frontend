class MoviesApi {
    constructor({host, headers}) {
        this._host = host;
        this._headers = headers;
    }

    _responseAnalysis(res) {
        if (res.ok ) { return res.json(); }
        return Promise.reject(`Что-то пошло не так  ${res.status}`)
    };

    getAllMovies() {
        return fetch(this._host, {
            headers: this._headers 
        }).then(res => this._responseAnalysis(res) )
    }


};

const moviesApi = new MoviesApi({
    host: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {'Content-Type': 'application/json; charset=utf-8' },
})

export {moviesApi};