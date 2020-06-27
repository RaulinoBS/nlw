const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db
// db.serialize(()=>{
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             adress TEXT,
//             adress2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `) 
//     const query = `
//     INSERT INTO places (
//         name,
//         image,
//         adress,
//         adress2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);`

//     const values = [
//         "Papersider",
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "GuilhermeGemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papeis e papelão"

//     ]

//     function afterInsertData(err){
//         if (err){
//             return console.log(err)
//         }
    
//         console.log("cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     db.all(`SELECT name FROM places`, function(err, rows){
//         if (err){
//             return console.log(err)
//         }
//         console.log("aqui estão seus registros")
//         console.log(rows)
//     })
    
//     db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
//         if (err){
//             return console.log(err)
//         }
//         console.log("registro deletado com sucesso")
//     })
// })