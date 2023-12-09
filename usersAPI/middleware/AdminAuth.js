let jwt = require("jsonwebtoken");

let secretPhrase = "matheus12345";


module.exports = function(req, res, next) {

  const authToken = req.headers["authorization"];

  if(authToken != undefined) {

    const bearer = authToken.split(' ');
    let token = bearer[1];

    try {
      let decoded = jwt.verify(token, secretPhrase);
      // o 1 logo abaixo significa que é adm
      if(decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send("Você não tem permissão para prosseguir");
        return;
      }
    } catch(err) {
      res.status(403);
      res.send("Você não está autenticado");
      return;  
    }
  
  } else {
    res.status(403);
    res.send("Você não está autenticado");
    return;
  }

}