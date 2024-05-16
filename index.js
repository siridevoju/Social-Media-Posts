const exp = require('constants')
const { name } = require('ejs')
const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))

let posts = []

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs", { posts })
})

app.post("/posts", (req, res) => {
    let { username, content, image } = req.body
    let id = uuidv4()
    posts.push({ id, username, content, image })
    res.redirect("/posts")

})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    console.log(post)
    res.render("show.ejs", { post })
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params
    let newContent = req.body.content

    let post = posts.find((p) => id === p.id)
    post.content = newContent
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params
    let post = posts.find((p => p.id === id))
    res.render("edit.ejs", { post })
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params
    posts = posts.filter((p) => p.id !== id)
    res.redirect("/posts")
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})