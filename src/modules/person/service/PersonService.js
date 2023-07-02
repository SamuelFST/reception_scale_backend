import PersonException from '../exception/PersonException';
import PersonRepository from '../repository/PersonRepository';

import httpStatus from '../../../config/constants/httpStatus';

const {
  SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST,
} = httpStatus;

class PersonService {
  async findAll(req) {
    try {
      const people = await PersonRepository.findAll();

      if (!people) {
        throw new PersonException(SUCCESS, 'Sem pessoas cadastradas');
      }

      const response = {
        status: SUCCESS,
        people,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findPersonById(req) {
    try {
      const { id } = req.params;

      const person = await this.findById(id);

      const response = {
        status: SUCCESS,
        person,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createPerson(req) {
    try {
      const personData = req.body;

      this.validatePersonData(personData);

      const createdPerson = await PersonRepository.save(personData);

      const response = {
        status: SUCCESS,
        createdPerson,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async updatePerson(req) {
    try {
      const { id } = req.params;
      const personData = req.body;

      this.validatePersonData(personData);

      const updatedPerson = await PersonRepository.update(id, personData);

      if (!updatedPerson) {
        throw new PersonException(NOT_FOUND, `A pessoa com o ID: ${id} não existe`);
      }

      const response = {
        status: SUCCESS,
        updatedPerson,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async deletePerson(req) {
    try {
      const { id } = req.params;

      await this.findById(id);
      await PersonRepository.delete(id);

      const response = {
        status: SUCCESS,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findById(personId) {
    const person = await PersonRepository.findById(personId);

    if (!person) {
      throw new PersonException(NOT_FOUND, `A pessoa com o ID: ${personId} não existe`);
    }

    return person;
  }

  validatePersonData(data) {
    if (!data || !data.name) {
      throw new PersonException(BAD_REQUEST, 'Os dados da pessoa precisam ser informados');
    }
  }
}

export default new PersonService();
