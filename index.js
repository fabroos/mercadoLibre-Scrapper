const scrap = require("./scrap/scrap.js")
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors())
const port = 4848;



app.get('/', (req, res) => {
    res.send('hola')
})

app.get('/melisearch/:search', async (req, res) => {
    const search = req.params.search;
    res.send(await scrap(search))
})
app.listen(port, () => {
    console.log('escuchando al puerto ' + port)
})

// (async function () {
//     console.log(await scrap('pc liquid cooler'))
// }())