const express = require('express');
const morgan = require('morgan');
const ui = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const router = require('./routes');

const file = fs.readFileSync('./example.yaml', 'utf-8');
const documentation = yaml.parse(file);

const app = express();
const {
    port = 3000
} = process.env;

app.use('/api-docs', ui.serve, ui.setup(documentation))
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

// 404
app.use((req,res,next) => {
    try {
        return res.status(404).json({
            message: "404 Not Found!"
        })
    } catch (err) {
        next(err)
    }
});

// 500
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});


module.exports = app;
app.listen(port, async () => {
    console.log('server running on port', port);
});
