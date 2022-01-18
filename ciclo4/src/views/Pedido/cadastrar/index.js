import axios from "axios";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import { Container, Form, Button, Input, Label, FormGroup, Alert } from "reactstrap";
import { api } from "../../../config";

export const CadastrarPedido = () => {
    // objeto que recebe os dados, a variavel serviço recebe os dados e a variavel setServico
    // altera os dados
    const [pedido, setPedido] = useState({
        ClienteId: '',
        data: ''
    });

    // objeto para o tratamento de erros
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPedido({
        // o servico vai ser composto pelo nome do campo e pelo valor do campo
        ...pedido, [e.target.name]: e.target.value
    });

    const cadPedido = async e => {
        // preventDefault não permite que as informações passadas no formulario
        // apareçam na barra de endereço
        e.preventDefault()
        console.log(pedido);

        // const headers é conteudo no formato json
        const headers = {
            'Content-Type': 'application/json'
        }
        // "/servicos" é a rota igual está no controller
        await axios.post(api + "/pedidos", pedido, { headers })
            .then((response) => {
                //console.log(response.data.message);
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            }).catch(() => {
                console.log("Erro: sem conexão com a API.");
            });

    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedidos" className="btn btn-outline-success btn-sm">Voltar para Pedidos</Link>
                </div>
            </div>
            <hr className="m-1" />
            {/* {status.type === 'error'} serve para mostrar a mensagem na tela se deu tudo certo ou se deu erro , funciona como um if */}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>ID do Cliente</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="ClienteId" placeholder="Identificação do Cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Data do Pedido</Label>
                    <Input name="data" placeholder="Data que foi realizado o pedido" type="text" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar Pedido</Button>
            </Form>
            <Form>
                <Button type="submit" outline color="warning">Limpar Formulário</Button>
            </Form>
        </Container>
    );
};