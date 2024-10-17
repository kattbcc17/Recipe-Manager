import express from 'express'
import dotenv from 'dotenv'
import recipesRoutes from './routes/recipes.routes.js';
import MongoDB from './db/mongo.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json' assert { type: 'json' };

dotenv.config()

const app = express()
const port = process.env.PORT || 8080; 

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Initialize the database before setting up the routes and starting the server
MongoDB.initDb((err, db) => {
    if (err) {
        console.log('Failed to connect to the database:', err);
        process.exit(1); // Exit the application if DB initialization fails
    } else {
        console.log('Database initialized successfully');

        // Register routes after the database is initialized
        app.use('/recipes', recipesRoutes);

        // Default route
        app.get('/', (_, res) => {
            res.send('Hello, World!');
        });

        // Start the server after the database is initialized
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
        });
    }
});