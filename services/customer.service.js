const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


// const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequalize')

class CustomerService {
  constructor() {}

  async create(data) {
    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id
    // })
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(
      newData, {
        include: ['user']
      })
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    // const client = await getConnection();
    // const res = await client.query('SELECT * FROM tasks')
    // return res.rows;
    const res = await models.Customer.findAll({
      include: ['user']
    });
    return res;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user', 'orders']
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    // const user = await models.User.findByPk(id);
    const res = await customer.update(changes)
    return res;
    // return {
    //   id,
    //   changes,
    // };
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy()
    return { id };
  }
}

module.exports = CustomerService;