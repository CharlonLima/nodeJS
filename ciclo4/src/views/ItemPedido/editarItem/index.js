import axios, { Axios } from "axios";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import { Container, Form, Button, Input, Label, FormGroup, Alert } from "reactstrap";
import { api } from "../../../config";

export const EditarItem = (props) => {
    // objeto que recebe os dados, a variavel serviço recebe os dados e a variavel setServico
    // altera os dados

    const [id, setId] = useState(props.match.params.id);

    const [idd, setIdd] = useState(props.match.params.idd);

    const [itempedido, setItemPedido] = useState({
        quantidade: '',
        valor: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemPedido({
        ...itempedido, [e.target.name]: e.target.value
    });

    const editItemPed = async e => {
        e.preventDefault()

        // const headers é conteudo no formato json
        const headers = {
            'Content-Type': 'application/json'
        }
        // "/servicos" é a rota igual está no controller
        await axios.put(api + "/pedidos/" + id + "/editaritem/"+idd, itempedido, { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Item Pedido alterado com sucesso!'
                })
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })

    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Item Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-itensped" className="btn btn-outline-success btn-sm">Voltar para Itens Pedidos</Link>
                </div>
            </div>
            <hr className="m-1" />
            {/* {status.type === 'error'} serve para mostrar a mensagem na tela se deu tudo certo ou se deu erro , funciona como um if */}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Form className="p-2" onSubmit={editItemPed}>
                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="quantidade" placeholder="Quantidade solicitada" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input name="valor" placeholder="Valor" type="text" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Atualizar</Button>
            </Form>
            <Form>
                <Button type="submit" outline color="warning">Limpar Formulário</Button>
            </Form>
        </Container>
    );
};