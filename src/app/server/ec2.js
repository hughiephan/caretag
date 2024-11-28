// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import mime from 'mime-types';
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

/*
@params
    userId: string
    files: string[]
@return: [{name:string, data: (base64) string}]
*/
export const downloadFiles = async (userId, fileName) => {
    const directoryPath = path.join(BASE_PATH, `${userId}`);

    try {
        const fileBuffer = await fs.readFileSync(`${directoryPath}/${fileName}`);

        return {name: fileName, data: Buffer.from(fileBuffer).toString('base64'), type: determineFileType(fileName)};
    } catch (error) {
        console.log(error);
    }
}

const determineFileType = (filePath) => {
    const mimeType = mime.lookup(filePath); // Example: "application/pdf" or "image/png"

    return mimeType || 'Unknown type';
};


/*
@params
    userId: string
    files: string[]
@return: [{name:string, data: (base64) string}]
*/
export const deleteFiles = async (userId, files) => {
    const directoryPath = path.join(BASE_PATH, `${userId}`);

    if (!fs.existsSync(directoryPath)) {
        console.log(`directory ${userId} is not exist, start creating ...`)
        fs.mkdirSync(directoryPath, {recursive:true});
    }

    try {
        files.forEach(fileName => fs.rmSync(`${directoryPath}/${fileName}`))
    } catch (error) {
        console.log(error);
    }
}
