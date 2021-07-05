import fs from 'fs'

function writeFile(textFile, srcLocFile) {
    try{
        fs.writeFileSync(srcLocFile, textFile);
        return true;
    }catch(err){
        console.log('Erro:', err);
        return false;
    }
}

function readFile(srcLocFile) {
    try{
        let data = fs.readFileSync(srcLocFile, 'utf-8');
        return {success:true, textFile:data};
    }catch(err){
        console.log('Erro:', err);
        return {success:false, textFile:""};
    }
}

export {writeFile, readFile}