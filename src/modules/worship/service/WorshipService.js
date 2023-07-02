import WorshipException from '../exception/WorshipException';
import WorshipRepository from '../repository/WorshipRepository';

import httpStatus from '../../../config/constants/httpStatus';

const {
  SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST,
} = httpStatus;

class WorshipService {
  async findAll(req) {
    try {
      const worships = await WorshipRepository.findAll();

      if (!worships) {
        throw new WorshipException(SUCCESS, 'Sem tipos de cultos cadastrados');
      }

      const response = {
        status: SUCCESS,
        worships,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findWorshipById(req) {
    try {
      const { id } = req.params;

      const worship = await this.findById(id);

      const response = {
        status: SUCCESS,
        worship,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createWorship(req) {
    try {
      const worshipData = req.body;

      this.validateWorshipData(worshipData);

      const createdWorship = await WorshipRepository.save(worshipData);

      const response = {
        status: SUCCESS,
        createdWorship,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async updateWorship(req) {
    try {
      const { id } = req.params;
      const worshipData = req.body;

      this.validateWorshipData(worshipData);

      const updatedWorship = await WorshipRepository.update(id, worshipData);

      if (!updatedWorship) {
        throw new WorshipException(NOT_FOUND, `O tipo de culto com o ID: ${id} não existe`);
      }

      const response = {
        status: SUCCESS,
        updatedWorship,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async deleteWorship(req) {
    try {
      const { id } = req.params;

      await this.findById(id);
      await WorshipRepository.delete(id);

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

  async findById(worshipId) {
    const worship = await WorshipRepository.findById(worshipId);

    if (!worship) {
      throw new WorshipException(NOT_FOUND, `O tipo de culto com o ID: ${worshipId} não existe`);
    }

    return worship;
  }

  validateWorshipData(data) {
    if (!data || !data.type) {
      throw new WorshipException(BAD_REQUEST, 'Os dados do tipo de culto precisam ser informados');
    }
  }
}

export default new WorshipService();
