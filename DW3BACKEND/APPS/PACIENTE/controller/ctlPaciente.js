const mdlPaciente = require("../model/mdlPaciente");

const getAllPaciente = async (req, res) => {
    try {
        let registro = await mdlPaciente.getAllPaciente();
        res.status(200).json({ status: "ok", registro: registro });
    } catch (error) {
        console.error("Erro no Controller [getAllPaciente]:", error);
        res.status(500).json({ message: "Erro interno ao buscar Pacientes." });
    }
};


const getPacienteByID = async (req, res) => {
    try {
        const pacienteid = parseInt(req.body.pacienteid); 

        let registro = await mdlPaciente.getPacienteByID(pacienteid);

        if (!registro) {
            return res.status(404).json({ message: "Paciente não encontrado ou inativo." });
        }
        res.status(200).json({ status: "ok", registro: [registro] });
    } catch (error) {
        console.error("Erro no Controller [getPacienteByID]:", error);
        res.status(500).json({ message: "Erro interno ao buscar Paciente por ID." });
    }
};


const insertPaciente = async (req, res) => {
    try {
        const pacienteREG = req.body; 
        
        
        let { msg, linhasAfetadas } = await mdlPaciente.insertPaciente(pacienteREG);
        
        if (linhasAfetadas > 0) {
            res.status(201).json({ "status": msg, "linhasAfetadas": linhasAfetadas });
        } else {
            res.status(400).json({ "status": msg, "linhasAfetadas": linhasAfetadas });
        }
    } catch (error) {
        console.error("Erro no Controller [insertPaciente]:", error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};


const updatePaciente = async (req, res) => {
    try {
        const pacienteREG = req.body;
        let { msg, linhasAfetadas } = await mdlPaciente.updatePaciente(pacienteREG);
        
        if (linhasAfetadas > 0) {
            res.status(200).json({ "status": msg, "linhasAfetadas": linhasAfetadas });
        } else {
            res.status(404).json({ "status": "Not Found", "linhasAfetadas": 0 });
        }
    } catch (error) {
        console.error("Erro no Controller [updatePaciente]:", error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};


const deletePaciente = async (req, res) => {
    try {
        const pacienteREG = req.body;
        
        let { msg, linhasAfetadas } = await mdlPaciente.deletePaciente(pacienteREG);
        
        if (linhasAfetadas > 0) {
            res.status(200).json({ "status": msg, "linhasAfetadas": linhasAfetadas });
        } else {
            res.status(404).json({ "status": "Not Found", "linhasAfetadas": 0 });
        }
    } catch (error) {
        console.error("Erro no Controller [deletePaciente]:", error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};

module.exports = {
    getAllPaciente,
    getPacienteByID,
    insertPaciente,
    updatePaciente,
    deletePaciente
};