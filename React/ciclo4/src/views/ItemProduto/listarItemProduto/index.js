
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import { api } from "../../../config";
// Tudo que for usado deve ser importado, quando começar a escrever a palavra
// pressione enter e a importação da dependencia será feita automaticamente
export const ListarItensProdutos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItensProd = async () => {
        // api é a porta http://localhost:3001 que foi definida no controller.js
        // e está sendo exportada na pasta config no arquivo index.js e importada
        //para cá. "/listaservicos" é o é o nome da rota que foi definido no controller.js
        await axios.get(api + '/listarItemCompra')
            .then((response) => {
                console.log(response.data.itens);
                setData(response.data.itens);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    // chama a função
    useEffect(() => {
        getItensProd();
    }, []);
    // [] para que o codigo pare de ser executado

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Todos Itens Compras</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarItemCompra" className="btn btn-outline-primary btn-sm">Cadastrar Item Compra</Link>
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
                        <th>ID do Compra</th>
                        <th>ID do Produto</th>
                        <th>Quantidade</th>
                        <th>Valor do Produto</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(itens => (
                        <tr>
                            <td>{itens.CompraId}</td>
                            <td>{itens.ProdutoId}</td>
                            <td>{itens.quantidade}</td>
                            <td>{itens.valor}</td>
                            <td className="text-center/">
                                <Link to={"/buscarProdutoItem/"+itens.ProdutoId} className="btn btn-outline-info btn-sm">Consultar</Link>
                                <Link to={"/editItemProduto/"+itens.CompraId+"/editar/"+itens.ProdutoId} className="btn btn-outline-dark btn-sm">Editar</Link>
                                <Link to={"/excluirItemCompras/"+itens.CompraId+"/excluir/"+itens.ProdutoId} className="btn btn-outline-danger btn-sm">Excluir</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};