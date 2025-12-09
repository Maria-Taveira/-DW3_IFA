const express = require("express");
const routerApp = express.Router();

// --- IMPORTS ---
const appMedico = require("../apps/medico/controller/ctlMedico");
const appPaciente = require("../apps/paciente/controller/ctlPaciente");
const appLogin = require("../apps/login/controller/ctlLogin");
const appAtende = require("../apps/atende/controller/ctlAtende");

// Middleware padrão
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});


// --- ROTAS DE Medico ---
routerApp.get("/getAllMedico", appLogin.AutenticaJWT, appMedico.getAllMedico);
routerApp.post("/getMedicoByID", appLogin.AutenticaJWT, appMedico.getMedicoByID);
routerApp.post("/insertMedico", appLogin.AutenticaJWT, appMedico.insertMedico);
routerApp.post("/updateMedico", appLogin.AutenticaJWT, appMedico.updateMedico);
routerApp.post("/deleteMedico", appLogin.AutenticaJWT, appMedico.deleteMedico);


// --- ROTAS DE Paciente ---
routerApp.get("/getAllPaciente", appLogin.AutenticaJWT, appPaciente.getAllPaciente);
routerApp.post("/getPacienteByID", appLogin.AutenticaJWT, appPaciente.getPacienteByID);
routerApp.post("/insertPaciente", appLogin.AutenticaJWT, appPaciente.insertPaciente);
routerApp.post("/updatePaciente", appLogin.AutenticaJWT, appPaciente.updatePaciente);
routerApp.post("/deletePaciente", appLogin.AutenticaJWT, appPaciente.deletePaciente);


// --- ROTAS DE ATENDIMENTOS ---
routerApp.get("/getAllAtende", appLogin.AutenticaJWT, appAtende.getAllAtende);
routerApp.post("/getAtendeByID", appLogin.AutenticaJWT, appAtende.getAtendeByID); // 🚨 CORRIGIDO
routerApp.post("/insertAtende", appLogin.AutenticaJWT, appAtende.insertAtende);
routerApp.post("/updateAtende", appLogin.AutenticaJWT, appAtende.updateAtende);
routerApp.post("/deleteAtende", appLogin.AutenticaJWT, appAtende.deleteAtende);

// --- ROTAS DE LOGIN ---
routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);

module.exports = routerApp;