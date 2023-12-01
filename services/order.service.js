const boom = require('@hapi/boom');

const { models } = require('../libs/sequalize');

class OrderService {
  constructor(){
  }

  async create(data) {
    // const newOrder = await models.Order.create(data)
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if(!customer) {
      throw boom.badRequest('Customer not found')
    }
    const newOrder = await models.Order.create({ customerId: customer.id })
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    return orders;
  }


  async find() {
    const orders = await models.Order.findAll({
      include: ['customer', 'items']
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found')
    }
    return order;
  }

  // async update(id, changes) {
  //   return {
  //     id,
  //     changes,
  //   };
  // }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

}

module.exports = OrderService;
