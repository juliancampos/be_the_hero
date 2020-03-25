const connection = require('../database/connection');

module.exports = {
  async create(request, response) {    
    try {
      const { id } = request.body;
      const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

      if (!ong) {
        return response.status(400).json({ error: 'No ong found!' });
      }

      return response.json(ong);
    } catch(error) {
      return response.json({ message: error.message });
    }
  }
}