const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

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
//não funciona
// app.get('/pedidoscliente/:id', async(req,res)=>{
//     await pedido.findByPk(req.params.id, {include:[{all:true}]})
//     .then(pedi=>{
//         return res.json({
//             error: false,
//             pedi
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro não foi possível se conectar!"
//         });
//     });
// });

// app.get('/atualizaservico', async(req,res)=>{
//     await servico.findByPk(1)
//     .then(serv =>{
//         serv.nome = 'HTML/CSS';
//         serv.descricao = 'Páginas estáticas e dinamicas estilizadas';
//         serv.save();
//         return res.json({serv})
//     });
// });

app.put('/atualizaservico', async(req,res)=>{
        await servico.update(req.body,{
            where:{id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: "Serviço foi alterado com sucesso!"
            })
        }).catch(function(erro){
            res.status(400).json({
                error: true,
                message: "Erro na alteração do serviço."
        });
    });
});
//aula12
app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

app.get('/infoclientes', async(req,res)=>{
    await pedido.findByPk(req.body.id,{include:[{all:true}]})
    .then(ser=>{
        return res.json({ser});
    });
});

app.put('/pedidos/:id/editaritem', async(req,res)=>{
    const item={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };//! significa não se não encontrar id
    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({//params captura do link
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };                          //captura do corpo da requisiçao
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        })
    };
    await itempedido.update(item,{
        where: Sequelize.and({ServicoId:req.body.ServicoId},
            {PedidoId:req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Pedido alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível alterar.'
        });
    });
});

app.put('/clientes/:id/editarcliente', async(req,res)=>{
    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não encontrado!'
        });
    };
    await cliente.update(req.body, {
        where: {id:req.params.id}
    }).then(function(client){
        return res.json({
            error: false,
            message: 'Cliente alterado com sucesso!',
            client
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível alterar o cliente.'
        });
    });
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor Ativo: http://localhost:3001');
})