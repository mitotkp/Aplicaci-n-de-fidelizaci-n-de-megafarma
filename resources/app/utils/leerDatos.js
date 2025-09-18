const fs = require('fs');

const getDatosConexion = (filePath) => {
    let dbSettings = {
        user: '',
        password: '',
        server: '',
        database: ''
    }
    let mysqlSettings = {
        host: '',
        user: '',
        password: '',
        database: '',
        port: ''
    };

    let conexion = {
        PORT_BACKEND: '',
        IPSERVER_BACKEND: '' 
    }


    try {
 
        // const data = fs.readFileSync(filePath, 'utf8');
        const data = fs.readFileSync('configuracion.config', 'utf8');
        // Process the data from the file
        const lines = data.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.startsWith('USUARIO=')) {
                dbSettings.user = line.split('=')[1].trim();
            } else if (line.startsWith('PASS=')) {
                dbSettings.password = line.split('=')[1].trim();
            } else if (line.startsWith('IP=')) {
                dbSettings.server = line.split('=')[1].trim();
            } else if (line.startsWith('BD=')) {
                dbSettings.database = line.split('=')[1].trim();
            } else if (line.startsWith('HOST=')) {
                mysqlSettings.host = line.split('=')[1].trim();
            } else if (line.startsWith('USER=')) {
                mysqlSettings.user = line.split('=')[1].trim();
            } else if (line.startsWith('PASSWORD=')) {
                mysqlSettings.password = line.split('=')[1].trim();
            } else if (line.startsWith('DBPORT=')) {
                mysqlSettings.port = line.split('=')[1].trim();
            } else if (line.startsWith('DATABASE=')) {
                mysqlSettings.database = line.split('=')[1].trim(); 
            }  

            
        }
        dbSettings.password = desEncriptar(dbSettings.password);
        return { dbSettings, mysqlSettings, conexion };
    } catch (error) { 
        console.log(error);
        return { error: true, mensaje: error };
    }
}

function desEncriptar(sEncriptado) {
    let sReturn = "";
    let iConstantes = [78, 79, 82, 77, 65, 76, 75, 69, 89, 78, 79, 82, 77, 65, 76, 75, 69, 89, 78, 79, 82, 77, 65, 76, 75, 69, 89, 78, 79, 82, 77, 65, 76, 75, 69, 89, 78];
    let j = 0;

    for(let i = 0; i < sEncriptado.length; i += 2) {
        sReturn = sReturn + String.fromCharCode(parseInt(sEncriptado.substring(i, i + 2), 16) - iConstantes[j]);
        j++;
    }

    return sReturn;
}

module.exports = { getDatosConexion };
