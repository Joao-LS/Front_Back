import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarUsuario extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: {
                nome: "",
                salario: "",
                dataNascimento: ""
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
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/usuarios/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ usuario: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
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
                        <div className="usuario-update">
                            <label htmlFor="nomeCliente">Cliente</label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.Cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-update">
                            <label htmlFor="endereço">Endereço</label>
                            <br />
                            <input
                                type="text"
                                id="endereço"
                                name="endereço"
                                placeholder="Endereço"
                                min="1"
                                max="99999"
                                required
                                value={this.state.usuario.Endereço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-update">
                            <label htmlFor="email">Email</label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                min="1"
                                max="99999"
                                required
                                value={this.state.usuario.Email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-update">
                            <label htmlFor="telefone">Telefone</label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="Telefone"
                                required
                                value={this.state.usuario.Telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-update">
                            <label htmlFor="nomePedido">Pedido</label>
                            <br />
                            <input
                                type="text"
                                id="NomePedido"
                                name="nomePedido"
                                placeholder="nomePedido"
                                min="1"
                                max="99999"
                                required
                                value={this.state.usuario.nomePedido}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-update">
                            <label htmlFor="custo">Custo</label>
                            <br />
                            <input
                                type="text"
                                id="custo"
                                name="custo"
                                placeholder="Custo"
                                min="1"
                                max="99999"
                                required
                                value={this.state.usuario.custo}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="usuario-update">
                            <label htmlFor="preço">Preço</label>
                            <br />
                            <input
                                type="text"
                                id="preço"
                                name="preço"
                                placeholder="Preço"
                                min="1"
                                max="99999"
                                required
                                value={this.state.usuario.Preço}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Atualizar
                    </button>
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
    };
 
    handleSubmit = event => {
        const { id } = this.state.usuario;
 
        fetch(`http://localhost:3003/sistema/usuarios/${id}`, {
            method: "put",
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
 
export default EditarUsuario;