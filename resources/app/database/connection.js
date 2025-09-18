const sql = require("mssql");
const mysql = require('mysql');
 
// const { logError } = require("../utils/logError");


 

class getConnection {

  constructor(dbUser, dbPassword, dbServer, dbDatabase, HOST, USER, PASSWORD, DATABASE, DBPORT ) {
    // console.log({dbUser, dbPassword, dbServer, dbDatabase, HOST, USER, PASSWORD, DATABASE, DBPORT });
    this.mysqlSettings = {
      host: '38.41.8.29',
      user: 'root',
      password: 'R3d3s1pc4..',
      database: 'clientserver',
      port: 3307
    };

    this.dbSettings = {
      user: 'icgadmin',
      password: 'M4st3rk3y..',
      server: '38.41.8.29',
      database: 'MEGAFARMA',
      options: {
        encrypt: false,
        trustServerCertificate: true,
        validateBulkLoadParameters: false,
      },
    }

  }

  async sqlConnection() {
    try { 
      const pool = await sql.connect(this.dbSettings);
      console.log('conectado');
      return { pool, sql };
    } catch (error) {
      // logError(`Error en la ejecución ${'sqlConnection'} - ${error}`)
      console.log('Error en la conexion sql');
      console.log(error);
    }
  }

  async mysqlConnection() {
    return new Promise((resolve, reject) => {
      const pool = mysql.createPool(this.mysqlSettings);
      pool.getConnection((error, connection) => {
        if (error) { 
          console.log({Error: error.sqlMessage});
          // logError(`Error en la ejecución ${'mysqlConnection'} - ${error}`)
          reject(error);
        } else {      
          resolve({ pool, connection }); 
        }
      });
    });
  }

}

module.exports = { getConnection }
