const db = require('../config/dbconnections');// Assuming you have a database configuration file for MySQL

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    try {
        // Check if refreshToken exists in the database
        const [foundUser] = await db.execute('SELECT * FROM users WHERE refreshToken = ?', [refreshToken]);

        if (foundUser.length === 0) {
            // If no user found, clear the cookie and send status 204
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204); // No content
        }

        // Clear the refreshToken in the database
        await db.execute('UPDATE users SET refreshToken = ? WHERE refreshToken = ?', ['', refreshToken]);

        // Clear the cookie on the client
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); // No content
    } catch (err) {
        console.error('Error logging out user:', err);
        return res.sendStatus(500); // Internal server error
    }
};

module.exports = { handleLogout };
