document.addEventListener('DOMContentLoaded', async () => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.ready();

    let telegramId = "guest"; 
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        telegramId = tg.initDataUnsafe.user.id;
    }

    console.log("User Telegram ID:", telegramId);

    const userStatus = await API.checkUserStatus(telegramId);
    
    UI.updateUserStatus(userStatus.isVIP);

    const publicMovies = await API.getPublicMovies();
    const vipMovies = await API.getVIPMovies();

    const allMovies = [...vipMovies, ...publicMovies];
    UI.renderHero(allMovies[0]);

    UI.renderMovies(publicMovies, 'publicMoviesGrid', false);
    UI.renderMovies(vipMovies, 'vipMoviesGrid', true);
});
