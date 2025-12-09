const db = require("../../../database/databaseConfig");

const getAllMedico = async () => {
    console.log("[DEBUG-MÉDICO] Executando consulta GetAllMedico...");
    return (
        await db.query(
            `SELECT 
                m.medicoid,
                m.nomemedico,
                m.especialidade,
                m.deleted
                from medico m
                WHERE deleted = false ORDER BY nomemedico ASC`
        )
    ).rows;
};


const getMedicoByID = async (idPar) => {
    return (
        await db.query(
            `SELECT 
                m.medicoid, 
                m.medicoid, 
                m.especialidade 
                from medico m 
                WHERE medicoid = $1 AND deleted = false`, 
                [idPar]
        )
    ).rows[0];
};



const insertMedico = async (nomeMedicoPar, especialidePar) => {
    
    let linhasAfetadas;
    let msg = "ok";
    let tutorid = 0;

    try {
        const result = await db.query( 
            "INSERT INTO medico (nomemedico,especialidade) " +
            "VALUES ($1, $2) RETURNING medicoid", 
            [nomePar, especialideParPar]
        );
        
        if (result.rows.length > 0) {
            medicoid = result.rows[0].medicoid;
            linhasAfetadas = 1; 
        } else {
            linhasAfetadas = 0;
        }

    } catch (error) {
        msg = "[mdlMedico|insertMedico] " + error.detail;
        linhasAfetadas = -1; 
    }

    return { msg, linhasAfetadas, medicoid }; 
};



const updateMedico = async (meidicoREGPar) => {
    
    let linhasAfetadas;
    let msg = "ok";
    
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE medico SET " +
                "nomemedico = $2, " +
                "especialidade = $3 " +
                "WHERE tutorid = $1",
                [
                    medicoREGPar.medicoid,
                    medicoREGPar.nomemedico,
                    medicoREGPar.especialidade,
                ]
            )
        ).rowCount;
        
    } catch (error) {
        msg = "[mdlMedico|updateMedico] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};



const deleteMedico = async (MedicoREGPar) => {
    
    let linhasAfetadas;
    let msg = "ok";
    
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE medico SET " + 
                "deleted = true " + 
                "WHERE medicoid = $1",
                [
                    medicoREGPar.medicoid
                ]
            )
        ).rowCount;
        
    } catch (error) {
        msg = "[mdlMedico|deleteMedico] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};


module.exports = {
    getAllMedico,
    getMedicoByID,
    insertMedico, 
    updateMedico,
    deleteMedico
};