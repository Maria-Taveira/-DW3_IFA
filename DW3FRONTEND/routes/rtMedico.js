var express = require('express');
var router = express.Router();
function authenticationMiddleware(req, res, next) {
    if (!req.session.isLogged) return res.redirect("/Login");
    next();
}

router.get('/', authenticationMiddleware, function (req, res, next) {
    parametros = { title: 'Módulos > Medico', userName: req.session.userName };
    res.render('medico/view/vwMedico.njk', { parametros });
});

router.get('/manutencao', authenticationMiddleware, function (req, res, next) {
    parametros = { title: 'Módulos > Medico > Manutenção', userName: req.session.userName };
    res.render('medico/view/vwMedManutencao.njk', { parametros });
});

module.exports = router;