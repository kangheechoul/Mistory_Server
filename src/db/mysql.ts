import mysql from "mysql2";
import config from "dotenv";

config.config();


const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    connectionLimit : 5,
    port : 3306,
    connectTimeout : 3000
});

export const poolConnection = async (sql: string) => {
    const promisePool = pool.promise();
    const [rows, field] = await promisePool.query(sql);
    return rows;
};

// export const getConnection = async (callback : any) => {
//     pool.getConnection((err, conn)=>{
//         try{
//             if(err){
//                 console.log("에러남");
//                 console.log(err);
//             }
//             callback(conn);
//             conn.release();
//         }catch(err){
//             console.log(err);
//             return;
//         }

//     })
// }