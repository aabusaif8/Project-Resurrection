// controllers/authController.js
import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const salt = 10;

// Register
router.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?,?,?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });
        const values = [req.body.name, req.body.email, hash];
        db.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: "Error inserting data" });
            return res.json({ Status: "Success" });
        });
    });
});

// Login
router.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Error logging in" });
        if (data.length > 0) {
            console.log(data)
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password comparing error" });
                if (response) {
                    const name = data[0].name;
                    console.log(data[0])
                    const token = jwt.sign({ name }, "secret_key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Wrong password" });
                }
            });
        } else {
            return res.json({ Error: "User not found" });
        }
    });
});
router.get('/manga', (req, res) => {
    console.log('Dashboard route hit'); // Log to confirm the route is reached
    const sql = "SELECT * FROM manga"; // Adjust the SQL query as needed
    console.log('SQL Query:', sql);
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.json({ Error: "Error fetching dashboard data" });
        }
        return res.json({ Status: "Success", data: results });
    });
});
// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

// Verify User Middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You have not been authenticated" });
    } else {
        jwt.verify(token, "secret_key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token verification failed" });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};
router.get('/role', verifyUser, (req, res) => {
    const sql = 'SELECT role FROM login WHERE name = ?'; // Adjust the query as needed
    db.query(sql, [req.name], (err, results) => {
        if (err) {
            return res.json({ Error: "Error fetching user role" });
        }
        if (results.length > 0) {
            console.log(results)
            const role = results[0].role; // Assuming role is in the first row
            return res.json({ Status: "Success", role });
        } else {
            return res.json({ Error: "Role not found" });
        }
    });
});

// Protected Route
router.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
});

export default router;