import ScaleService, { deleteScale } from '../service/ScaleService';

class ScaleResource {
  /**
   * Get all saved scales
   * @route GET /scale
   * @group Scale Resource
   * @returns {ScaleListResponse.model} 200 - Status and Array of Scales
   * @returns {ErrorResponse.model} Empty - No saved Scales
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findAll(req, res) {
    const scales = await ScaleService.findAll(req);
    return res.status(scales.status).json(scales);
  }

  /**
   * Get a Scale by ID
   * @route GET /scale/{id}
   * @group Scale Resource
   * @param {string} id.path.required - Scale ID
   * @returns {ScaleResponse.model} 200 - Status and Scale data
   * @returns {ErrorResponse.model} 404 - Scale not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findById(req, res) {
    const scale = await ScaleService.findScaleById(req);
    return res.status(scale.status).json(scale);
  }

  /**
   * Creates a new Scale in a Group
   * @route POST /scale/{groupId}
   * @group Scale Resource
   * @param {string} groupId.path.required - Group ID of the Scale
   * @param {Scale.model} Scale.body.required
   * @returns {ScaleCreateResponse.model} 200 - Status and created Scale data
   * @returns {ErrorResponse.model} 400 - Request body not sent or required data not informed
   * @returns {ErrorResponse.model} 404 - group not found with the given group ID |
   *                                     worship not found with the given worship ID |
   *                                     person not found with some given ID on people list
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  /**
   * Creates a new Scale in a Subgroup of a Group
   * @route POST /scale/{groupId}/{subgroupId}
   * @group Scale Resource
   * @param {string} groupId.path.required - Group ID of the Scale
   * @param {string} subgroupId.path.required - Subgroup ID of the Scale
   * @param {Scale.model} Scale.body.required
   * @returns {ScaleCreateResponse.model} 200 - Status and created Scale data
   * @returns {ErrorResponse.model} 400 - Request body not sent or required data not informed
   * @returns {ErrorResponse.model} 404 - group not found with the given group ID |
   *                                     subgroup not found with the given subgroup ID |
   *                                     worship not found with the given worship ID |
   *                                     person not found with some given ID on people list
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async createScale(req, res) {
    const scale = await ScaleService.createScale(req);
    return res.status(scale.status).json(scale);
  }

  /**
   * Updates a created Scale
   * @route PUT /scale/{id}
   * @group Scale Resource
   * @param {string} id.path.required - Scale ID
   * @param {Scale.model} scale.body.required
   * @returns {ScaleUpdateResponse.model} 200 - Status and updated Scale data
   * @returns {ErrorResponse.model} 400 - Request body not sent or required data not informed
   * @returns {ErrorResponse.model} 404 - Scale not found with the given ID |
   *                                    group not found with the given group ID |
   *                                    subgroup not found with the given subgroup ID |
   *                                    worship not found with the given worship ID |
   *                                    person not found with some given ID on people list
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async updateScale(req, res) {
    const scale = await ScaleService.updateScale(req);
    return res.status(scale.status).json(scale);
  }

  /**
   * Deletes a created Scale
   * @route DELETE /scale/{id}
   * @group Scale Resource
   * @param {string} id.path.required - Scale ID
   * @returns {ScaleDeleteResponse.model} 200 - Status
   * @returns {ErrorResponse.model} 404 - Scale not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async deleteScale(req, res) {
    const scale = await deleteScale(req);
    return res.status(scale.status).json(scale);
  }
}

export default new ScaleResource();
