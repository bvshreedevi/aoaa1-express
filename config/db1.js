var express = require ("express");
var app = express();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aoaa1'
})

connection.connect()

if(connection.connect()){
    app.get('/db1', (req, res) =>{
        res.send("db connected");
    })
}
else {
    app.get('/db1', (req, res) =>{
        res.send("db NOT ");
    })
}
/*connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})*/

connection.end()

module.exports = router;