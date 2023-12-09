var knex = require('../database/connection');
var bcrypt = require('bcrypt');

class User {
  // cria um usuário no banco de dados:
  async new(name, email, password) {
    try {
      var hash = await bcrypt.hash(password, 10);

      await knex
        .insert({ name, email, password: hash, role: 0 })
        .table('users');
    } catch (err) {
      console.log(err);
    }
  }
  // procura o email do usuário no banco de dados:
  async findEmail(email) {
    try {
      var result = await knex.select('*').from('users').where({ email: email });

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async searchByEmail(email) {
    try {
      let result = await knex
        .select(['id', 'name', 'email', 'password', 'role'])
        .where({ email: email })
        .table('users');

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log({ err: 'Usuário não encontrado!' });
      return undefined;
    }
  }
  
  // procura o usuário no banco de dados e retorna alguns dados, como na query abaixo:
  async searchUser() {
    try {
      let result = await knex
        .select(['id', 'name', 'email', 'role'])
        .table('users');
      return result;
    } catch (err) {
      console.log({ err: 'Usuário não encontrado!' });
      return [];
    }
  }
  // procura o usuário no banco com base no id:
  async searchById(id) {
    try {
      let result = await knex
        .select(['id', 'name', 'email', 'role'])
        .where({ id: id })
        .table('users');

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log({ err: 'Usuário não encontrado!' });
      return undefined;
    }
  }
  // função de atualizar dados do usuário
  async updatedUser(id, name, email, role) {
    let user = await this.searchById(id);
    if (user != undefined) {
      let userEdit = {};

      if (email != undefined) {
        if (email != user.email) {
          let result = await this.findEmail(email);
          if (result == false) {
            userEdit.email = email;
          }
        } else {
          return { status: false, err: 'O email já está cadastrado!' };
        }
      }

      if (name != undefined) {
        userEdit.name = name;
      }

      if (role != undefined) {
        userEdit.role = role;
      }

      try {
        await knex.update(userEdit).where({ id: id }).table('users');
        return { status: true };
      } catch (err) {
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: 'O usuário não existe!' };
    }
  }
  // função de deletar o usuário
  async delete(id) {
    let user = await this.searchById(id);
    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table('users');
        return { status: true };
      } catch (err) {
        return { status: false, err: err };
      }
    } else {
      return {
        status: false,
        err: 'O usuário não existe, portanto não pode ser deletado!',
      };
    }
  }
}

module.exports = new User();
