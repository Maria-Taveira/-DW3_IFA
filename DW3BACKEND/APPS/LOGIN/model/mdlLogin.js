const db = require("../../../database/databaseconfig");

exports.GetCredencial = async (UserName) => {
    const sql = `
        SELECT userid, username, password 
        FROM usuarios
        WHERE username = $1 AND is_active = TRUE;
    `;
    try {
        const result = await db.query(sql, [UserName]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};