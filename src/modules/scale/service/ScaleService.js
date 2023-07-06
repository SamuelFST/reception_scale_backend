import ScaleException from '../exception/ScaleException';
import ScaleRepository from '../repository/ScaleRepository';
import GroupService from '../../group/service/GroupService';
import SubgroupService from '../../subgroup/service/SubgroupService';
import PersonService from '../../person/service/PersonService';
import WorshipService from '../../worship/service/WorshipService';
import httpStatus from '../../../config/constants/httpStatus';
import { deleteScaleIndex } from './index';

const {
  SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST,
} = httpStatus;

class ScaleService {
  async findAll(req) {
    try {
      const scales = await ScaleRepository.findAll();

      if (!scales) {
        throw new ScaleException(SUCCESS, 'Sem escalas cadastradas');
      }

      const response = {
        status: SUCCESS,
        scales,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findScaleById(req) {
    try {
      const { id } = req.params;

      const scale = await this.findById(id);

      const response = {
        status: SUCCESS,
        scale,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createScale(req) {
    try {
      const data = req.body;
      const { groupId, subgroupId } = req.params;
      const scaleData = {
        ...data,
        group: groupId,
        ...(subgroupId) && { subgroup: subgroupId },
      };

      const validationData = await this.validateScaleData(scaleData);

      const createdScale = await ScaleRepository.save(scaleData);

      if (scaleData.subgroup) {
        const updatedSubgroupData = Object.assign(validationData.subgroupData.subgroup, {
          scales: [...validationData.subgroupData.subgroup.scales, createdScale._id],
        });

        await SubgroupService.updateSubgroup({
          params: { id: subgroupId },
          body: updatedSubgroupData,
        });
      } else {
        const updatedGroupData = Object.assign(validationData.groupData.group, {
          scales: [...validationData.groupData.group.scales, createdScale._id],
        });

        await GroupService.updateGroup({
          params: { id: groupId },
          body: updatedGroupData,
        });
      }

      const response = {
        status: SUCCESS,
        createdScale,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async updateScale(req) {
    try {
      const { id } = req.params;
      const scaleData = req.body;

      await this.validateScaleData(scaleData);

      const updatedScale = await ScaleRepository.update(id, scaleData);

      if (!updatedScale) {
        throw new ScaleException(NOT_FOUND, `A escala com o ID: ${id} não existe`);
      }

      const response = {
        status: SUCCESS,
        updatedScale,
      };

      return response;
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findById(scaleId) {
    const scale = await ScaleRepository.findById(scaleId);

    if (!scale) {
      throw new ScaleException(NOT_FOUND, `A escala com o ID: ${scaleId} não existe`);
    }

    return scale;
  }

  async validateScaleData(data) {
    let subgroupData;

    if (!data || !data.date || !data.group) {
      throw new ScaleException(BAD_REQUEST, 'Os dados da escala precisam ser informados');
    }

    const groupData = await GroupService.findGroupById({ params: { id: data.group } });

    if (data.worship) {
      await WorshipService.findWorshipById({ params: { id: data.worship } });
    }

    if (data.people) {
      data.people.map(async (personId) => {
        await PersonService.findPersonById({ params: { id: personId } });
      });
    }

    if (data.subgroup) {
      subgroupData = await SubgroupService.findSubgroupById({ params: { id: data.subgroup } });
    }

    return { groupData, ...(subgroupData) && { subgroupData } };
  }
}

export const deleteScale = deleteScaleIndex;
export default new ScaleService();
