import pool from "../configs/db";

const getAllEmployees = (req,res) => {
    let user = pool.GET(`*`,`USERS`,`WHERE first_name = 'Nikolai'`,``);

    console.log('user',user)

    res.send(user);
};

export {getAllEmployees};
