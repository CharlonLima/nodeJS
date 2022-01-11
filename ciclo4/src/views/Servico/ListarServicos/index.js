import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import { api } from "../../../config";
// Tudo que for usado deve ser importado, quando começar a escrever a palavra
// pressione enter e a importação da dependencia será feita automaticamente
export const ListarServicos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        // api é a porta http://localhost:3001 que foi definida no controller.js
        // e está sendo exportada na pasta config no arquivo index.js e importada
        //para cá. "/listaservicos" é o é o nome da rota que foi definido no controller.js
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    // chama a função
    useEffect(() => {
        getServicos();
    }, []);
    // [] para que o codigo pare de ser executado

    return (
        <div>
            <Container>
                <div>
                    <h1>Visualizar informações do serviço</h1>
                </div>
                {/* Funciona como se fosse um if, 
                se o status type for igual a error então execute o alert
                se for falso que está sendo representado pelo dois pontos
                 execute o vazio ou seja nada */}
                {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert>:""}
                
            </Container>
            {/* striped é formatação de estilo da tabela */}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descricão</th>
                        <th>Acão</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td className="text-center/">
                                {/* vai mandar para a rota que está em app.js junto com o id do serviço */}
                                <Link to={"/listar-pedido/"+item.id} 
                                className="btn btn-outline-primary btn-sm">Consultar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};