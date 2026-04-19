import Product from "../models/productModel.js";

// GET /products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.deleteOne();

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /products/:id
export const updateProduct = async (req, res) => {
  try {
    const { name, brand, price, description, image, category, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.name = name ?? product.name;
    product.brand = brand ?? product.brand;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.image = image ?? product.image;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /products
export const createProduct = async (req, res) => {
  try {
    const { name, brand, price, description, image, category, stock } = req.body;

    const product = new Product({
      name,
      brand,
      price,
      description,
      image,
      category,
      stock,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createManyProducts = async (req, res) => {
  try {
    const products = req.body;

    const createdProducts = await Product.insertMany(products);

    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};