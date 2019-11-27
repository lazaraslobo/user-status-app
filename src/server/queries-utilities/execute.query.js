const to = require('await-to-js').default;
const executeSQL = async (mySqlCon, sqlQuery) =>{
    let response = mySqlCon.query(sqlQuery, (error, result) => {
        if (error) throw error;
        // console.log("query resp => ",JSON.stringify(result));
        return JSON.stringify(result);
    });
    console.log("query resp ", queryResp);
    return queryResp;
}
module.exports = executeSQL;