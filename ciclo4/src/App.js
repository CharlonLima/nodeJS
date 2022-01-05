import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home';
import { ListarClientes } from './views/Cliente/ListarClientes/';
import { ListarPedidos } from './views/Pedido/ListarPedidos';
import { ListarServicos } from './views/Servico/ListarServicos';
import { Menu } from './components/Menu';

function App() {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/listar-cliente" component={ListarClientes}/>
          <Route path="/listar-pedido" component={ListarPedidos}/>
          <Route path="/listar-servico" component={ListarServicos}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
