import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development"
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCompras = ()=>{
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getListarCompras = async ()=>{
        await axios.get(api+"/listarcompras")
        .then((response)=>{
            setData(response.data.compras);
        }).catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão com a API.'
            });
        });
    }

    useEffect(()=>{
        getListarCompras()
    }, []);

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista com Todas as Compras</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarcompra" className="btn btn-outline-primary btn-sm">Cadastrar Compra</Link>
                    </div>
                    {status.type === 'error'? <Alert color="danger">{status.message}</Alert>:""}
                </div>
            </Container>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID Compra</th>
                        <th>Cliente ID</th>
                        <th>Data da Compra</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(compras => (
                        // ServicoId, PedidoId, quantidade, valor para que ele retorne 
                        // deve estar escrito igual ele retorna no postman
                        <tr key={compras.id}>
                            <td>{compras.id}</td>
                            <td>{compras.ClienteId}</td>
                            <td>{compras.data}</td>
                            <td className="text-center/">
                                <Link to={"/buscarClienteComprou/"+compras.ClienteId} className="btn btn-outline-info btn-sm">Consultar</Link>
                                <Link to={"/editarCompra/"+compras.id} className="btn btn-outline-dark btn-sm">Editar</Link>
                                <Link to={"/excluirCompra/"+compras.id} className="btn btn-outline-danger btn-sm">Excluir</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}