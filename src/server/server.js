import express from 'express';

const app = express();

app.use(express.static(__dirname + '/../../data'));
app.use(express.static(__dirname + '/../'));

app.get('*', function (req, res) {
  res.set('Content-type', 'text/html');
  res.send(`
    <div id="container"></div>
    <script src="bundle.js"></script>
  `);
});

app.listen(9000, console.log('The server is running at port 9000'));