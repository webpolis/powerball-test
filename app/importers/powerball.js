let http = require('http');

export default class powerball {
    constructor() {
        this.data = {
            jackpot: null,
            winners: null
        };
    }

    init() {
        return new Promise((resolve, reject) => {
            this.data.jackpot = 1;
            this.data.winners = 2;

            resolve(this.data);
        });
    }
}
