const bcrypt = require('bcrypt');
const db = require('../config/dbconnections');
const jwt = require('jsonwebtoken');

const secretKey = '123123123123asdasdkljqwheihasjkdhkdjfhiuhq983e12heijhaskjdkasbd812hyeijahsdkb182h3jaksd';
const refreshSecretKey = '}iDm$-oJN_U:*??7)nB2Wm=<`9(2Ikp'; // Replace with your actual secret key for refresh tokens

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const sql = "SELECT * FROM login WHERE username = ?";

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (results.length > 0) {
            const user = results[0];
            const roles = user.role ? [user.role] : [];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Bcrypt error:', err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }

                if (isMatch) {
                    const firstTimeLogin = !user.password_changed;

                    const accessToken = jwt.sign(
                        { email: user.username, roles: roles },
                        secretKey,
                        { expiresIn: '10s' }
                    );

                    const refreshToken = jwt.sign(
                        { email: user.username, roles: roles },
                        refreshSecretKey,
                        { expiresIn: '7d' } // Change to 7 days for the refresh token
                    );

                    // Store the refresh token in the database
                    const updateSql = "UPDATE login SET refresh_token = ?, password_changed = TRUE WHERE username = ?";
                    db.query(updateSql, [refreshToken, email], (updateErr) => {
                        if (updateErr) {
                            console.error('Update error:', updateErr);
                            return res.status(500).json({ message: "Internal Server Error" });
                        }

                        // Send the access token and refresh token as cookies
                        res.cookie('accessToken', accessToken, {
                            httpOnly: true,
                            secure: true, // Secure only in production
                            sameSite: 'None',
                            maxAge: 10 * 1000 // 10 seconds

                        });

                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: true, // Secure only in production
                            sameSite: 'None',
                            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                        });

                        return res.status(200).json({ roles, accessToken, firstTimeLogin });
                    });
                } else {
                    return res.status(401).json({ message: "Invalid email or password" });
                }
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    });
};

module.exports = { handleLogin };
