const db = require('../config/dbconnections'); // Your MySQL connection

// Get all users
const getAllUsers = async (req, res) => {
    const sql = 'SELECT username FROM login';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(204).json({ message: 'No users found' });
        }
        res.json(results); // Returns an array of user objects with username
    });
}

// Get a specific user by username
const getUser = async (req, res) => {
    const { username } = req.params;
    if (!username) return res.status(400).json({ message: 'Username required' });

    const sql = 'SELECT username FROM login WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `Username ${username} not found` });
        }
        res.json(results[0]); // Returns the user object with username
    });
}

// Delete a user by username
const deleteUser = async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username required' });

    const sqlFind = 'SELECT username FROM login WHERE username = ?';
    db.query(sqlFind, [username], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `Username ${username} not found` });
        }

        const sqlDelete = 'DELETE FROM users WHERE username = ?';
        db.query(sqlDelete, [username], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json({ message: `Username ${username} deleted successfully` });
        });
    });
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}
