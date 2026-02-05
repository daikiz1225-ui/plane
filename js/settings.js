export const Settings = {
    save(apiKey, userName) {
        localStorage.setItem('yt_api_key', apiKey);
        localStorage.setItem('yt_user_name', userName);
    },
    load() {
        return {
            apiKey: localStorage.getItem('yt_api_key') || '',
            userName: localStorage.getItem('yt_user_name') || ''
        };
    }
};
