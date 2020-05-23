const https = require('https');

const {
    env: { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN },
} = require('process');

module.exports = {
    name: 'netlify-build-plugin-pushover',
    async onSuccess() {
        console.log('Hello world from onSuccess event!');
    },
    async onError() {
        console.log('Hello world from onError event!');
    },
    async onEnd(props) {
        console.log(JSON.stringify(props, null, 4));
        console.log('Hello world from onEnd event!');
    },
};
