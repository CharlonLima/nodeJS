
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import { api } from "../../../config";
// Tudo que for usado deve ser importado, quando começar a escrever a palavra
// pressione enter e a importação da dependencia será feita automaticamente
export const BuscarCompras = (props) => {
    // propos indica a passagem de parametros. nesse caso é o id que é passado ao clicar no botaão
    console.log(props.match.params.id);

    const [data, setData] = useState([]); //retorna uma lista por isso tem colcetes
    // data retorna os dados
    // setData permite que altere os dados

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getBuscarCompras = async () => {
        // api é a porta http://localhost:3001 que foi definida no controller.js
        // e está sendo exportada na pasta config no arquivo index.js e importada
        //para cá. "/listaservicos" é o é o nome da rota que foi definido no controller.js
        await axios.get(api + "/compras/" + id + "/produtos")
            .then((response) => {
                console.log(response.data.produto);
                setData(response.data.produto);
                // retorna item porque lá no controller react
                // e no postman ciclo4 ele está retornando item
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    // chama a função
    useEffect(() => {
        getBuscarCompras();
    }, [id]);//[] cria uma lista com base no id
    // [] para que o codigo pare de ser executado

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Compras do produto</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-produtos" className="btn btn-outline-primary btn-sm">Voltar para Produtos</Link>
                    </div>
                    {/* Funciona como se fosse um if, 
                se o status type for igual a error então execute o alert
                se for falso que está sendo representado pelo dois pontos
                 execute o vazio ou seja nada */}
                    {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
            </Container>
            {/* striped é formatação de estilo da tabela */}
            <Table striped>
                <thead>
                    <tr>
                        <th>Compra</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(produto => (
                        // ServicoId, PedidoId, quantidade, valor para que ele retorne 
                        // deve estar escrito igual ele retorna no postman
                        <tr key={produto.ProdutoId}>
                            <td>{produto.CompraId}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.valor}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};