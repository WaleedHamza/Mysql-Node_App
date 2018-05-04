const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost', 
    port: 3306, 
    user: 'root', 
    password: '', 
    database: 'bamazon_db'
});
var inventory = [];
connection.connect((err) => {
    if (err) throw err;
    console.log('Welcom to Bamazon!!');
    console.log('\n');
    // console.log('connected as id : '+ connection.threadId);
    showInventory(); 
})

function showInventory(){
    // var inventory = [];

    var query = connection.query('SELECT * FROM products',(err,response) => {
        if (err) throw err;
        for (var i = 0 ; i < response.length ; i++){
            inventory.push(response[i]);
        }
        console.table(inventory);
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the item ID you would like to purchase?',
                choices:  'number',
                name: 'purchasedItem'
            }
            // {
            //     type: 'input',
            //     message: 'How many would you like to purchase?',
            //     choices: inventory,
            //     name: 'numOfItems'
            // }
        
        ]).then(response => {
            if (purchasedItem === (!NaN))
            console.log('I get here ')
            // console.log(response);
        })
    })
}



