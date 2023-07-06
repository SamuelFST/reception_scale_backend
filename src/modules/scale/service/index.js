import ScaleRepository from '../repository/ScaleRepository';

import httpStatus from '../../../config/constants/httpStatus';
import ScaleException from '../exception/ScaleException';

const {
  SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND,
} = httpStatus;

// eslint-disable-next-line import/prefer-default-export
export async function deleteScaleIndex(req) {
  try {
    const { id } = req.params;

    const scale = await ScaleRepository.findById(id);

    if (!scale) {
      throw new ScaleException(NOT_FOUND, `A escala com o ID: ${id} não existe`);
    }

    await ScaleRepository.delete(id);

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
