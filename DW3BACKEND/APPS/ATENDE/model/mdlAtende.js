const db = require("../../../database/databaseConfig");

const getAllAtende = async () => {
  return (
    await db.query(
      `SELECT 
        a.atendeid,
        a.pacienteidfk,
        p.nomepaciente AS nome_paciente, -- Traz o nome do paciente
        a.medicoidfk,
        m.nomemedico AS nome_medico,     -- Traz o nome do médico
        a.deleted
    FROM atende a
    INNER JOIN paciente p ON a.pacienteidfk = p.pacienteid
    INNER JOIN medico m ON a.medicoidfk = m.medicoid
    WHERE a.deleted = false 
    ORDER BY a.atendeid DESC;`   
    )
  ).rows;
};

const getAtendeByID = async (atendeIDPar) => {
    return (
        await db.query(
            `SELECT 
                a.atendeid,
                a.pacienteidfk,
                p.nomepaciente AS nome_paciente,
                a.medicoidfk,
                m.nomemedico AS nome_medico,
                a.deleted
            FROM atende a
            INNER JOIN paciente p ON a.pacienteidfk = p.pacienteid
            INNER JOIN medico m ON a.medicoidfk = m.medicoid
            WHERE a.atendeid = $1 AND a.deleted = false`,
            [atendeIDPar]
        )
    ).rows[0];
};


const insertAtende = async (regPar) => {
    let linhasAfetadas;
    let msg = "ok";
    
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO atende (pacienteidfk, medicoidfk, deleted) " +
                "VALUES ($1, $2, $3)",
                [
                    regPar.pacienteidfk,
                    regPar.medicoidfk,
                    false, 
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlAtende|insert] " + error.detail;
        linhasAfetadas = -1;
    }
    
    return { msg, linhasAfetadas };
};


const updateAtende = async (regPar) => {
    let linhasAfetadas;
    let msg = "ok";
    
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE atende SET " +
                "pacienteidfk = $2, " +
                "medicoidfk = $3 " +
                "WHERE atendeid = $1 AND deleted = false",
                [
                    regPar.atendeid,
                    regPar.pacienteidfk,
                    regPar.medicoidfk,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlAtende|update] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};


//deleta as paradas  
const deleteAtende = async (regPar) => {
    let linhasAfetadas;
    let msg = "ok";
    
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE atende SET " +
                "deleted = true " + 
                "WHERE atendeid = $1", 
                [
                    regPar.atendeid
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlAtende|delete] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
  getAllAtende,
  getAtendeByID,
  insertAtende,
  updateAtende,
  deleteAtende
};