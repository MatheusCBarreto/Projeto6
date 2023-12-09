var User = require("../models/User");
let jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');

let secretPhrase = "matheus12345";

class UserController {
  
  // criação de usuários
  async create(req, res) {
    let {name, email, password} = req.body;

    if(email == undefined || email == '' || email == ' ') {
      res.status(400);
      res.send("Email inválido!");
      return;
    }
    res.status(200);
    res.send("Tudo Ok!")

    var alreadyExistsEmail = await User.findEmail(email);
    if(alreadyExistsEmail) {
      res.status(406);
      res.send("Email já cadastrado!")
      return;
    }
    await User.new(name, email, password);

  }

  // listagem de usuários
  async index(req, res) {
    let users = await User.searchUser();
    res.json(users)
  }

  // busca de usuários por id
  async searchUserById(req, res) {
    let id = req.params.id;
    let user = await User.searchById(id);
    
    if(user == undefined) {
      res.status(404);
      res.json({});
    } else {
      res.json(user)
    }
  }

  // atualizar dados do usuário
  async updateUser(req, res) {
    let {id, name, email, role} = req.body;
    let result = await User.updatedUser(id, name, email, role);

    if(result != undefined) {
      if(result.status) {
        res.status(200);
        res.send("Dados atualizados com sucesso!")
      }
    } else {
      res.status(422);
      res.send("The request was well-formed but was unable to be followed due to semantic errors.")
    }
  }

  // função de deletar usuáio
  async userDelete(req, res) {
    let id = req.params.id;
    let result = await User.delete(id);

    if(result.status) {
      res.status(200);
      res.send("Usuário deletado com sucesso!");
    } else {
      res.status(406);
      res.send(result.err);
    }
  }

  async login(req, res) {
    let {email, password} = req.body;
    let user = await User.searchByEmail(email);

    if(user != undefined) {
      let result = await bcrypt.compare(password, user.password);
  
      if(result) {
        let token = jwt.sign({email: user.email, role: user.role}, secretPhrase);
        res.status(200);
        res.json({token: token})

      } else {
        res.status(406);
        res.json({err: "Senha incorreta!"})
      }
    } else {
      res.status(406);
      res.json({status: false, err: "O usuário não existe!"});
    }

  }

}

  

module.exports = new UserController;