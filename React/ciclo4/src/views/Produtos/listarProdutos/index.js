import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarProdutos = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getListarProdutos = async () => {
        await axios.get(api + '/listarProdutos')
            .then((response) => {
                setData(response.data.produtos)
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                });
            });
    }

    useEffect(()=>{
        getListarProdutos()
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista com Todos os Produtos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarproduto" className="btn btn-outline-primary btn-sm">Cadastrar Produto</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
            </Container>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descricão</th>
                        <th>Acão</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(produtos => (
                        <tr key={produtos.id}>
                            <td>{produtos.id}</td>
                            <td>{produtos.nome}</td>
                            <td>{produtos.descricao}</td>
                            <td className="text-center/">
                                {/* vai mandar para a rota que está em app.js junto com o id do serviço */}
                                <Link to={"/buscarProdCompras/" + produtos.id}
                                    className="btn btn-outline-primary btn-sm">Consultar</Link>
                                <Link to={"/editarProduto/"+produtos.id} className="btn btn-outline-dark btn-sm">Editar</Link>    
                                <Link to={"/excluirProduto/"+produtos.id} className="btn btn-outline-danger btn-sm">Excluir</Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}