const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(express.json());

// Connect SQLite DB
const db = new sqlite3.Database('./database.db', (err) => {
    if(err) console.error(err.message);
    else console.log('Connected to SQLite DB');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS marksheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    roll TEXT,
    dob TEXT,
    subjects TEXT,
    total REAL,
    percentage REAL,
    grade TEXT
)`);

// Add marksheet
app.post('/api/add-marksheet', (req,res) => {
    let {name, roll, dob, subjects, total, percentage, grade} = req.body;
    subjects = JSON.stringify(subjects);
    db.run(`INSERT INTO marksheets (name, roll, dob, subjects, total, percentage, grade)
            VALUES (?,?,?,?,?,?,?)`,
            [name, roll, dob, subjects, total, percentage, grade],
            function(err){
                if(err) res.json({success:false, message:err.message});
                else res.json({success:true, message:'Marksheet saved successfully!'});
            });
});

// Search marksheet
app.post('/api/search-marksheet', (req,res) => {
    let {name, roll, dob} = req.body;
    db.get(`SELECT * FROM marksheets WHERE name=? AND roll=? AND dob=?`, [name, roll, dob], (err,row)=>{
        if(err) res.json({success:false, message:err.message});
        else if(row){
            row.subjects = JSON.parse(row.subjects);
            res.json({success:true, marksheet:row});
        } else res.json({success:false});
    });
});

app.listen(3000, ()=> console.log('Server running on port 3000'));