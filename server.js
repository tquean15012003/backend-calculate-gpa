// set up express
const express = require('express');
const app = express();

// parse data
app.use(express.json());

// cors
const cors = require('cors');
app.use(cors());

//sequelize 
const { sequelize } = require('./models/index.js');

// static file
const path = require('path');
const publicPathDirectory = path.join(__dirname, './public');
app.use(express.static(publicPathDirectory));

// router
const { rootRouter } = require('./routers/index.js')
app.use('/api/v1/', rootRouter)

// listen connection event
const port = 4000;
app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});