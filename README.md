# BANK API

Essa API foi feita para participar do desafio da FUZE.
A API aceita as seguintes operações:
  - Registro
  - Login
  - Consulta ao Saldo
  - Consulta todas as transações realizadas por um cpf
  - Transações de Crédito e Débito

## Como Testar 

Para realizar os testes, é necessário ter o [Postgres v11](https://www.postgresql.org/download/) instalado. 
* Baixar ou clonar esse repositório
* Após realizar a instalação, um banco de dados deve ser criado com o nome "BankAPI" (sem aspas);
Para facilitar, todas as opções foram deixadas no padrão durante a instalação. Em caso de erro, verificar o arquivo *index.js* presente na pasta *models*. *(src/models/index.js)*
* Bank API também necessita do [Node.js](https://nodejs.org/) instalado.
* Com todas as dependências instaladas, utilizando a linha de comando ou o terminal no vscode, digite o seguinte comando:
```sh
npm run dev
```

#### Rotas suportadas


| Serviço | Rota |
| ------ | ------ |
| Login | http://localhost:9999/user/login |
| Registro | http://localhost:9999/user/register |
| Realizar Transações | http://localhost:9999/transaction/operation |
| Saldo | http://localhost:9999/transaction/clientTransactions |
| Transações realizadas | http://localhost:9999/transaction/balance|

Durante o desenvolvimento, o [Postman](https://www.getpostman.com/) foi utilizado para fazer as requisições.

##### Exemplos

###### Registro [POST Request]: 
* http://localhost:9999/user/register?full_name=NomeCompleto&cpf=000.000.000-00&password=******

```sh
{
    "success": "User successfully registered!"
}
```

###### Login [POST Request]:
* http://localhost:9999/user/login?cpf=000.000.000-00&password=******
Um login efetuado com sucesso deverá responder com um JSON e um TOKEN para acesso. O TOKEN tem validade por 1800 segundos.

```sh
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiIwMDAuMDAwLjAwMC0wMSIsImlhdCI6MTU2NTMyODEyNSwiZXhwIjoxNTY1MzI5OTI1fQ.oRljCtcmueAq1dgivpeNK82ljoJSrt24l-7SuBtkUoc"
}
```
###### Transações [POST Request]:

Operações suportadas { CREDITO, DEBITO } para Depósito e Saque, respectivamente.
* http://127.0.0.1:9999/transaction/operation?cpf=000.000.000-00&amount=200.2&transaction_type=CREDITO
__Importante__: O TOKEN de acesso deve ser enviado no header, na chave "Authorization".

![Exemplo](https://i.imgur.com/P8Yt6bt.png)

License
----

MIT
