const db = require("../../../database/databaseConfig");

const GetCredencial = async (loginPar) => { 
  return (
    await db.query(
      "SELECT userid, username, password " + 
      "FROM usuarios WHERE username = $1",
      [loginPar]
    )
  ).rows;
};

module.exports = {
  GetCredencial,
};