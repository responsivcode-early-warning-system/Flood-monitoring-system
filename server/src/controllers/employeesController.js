const db = require('../config/dbconnections'); // Your MySQL connection

// Get all employees
const getAllEmployees = async (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(204).json({ message: 'No employees found.' });
        }
        res.json(results);
    });
}

// Create new employee
const createNewEmployee = async (req, res) => {
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
        return res.status(400).json({ message: 'First and last names are required.' });
    }

    const sql = 'INSERT INTO employees (firstname, lastname) VALUES (?, ?)';
    db.query(sql, [firstname, lastname], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ id: results.insertId, firstname, lastname });
    });
}

// Update employee
const updateEmployee = async (req, res) => {
    const { id, firstname, lastname } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }

    const sqlFind = 'SELECT * FROM employees WHERE id = ?';
    db.query(sqlFind, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `No employee matches ID ${id}.` });
        }

        const sqlUpdate = 'UPDATE employees SET firstname = ?, lastname = ? WHERE id = ?';
        db.query(sqlUpdate, [firstname || results[0].firstname, lastname || results[0].lastname, id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json({ id, firstname: firstname || results[0].firstname, lastname: lastname || results[0].lastname });
        });
    });
}

// Delete employee
const deleteEmployee = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Employee ID required.' });

    const sqlFind = 'SELECT * FROM employees WHERE id = ?';
    db.query(sqlFind, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `No employee matches ID ${id}.` });
        }

        const sqlDelete = 'DELETE FROM employees WHERE id = ?';
        db.query(sqlDelete, [id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json({ message: `Employee with ID ${id} deleted successfully.` });
        });
    });
}

// Get employee by ID
const getEmployee = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Employee ID required.' });

    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `No employee matches ID ${id}.` });
        }
        res.json(results[0]);
    });
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
