/* global window, document, fetch, Headers, Request */

// import { Schema, arrayOf, normalize } from 'normalizr';
// import { camelizeKeys } from 'humps';

import Cookie from 'cookie';
import Qs from 'qs';

export default class Api {
    static fetch(url, options = {}) {

        const cookies = Cookie.parse(document.cookie);

        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        if (cookies.crumb) {
            headers.append('X-CSRF-Token', cookies.crumb);
        }
        options.headers = headers;

        if (options.query) {
            url += '?' + Qs.stringify(options.query);
        }

        if (options.body) {
            options.body = JSON.stringify(options.body);
        }

        options.credentials = 'same-origin';

        const request = new Request(url, options);

        return new Promise((resolve, reject) => {

            fetch(request)
                .then((response) => {

                    if (response.headers.has('x-auth-required')) {
                        let returnUrl = window.location.pathname;
                        if (window.location.search.length > 0) {
                            returnUrl += window.location.search;
                        }
                        returnUrl = encodeURIComponent(returnUrl);

                        window.location.href = `/login?returnUrl=${returnUrl}`;
                        return;
                    }
                    return resolve(response.json());
                })
                .catch((error) => {

                    return reject(error.message);
                });
        });
    }
    static get(url, options) {

        return Api.fetch(url, { ...options, method: 'GET' });
    }
    static post(url, options) {

        return Api.fetch(url, { ...options, method: 'POST' });
    }
    static put(url, options) {

        return Api.fetch(url, { ...options, method: 'PUT' });
    }
    static delete(url, options) {

        return Api.fetch(url, { ...options, method: 'DELETE' });
    }
}


if (global.window) {
    window.Api = Api;
}
