const querys = {
    obtenerVendedor: `SELECT NOMVENDEDOR, TIPOUSUARIO from VENDEDORES where CODVENDEDOR = @_CODVENDEDOR`,
    obtenerCliente: `SELECT cli.NOMBRECLIENTE, cli.NIF20 FROM CLIENTES as cli WHERE CODCLIENTE = @_CODCLIENTE`,
}

module.exports = {
    querys
  }