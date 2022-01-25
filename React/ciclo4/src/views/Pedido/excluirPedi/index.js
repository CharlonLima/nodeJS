import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container } from "reactstrap";
import { api } from "../../../config";

export const ExcluirPedido = (props) => {
    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getExcluirPedido = async () => {
        await axios.get(api + "/excluirpedido/" + id)
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Pedido excluído com sucesso!'
                })
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    // chama a função
    useEffect(() => {
        getExcluirPedido();
    }, []);

    return (
        <Container>
            <div>
                <Link to="/listar-pedidos" className="btn btn-outline-primary btn-sm">Voltar para Pedidos</Link>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            </div>
        </Container>
    )
};