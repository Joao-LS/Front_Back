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
                <br />
                <Link to={`/usuarios`}> Voltar </Link> <br />
                <Link to={`/editarUsuario/${usuario.id}`}> Editar </Link> <br />
                <Link to={`/deletarUsuario/${usuario.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
