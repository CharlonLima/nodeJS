import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                    <div className="p-2">
                        {/* className btn defini que é um botão, btn-outline cria um efeito de transition
                        sucess defini a cor verde, btn-sm defini o tamanho pequeno ou small */}
                        <a href="/listar-cliente" className="btn btn-outline-success btn-sm">Listar Clientes</a>
                    </div>
                    <div  className="p-2">
                        <a href="/listar-pedidos" className="btn btn-outline-success btn-sm">Listar Pedidos</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-servico" className="btn btn-outline-success btn-sm">Listar Serviços</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-itensped" className="btn btn-outline-success btn-sm">Listar Itens Pedidos</a>
                    </div>
                </div>
            </Container>
        </div>
    );
};