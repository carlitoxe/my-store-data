const boom = require('@hapi/boom');

// const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequalize')

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {
    // const client = await getConnection();
    // const res = await client.query('SELECT * FROM tasks')
    // return res.rows;
    const res = await models.User.findAll({
      include: ['customer']
    });
    return res;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, { include: ['customer'] });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    // const user = await models.User.findByPk(id);
    const res = await user.update(changes)
    return res;
    // return {
    //   id,
    //   changes,
    // };
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy()
    return { id };
  }
}

module.exports = UserService;
