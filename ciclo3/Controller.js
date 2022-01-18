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

let compra = models.Compra;
let itemcompra = models.ItemCompra;
let produto = models.Produto;

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

app.get('/listapedidos', async(req,res)=>{
    await pedido.findAll({
        order:[["id", "DESC"]]
    }).then(function(pedidos){
        res.json({pedidos})
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

// app.put('/atualizaservico', async(req,res)=>{
//         await servico.update(req.body,{
//             where:{id: req.body.id}
//         }).then(function(){
//             return res.json({
//                 error: false,
//                 message: "Serviço foi alterado com sucesso!"
//             })
//         }).catch(function(erro){
//             res.status(400).json({
//                 error: true,
//                 message: "Erro na alteração do serviço."
//         });
//     });
// });

app.put('/atualizaservico/:id', async(req,res)=>{
    await servico.update(req.body,{
        where:{id: req.params.id}})
        .then(function(){
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

app.get('/teste/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id, {include:[{all:true}]})
    
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

app.put('/pedidos/:id/editarpedido', async(req,res)=>{
    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não encontrado!'
        });
    };
    await pedido.update(req.body, {
        where: {id:req.params.id}
    }).then(function(pedi){
        return res.json({
            error: false,
            message: 'Pedido alterado com sucesso!',
            pedi
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível alterar o pedido.'
        });
    });
});

//aula 13

app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/excluircliente/:id', async(req,res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: 'Cliente foi excluído com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir o cliente.'
        });
    });
});

app.get('/excluirservico/:id', async(req,res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: 'Serviço excluído com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir o serviço.'
        });
    });
});

app.get('/excluirpedido/:id', async(req,res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: 'O pedido foi excluído com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir o pedido.'
        });
    });
});

//aula 5 de react

app.get('/servico/:id/pedidos', async(req,res)=>{
    await itempedido.findAll({
        //where é uma condição que significa que o ServicoId
        //tem que ser igual ao id passado no parametro da rota
        //Se a condição for verdade então ele retorna todos os
        //pedidos que tenha o id do serviço
        where: {ServicoId:req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível se conectar!"
        });
    });
});


//DESAFIO NODE JS

app.post('/produtos', async(req,res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'O produto foi criado com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        })
    });
});

app.post('/compras', async(req,res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'A compra foi realizada com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossível se conectar!'
        })
    });
});

app.post('/itemcompras', async(req,res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'O item compra foi inserido com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível inserir o item compra.'
        })
    });
});

// app.get('/servico/:id', async(req,res)=>{
//     await servico.findByPk(req.params.id)
//     .then(serv =>{
//         return res.json({
//             error: false,
//             serv
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro: não foi possível se conectar!"
//         });
//     });
// });

app.get('/consultar1produto/:id', async(req,res)=>{
    if(!await produto.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'O produto não existe!'
        });
    };
    await produto.findByPk(req.params.id)
    .then(prod =>{
        return res.json({
            error: false,
            prod
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        });
    });
});

// app.get('/pedidos/:id', async(req,res)=>{
//     await pedido.findByPk(req.params.id,{include:[{all: true}]})
//     .then(ped=>{
//         return res.json({ped});
//     });
// });

app.get('/consultarCompra/:id', async(req,res)=>{
    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'A compra não existe!'
        });
    };
    await compra.findByPk(req.params.id, {include:[{all: true}]})
    .then(compr =>{
        return res.json({compr});
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        });
    });
});

app.get('/listarcompras', async(req,res)=>{
    await compra.findAll({
        order: [['id', 'ASC']]
    }).then(function(compras){
        res.json({compras})
    });
});

app.get('/listarItemCompra', async(req,res)=>{
    await itemcompra.findAll({
        order: [['valor', 'ASC']]
    }).then(function(itens){
        res.json({itens})
    });
});

app.get('/listarProdutos', async(req,res)=>{
    await produto.findAll({
        order: [['id', 'ASC']]
    }).then(function(produtos){
        res.json({produtos})
    });
});

app.put('/atualizarCompra', async(req,res)=>{
    if(!await compra.findByPk(req.body.id)){
        return res.status(400).json({
            error: true,
            message: 'Compra não existe!'
        });
    };
    await compra.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: 'Compra alterada com sucesso!'
        })
    }).catch(function(erro){
        res.status(400).json({
            error: true,
            message: 'Não foi possível alterar a compra'
        });
    });
});

app.put('/atualizarItemCompra/:id/editarItem', async(req,res)=>{
    const itemCompra = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Compra não existe!'
        });
    };
    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não existe!'
        });
    };
    await itemcompra.update(itemCompra, {
        where: Sequelize.and({CompraId: req.params.id},
        {ProdutoId: req.body.ProdutoId})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Item compra alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível alterar item compra'
        });
    });
});

app.put('/atualizarProduto', async(req,res)=>{
    if(!await produto.findByPk(req.body.id)){
        return res.status(400).json({
            error: true,
            message: 'O produto não existe!'
        });
    };
    await produto.update(req.body, {
        where: {id: req.body.id}
    }).then(function(produto){
        return res.json({
            error: false,
            message: 'Produto alterado com sucesso!',
            produto
        })
    }).catch(function(erro){
        res.status(400).json({
            error: true,
            message: 'Não foi possível alterar o produto.'
        });
    });
});

app.get('/excluirCompra', async(req,res)=>{
    if(!await compra.findByPk(req.body.id)){
        return res.status(400).json({
            error: true,
            message: 'A compra não existe!'
        });
    };
    await compra.destroy({
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: 'Compra excluída com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível excluir o cliente.'
        });
    });
});

app.get('/excluirItemCompra/:id/excluir', async(req,res)=>{
    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'A compra não existe!'
        });
    };
    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'O produto não existe!'
        });
    };
    await itemcompra.destroy({
        where: Sequelize.and({CompraId: req.params.id}, 
        {ProdutoId: req.body.ProdutoId})
    }).then(function(){
        return res.json({
            error: false,
            message: 'O item compra foi excluído com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível excluir o item compra.'
        });
    });
});

app.get('/excluirProduto', async(req,res)=>{
    if(!await produto.findByPk(req.body.id)){
        return res.status(400).json({
            error: true,
            message: 'O produto não existe'
        });
    };
    await produto.destroy({
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: 'O produto foi excluído com sucesso!'
        });
    }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: 'Não foi possível excluir o produto.'
        });
    });
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor Ativo: http://localhost:3001');
})