
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import { api } from "../../../config";

export const BuscarClienComprou = (props) => {
   
    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getBuscarComCli = async () => {
    
        await axios.get(api + "/cliente/" + id+"/comprou")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    useEffect(() => {
        getBuscarComCli();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Cliente que realizou a compra</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-compras" className="btn btn-outline-primary btn-sm">Voltar para Compras</Link>
                    </div>
                    {/* Funciona como se fosse um if, 
                se o status type for igual a error então execute o alert
                se for falso que está sendo representado pelo dois pontos
                 execute o vazio ou seja nada */}
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
            </Container>
            {/* striped é formatação de estilo da tabela */}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Nascimento</th>
                        <th>Cliente Desde</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(clientes => (
                        // ServicoId, PedidoId, quantidade, valor para que ele retorne 
                        // deve estar escrito igual ele retorna no postman
                        <tr key={clientes.id}>
                            <td>{clientes.id}</td>
                            <td>{clientes.nome}</td>
                            <td>{clientes.endereco}</td>
                            <td>{clientes.cidade}</td>
                            <td>{clientes.uf}</td>
                            <td>{clientes.nascimento}</td>
                            <td>{clientes.clienteDesde}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};