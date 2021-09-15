const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
    constructor(){
        this.app= express();
        this.port=process.env.PORT;

        this.paths= {
            auth:      '/api/auth',
            buscar: '/api/buscar',
            usuarios : '/api/usuarios',
            tipoVehiculos: '/api/tipo_vehiculos',
            gruas: '/api/gruas',
            fletes: '/api/fletes',
            cotizaciones: '/api/cotizaciones',
            servicios : '/api/servicios',
            imagenes: '/api/imagenes'
        }
        //Conectar a BD
        this.conectarDB();
        //Middlewares 
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //CORS 
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.usuarios,require('../routes/usuarios'));
        this.app.use(this.paths.tipoVehiculos,require('../routes/tipo_vehiculos'));
        this.app.use(this.paths.gruas,require('../routes/gruas'));
        this.app.use(this.paths.fletes,require('../routes/fletes'));
        this.app.use(this.paths.cotizaciones,require('../routes/cotizaciones'));
        this.app.use(this.paths.servicios,require('../routes/servicios'));
        this.app.use(this.paths.imagenes,require('../routes/imagenes'));
        
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',process.env.PORT);
        });
    }

}
module.exports=Server;