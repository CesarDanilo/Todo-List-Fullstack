const express = require('express');
const app = express();
const cors = require('cors')
const port = 3001;
const routes = require('../routes/routes')
const PORT = process.env.PORT || 3001;

app.use(express.json())

app.use(cors({
    origin: '*',           // permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // permite todos os métodos que você precisa
    allowedHeaders: ['Content-Type', 'Authorization'], // permite cabeçalhos comuns
}));

app.use(routes);
app.get('/', (req, res) => {
    return res.status(200)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SERVIDOR RODANDO: http://localhost:${PORT}`);
});