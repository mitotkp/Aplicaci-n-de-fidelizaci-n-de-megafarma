const { querys } = require("../querys/querys");
const sql = require('mssql');


const getVendedorCliente = async (connection, codVendedor, codCliente) => {
    console.log({ codVendedor, codCliente });
    // if (!codVendedor || codCliente.includes('.')) {
    //     return { vendedor: [], cliente: [] };
    // }
    try {
        const { pool } = await connection.sqlConnection();
        
        let { recordset } = await pool.request()
            .input('_CODVENDEDOR', sql.Int, codVendedor)
            .query(querys.obtenerVendedor);

        let { recordset: cliente } = await pool.request()
            .input('_CODCLIENTE', sql.Int, codCliente)
            .query(querys.obtenerCliente);


        return { vendedor: recordset[0], cliente: cliente[0] };
    } catch (error) {
        
        console.log(error);
        return { vendedor: [], cliente: [], error: true };
    }
}

module.exports = {
    getVendedorCliente
}