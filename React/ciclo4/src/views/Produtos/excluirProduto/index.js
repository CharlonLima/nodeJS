
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container } from "reactstrap";
import { api } from "../../../config";

export const ExcluirProduto = (props) => {
    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getExcluirProduto = async () => {
        await axios.get(api + "/excluirProduto/" + id)
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Produto excluído com sucesso!'
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
        getExcluirProduto();
    }, [id]);

    return (
        <Container>
            <div>
                <Link to="/listar-produtos" className="btn btn-outline-primary btn-sm">Voltar para Produtos</Link>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            </div>
        </Container>
    )
};