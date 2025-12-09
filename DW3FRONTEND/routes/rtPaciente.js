// dw3frontend/routes/rtPaciente.js
var express = require('express');
var router = express.Router();

function authenticationMiddleware(req, res, next) {
    if (!req.session.isLogged) return res.redirect("/Login");
    next();
}

router.get('/', authenticationMiddleware, function (req, res, next) {
    parametros = { title: 'Módulos > Paciente', userName: req.session.userName };
    res.render('paciente/view/vwPaciente.njk', { parametros });
});

router.get('/manutencao', authenticationMiddleware, function (req, res, next) {
    parametros = { title: 'Módulos > Paciente > Manutenção', userName: req.session.userName };
    res.render('paciente/view/vwPacManutencao.njk', { parametros });
});

module.exports = router;