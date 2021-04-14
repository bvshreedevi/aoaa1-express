var express = require ("express");
var app = express();
const router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'aoaa1'
})

connection.connect()
router.get('/', (req, res) => {
    res.send("Test Router");
});

router.get('/db1', (req, res) =>{
    
    if(connection.connect()){
       
            res.send("db connected");
      
    }
    else {
       
            res.send("db NOT ");
           
       
    }
})
/*
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})*/

connection.end()

module.exports = router;

