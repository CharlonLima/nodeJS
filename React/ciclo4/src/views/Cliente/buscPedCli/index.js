
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import { api } from "../../../config";

export const BuscarPedCli = (props) => {
   
    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getBuscarPedCli = async () => {
    
        await axios.get(api + "/cliente/" + id+"/pedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    useEffect(() => {
        getBuscarPedCli();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Pedidos que o cliente realizou</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-cliente" className="btn btn-outline-primary btn-sm">Voltar para Clientes</Link>
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
                        <th>ID Pedido</th>
                        <th>Cliente ID</th>
                        <th>Data do Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Para que o data.map retorne os dados deve colocar usar findAll e não findbypk
                    Porque tem que ser na forma de array [] com colchetes */}
                    {data.map(pedidos => (
                        // ServicoId, PedidoId, quantidade, valor para que ele retorne 
                        // deve estar escrito igual ele retorna no postman
                        <tr key={pedidos.id}>
                            <td>{pedidos.id}</td>
                            <td>{pedidos.ClienteId}</td>
                            <td>{pedidos.data}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};