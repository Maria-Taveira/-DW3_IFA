const mdlPets = require("../model/mdlPaciente");

const getAllPaciente = (req, res) =>
  (async () => {
    let registro = await mdlPaciente.getAllPaciente();
    res.json({ status: "ok", "registro": registro });
})();


const getPacienteByID = (req, res) =>
  (async () => {
    const pacienteid = parseInt(req.body.pacienteid);

    let registro = await mdlPaciente.getPacienteByID(pacienteid);
    res.json({ status: "ok", "registro": registro });
})();


const insertPaciente = (request, res) =>
  (async () => {
    const pacienteREG = request.body; 
    
    let { msg, linhasAfetadas } = await mdlPaciente.insertPaciente(pacienteREG);
    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();


const updatePaciente = (request, res) =>
  (async () => {
    const pacienteREG = request.body;
    let { msg, linhasAfetadas } = await mdlPaciente.updatePaciente(pacienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
})();


const deletePaciente = (request, res) =>
  (async () => {
    const pacienteREG = request.body;
    
    let { msg, linhasAfetadas } = await mdlPaciente.deletePaciente(pacienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllPaciente,
  getPacienteByID,
  insertPaciente,
  updatePaciente,
  deletePaciente
};