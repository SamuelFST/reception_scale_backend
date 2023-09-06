import WorshipService from '../service/WorshipService';

class WorshipResource {
  /**
   * Get all saved worships
   * @route GET /worship
   * @group Worship Resource
   * @returns {WorshipListResponse.model} 200 - Status and Array of Worships
   * @returns {ErrorResponse.model} Empty - No saved Worships
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findAll(req, res) {
    const worships = await WorshipService.findAll(req);
    return res.status(worships.status).json(worships);
  }

  /**
   * Get a Worship by ID
   * @route GET /worship/{id}
   * @group Worship Resource
   * @param {string} id.path.required - Worship ID
   * @returns {WorshipResponse.model} 200 - Status and Worship data
   * @returns {ErrorResponse.model} 404 - Worship not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findById(req, res) {
    const worship = await WorshipService.findWorshipById(req);
    return res.status(worship.status).json(worship);
  }

  /**
   * Creates a new Worship
   * @route POST /worship
   * @group Worship Resource
   * @param {Worship.model} worship.body.required
   * @returns {WorshipCreateResponse.model} 200 - Status and created Worship data
   * @returns {ErrorResponse.model} 400 - Request body not sent or type not informed
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async createWorship(req, res) {
    const worship = await WorshipService.createWorship(req);
    return res.status(worship.status).json(worship);
  }

  /**
   * Updates a created Worship
   * @route PUT /worship/{id}
   * @group Worship Resource
   * @param {string} id.path.required - Worship ID
   * @param {Worship.model} worship.body.required
   * @returns {WorshipUpdateResponse.model} 200 - Status and updated Worship data
   * @returns {ErrorResponse.model} 400 - Request body not sent or type not informed
   * @returns {ErrorResponse.model} 404 - Worship not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async updateWorship(req, res) {
    const worship = await WorshipService.updateWorship(req);
    return res.status(worship.status).json(worship);
  }

  /**
   * Deletes a created Worship
   * @route DELETE /worship/{id}
   * @group Worship Resource
   * @param {string} id.path.required - Worship ID
   * @returns {WorshipDeleteResponse.model} 200 - Status
   * @returns {ErrorResponse.model} 404 - Worship not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async deleteWorship(req, res) {
    const worship = await WorshipService.deleteWorship(req);
    return res.status(worship.status).json(worship);
  }
}

export default new WorshipResource();
