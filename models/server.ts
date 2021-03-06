import express, { Application } from 'express';
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';
import cors from 'cors';
import dotEnv from 'dotenv'
import db from '../db/connection';
import fileUpload from 'express-fileupload'


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';
        this.defineCredentials()
        
        // Métodos iniciales
        this.dbConnection();
        this.middlewares(); // Es importante este orden en los metodos del constructor
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );

        //Files
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/temp/',
            createParentPath: true
        }))
    }


    routes() {
        this.app.use( this.apiPaths.auth, authRoutes )
        this.app.use( this.apiPaths.users, userRoutes )
    }

    private defineCredentials(){
        dotEnv.config()
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;