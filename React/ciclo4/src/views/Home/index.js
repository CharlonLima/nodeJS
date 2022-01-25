import { Container } from "reactstrap";

export const Home = () => {

    //Em react não usa hífen para separar as palavras, usa camelcase. Em vez de font-size usa fontSize
    //É possível definir o estilo de várias maneiras
    //A primeira é inline dentro do código <main style={{color:'#f00'}}></main> ATENÇÃO A COR DEVE SER DEFINIDA EM #HEXADECIMAL
    //A segunda forma é criando um objeto com a formatação desejada e aplicar na tag exemplo <footer style={formatacao}>Desde 2010 facilitando a rotina de seus clientes</footer>
    // const formatacao = {
    //     color: 'red',
    //     fontSize: '2em',
    //     fontFamily: 'verdana'
    // }
    //E a terceira é através do arquivo CSS. Mas é necessário que importe o arquivo css
    //No app.js. No arquivo css pode usar o hifen para separa as palavras. E quando for aplicar a classe
    // na tag utiliza o className

    return (
        <div className="elementoPai">
            <header className="cabecalho">
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
                        <div className="p-2">
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
            </header>
            {/* <main style={{color:'#304FFE'}}>O melhor prestador de serviços do Brasil</main>
            <footer style={formatacao}>Desde 2010 facilitando a rotina de seus clientes</footer> */}
            <main className="principal">
                <div id="desafio">Desafio React
                    <div className="p-2">
                        <a href="/listar-compras" className="btn btn-outline-primary btn-sm">Listar Compras</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-produtos" className="btn btn-outline-primary btn-sm">Listar Produtos</a>
                    </div>
                    <div className="p-2">
                            <a href="/listar-itensCompra" className="btn btn-outline-primary btn-sm">Listar Itens Comprados</a>
                    </div>
                </div>
            </main>
            <footer className="rodape">Desde 2010 facilitando a rotina de seus clientes</footer>

        </div>
    );
};