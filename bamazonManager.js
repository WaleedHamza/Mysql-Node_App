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

connection.connect((err) => {
    if (err) throw err;
    console.log('Welcom to Bamazon!!');
    console.log('\n');
    console.log('connected as id : '+ connection.threadId);
    action();
})

var inventory = [];
var lowInventory = [];
var addInventory = [];
var newInventory = [];

    function action(){
        inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do ?',
            choices:[
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add new product',
            ]
        }).then ((answer)=>{
            switch (answer.action){
                case  'View Products for Sale':
                showInventory();
                break;

                case 'View Low Inventory':
                lowInventory();
                break;

                case 'Add to Inventory':
                addProduct();
                break;

                case 'Add new product':
                addNew();
                break;

                default :
                saveExit();
            }
        })
    }


//____________________show Inventory
    function showInventory() {

        var query = connection.query('SELECT * FROM products', (err, res) => {
            if (err) 
                throw err;
            for (var i = 0; i < res.length; i++) {
                inventory.push(res[i]);
            }
            console.table(inventory);
        })
        action();
    }



// --------------inventory checker 
function lowInventory(){
    var lowInventory = [];
    
    connection.query('SELECT * FROM products',(err,res)=>{
        if (err)throw (err)
         for ( var i = 0 ; i < res.length ; i++){
            if(res[i].stock <= 20 ){
                lowInventory.push(res[i]);
            }
        }
        console.log('*********** Holly crap we are running out of these items'+'\n');
        console.table(lowInventory);
    })
    action();
    }
    



// -----------------------//
    function addNew(){
        console.log("Add a new Product.....\n")
inquirer.prompt([
    {
        type : 'list',
        name : 'itemId',
        message: 'input the item id you would like to restock',
        validate: (value) => {
            if (!isNaN(value) && value < 11 && value > 0) {
                return true;
            }
            console.log(
                '\nInvalid Item ID, Please select the item ID you would like to purchase'
            );
            promptUser();
            return false;
        }
    },
    {
        name: 'numOfItems',
        message: 'How many would you like to restock?',
        type: 'input',
    }
]).then(answer => {
    // console.log('the answers are : '+ answer)
    var itemId = answer.itemId;
    var quanity = answer.numOfItems

    connection.query("UPDATE products SET ? WHERE ?", 
    [{
        stock: leftInStock
    }, {
        item_id:purchasedItem
    }],
    function(err,data){ 
        if(err) throw err; 
        else {
         }
    });

    //     var query = connection.query('INSERT INTO products SET ? where ?',
    // {
    //     prodeuct_name: 'Knife',
    //     department_name: 'sports & Outdoor',
    //     price: 25,
    //     stock : 30
    // },
    // (err,res)=>{
    //     console.table(res.affectedRowes + "prodeuct added!\n");
        // addProduct();
    }
)
    }

// =========================//

function updateProduct(){

    function update(){
        inquirer.prompt({
            name: 'itemID',
            type: 'input',
            message: 'insert Item ID you want to restoke',
            validate : (value => {
                if (!isNaN(value)=== true){
                    return true;
                }return false;
            })
        },
        {
            name: 'amount',
            message: 'enter the amount of items to restock',
            type: 'input',
            validate: (value) => {
                if (!isNaN(value) === true) {
                    return true;
                }
                return false;
            }
        }).then((answer)=>{
            var itemId = answer.itemID;
            var amount = answer.amount;
            var query= connection.query("UPDATE products SET ? WHERE ?",
            [{
                stock: amount
            },
            {
                item_id: itemID
            }
            ],
            (err,res)=>{
                console.log(res.affecterRows+ 'Product restocked!\n')
            });
        })
}
    console.log('Restock items')
    update();
}
// console.table(res);

// updateProduct();