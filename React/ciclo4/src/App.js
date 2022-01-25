// favicon é o icone que aparece no canto superior do navegador
import './App.css';
// Importando a dependencia do react router dom
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// Importando as views que serão acessadas quando o usuário acessar a rota
import { Home } from './views/Home';
import { ListarClientes } from './views/Cliente/ListarClientes/';
import { ListarPedidos } from './views/Pedido/ListarPedidos/index.js';
import {Item} from './views/Servico/Item/index.js';
import { ListarServicos } from './views/Servico/ListarServicos';
import { Menu } from './components/Menu';
import { Cadastrar } from './views/Servico/cadastrar/index.js';
import { CadastrarCliente } from './views/Cliente/cadCliente';
import { CadastrarPedido } from './views/Pedido/cadastrar';
import { ExcluirServico } from './views/Servico/excluir';
import { ExcluirCliente } from './views/Cliente/excluirCli';
import { EditarCliente} from './views/Cliente/editCliente';
import { EditarServico } from './views/Servico/editServico';
import { ExcluirPedido } from './views/Pedido/excluirPedi';
import { EditarPedido } from './views/Pedido/editPedido';
import { BuscarCliente } from './views/Pedido/buscaClient';
import { ListarItensPedidos } from './views/ItemPedido/ListarItensPed';
import { CadastrarItemPed } from './views/ItemPedido/cadItemPed';
import { BuscarPedCli } from './views/Cliente/buscPedCli';
import { ExcluirItemPed } from './views/ItemPedido/excluItemPed';
import { EditarItem } from './views/ItemPedido/editarItem';
import { ListarCompras } from './views/Compras/listarCompras';
import { ListarProdutos } from './views/Produtos/listarProdutos';
import { BuscarComCli } from './views/Cliente/busCompClien';
import { BuscarClienComprou } from './views/Compras/buscClient';
import { CadastrarCompra } from './views/Compras/cadCompra';
import { EditarCompra } from './views/Compras/editCompra';
import { ExcluirCompra } from './views/Compras/excluirCompra';
import { BuscarCompras } from './views/Produtos/buscarComp';
import { EditarProduto } from './views/Produtos/editProduto';
import { ExcluirProduto } from './views/Produtos/excluirProduto';
import { CadastrarProduto } from './views/Produtos/cadProduto';
import { ListarItensProdutos } from './views/ItemProduto/listarItemProduto';
import { BuscarServicoItem } from './views/ItemPedido/consultarItem';
import { CadastrarItemCompra } from './views/ItemProduto/cadItemCompra';
import { BuscarProdutoItem } from './views/ItemProduto/buscaProdutoUmItem';
import { EditarItemProduto } from './views/ItemProduto/editItemProduto';
import { ExcluirItemProduto } from './views/ItemProduto/excluirItemProd';


// Um ponto significa que o arquivo está no mesmo nivel, dois pontos significa que
// tem que voltar um nível

function App() {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Switch>
        {/* "/", "/listar-cliente", "/listar-pedido", "/listar-servico" São
        as rotas do front end, que por padrão fica na porta 3000 */}
        {/* component é o nome da função que vc exportou e agora está importando */}
          <Route exact path="/" component={Home}/>
          <Route path="/listar-pedidos" component={ListarPedidos}/>
          <Route path="/listar-compras" component={ListarCompras}/>
          <Route path="/listar-cliente" component={ListarClientes}/>
          <Route path="/listar-pedido/:id" component={Item}/>
          <Route path="/listar-servico" component={ListarServicos}/>
          <Route path="/listar-produtos" component={ListarProdutos}/>
          <Route path="/listar-itensped" component={ListarItensPedidos}/>
          <Route path="/listar-itensCompra" component={ListarItensProdutos}/>
          <Route path="/cadastrarservico" component={Cadastrar}/>
          <Route path="/cadastrarItemPed" component={CadastrarItemPed}/>
          <Route path="/CadastrarCliente" component={CadastrarCliente}/>
          <Route path="/cadastrarpedido" component={CadastrarPedido}/>
          <Route path="/cadastrarcompra" component={CadastrarCompra}/>
          <Route path="/cadastrarproduto" component={CadastrarProduto}/>
          <Route path="/cadastrarItemCompra" component={CadastrarItemCompra}/>
          <Route path="/excluirServico/:id" component={ExcluirServico}/>
          <Route path="/excluirCliente/:id" component={ExcluirCliente}/>
          <Route path="/editarCliente/:id" component={EditarCliente}/>
          <Route path="/editarServico/:id" component={EditarServico}/>
          <Route path="/editarPedido/:id" component={EditarPedido}/>
          <Route path="/editarCompra/:id" component={EditarCompra}/>
          <Route path="/editItemPed/:id/editar/:idd" component={EditarItem}/>
          <Route path="/editarProduto/:id" component={EditarProduto}/>
          <Route path="/editItemProduto/:id/editar/:idd" component={EditarItemProduto}/>
          <Route path="/excluirPedido/:id" component={ExcluirPedido}/>
          <Route path="/excluirItemPedido/:id/excluir/:idd" component={ExcluirItemPed}/>
          <Route path="/excluirCompra/:id" component={ExcluirCompra}/>
          <Route path="/buscarCliente/:id" component={BuscarCliente}/>
          <Route path="/buscPedClient/:id" component={BuscarPedCli}/>
          <Route path="/buscComClient/:id" component={BuscarComCli}/>
          <Route path="/buscarProdCompras/:id" component={BuscarCompras}/>
          <Route path="/buscarServicoItem/:id" component={BuscarServicoItem}/>
          <Route path="/buscarClienteComprou/:id" component={BuscarClienComprou}/>
          <Route path="/buscarProdutoItem/:id" component={BuscarProdutoItem}/>
          <Route path="/excluirProduto/:id" component={ExcluirProduto}/>
          <Route path="/excluirItemCompras/:id/excluir/:idd" component={ExcluirItemProduto}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
