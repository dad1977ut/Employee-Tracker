const mysql = require("mysql");
const inquirer = require("inquirer");
const { restoreDefaultPrompts } = require("inquirer");
require("console.table");
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "",
  database: "employeeTrackerdb",
});
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  // add callback to your starting funtion
  main();
});
// create starting funtion
function main() {
  inquirer
    .prompt({
      type: "list",
      name: "main",
      message: "What do you want to do?",
      choices: [
        "view department",
        "view roles",
        "view employees",
        "add department",
        "add role",
        "add employee",
        "updating employee role",
      ],
    })
    .then((result) => {
      if (result.main === "view department") {
        viewDepartment();
      } else if (result.main === "view roles") {
        viewRoles();
      } else if (result.main === "view employees") {
        viewEmployees();
      } else if (result.main === "add department") {
        addDepartment();
      } else if (result.main === "add role") {
        addRole();
      } else if (result.main === "add employee") {
        addEmployee();
      } else if (result.main === "update employee role") {
        updateRole();
      }
    });
}
function viewDepartment() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    main();
  });
}
function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    main();
  });
}
function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    main();
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department do you want to add",
      },
    ])
    .then((result) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: result.department,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} department inserted!\n`);
          main();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary",
      },
      {
        type: "number",
        name: "departmentid",
        message: "What is the department ID",
      },
    ])
    .then((result) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: result.title,
          salary: result.salary,
          department_id: result.departmentid,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} role inserted!\n`);
          // Call updateProduct AFTER the INSERT completes
          main();
        }
      );
    });
}
// ask question about empolyees with inquirer
