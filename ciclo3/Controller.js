const express = require('express');
const cors = require('cors');

const models = require('./models');

const app=express();
app.use(cors());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function(req,res){
    res.send('Olá mundo!')
});

app.get('/clientes', async(req,res)=>{
    await cliente.create({
        nome: "Charlon Afonso",
        endereco: "Avenida Anchieta",
        cidade: "Sarandi",
        uf: "Paraná",
        nascimento: 19/07/1999,
        clienteDesde: new Date()
    });
    res.send('O cliente foi cadastrado com sucesso!')
});

app.get('/servicos', async(req,res)=>{
    await servico.create({
        nome: "Nodejs",
        descricao: "Desenvolvimento de aplicação back-end",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('O serviço foi criado com sucesso!');
});

app.get('/pedidos', async(req,res)=>{
    await pedido.create({
        ClienteId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Pedido Realizado com sucesso!')
});

app.get('/itempedidos', async(req,res)=>{
    await itempedido.create({
        PedidoId: 1,
        ServicoId: 2,
        quantidade: 5,
        valor: 50.80
    });
    res.send('Item criado com sucesso!')
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor Ativo: http://localhost:3001');
})