import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Usuario extends Component {
    state = {
        usuario: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/usuarios/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { usuario, index } = this.state;
 
        if (usuario.estoque) {
            usuario.estoque = "Produto Disponível";
        } else {
            usuario.estoque = "Produto Indisponível";
        }
 
        return (
            <div className="usuario-info">
                <h1> {usuario.nomeCliente} </h1>
                <h1> {usuario.endereço} </h1>
                <h1> {usuario.email} </h1>
                <h1> {usuario.telefone} </h1>
                <div id="oi4">
                <Link to={`/usuarios`}> <button type="button" id="oi1"  class="btn btn-outline-success">Voltar</button> </Link>
                <Link to={`/editarUsuario/${usuario.id}`}> <button type="button" id="oi2" class="btn btn-outline-warning">Editar</button></Link> 
                <Link to={`/deletarUsuario/${usuario.id}`}> <button type="button" id="oi3" class="btn btn-outline-danger">Deletar</button></Link> 
                </div>
            </div >
        );
    }
}
