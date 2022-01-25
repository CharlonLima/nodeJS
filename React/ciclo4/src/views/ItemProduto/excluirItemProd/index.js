import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Container } from "reactstrap";
import { api } from "../../../config";

export const ExcluirItemProduto = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [idd, setIdd] = useState(props.match.params.idd);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getExcluirItem = async () => {
        await axios.get(api+"/excluirItemCompra/"+id+"/excluir/"+idd)
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Item Compra excluído com sucesso!'
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
        getExcluirItem();
    }, []);

    return (
        <Container>
            <div>
                <Link to="/listar-itensCompra" className="btn btn-outline-primary btn-sm">Voltar para Itens Compras</Link>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            </div>
        </Container>
    )
};