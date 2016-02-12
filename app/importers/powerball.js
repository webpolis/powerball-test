const http = require('http');
const zlib = require('zlib');
const cheerio = require('cheerio');
const pbConfig = require('../config/powerball');
const numeral = require('numeral');

export default class powerball {
    constructor() {
        this.data = {
            jackpot: null,
            winners: null
        };
    }

    fetch() {
        let self = this;

        // fetch promise: retrieve data from powerball site
        const fetcher = (type) => {
            return new Promise((resolve, reject) => {
                http.get({
                    hostname: 'www.powerball.com',
                    path: pbConfig.urls[type],
                    headers: {
                        "accept-charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
                        "accept-language": "en-US,en;q=0.8",
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
                        "accept-encoding": "gzip,deflate",
                    }
                }, (res) => {
                    if (res.statusCode !== 200) {
                        reject('Response not 200');
                    } else {
                        const encoding = res.headers['content-encoding'];
                        let comp = null;
                        let body = '';

                        if (encoding === 'gzip') {
                            comp = zlib.createGunzip();
                            res.pipe(comp);
                        } else if (encoding === 'deflate') {
                            comp = zlib.createInflate();
                            res.pipe(comp);
                        } else {
                            comp = res;
                        }

                        comp.on('data', (data) => {
                            body += data.toString();
                        });

                        comp.on('end', () => {
                            resolve(this.parse(type, body));
                        });
                    }
                }).on('error', (err) => reject(err.message));
            });
        };

        // fetch jackpot & winners data
        const all = ['jackpot', 'winners'].map(fetcher);

        return Promise.all(all);
    }

    parse(type, data) {
        let value = null;

        switch (type) {
            case 'jackpot':
                // seek DOM for jackpot value
                const $ = cheerio.load(data);
                value = $($('table', '.content').first().find('tr')[1]).find('td:last-child').text().trim();

                // format number
                value = value.replace(/\s{1,}/g, '').replace(/illion|\$/gi, '').toLowerCase();
                value = numeral().unformat(value);
                break;
            case 'winners':
                value = data.split('\n')[1].split(/\s{1,}/).slice(1).filter(Boolean);
                break;
        }

        return value;
    }
}
