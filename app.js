const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3004;

app.use(cors());

//set ejs file
// app.set("view engine", "ejs");

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("views"));
// app.set("views", path.join(__dirname, "views"));
// app.use("/views", express.static(path.join(__dirname, "views")));

// Set up MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee",
  port: 3306,
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM workers", (err, results) => {
    if (err) throw err;
    res.render("index", { items: results });
    console.log({ items: results });
  });
});

//for compining two tables query

// app.get('/', (req, res) => {
//   connection.query("select workers.first_name,workers.designation,branch.br_name,branch.addr from workers left join branch on workers.br_name = branch.br_name", (err, results) => {
//       if (err) throw err;
//       res.render('index', { items: results });
//       console.log({ items: results });
//   });
// });

//branch table

// app.get('/', (req, res) => {
//   connection.query('SELECT * FROM branch ', (err, results) => {
//       if (err) throw err;
//       res.send(results)
//       res.render('index', { items: results });
//       console.log({ items: results });
//   });
// });

// app.post('/add', (req, res) => {
//   const branch_id = req.body.branch_id;
//   const br_name = req.body. br_name;
//   const addr = req.body.addr;
//   const sql1 = 'INSERT INTO workers (branch_id, br_name, addr) VALUES (?, ?, ?)';
//   connection.query(sql1, [branch_id, br_name, addr], (err, result) => {
//       console.log(branch_id, br_name, addr);
//     if (err) {
//         console.error('Database query error:', err);
//         return;
//       }
//       res.redirect('/');

//   });
// });

//for workers table

app.post("/add", (req, res) => {
  const first_name = req.body.first_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const dob = req.body.dob;
  const designation = req.body.designation;
  const salary = req.body.salary;
  const sql1 =
    "INSERT INTO workers (first_name, email, phone, dob, designation, salary) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    sql1,
    [first_name, email, phone, dob, designation, salary],
    (err, result) => {
      console.log(first_name, email, phone, dob, designation, salary);
      if (err) {
        console.error("Database query error:", err);
        return;
      }
      res.redirect("/");
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
//for delete items
// Delete employee
app.delete("/delete/:id", (req, res) => {
  const employeeId = req.params.id;

  const sql = "DELETE FROM workers WHERE id = ?";
  connection.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});
//update id
// Update employee
app.post("/update/:id", (req, res) => {
  const employeeId = req.params.id;
  const { first_name, email, phone, dob, designation, salary } = req.body;

  const sql =
    "UPDATE workers SET first_name = ?, email = ?, phone = ?, dob = ?, designation = ?, salary = ? WHERE id = ?";
  connection.query(
    sql,
    [first_name, email, phone, dob, designation, salary, employeeId],
    (err, result) => {
      if (err) {
        console.error("Error updating employee:", err);
        res.redirect("/"); // Redirect with an error message in a real-world app
      } else {
        res.redirect("/"); // Success
      }
    }
  );
});
