import GroupException from '../exception/GroupException';
import GroupRepository from '../repository/GroupRepository';
import { deleteSubgroupIndex } from '../../subgroup/service/index';

import httpStatus from '../../../config/constants/httpStatus';

const {
  SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST,
} = httpStatus;

class GroupService {
  async findAll(req) {
    try {
      const groups = await GroupRepository.findAll();

      if (!groups) {
        throw new GroupException(SUCCESS, 'Sem grupos cadastrados');
      }

      const response = {
        status: SUCCESS,
        groups,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findGroupById(req) {
    try {
      const { id } = req.params;

      const group = await this.findById(id);

      const response = {
        status: SUCCESS,
        group,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createGroup(req) {
    try {
      const groupData = {
        ...req.body,
        scales: [],
        subgroups: [],
      };

      this.validateGroupData(groupData);

      const createdGroup = await GroupRepository.save(groupData);

      const response = {
        status: SUCCESS,
        createdGroup,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async updateGroup(req) {
    try {
      const { id } = req.params;
      const groupData = req.body;

      this.validateGroupData(groupData);

      const updatedGroup = await GroupRepository.update(id, groupData);

      if (!updatedGroup) {
        throw new GroupException(NOT_FOUND, `O grupo com o ID: ${id} não existe`);
      }

      const response = {
        status: SUCCESS,
        updatedGroup,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async deleteGroup(req) {
    try {
      const { id } = req.params;

      const group = await this.findById(id);
      group.subgroups.map(async (subgroup) => {
        await deleteSubgroupIndex({ params: { id: subgroup._id } });
      });
      await GroupRepository.delete(id);

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

  async findById(groupId) {
    const group = await GroupRepository.findById(groupId);

    if (!group) {
      throw new GroupException(NOT_FOUND, `O grupo com o ID: ${groupId} não existe`);
    }

    return group;
  }

  validateGroupData(data) {
    if (!data || !data.title) {
      throw new GroupException(BAD_REQUEST, 'Os dados do grupo precisam ser informados');
    }
  }
}

export default new GroupService();
