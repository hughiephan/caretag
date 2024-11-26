// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const os = require('os');
const fs = require('fs');
const path = require('path'); 

const BASE_PATH = os.homedir();

/*
@params
    userId: string
    files: [ {
            name: string,
            data: string (Base64)
        } ]

@return boolean
    success -> true
    error -> false
*/
export const storeFiles = async (userId, files) => {
    console.log(BASE_PATH)


    const directoryPath = path.join(BASE_PATH, userId);
    let operationFlag = false;

    try {
        if (!fs.existsSync(directoryPath)) {
            console.log(`directory ${userId} is not exist, start creating ...`)
            fs.mkdirSync(directoryPath, {recursive:true});
        }

        console.log('storing files')

        files.forEach(file => fs.writeFileSync(path.join(directoryPath, file.name), Buffer.from(file.data, 'base64')));

        operationFlag = true;
    } catch (error) {
        console.log(error);
    } finally {
        return operationFlag;
    }
}

/*
@params
    userId: string

@return: string[]
*/
export const readFiles = async (userId) => {
    const directoryPath = path.join(BASE_PATH, userId);
    let files = [];

    if (!fs.existsSync(directoryPath)) {
        console.log(`directory ${userId} is not exist, start creating ...`)
        fs.mkdirSync(directoryPath, {recursive:true});
        
        return files;
    }

    console.log(`listing files ...`);

    try {
        files = await fs.readdirSync(directoryPath);

        // debug
        files.forEach(file => console.log(file))
        
    } catch (error) {
        console.log(error);
    } finally {
        return files;
    }
}
