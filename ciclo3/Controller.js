const express = require('express');
const cors = require('cors');

const models = require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function(req,res){
    res.send('Olá mundo!')
});

app.post('/clientes', async(req,res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'O cliente foi cadastrado com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'O serviço foi criado com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossível se conectar!'
        })
    });
});

app.post('/pedidos', async(req,res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'O pedido foi efetuado com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossível se conectar!'
        })
    });
});

app.post('/itempedidos', async(req,res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'O Item Pedido foi inserido com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossível se conectar!'
        })
    });
});

app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        //raw: true
        order: [['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        order: [['clienteDesde', 'ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/listaitempedidos', async(req,res)=>{
    await itempedido.findAll({
        order:[['valor', 'DESC']]
    }).then(function(itemspedidos){
        res.json({itemspedidos})
    });
});

app.get('/ofertaservicos', async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/qtdcliente', async(req,res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});

app.get('/qtdpedido', async(req,res)=>{
    await pedido.count('id').then(function(pedidos){
        res.json({pedidos});
    });
});

app.get('/servico/:id', async(req,res)=>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível se conectar!"
        });
    });
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor Ativo: http://localhost:3001');
})