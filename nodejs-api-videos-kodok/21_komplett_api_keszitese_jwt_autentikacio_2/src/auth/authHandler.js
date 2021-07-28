const jwt = require('jsonwebtoken');

const Users = [
    {
        username: 'admin',
        password: 'admin_pw',
        role: 'admin'
    },
    {
        username: 'user',
        password: 'user_pw',
        role: 'user'
    }
];

const refreshTokens = [];

module.exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = Users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        const assessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        res.json({
            assessToken,
            refreshToken
        });
    } else {
        res.send('Username or password incorrect.');
    }
};


module.exports.refresh = (req, res, next) => {
    const { token } = req.body;

    // nincs token
    if (!token) {
        return res.sendStatus(401);
    }

    // van token, de nincs a tömbben
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }

        const assessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({
            accessToken
        });
    });
    
};


module.exports.logout = (req, res) => {
    const { token } = req.body;

    if (!refreshTokens.includes(token)) {
        res.sendStatus(403);
    }

    const tokenIndex = refreshToken.indexOf(token);
    refreshTokens.splice(tokenIndex, 1);

    res.sendStatus(200);
}