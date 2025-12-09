const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs"); 
const mdlLogin = require("../model/mdlLogin"); 

// login
const Login = async (req, res, next) => { 
    const { UserName, Password } = req.body;
    
    const credencial = await mdlLogin.GetCredencial(UserName);

    if (credencial.length == 0) {
        return res.status(401).json({ message: "Usuário ou senha inválidos." }); 
    }  

    if (bCrypt.compareSync(Password, credencial[0].password)) {
        
        const username = credencial[0].username;
        const userId = credencial[0].userid; // 💡 
        
        const token = jwt.sign({ username: username, id: userId }, process.env.SECRET_API, {
            expiresIn: '30d', 
        });
        
        return res.json({ auth: true, token: token, username: username });
    }

    res.status(401).json({ message: "Usuário ou senha inválidos." });
};


function AutenticaJWT(req, res, next) {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader)
      return res.status(401).json({ auth: false, message: "Não foi informado o token JWT" });
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
        if (err)
            return res.status(403).json({ auth: false, message: "JWT inválido ou expirado" });

        req.userId = decoded.id; 
        
        next();
    });
}

const Logout = (req, res, next) => {
    res.json({ auth: false, token: null });
};

module.exports = {
    Login,
    Logout,
    AutenticaJWT,
};