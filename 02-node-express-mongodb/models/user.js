const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
      // return cp.productId == product._id; // lub tak
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      // update existing product in cart
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      // add new item to cart
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productsIds = this.cart.items.map(i => {
      return i.productId; // tablica produktów { productId: new ObjectId(product._id), quantity: newQuantity }
    }); 

    return db
      .collection("products")
      .find({ _id: { $in: productsIds } }) // $in każdy element z tablicy, gdzie productsIds zawiera tablicę id produktów
      .toArray()
      .then(products => { // products to tablica produktów
        return products.map(p => {
          return { // zwaraćamy obiekt z danymi produktu i ilością
            ...p, // zachowanie wszystkich pobranych danych produktu
            quantity: this.cart.items.find(i => { // ta funkcja daje nam obiekt produktu
              return i.productId.toString() === p._id.toString(); 
            }).quantity // pobieramy ilość produktu
          };
        });
      }); 
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString(); // usuwamy produkt z koszyka - false zwróci dla produktu który chcemy usunąć
    });
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart() // pobieramy koszyk 
      .then(products => {
        const order = { // produkty 
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name
          }
        };

        return db.collection('orders').insertOne(order); // wstsawiamy zamówienie do zamówień - orders
      })
      .then(result => {
        this.cart = { items: [] }; // jak się udało stworzyć zamówienie to czyscimy koszyk

        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return (
      db
        .collection("users")
        // .find({ _id: new ObjectId(userId) })
        // .next() // bez kursora
        .findOne({ _id: new ObjectId(userId) })
        .then((user) => {
          console.log(user);
          return user;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }
}
module.exports = User;
