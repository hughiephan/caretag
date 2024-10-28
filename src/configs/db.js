import { NextResponse } from "next/server";

const {createPool} = require('mysql');



const pool = createPool({
    host: '127.0.0.1',
    user:'root',
    password:'',
    port: 3306,
    database: 'caretag',
});

pool.getConnection((err)=>{
    if(err){
        console.log(`Error connecting to db....`,err);
    }
    else{
        console.log(`Connection Successful`,);

    }
});

//retreive
const GET = (columns,table,conditions) => {
    return new Promise((resolve, reject)=>{
        let query =  `SELECT ${columns} FROM ${table}`;

        if((conditions && conditions != '' && conditions != ' ' && conditions != undefined)){
            query+=' '+conditions;
        }

        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

//insert
const POST = (columns,table,values) => {
    return new Promise((resolve, reject)=>{
        let query =  `INSERT INTO ${table} (${columns}) (${values}) `;

        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

//update
const PUT = (table,values,conditions) => {
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
            
            console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

const PATCH = (table,values,conditions) => {
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
            
            console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

//delete
const DELETE = (table,conditions) => {
    return new Promise((resolve, reject)=>{
        let query =  `DELETE FROM ${table} WHERE ${conditions}`;

        pool.query(query,  (error, employees)=>{
            if(error){
                console.log(`there was an error`,error);

                return reject(error);
            }
            
            console.log(`employees returned`,employees);

            return resolve(employees);
        });
    });
}

module.exports = pool;
