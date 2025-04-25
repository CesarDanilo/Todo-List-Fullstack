const express = require('express');
const app = express();
const port = 3001;
const routes = require('../routes/routes')

app.use(routes);
app.get('/', (req, res) => {
    return res.status(200)
})

app.listen(port, () => {
    console.log(`SERVIDOR RODANDO: http:/localhost:${port}`);
});
