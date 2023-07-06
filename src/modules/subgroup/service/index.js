import SubgroupRepository from '../repository/SubgroupRepository';

import httpStatus from '../../../config/constants/httpStatus';
import SubgroupException from '../exception/SubgroupException';
import { deleteScaleIndex } from '../../scale/service';

const {
  SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND,
} = httpStatus;

// eslint-disable-next-line import/prefer-default-export
export async function deleteSubgroupIndex(req) {
  try {
    const { id } = req.params;

    const subgroup = await SubgroupRepository.findById(id);

    if (!subgroup) {
      throw new SubgroupException(NOT_FOUND, `O subgrupo com o ID: ${id} não existe`);
    }

    subgroup.scales.map(async (scale) => {
      await deleteScaleIndex(scale._id);
    });

    await SubgroupRepository.delete(id);

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
