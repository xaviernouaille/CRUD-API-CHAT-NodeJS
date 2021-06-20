# CRUD-API-CHAT-NodeJS

Api permettant d'effectuer un CRUD pour gérer des personnages, se connecter/s'inscrire via un système d'authentification. Possibilité de créer une room afin de discuter via une messagerie instantanée développée à l'aide de la librairie Socket.io

## Utilisation

### Commandes
    
        "start": "ts-node server.ts",
        "dev": "nodemon server.ts",
        "prettier-format": "prettier --config .prettierrc 'src/**/*.ts' '*.ts' --write"

### Configuration
    
    .env
    Doit contenir : 
    DB_HOST=L'url de la base de donnée
    PORT=Le port
 
 ## Dependances
 
        "@types/cors": "^2.8.10",
        "@types/express": "^4.17.11",
        "@types/express-validator": "^3.0.0",
        "@types/jsonwebtoken": "^8.5.1",
        "@types/mongoose": "^5.10.5",
        "cors": "^2.8.5",
        "dotenv": "^9.0.2",
        "express": "^4.17.1",
        "express-validator": "^6.11.1",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^5.12.8",
        "prettier": "^2.3.1",
        "react": "^17.0.0",
        "react-dom": "^17.0.0",
        "react-hook-form": "^7.6.6",
        "react-router": "^5.2.0",
        "react-router-dom": "^5.2.0",
        "socket.io": "^4.1.1",
        "ts-node": "^9.1.1"
