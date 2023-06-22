import api from "./api";

const services = {
  login (email, senha, callback){
    api.get("/logins/"+email).then ((response) => {
      if (response.data.id == undefined){
        callback (false);
      } else {
        if (response.data.senha == senha){
          api.get("/logins/" + response.data.id).then((response) => {
            callback (true);
          })
        } else {
          callback (false);
        }
      }
    }).catch((error) => {callback(false);})
  },

  async cadastrarCliente(e){
    e.preventDefault();
    const data = {
      nome: this.nome,
      id: this.id,
      senha: this.senha,
      telefone: this.telefone,
      cpf: this.cpf
    }

    try {
      const response = await api.post("/logins", data);
      console.log(response.data);
      alert("Cadastro realizado com sucesso!");
      this.$router.push("/");
    } catch (error) {
      console.error("Erro ao cadastrar cliente", error);
    }
  },
};


export default services;
