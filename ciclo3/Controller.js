// Depois que instalamos as dependencias, é necessário chama las
// Para tanto é necessário usar o comando require

const express = require('express'); //express permite trabalharmos com ROTA
const cors = require('cors'); // cors funciona como meio campo entre as rotas, é item de seguraça
const {Sequelize} = require('./models');//sequelize tem relação com as models, para buscar os dados na models
const models = require('./models');//importa o que está dentro da models
const { all } = require('express/lib/application');
//./ um ponto significa que está no mesmo nivel, o controller e a model
//../ dois pontos dois niveis abaixo

//toda vez que falaramos da aplicação utilizaremos o app
const app=express(); //diz que a nossa aplicação utiliza o express, ou seja rotas

app.use(cors());
app.use(express.json());//diz que a aplicação utiliza formato json, associado a uma rota por isso usa express
// O formato json se caracteriza por uma chave abrindo e chave fechando
// E dentro temos a chave e o dado atribuido a essa chave



let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

let compra = models.Compra;
let itemcompra = models.ItemCompra;
let produto = models.Produto;

//metodo get serve para exibir algo na tela
app.get('/', function(req,res){
    res.send('Olá mundo!')
});
//async assincrono não exige resposta
app.post('/clientes', async(req,res)=>{
    //await irá aguardar a requisição para executar o metodo
    await cliente.create(
        //req body significa que os dados para criar cliente estão no corpo 
        //da pagina
        req.body
    ).then(cli=>{//then se deu certo ele retorna resposta no formato json
        //cli é objeto que acabou de ser criado
        return res.json({
            error: false,
            message: 'O cliente foi cadastrado com sucesso!',
            cli //o objeto cli será retornado
        })
    }).catch(function(erro){ // catch se der errado retorne uma resposta se status for 400 no formato json
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

app.post('/pedido/:id/cliente', async(req,res)=>{
    const ped = {
        data: req.body.data,//no corpo da página só precisa definir a data, o cliente id será capturado do parametro da rota
        ClienteId: req.params.id
    };
    //antes de cria o pedido, precisa vericar se o cliente existe, porque todo pedido deve estar associado a um cliente
    //se não encontrar cliente com base no id passado no parametro da rota então o cliente não existe
    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe!'
        });
    };
    //vai cria o pedido com base nas chaves e os dados atribuido a elas que estão na variavel ped
    await pedido.create(ped)
    .then(pedCli=>{
        return res.json({
            error: false,
            message: 'O pedido foi efetuado com sucesso!',
            pedCli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: 'Foi impossível se conectar!'
        });
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
    }).then(clientes=>{
        return res.json({
            error: false,
            clientes
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            message: 'Erro de conexão'
        });
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

//Exibe todos os clientes com tudo o que ele se relaciona
app.get('/clientes-pedidos', async(req,res)=>{
    await cliente.findAll({include: [{all: true}]})
    .then(clientes=>{
        return res.json({
            error: false,
            clientes
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            message: 'Erro de conexão'
        });
    });
});

//Exibir todos os pedidos de um cliente
app.get('/cliente/:id/pedidos', async(req,res)=>{
    await pedido.findAll({
        //Where é uma regra, retorne todos os pedidos de um cliente
        //Se o cliente id for igual ao passado no parametro
        where: {ClienteId: req.params.id}
    }).then(pedidos=>{
        return res.json({
            error: false,
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: 'Erro de conexão'
        });
    });
});

app.get('/cliente/:id', async(req,res)=>{
    await cliente.findAll({
        //where é uma condição que significa que o ServicoId
        //tem que ser igual ao id passado no parametro da rota
        //Se a condição for verdade então ele retorna todos os
        //pedidos que tenha o id do serviço
        where: {id:req.params.id}})
    .then(clientes=>{
        return res.json({
            error: false,
            clientes
    })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: não foi possível se conectar!"
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

app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id)
    .then(pedi =>{
        return res.json({
            error: false,
            pedi
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possivel se conectar!'
        });
    });
});

//aula12
app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        // ped vem lá do postman
        return res.json({ped});
    });
});


//Igual a de cima mas mais curta
// app.get('/pedidos/:id', async(req,res)=>{
//     await pedido.findByPk(req.params.id,{include:[{all: true}]})
//     .then(clientes=>{
//         return res.json({clientes});
//     });
// });

app.get('/teste/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id, {include:[{all:true}]})
    
});

app.get('/infoclientes', async(req,res)=>{
    await pedido.findByPk(req.body.id,{include:[{all:true}]})
    .then(ser=>{
        return res.json({ser});
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

// app.put('/atualizaservico', async(req,res)=>{
//         await servico.update(req.body,{
//             where:{id: req.body.id} //a condição where é passado no corpo da pagian
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
        where:{id: req.params.id}}) // a condição é passada no parametro rota
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
//Atualizar o pedido me
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
//Atualizar o pedido com base no id prof
app.put('/pedido/:id/atualizar', async(req,res)=>{
    const pedi = {
        id: req.params.id,
        ClienteId: req.body.ClienteId,
        data: req.body.data
    };
    if(!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe!'
        });
    };

    await pedido.update(pedi, {
        //Toda vez que tem chave estrangeira e vai realizar
        //alteração, exclusão é necessário fazer essa comparação
        //Vai a fazer duas comparações então usa sequelize.and
        //Vai comparar se o clienteId do pedido é igual ao passado no corpo da pagina
        // e também vai comparar se id do pedido é igual do id passado no parametro
        where: Sequelize.and({ClienteId: req.body.ClienteId},
        {id:req.params.id})
    }).then(pedidos=>{
        return res.json({
            error: false,
            message: 'Pedido alterado com sucesso!',
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: 'Não foi possível alterar o pedido'
        });
    });
});

//aula 13
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
app.get('/excluirItemPedido/:id/excluir', async(req,res)=>{
    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'O pedido não existe!'
        });
    };
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'O serviço não existe!'
        });
    };
    await itempedido.destroy({
        where: Sequelize.and({PedidoId: req.params.id}, 
        {ServicoId: req.body.ServicoId})
    }).then(function(){
        return res.json({
            error: false,
            message: 'O item pedido foi excluído com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível excluir o item pedido.'
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