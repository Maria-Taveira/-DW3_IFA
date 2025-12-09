const express = require("express");
const routerApp = express.Router();

// --- IMPORTS ---
const appMedico = require("../apps/tutores/controller/ctlTutores");
const appPaciente = require("../apps/pets/controller/ctlPets");
const appLogin = require("../apps/login/controller/ctlLogin");
//const appPetServicos = require("../apps/pet_servicos/controller/ctlPetServicos");

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
//routerApp.get("/getAllPetServicos", appLogin.AutenticaJWT, appPetServicos.getAllPetServicos);
//routerApp.post("/getPetServicoByID", appLogin.AutenticaJWT, appPetServicos.getPetServicoByID);
//routerApp.post("/insertPetServicos", appLogin.AutenticaJWT, appPetServicos.insertPetServicos);
//routerApp.post("/updatePetServicos", appLogin.AutenticaJWT, appPetServicos.updatePetServicos);
//routerApp.post("/deletePetServicos", appLogin.AutenticaJWT, appPetServicos.deletePetServicos);

// --- ROTAS DE LOGIN ---
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;