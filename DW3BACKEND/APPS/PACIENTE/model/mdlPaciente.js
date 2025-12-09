const db = require("../../../database/databaseConfig");

const getAllPaciente = async () => {
    return (
        await db.query(
            `SELECT 
                p.pacienteid, 
                p.nomepaciente, 
                p.datanascimento, 
                p.deleted
               FROM paciente p
               WHERE p.deleted = false 
               ORDER BY p.nomepaciente ASC`
        )
    ).rows;
};

const getPacienteByID = async (pacienteIDPar) => {
    return (
        await db.query(
            `SELECT 
                p.pacienteid, 
                p.nomepaciente, 
                p.datanascimento, 
                p.deleted
               FROM paciente p
               WHERE p.pacienteid = $1 AND p.deleted = false`,
            [pacienteIDPar]
        )
    ).rows[0];
};

const insertPaciente = async (pacienteREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO paciente (pacienteid,nomepaciente, datanascimento, deleted) " +
                "VALUES ($1, $2, $3, $4)",
                [
                    pacienteREGPar.pacienteid,
                    pacienteREGPar.nomepaciente,
                    pacienteREGPar.datanascimento,
                    false,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlPaciente|insertPaciente] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const updatePaciente = async (pacienteREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE paciente SET " +
                "nomepaciente = $2, " +
                "datanascimento = $3 " +
                "WHERE pacienteid = $1", 
                [
                    pacienteREGPar.pacienteid,
                    pacienteREGPar.pacienteid,
                    pacienteREGPar.nomepaciente,
                    pacienteREGPar.datanascimento,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlPaciente|updatePaciente] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};


const deletePaciente = async (pacienteREGPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE paciente SET deleted = true WHERE pacienteid = $1",
                [pacienteREGPar.pacienteid]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlPaciente|deletePaciente] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    getAllPaciente,
    getPacienteByID,
    insertPaciente,
    updatePaciente,
    deletePaciente,
};