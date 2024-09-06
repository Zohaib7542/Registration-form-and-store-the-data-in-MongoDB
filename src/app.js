const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;
require("./db/conn");
const Submit = require("./models/submit");
const { json } = require("express");


//connecting to index.html which is in public folder---;
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");//rename views into template and add views folder inside template;
const partials_path = path.join(__dirname, "../templates/partials");

// console.log(path.join(__dirname, "../public"));
app.use(express.static(static_path));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

//connecting to views folder;
app.set("view engine","hbs");
app.set("views",templates_path);//views folder -> templates_path -> run
hbs.registerPartials(partials_path);

app.get("/",(req,res) =>{
    res.render("index") // we have to render index.hbs file so we change the 'send' to 'render'
});
app.get("/register",(req,res)=> {
    res.render("register");
})
app.get("/home",(req,res)=> {
    res.render("home");
})

app.post("/submit", async (req,res)=>{
    try{
        const submitVal = new Submit({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address
        })
        const submitted = await submitVal.save()
      

    }catch(e){
        res.status(400).send(e);
    }

})


app.listen(port,() =>{
    console.log(`server is running ${port}`);
})