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
          <Route exact path="/" component={Home}/>
          <Route path="/listar-pedidos" component={ListarPedidos}/>
          <Route path="/listar-cliente" component={ListarClientes}/>
          <Route path="/listar-pedido/:id" component={Item}/>
          <Route path="/listar-servico" component={ListarServicos}/>
          <Route path="/cadastrarservico" component={Cadastrar}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
