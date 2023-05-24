const express = require("express")
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
require('dotenv').config()


//  const posts = [{ username: "Maaz", title: "post 1" }, { username: "Khalid", title: "post 2" }]




 app.get("/posts",authenticateToken, (req, resp) => {
    
     resp.json(posts.filter(post => post.username===req.user.name))
 })



app.post("/login", (req, resp) => {
    //authenticate
    // const username = req.body.username;
    // const user = { name: username }
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    // resp.json({ accessToken: accessToken })

})
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)
        req.user=user
        next()
    })

}
// app.listen(3000,()=>{
//     console.log("listening")
// })


module.exports ={
    authenticateToken
}