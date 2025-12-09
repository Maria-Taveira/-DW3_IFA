const mdlMedico = require("../model/mdlMedico");




const getAllMedico = async (req, res, next) => {
    try {
        const registro = await mdlMedico.getAllMedico();
        res.status(200).json({ status: "ok", registro });

    } catch (error) {
        console.error("Erro no Controller [getAllMedico]:", error);
        res.status(500).json({ message: "Erro interno ao buscar médicos." });
    }
};


const getMedicoByID = async (req, res, next) => {
    try {
        const id = req.body.medicoid;
        const registro = await mdlMedico.getMedicoByID(id);

        if (!registro) {
            return res.status(404).json({ message: "Medico não encontrado ou inativo." });
        }
        res.status(200).json({ status: "ok", registro: [registro] });     
    }catch (error) {
        console.error("Erro no Controller [getMedicoByID]:", error);
        res.status(500).json({ message: "Erro interno ao buscar Medico por ID." });
    }
};

const insertMedico = async (req, res, next) => {
    try {
        const { nomemedico, especialidade } = req.body;
        
        if (!nomemedico || !especialidade) { 
            return res.status(400).json({ message: "Nome e especialidade são obrigatórios para o cadastro." });
        }

        const { msg, linhasAfetadas } = await mdlMedico.insertMedico(
            nomemedico, especialidade
        );
        
        if (linhasAfetadas > 0) {
            res.status(201).json({ 
                message: "Medico inserido com sucesso!",
                status: msg 
            });
        } else {
            res.status(400).json({ message: "Falha ao inserir médico.", status: msg });
        }
    } catch (error) {
        console.error("Erro no Controller [insertMedico]:", error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};


const updateMedico = async (req, res, next) => {
    try {
        const medicoREGPar = req.body;
        
        if (!medicoREGPar.medicoid) {
            return res.status(400).json({ message: "ID do médico é obrigatório para atualização." });
        }
        
        const { msg, linhasAfetadas } = await mdlMedico.updateMedico(medicoREGPar);

        if (linhasAfetadas > 0) {
            res.status(200).json({ 
                message: "Médico atualizado com sucesso!",
                linhasAfetadas: linhasAfetadas,
                status: msg 
            });
        } else {
            res.status(404).json({ message: "Médico não encontrado ou ID inválido.", status: msg });
        }
    } catch (error) {
        console.error("Erro no Controller [updateMedico]:", error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};


const deleteMedico = async (req, res, next) => {
    try {
        const medicoREGPar = req.body; 
        
        if (!medicoREGPar.medicoid) {
            return res.status(400).json({ message: "ID do médico é obrigatório para deletar." });
        }

        const { msg, linhasAfetadas } = await mdlMedico.deleteMedico(medicoREGPar);
        
        if (linhasAfetadas > 0) {
            res.status(200).json({ 
                message: "Médico desativado com sucesso (Soft Delete).",
                linhasAfetadas: linhasAfetadas,
                status: msg 
            });
        } else {
            res.status(404).json({ message: "Médico não encontrado ou ID inválido para desativação.", status: msg });
        }
    } catch (error) {
        console.error("Erro no Controller [deleteMedico]:", error); 
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};

module.exports = {
    getAllMedico,
    getMedicoByID,
    insertMedico,
    updateMedico,
    deleteMedico
};