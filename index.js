const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApikey } = require('./middlewares/auth.handler')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Hello World, this is my server on Express');
});

app.get('/nueva-ruta', checkApikey, (req, res) => {
  res.send('Hello, Im a new route');
});

app.get('/frontend.html', (req, res) => {
  res.sendFile(__dirname + '/frontend.html')
})

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(checkApikey)


app.listen(port, () => {
  console.log('My port ' +  port);
});
