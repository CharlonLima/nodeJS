import axios from "axios";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import { Container, Form, Button, Input, Label, FormGroup, Alert } from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {
    // objeto que recebe os dados, a variavel serviço recebe os dados e a variavel setServico
    // altera os dados

    const [id, setId] = useState(props.match.params.id);

    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    });

    // objeto para o tratamento de erros
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        // o servico vai ser composto pelo nome do campo e pelo valor do campo
        ...cliente, [e.target.name]: e.target.value
    });

    const editCliente = async e => {
        // preventDefault não permite que as informações passadas no formulario
        // apareçam na barra de endereço
        e.preventDefault()
        console.log(cliente);

        // const headers é conteudo no formato json
        const headers = {
            'Content-Type': 'application/json'
        }
        // "/servicos" é a rota igual está no controller
        await axios.put(api + "/clientes/" + id + "/editarcliente", cliente, { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Cliente alterado com sucesso!'
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
                    <h1>Editar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="btn btn-outline-success btn-sm">Clientes</Link>
                </div>
            </div>
            <hr className="m-1" />
            {/* {status.type === 'error'} serve para mostrar a mensagem na tela se deu tudo certo ou se deu erro , funciona como um if */}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Form className="p-2" onSubmit={editCliente}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="nome" placeholder="Nome do Cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input name="endereco" placeholder="Endereço do cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="cidade" placeholder="Cidade do cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>UF</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="uf" placeholder="Estado do cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Nascimento</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="nascimento" placeholder="Data de nascimento do cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cliente Desde</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="clienteDesde" placeholder="Data cadastro do cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Atualizar</Button>
            </Form>
            <Form>
                <Button type="submit" outline color="warning">Limpar Formulário</Button>
            </Form>
        </Container>
    );
};