// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
// const pool = require('../libs/postgres.pool')
const { models } = require('../libs/sequalize');

class ProductsService {

  constructor(){
    // this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err))
  }

  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    const newProduct = models.Product.create(data);
    return newProduct;
    // const newProduct = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }
    // this.products.push(newProduct);
    // return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }
    const { price } = query;
    if (price) {
      options.where.price = price
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const products = models.Product.findAll(options);
    return products;
    // const query = 'SELECT * FROM tasks';
    // const [data, metadata] = await sequelize.query(query);
    // return {data, metadata};
    // const res = await this.pool.query(query);
    // return res.rows;
    // return this.products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
    // const product = this.products.find(item => item.id === id);
    // if (!product) {
    //   throw boom.notFound('product not found');
    // }
    // if (product.isBlock) {
    //   throw boom.conflict('product is block');
    // }
    // return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const res = await product.update(changes);
    return res;
    // const index = this.products.findIndex(item => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // const product = this.products[index];
    // this.products[index] = {
    //   ...product,
    //   ...changes
    // };
    // return this.products[index];
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id }
    // const index = this.products.findIndex(item => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // this.products.splice(index, 1);
    // return { id };
  }

}

module.exports = ProductsService;
