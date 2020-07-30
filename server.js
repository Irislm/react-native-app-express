const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const products = ['第一条','two','three'];
app.get('/products', (req, res) => {
  res.send({
    resultCode: 1,
    resultMessage: '成功',
    data: {
      products: products
    }
  });
});

app.post('/updateProduct', (req, res) => {
  if (req.body) {
    products[products.length - 1] = req.body.data;
    res.send({
      resultCode: 1,
      resultMessage: '成功',
    });
  } else {
    res.send({
      resultCode: -1,
      resultMessage: '没有传参数',
    })
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));