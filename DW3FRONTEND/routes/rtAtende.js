var express = require('express');
var router = express.Router();

//@ Middleware de autenticação
function authenticationMiddleware(req, res, next) {
    if (!req.session.isLogged) {
        return res.redirect("/Login");
    }
    next();
}

/* GET Rota de Listagem/CRUD: /atende */
router.get('/', authenticationMiddleware, function (req, res, next) {
    parametros = { title: 'Módulos > Atende', userName: req.session.userName };
    res.render('atende/view/vwAtende.njk', { parametros });
});

/* GET Rota de Manutenção: /atende/manutencao */
router.get('/manutencao', authenticationMiddleware, function (req, res, next) {
    parametros = { title: 'Módulos > Atendimentos > Manutenção', userName: req.session.userName };
    res.render('atende/view/vwAtendeManutencao.njk', { parametros });
});

module.exports = router;