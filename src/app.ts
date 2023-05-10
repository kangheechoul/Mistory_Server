import express from "express";
import config from "dotenv";
import morgan from "morgan";

import { poolConnection } from "./db/mysql";

config.config();
const app = express();
const port = 8005;


app.use(express.json());

async function test(sql:string){
    let result = await poolConnection(sql);

    return result[0];
}


app.get("/", (req, res )=>{
    console.log("asd");
    let sql = `select * from tb_user`;
    
    test(sql).then((result)=>{
        res.send(result);
    });
});

app.listen(port, ()=>{
    console.log(`${port} server on`);
});