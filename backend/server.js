import express from 'express';
import cors from 'cors';
import pg from 'pg';
import env from 'dotenv';
const port = 3000;
const app = express();
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

app.use(express.json());
app.use(express.urlencoded({extended:true})); //use to fetch incoming data from a request
db.connect();

let watches = [];

db.query("SELECT * FROM watches",(err,res)=>{
    if(err){
        console.log("Error executing query", err.stack);
    }else{
        watches = res.rows;
    }
})



app.use(cors());

app.get("/",(req,res)=>{
    res.json("Success");
});

app.get("/api/watches",(req,res)=>{
    res.json(watches);
});

app.post("/api/addUser", async(req,res)=>{
    try {
        const {fullname,email,password} = req.body;
        const result = await db.query("INSERT INTO users (name,email,password) VALUES($1,$2,$3)",[fullname,email,password]);
        res.json(result);
    } catch (error) {
        res.send(error);
    }
});

app.post("/api/login",async(req,res)=>{
    try {
        const {email,password} = req.body;

        const result = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2",[email,password]);
    } catch (error) {
        res.send(error);
    }
});

app.get("/api/fetchCart", async (req,res)=>{
    try {
        const result = await db.query("SELECT * FROM watches RIGHT JOIN cart ON cart.watchid = watches.id");
        res.json(result.rows);
    } catch (error) {
        res.send(error);
    }
});

app.post("/api/addToCart",async (req,res)=>{
    try {
        const {id, quantity} = req.body;
        const result = await db.query("INSERT INTO cart (watchID,quantity) VALUES ($1,$2)",[id,quantity]);
        if(result.rowCount === 1){
            const fetchCart = await db.query("SELECT * FROM watches RIGHT JOIN cart ON cart.watchid = watches.id");
            res.send(fetchCart.rows);
        }
    } catch (error) {
        res.send(error);
    }
});

app.patch("/api/updateCart",async(req,res)=>{
    try {
        const {id,quantity} = req.body.item;
        const result = await db.query("UPDATE cart set quantity = $1 WHERE id = $2",[quantity, id]);
        if(result.rowCount === 1){
            const fetchCart = await db.query("SELECT * FROM watches RIGHT JOIN cart ON cart.watchid = watches.id");
            res.send(fetchCart.rows);
        }
    } catch (error) {
        res.json({err: error.message});
    }
});

app.post("/api/contacts", async(req,res)=>{
    try {
        const {fullname,email,phonenumber,message} = req.body;
        const result = await db.query("INSERT INTO concerns (fullname,email,phonenumber,message) VALUES ($1,$2,$3,$4)",[fullname, email, phonenumber, message]);
        res.status(200);
    } catch (error) {
        res.json(error);
    }
});

app.post("/api/removeItem", async(req,res) =>{
    try {
         const result = await db.query("DELETE FROM cart WHERE id = $1",[req.body.id]);
         res.json(result);
    } catch (error) {
        res.json(error);
    }
});

 

app.listen(port,()=>console.log('Running on port ', port));