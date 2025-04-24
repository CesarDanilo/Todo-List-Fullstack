const express = require('express');
const app = express();
const port = 4444;
const routes = require('../routes/routes')

app.use(routes);

app.listen(port, () => {
    console.log(`SERVIDOR RODANDO: http:/localhost:${port}`);
});
