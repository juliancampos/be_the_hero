const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    try {
      const { title, description, value } = request.body;
      console.log(request.headers);
      const ong_id = request.headers.authorization;

      const [ id ] = await connection('incidents').insert({
        title, description, value, ong_id
      })
      return response.json({ id });
    } catch (error) {
      return response.json({ message:  error.message });
    }    
  },

  async list(request, response) {
    try {
      const { page = 1 } = request.query;

      const [count] = await connection('incidents').count();

      const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
      
      response.header('X-Total-Count', count['count(*)']);
      return response.json(incidents);
    } catch(error) {
      return response.json({ message: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .andWhere('ong_id', ong_id)
      .select('id')
      .first();

    if (!incident) {
      return response.status(400).json({ error: 'Incident not found!' });
    }

    await connection('incidents').where('id', id).delete();
    return response.status(204).send();
  }
}