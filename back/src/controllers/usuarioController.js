const Usuario = require('../models/usuario');
const status = require('http-status');
 
exports.Insert = (req, res, next) => {
    const nomeCliente = req.body.nomeCliente;
    const endereço= req.body.endereço;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nomePedido = req.body.nomePedido;
    const custo = req.body.custo;
    const preço = req.body.preço;
    const estoque = req.body.estoque;
 
    Usuario.create({
        nomeCliente: nomeCliente,
        endereço: endereço,
        email: email,
        telefone: telefone,
        nomePedido : nomePedido,
        custo: custo,
        preço : preço,
        estoque : estoque,
    })
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.SelectAll = (req, res, next) => {
    Usuario.findAll()
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Update = (req, res, next) => {
    const id = req.body.id;
    const nomeCliente = req.body.nomeCliente;
    const endereço= req.body.endereço;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nomePedido = req.body.nomePedido;
    const custo = req.body.custo;
    const preço = req.body.preço;
    const estoque = req.body.estoque;
 
    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.update({
                    nomeCliente: nomeCliente,
                    endereço: endereço,
                    email: email,
                    telefone: telefone,
                    nomePedido : nomePedido,
                    custo: custo,
                    preço : preço,
                    estoque : estoque,
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
