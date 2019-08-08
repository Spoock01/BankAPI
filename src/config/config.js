class LoggedUser {
    constructor(cpf, password, token) {
      this.cpf = cpf;
      this.password =  password;
      this.token = token;
    }

    setupUserInfo(cpf, password){
        this.cpf = cpf;
        this.password = password;
    }

    setupTokenInfo(token){
        this.token = token;
    }
}

async function getLoggedUser(){
    return new LoggedUser();
}

export default getLoggedUser;