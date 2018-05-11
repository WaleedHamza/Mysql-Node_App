const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection(
    {host: 'localhost', port: 3306, user: 'root', password: '', database: 'bamazon_db'}
);

var departments = [];


connection.connect((err) => {
    if (err) throw err;
    console.log('Welcom Sir');
    console.log('\n');
    console.log('connected as id : '+ connection.threadId);

})


// -----------------------//
function addDepartment(){
    console.log("Add a new Department.....\n")

    var query = connection.query('INSERT INTO products SET ?',
{
    department_name: 'sports & Outdoor',
},
function (err,res){
    console.table(res.affectedRowes + "department added!\n");
    addDepartment();
}
)
}