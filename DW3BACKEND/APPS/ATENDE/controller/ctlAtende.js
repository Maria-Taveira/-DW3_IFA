const mdlAtende = require("../model/mdlAtende");

const getAllAtende = (req, res) =>
  (async () => {
    let registro = await mdlAtende.getAllAtende();
    res.json({ status: "ok", "registro": registro });
})();

const getAtendeByID = (req, res) =>
  (async () => {
    const petAtendeID = parseInt(req.body.atendeid);
    let registro = await mdlAtende.getAtendeByID(atendeID);

    res.json({ status: "ok", "registro": registro });
})();


const insertAtende = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlAtende.insertAtende(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
})();

const updateAtende = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlAtende.updateAtende(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();


//deleta as paradas  
const deleteAtende = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlAtende.deleteAtende(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllAtende,
  getAtendeByID,
  insertAtende,
  updateAtende,
  deleteAtende
};