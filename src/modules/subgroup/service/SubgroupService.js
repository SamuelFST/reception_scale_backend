import SubgroupException from '../exception/SubgroupException';
import SubgroupRepository from '../repository/SubgroupRepository';
import GroupService from '../../group/service/GroupService';
import { deleteSubgroupIndex } from './index';

import httpStatus from '../../../config/constants/httpStatus';

const {
  SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST,
} = httpStatus;

class SubgroupService {
  async findAll(req) {
    try {
      const { groupId } = req.params;
      const subgroups = await SubgroupRepository.findAllByGroupId(groupId);

      if (!subgroups) {
        throw new SubgroupException(SUCCESS, 'Sem subgrupos cadastrados');
      }

      const response = {
        status: SUCCESS,
        subgroups,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findSubgroupById(req) {
    try {
      const { id } = req.params;

      const subgroup = await this.findById(id);

      const response = {
        status: SUCCESS,
        subgroup,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createSubgroup(req) {
    try {
      const { groupId } = req.params;

      const subgroupData = {
        ...req.body,
        group: groupId,
        scales: [],
      };

      this.validateSubgroupData(subgroupData);
      const groupResponse = await this.validateGroupId(subgroupData.group);
      const createdSubgroup = await SubgroupRepository.save(subgroupData);

      const { group } = groupResponse;
      const updatedGroup = Object.assign(group, {
        subgroups: [...group.subgroups, createdSubgroup._id],
      });

      await GroupService.updateGroup({ params: { id: group._id }, body: updatedGroup });

      const response = {
        status: SUCCESS,
        createdSubgroup,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async updateSubgroup(req) {
    try {
      const { id } = req.params;
      const subgroupData = req.body;

      this.validateSubgroupData(subgroupData);

      const updatedSubgroup = await SubgroupRepository.update(id, subgroupData);

      if (!updatedSubgroup) {
        throw new SubgroupException(NOT_FOUND, `O subgrupo com o ID: ${id} não existe`);
      }

      const response = {
        status: SUCCESS,
        updatedSubgroup,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findById(subgroupId) {
    const subgroup = await SubgroupRepository.findById(subgroupId);

    if (!subgroup) {
      throw new SubgroupException(NOT_FOUND, `O subgrupo com o ID: ${subgroupId} não existe`);
    }

    return subgroup;
  }

  async validateGroupId(groupId) {
    const group = await GroupService.findGroupById({ params: { id: groupId } });
    return group;
  }

  validateSubgroupData(data) {
    if (!data || !data.title) {
      throw new SubgroupException(BAD_REQUEST, 'Os dados do subgrupo precisam ser informados');
    }
  }
}

export const deleteSubgroup = deleteSubgroupIndex;
export default new SubgroupService();
