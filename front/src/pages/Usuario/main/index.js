import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { usuario } = this.state;
 
        return (
            <div className="usuario-list">
                <Link to={`/criarUsuario`}><button type="button" class="btn btn-outline-success">Novo</button></Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Pedido</th>
                            <th scope="col">Custo</th>
                            <th scope="col">Preço de Venda</th>
                            <th scope="col">Estoque</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map((usuario, index) => (
                            <tr>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nomePedido}</td>
                                <td>{usuario.custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{usuario.preço.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{usuario.estoque ? "Disponível" : "Falta"}</td>

                                <td> <Link to={`/usuarios/${usuario.id}`}> <button type="button" class="btn btn-outline-success">Detalhes</button></Link> </td>
                                <td> <Link to={`/editarUsuario/${usuario.id}`}><button type="button" class="btn btn-outline-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarUsuario/${usuario.id}`}><button type="button" class="btn btn-outline-danger">Deletar</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
