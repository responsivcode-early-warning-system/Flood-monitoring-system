const jwt = require('jsonwebtoken');
const secretKey = "123123123123asdasdkljqwheihasjkdhkdjfhiuhq983e12heijhaskjdkasbd812hyeijahsdkb182h3jaksd"; // Access token secret key
const refreshSecretKey = '}iDm$-oJN_U:*??7)nB2Wm=<`9(2Ikp'; // Refresh token secret key

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;

    // Check if the refresh token cookie is present
    if (!cookies?.refreshToken) return res.sendStatus(401); // Unauthorized

    const refreshToken = cookies.refreshToken;

    // Verify the refresh token
    jwt.verify(refreshToken, refreshSecretKey, (err, decoded) => {
        if (err) {
            console.error('Error during token verification:', err);
            return res.sendStatus(403); // Forbidden
        }

        // Proceed to generate a new access token
        const roles = decoded.roles || []; // Assume roles are part of the decoded payload
        const email = decoded.email;

        const accessToken = jwt.sign(
            {
                email: email,
                roles: roles
            },
            secretKey,
            { expiresIn: '1hr' } // Adjust the expiration time as needed
        );

        res.json({ roles, accessToken });
    });
};

module.exports = { handleRefreshToken };
