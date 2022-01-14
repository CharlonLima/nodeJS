import axios from "axios";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import { Container, Form, Button, Input, Label, FormGroup, Alert } from "reactstrap";
import { api } from "../../../config";

export const Cadastrar = () => {
    // objeto que recebe os dados, a variavel serviço recebe os dados e a variavel setServico
    // altera os dados
    const [servico, setServico] = useState({
        nome: '',
        descricao: ''
    });

    // objeto para o tratamento de erros
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setServico({
        // o servico vai ser composto pelo nome do campo e pelo valor do campo
        ...servico, [e.target.name]: e.target.value
    });

    const cadServico = async e => {
        // preventDefault não permite que as informações passadas no formulario
        // apareçam na barra de endereço
        e.preventDefault()
        console.log(servico);

        // const headers é conteudo no formato json
        const headers = {
            'Content-Type': 'application/json'
        }
        // "/servicos" é a rota igual está no controller
        await axios.post(api + "/servicos", servico, { headers })
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
                    <h1>Cadastrar Serviço</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-servico" className="btn btn-outline-sucess btn-sm">Serviços</Link>
                </div>
            </div>
            <hr className="m-1" />
            {/* {status.type === 'error'} serve para mostrar a mensagem na tela se deu tudo certo ou se deu erro , funciona como um if */}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Form className="p-2" onSubmit={cadServico}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="nome" placeholder="Nome do serviço" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input name="descricao" placeholder="Descrição do serviço" type="text" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>
            <Form>
                <Button type="submit" outline color="warning">Limpar Formulário</Button>
            </Form>
        </Container>
    );
};