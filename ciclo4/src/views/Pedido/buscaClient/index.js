
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import { api } from "../../../config";
// Tudo que for usado deve ser importado, quando começar a escrever a palavra
// pressione enter e a importação da dependencia será feita automaticamente
export const BuscarCliente = (props) => {
                    // propos indica a passagem de parametros. nesse caso é o id que é passado ao clicar no botaão
                    console.log(props.match.params.id);

    const [data, setData] = useState([]); //retorna uma lista por isso tem colcetes
    // data retorna os dados
    // setData permite que altere os dados

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getBuscCliente = async () => {
        // api é a porta http://localhost:3001 que foi definida no controller.js
        // e está sendo exportada na pasta config no arquivo index.js e importada
        //para cá. "/listaservicos" é o é o nome da rota que foi definido no controller.js
        await axios.get(api+"/pedidos/"+id)
            .then((response) => {
                console.log(response.data.ped);
                setData(response.data.ped); 
                // retorna item porque lá no controller react
                // e no postman ciclo4 ele está retornando item
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    // chama a função
    useEffect(() => {
        getBuscCliente();
    }, [id]);//[] cria uma lista com base no id
    // [] para que o codigo pare de ser executado

    return (
        <div>
            <Container>
                <div>
                    <h1>Cliente que realizou o pedido</h1>
                </div>
                {/* Funciona como se fosse um if, 
                se o status type for igual a error então execute o alert
                se for falso que está sendo representado pelo dois pontos
                 execute o vazio ou seja nada */}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert>:""}
                
            </Container>
            {/* striped é formatação de estilo da tabela */}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Nascimento</th>
                        <th>Cliente Desde</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(ped => (
                        // ServicoId, PedidoId, quantidade, valor para que ele retorne 
                        // deve estar escrito igual ele retorna no postman
                        <tr key={ped.id}>
                            <td>{ped.id}</td>
                            <td>{ped.nome}</td>
                            <td>{ped.endereco}</td>
                            <td>{ped.cidade}</td>
                            <td>{ped.uf}</td>
                            <td>{ped.nascimento}</td>
                            <td>{ped.clienteDesde}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};