import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarUsuario extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: {
                nomeCliente: "",
                endereço: "",
                email: "",
                telefone: "",
                nomePedido: "",
                custo: "",
                preço: "",
                estoque: "Disponível",
                createdAt: "",
                updatedAt: "",
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="usuario-insert">
                            <label htmlFor="nomecliente">Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="nomeCliente"
                                name="nomeCliente"
                                placeholder="nomeCliente"
                                required
                                value={this.state.usuario.nomeCliente}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="endereço">Endereço </label>
                            <br />
                            <input
                                type="text"
                                id="endereço"
                                name="endereço"
                                placeholder="Endereço"
                                required
                                value={this.state.usuario.endereço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="usuario-insert">
                            <label htmlFor="email">Email</label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={this.state.usuario.email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="telefone">Telefone</label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="(XX) 9 1234-1234"
                                required
                                value={this.state.usuario.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="nomePedido">Pedido</label>
                            <br />
                            <input
                                type="text"
                                id="nomePedido"
                                name="nomePedido"
                                placeholder="Pedido"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.nomePedido}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="custo">Custo</label>
                            <br />
                            <input
                                type="text"
                                id="custo"
                                name="custo"
                                placeholder="Custo"
                                required
                                value={this.state.usuario.custo}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="preço">Preço</label>
                            <br />
                            <input
                                type="text"
                                id="preço"
                                name="preço"
                                placeholder="Preço"
                                required
                                value={this.state.usuario.preço}
                                onChange={this.handleInputChange}
                            />
                        </div>                       
 
                        <div className="usuario-insert">
                            <label htmlFor="createdAt">Criado</label>
                            <br />
                            <input
                                type="text"
                                id="createdAt"
                                name="createdAt"
                                placeholder="yyyy/mm/dd"
                                required
                                value={this.state.usuario.createdAt}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label htmlFor="updatedAt">Atualizado</label>
                            <br />
                            <input
                                type="text"
                                id="updatedAt"
                                name="updatedAt"
                                placeholder="yyyy/mm/dd"
                                required
                                value={this.state.usuario.updatedAt}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.usuario.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Disponível
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.usuario.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Falta
                        </label>
                        </div>
 
                        <button type="submit" className="btn btn-outline-primary">Cadastrar</button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/usuarios", {
            method: "post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default CriarUsuario;