const API = {
    async checkUserStatus(telegramId) {
        try {
            const res = await fetch('/api/auth/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ telegramId })
            });
            const data = await res.json();
            return data.success ? data : { isVIP: false };
        } catch (error) { return { isVIP: false }; }
    },
    async getPublicMovies() {
        try {
            const res = await fetch('/api/content');
            const data = await res.json();
            return data.success ? data.data : [];
        } catch (error) { return []; }
    },
    async getVIPMovies() {
        try {
            const res = await fetch('/api/content/vip');
            const data = await res.json();
            return data.success ? data.data : [];
        } catch (error) { return []; }
    }
};
