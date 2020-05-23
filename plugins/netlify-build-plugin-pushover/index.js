const axios = require('axios');
const {
    env: { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN, URL },
} = require('process');

const getSuccessMsg = () => `
Hi there, we just deployed the site successfully  🎉'

👉 ${URL}
`;

const getErrorMsg = () => `
Hi there, Latest build failed 😱

Check your build's log for more details

👉 ${URL}
`;

const PUSHOVER_MSG_URL = 'https://api.pushover.net/1/messages.json';
const pushOverPayload = {
    user: PUSHOVER_USER_KEY,
    token: PUSHOVER_API_TOKEN,
    title: 'Netlify Build',
};

const sendPushOverNotification = async payload => {
    await axios.default.post(PUSHOVER_MSG_URL, {
        ...pushOverPayload,
        ...payload,
    });
};

const precheck = () => {
    if (!PUSHOVER_USER_KEY || !PUSHOVER_API_TOKEN) {
        console.log(
            'PUSHOVER_USER_KEY or PUSHOVER_API_TOKEN is not available in environment variable'
        );
        return false;
    }
    return true;
};
module.exports = {
    name: 'netlify-build-plugin-pushover',
    async onSuccess() {
        if (precheck()) {
            console.log('onSuccess: Sending message via PushOver');
            const message = getSuccessMsg();
            await sendPushOverNotification({ message });
        }
    },
    async onError() {
        if (precheck()) {
            console.log('onError: Sending message via PushOver');
            const message = getErrorMsg();
            await sendPushOverNotification({
                message,
                priority: 1,
                sound: 'alien',
            });
        }
    },
};
