const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

const db = require("./database/db")

nunjucks.configure("src/views", {
  express: server,
  noCache: true
})
server.use(express.static("public"))
server.use(express.urlencoded({extended:true}))

server.get("/", (require, response) => {
  return response.render("index.html")
})
server.get("/create-point", (require, response) => {
  return response.render("create-point.html")
})

server.post("/savepoint",(require,response) => {
    const query = `
    INSERT INTO places (
        name,
        image,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);`

    const values = [
        require.body.name,
        require.body.image,
        require.body.adress,
        require.body.adress2,
        require.body.state,
        require.body.city2,
        require.body.items
    ]

    function afterInsertData(err){
        if (err){
            console.log(err)
            return response.render("create-point.html", {noSaved:true})
        }
        return response.render("create-point.html", {saved : true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (require, response) => {

  const search = require.query.search

  if(search == ""){
    return response.render("search-results.html", {total: 0})
  }

  else{
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
      if (err) {
        return console.log(err)
      }
      console.log(rows)
      const total = rows.length
      return response.render("search-results.html", { places: rows, total})
    })
  }
})

server.listen(3000)