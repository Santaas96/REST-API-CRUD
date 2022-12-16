import express, { json } from "express";
import morgan from "morgan";
const app = express();

let products = [
  {
    id: 1,
    name: "laptop",
    price: "3000",
  },
];

app.use(morgan("dev"));
app.use(json());

app.set('appName', 'Express Course')
app.set('port', 3000)

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  let data = { id: products.length + 1, ...req.body };
  products.push(data);
  res.send(data);
});

app.put("/products/:id", (req, res) => {

  const newData = req.body

  const productFound = products.find((product) => {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)
  
  res.json({
    message: 'Producto Actualizado'
  })
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find((product) => {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products = products.filter((p) => p.id !== parseInt(req.params.id));

  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find((product) => {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });
  res.json(productFound);
});

app.listen(app.get('port'));
console.log(`server ${app.get('appName')} on port ${app.get('port')}`);
