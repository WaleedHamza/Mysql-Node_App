const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection(
    {host: 'localhost', port: 3306, user: 'root', password: '', database: 'bamazon_db'}
);
var inventory = [];
var totalPrice = [];


function start(){
connection.connect((err) => {
    if (err) 
        throw err;
    console.log('\n');
    console.log('Welcom to Bamazon!!');
    console.log('\n');
    // console.log('connected as id : '+ connection.threadId);
    showInventory();
});
}
//make a request to the data base and display the iventory //
function showInventory() {
    var query = connection.query('SELECT * FROM products', (err, res) => {
        if (err) 
            throw err;
            inventory = [];
        for (var i = 0; i < res.length; i++) {
            inventory.push(res[i]);
        }
        console.log('\n');
        console.table(inventory);
        console.log('\n');
        // invoke the user prompt function//
        promptUser();
    })
}

// prompt user to choose an item & quanity from the inventory table 
function promptUser() {
    inquirer
        .prompt([
            {
                name: 'purchasedItem',
                message: 'What is the item ID you would like to purchase?',
                type: 'input',
                validate: (value) => {
                    if (!isNaN(value) && value < 11 && value > 0 && value !== "") {
                        return true;
                    }
                    console.log(
                        '\nInvalid Item ID, Please select the item ID you would like to purchase');
                    return;
                    showInventory();
                }
            }, {
                name: 'numOfItems',
                message: 'How many would you like to purchase?',
                type: 'input',
                validate: (value) => {
                    if (!isNaN(value) === true) {
                        return true;
                    }
                    return false;
                }
            }

        ])
        .then(answer => {
            // console.log('the answers are : '+ answer)
            // insert the answers into a variables for ease of use //
            var purchasedItem = answer.purchasedItem;
            var quanity = answer.numOfItems
            // query the database with the users input //
            var query =connection.query("SELECT * FROM products WHERE ? ", [
                    {
                        item_id: purchasedItem
                    }
                ], (err, res) => {
                    if (err) 
                        throw err;
                        // insert responses into a variables for ease of use //
                    var id = res[0].item_id;
                    var itemName = res[0].product_name;
                    var inStock = res[0].stock
                    var price = res[0].price;
                    // quanity checker to ensure the amount of items requested are available instock//
                    if (quanity > inStock) {
                        console.log('\n\nOnly ' + inStock + ' available of ' + itemName+ "\n\n");
                        showInventory();
                        return;
                    }
                    // display the purchase order details in a readable way//
                    var currentPrice = price * quanity;
                    var leftInStock = inStock - quanity;
                    var tax = currentPrice * .05;
                    var total = currentPrice + tax;
                    console.log('\n'+quanity + ' of ' + itemName + ' added to your cart')
                    console.log('\nUnit price is : $' + price);
                    console.log('\nEstimated NC Taxes : $' + tax)
                    console.log('\nYour Total is : $' + total+ '\n\n');
                    console.log(leftInStock + ' of ' + itemName + ' left in stock!\n\n');
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock: leftInStock
                        }, 
                        {
                            item_id:purchasedItem
                        }],
                    function(err,data){ 
                        if(err) throw err; 
                        else {
                            continueShopping();
                         }
                    });
                })
        })

}

function continueShopping() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: "keepShopping",
                message: "Would you like to continue shopping?",
                choices: [
                    "YES" , "NO" , "Review Inventory"
                ],
            }
        ])
        .then((answer) => {
            switch(answer.keepShopping){
            case "YES":
                promptUser();
            break;

            case "NO":
                console.log('Thanks, See you soon!\n\n');
                connection.end();
            break;

            case "Review Inventory":
            showInventory();
            break;

            default:
            connection.end();
                }
        })
}
start();