const executeSQL = async (mySqlCon, sqlQuery) =>{
    let queryResp = await mySqlCon.query(sqlQuery, (err, result) => {
        if (err) throw err;
        // console.log("query resp => ",JSON.stringify(result));
        return JSON.stringify(result);
    });
    console.log("query resp ", queryResp);
}
module.exports = executeSQL;