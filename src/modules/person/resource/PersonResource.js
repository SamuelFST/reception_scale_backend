import PersonService from '../service/PersonService';

class PersonResource {
  /**
   * Get all saved people
   * @route GET /person
   * @group Person Resource
   * @returns {PersonListResponse.model} 200 - Status and Array of People
   * @returns {ErrorResponse.model} Empty - No saved Person
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findAll(req, res) {
    const people = await PersonService.findAll(req);
    return res.status(people.status).json(people);
  }

  /**
   * Get a Person by ID
   * @route GET /person/{id}
   * @group Person Resource
   * @param {string} id.path.required - Person ID
   * @returns {PersonResponse.model} 200 - Status and Person data
   * @returns {ErrorResponse.model} 404 - Person not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findById(req, res) {
    const person = await PersonService.findPersonById(req);
    return res.status(person.status).json(person);
  }

  /**
   * Creates a new Person
   * @route POST /person
   * @group Person Resource
   * @param {Person.model} person.body.required
   * @returns {PersonCreateResponse.model} 200 - Status and created Person data
   * @returns {ErrorResponse.model} 400 - Request body not sent or name not informed
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async createPerson(req, res) {
    const person = await PersonService.createPerson(req);
    return res.status(person.status).json(person);
  }

  /**
   * Updates a created Person
   * @route PUT /person/{id}
   * @group Person Resource
   * @param {string} id.path.required - Person ID
   * @param {Person.model} person.body.required
   * @returns {PersonUpdateResponse.model} 200 - Status and updated Person data
   * @returns {ErrorResponse.model} 400 - Request body not sent or name not informed
   * @returns {ErrorResponse.model} 404 - Person not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async updatePerson(req, res) {
    const person = await PersonService.updatePerson(req);
    return res.status(person.status).json(person);
  }

  /**
   * Deletes a created Person
   * @route DELETE /person/{id}
   * @group Person Resource
   * @param {string} id.path.required - Person ID
   * @returns {PersonDeleteResponse.model} 200 - Status
   * @returns {ErrorResponse.model} 404 - Person not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async deletePerson(req, res) {
    const person = await PersonService.deletePerson(req);
    return res.status(person.status).json(person);
  }
}

export default new PersonResource();
