import { createRequire } from "module";

const require = createRequire(import.meta.url);
const {createPool} = require('mysql2'); 

let pool;

if (!global.mysqlPool) {
    global.mysqlPool = createPool({
        host: process.env.DB_HOST || '127.0.0.1', 
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'caretag',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
    });
    global.mysqlPool.getConnection((err)=>{
        if(err){
            console.log(`Error connecting to db....`,err);
        }
        else{
            console.log(`Connection Successful`,);

        }
    });
}

pool = global.mysqlPool;



//retreive
pool.GET = (columns,table,join,conditions) => {
    return new Promise((resolve, reject)=>{
        let query =  `SELECT ${columns} FROM ${table}`;

        if((join && join != '' && join != ' ' && join != undefined)){
            query+=' '+join;
        }


        if((conditions && conditions != '' && conditions != ' ' && conditions != undefined)){
            query+=' '+conditions;
        }

        
        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            //console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

//insert
pool.POST = (columns,table,values) => {
    return new Promise((resolve, reject)=>{
        let query =  `INSERT INTO ${table} (${columns}) VALUES (${values}) `;

        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            //console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

//update
pool.PUT = (table,values,conditions) => {
    return new Promise((resolve, reject)=>{

        let query =  `UPDATE ${table} SET `;
        
        for(const key of Object.keys(values)){
            query += `${key} = '${values[key]}', `
        }

        query = query.slice(0, -2) + ' ';

        query += conditions;

        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            //console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

pool.PATCH = (table,values,conditions) => {
    return new Promise((resolve, reject)=>{

        let query =  `INSERT INTO ${table} SET `;
        
        for(const key of values){
            query += `${key} = ${values[key]}, `
        }

        query += conditions;

        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            //console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

//delete
pool.DELETE = (table,conditions) => {
    return new Promise((resolve, reject)=>{
        let query =  `DELETE FROM ${table} WHERE ${conditions}`;

        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            //console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down...');

    if (pool) {
      await pool.end();
      console.log('Connection pool closed');
    }

    process.exit(0);
  });

  // Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Shutting down...');

    if (pool) {
      await pool.end();
      console.log('Connection pool closed');
    }

    process.exit(0);
  });
  
//module.exports = pool;
export default pool;
