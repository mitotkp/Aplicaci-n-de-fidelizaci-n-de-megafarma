const { app, BrowserWindow } = require('electron')
const fs = require('fs');

const path = require('path');
const { getConnection } = require('./database/connection');
const { getDatosConexion } = require('./utils/leerDatos');
const { getVendedorCliente } = require('./utils/getVendedorCliente');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    }
  })

 
  let objConexion = {
    PORT_BACKEND: '',
    IPSERVER_BACKEND: '' 
}

  // debo modificar el path para que tome el archivo de configuracion fuera de la 
  // raiz del proyecto
  const filePath = path.join(__dirname, 'datos.config');
  const dataConexion = fs.readFileSync('datos.config', 'utf8');

  //------------------->>>>>>>>>>>>>
  const lines = dataConexion.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
             if (line.startsWith('IPSERVER_BACKEND=')) {
              objConexion.IPSERVER_BACKEND = line.split('=')[1].trim();
            }  else if (line.startsWith('PORT_BACKEND')) {
              objConexion.PORT_BACKEND = line.split('=')[1].trim();
            } 
        }
console.log(objConexion);
  //------------------->>>>>>>>>>>>>

  let { dbSettings, mysqlSettings, conexion, error, mensaje } = getDatosConexion(filePath);


  if (error) {
    win.maximize();
    win.loadURL('http://localhost:3000')
    win.webContents.executeJavaScript(`alert("Falta el archivo de configuracion configuracion.config ruta: ${filePath} y mensaje: ${mensaje}")`);
    return
  }
  const connection = new getConnection(dbSettings.user, dbSettings.password, dbSettings.server, dbSettings.database, mysqlSettings.host, mysqlSettings.user, mysqlSettings.password, mysqlSettings.database, mysqlSettings.port);


  const codCliente = process?.argv[1];
  const codVendedor = process?.argv[2];

  if (!codVendedor || !codCliente || codCliente.includes('.') || codVendedor.includes('.')) {
    win.maximize();
    win.loadURL('http://localhost:3000')
    win.webContents.executeJavaScript(`alert("codVendedor ${codVendedor} and codCliente ${codCliente}")`);
    return
  }

  let vendedorCliente = getVendedorCliente(connection, codVendedor, codCliente);



  vendedorCliente.then(({ vendedor, cliente, error }) => {

    if (error) {
      win.maximize();
      win.loadURL('http://localhost:3000')
      win.webContents.executeJavaScript(`alert("Error sql")`);
      return
    }
    let status = !vendedor ? '0' : '1';
    win.maximize();
    const url =
      `http://${objConexion?.IPSERVER_BACKEND}:${objConexion?.PORT_BACKEND}/login?status=${status}&codVendedor=${codVendedor}&codCliente=${codCliente}&nombreCliente=${cliente?.NOMBRECLIENTE}&nif=${cliente?.NIF20}&nombreVendedor=${vendedor?.NOMVENDEDOR}&tipoUsuario=${vendedor?.TIPOUSUARIO}`;

    win.loadURL(url)
  }).catch((err) => {
    console.log(err);
  });







}

app.whenReady().then(createWindow)


