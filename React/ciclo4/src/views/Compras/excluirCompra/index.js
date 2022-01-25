import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container } from "reactstrap";
import { api } from "../../../config";

export const ExcluirCompra = (props) => {
    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getExcluirCompra = async () => {
        await axios.get(api + "/excluirCompra/" + id)
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Compra excluída com sucesso!'
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
        getExcluirCompra();
    }, []);

    return (
        <Container>
            <div>
                <Link to="/listar-compras" className="btn btn-outline-primary btn-sm">Voltar para Compras</Link>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            </div>
        </Container>
    )
};