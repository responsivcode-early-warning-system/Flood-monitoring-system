const bcrypt = require('bcrypt');
var db = require('../config/dbconnections');

const resetPassword = async (req, res) => {
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Bcrypt error:', err);
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const sql = 'UPDATE login SET password = ? WHERE username = ?';
        db.query(sql, [hashedPassword, email], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ message: 'Error updating password' });
            }

            if (result.affectedRows === 0) {
                console.log('User not found');
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ message: 'Password reset successfully' });
        });
    });
};

module.exports = { resetPassword };
