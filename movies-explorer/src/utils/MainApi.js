class MainApi {
    constructor({ host, headers }) {
        this._host = host;
        this._headers = headers;
    }

    _responseAnalysis(res) {
        if (res.ok) { return res.json(); }
        return Promise.reject(`Что-то пошло не так  ${res.status}`)
    };

    _request(data) {
        const config = {
            method: data.methodName,
            headers: {
                "Content-Type": "application/json",
                 ...(!!data.token && { Authorization: `Bearer ${data.token}` }),
            },
            ...(!!data.body && { body: JSON.stringify(data.body)}),
            credentials: 'include',
        };
        return fetch(`${this._host}${data.endpoint}`, config)
            .then(res => this._responseAnalysis(res))
    }

    register(data) {
        return this._request(data)
    };

    authorization(data) {
        return this._request(data)
    };

    checkToken(data) {
        return this._request(data)
    };

    accountLogout(data) {
        return this._request(data)
    };

    detUserInfo(data) {
        return this._request(data)
    }

    patchUserInfo(data) {
        return this._request(data)
    }

    getSavedMovies(data) {
        return this._request(data)
    }
    
    saveMovies(data) {
        return this._request(data)
    }
    deleteMovies(data) {
        return this._request(data)
    }



};
  

const mainApi = new MainApi({
    host: 'http://localhost:4000/',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
})

export default mainApi;