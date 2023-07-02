import PersonService from '../service/PersonService';

class PersonResource {
  async findAll(req, res) {
    const people = await PersonService.findAll(req);
    return res.status(people.status).json(people);
  }

  async findById(req, res) {
    const person = await PersonService.findPersonById(req);
    return res.status(person.status).json(person);
  }

  async createPerson(req, res) {
    const person = await PersonService.createPerson(req);
    return res.status(person.status).json(person);
  }

  async updatePerson(req, res) {
    const person = await PersonService.updatePerson(req);
    return res.status(person.status).json(person);
  }

  async deletePerson(req, res) {
    const person = await PersonService.deletePerson(req);
    return res.status(person.status).json(person);
  }
}

export default new PersonResource();
