
function getWinnerLoser(game) {
if (game.intHomeScore === null || game.intAwayScore === null) {
    return { winner: null, loser: null };
}

if (game.intHomeScore > game.intAwayScore) {
    return { winner: game.strHomeTeam, loser: game.strAwayTeam };
} else if (game.intHomeScore < game.intAwayScore) {
    return { winner: game.strAwayTeam, loser: game.strHomeTeam };
} else {
    return { winner: 'tie', loser: 'tie' };
}
}

export function isToday(date) {
const today = new Date();
const inputDate = new Date(date);

return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
);
}

export function calculateScores(users, games, groupPicks) {
const userScores = [];

for (const user of users) {
    let dailyScore = 0;
    let totalScore = 0;

    for (const gameId in groupPicks[user.userId]) {
    const game = games.find((game) => game.id === gameId);

    if (!game) continue;

    const { winner, loser } = getWinnerLoser(game);

    if (winner && groupPicks[user.userId][gameId] === winner) {
        if (isToday(game.strTimestamp)) {
        dailyScore++;
        }
        totalScore++;
    }
    }

    userScores.push({ userId: user.userId, scores: { dailyScore, totalScore } });
}

return userScores;
}

//const sortedLeaderboard = Object.entries(scores).sort((a, b) => b[1].totalScore - a[1].totalScore);