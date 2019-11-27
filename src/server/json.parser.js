const stringJson = (str) =>{
    let tempStr = JSON.stringify(str);
    tempStr = JSON.parse(tempStr);
    return tempStr;
}

module.exports ={stringJson}