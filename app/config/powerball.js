const powerball = {
    urls: {
        jackpot: '/pb_home.asp',
        winners: '/powerball/winnums-text.txt'
    },
    cache: {
        jackpot: '1 hour',
        winners: '1 day',
        all: '1 hour'
    }
};

module.exports = powerball;
