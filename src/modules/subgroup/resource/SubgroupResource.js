import SubgroupService, { deleteSubgroup } from '../service/SubgroupService';

class SubgroupResource {
  /**
   * Get all saved subgroups of a group
   * @route GET /group/{groupId}/subgroup
   * @group Subgroup Resource
   * @param {string} groupId.path.required - Group ID
   * @returns {SubgroupListResponse.model} 200 - Status and Array of Subgroups
   * @returns {ErrorResponse.model} Empty - No saved Subgroups
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findAll(req, res) {
    const subgroups = await SubgroupService.findAll(req);
    return res.status(subgroups.status).json(subgroups);
  }

  /**
   * Get a Subgroup by ID
   * @route GET /group/subgroup/{id}
   * @group Subgroup Resource
   * @param {string} id.path.required - Subgroup ID
   * @returns {SubgroupResponse.model} 200 - Status and Subgroup data
   * @returns {ErrorResponse.model} 404 - Subgroup not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findById(req, res) {
    const subgroup = await SubgroupService.findSubgroupById(req);
    return res.status(subgroup.status).json(subgroup);
  }

  /**
   * Creates a new Subgroup on a group
   * @route POST /group/{groupId}/subgroup
   * @group Subgroup Resource
   * @param {string} groupId.path.required - Group ID
   * @param {Subgroup.model} subgroup.body.required
   * @returns {SubgroupCreateResponse.model} 200 - Status and created Subgroup data
   * @returns {ErrorResponse.model} 400 - Request body not sent or title not informed
   * @returns {ErrorResponse.model} 404 - Group not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async createSubgroup(req, res) {
    const subgroup = await SubgroupService.createSubgroup(req);
    return res.status(subgroup.status).json(subgroup);
  }

  /**
   * Updates a created Subgroup
   * @route PUT /group/subgroup/{id}
   * @group Subgroup Resource
   * @param {string} id.path.required - Subgroup ID
   * @param {Subgroup.model} subgroup.body.required
   * @returns {SubgroupUpdateResponse.model} 200 - Status and updated Subgroup data
   * @returns {ErrorResponse.model} 400 - Request body not sent or title not informed
   * @returns {ErrorResponse.model} 404 - Subgroup not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async updateSubgroup(req, res) {
    const subgroup = await SubgroupService.updateSubgroup(req);
    return res.status(subgroup.status).json(subgroup);
  }

  /**
   * Deletes a created Subgroup and all scales associated
   * @route DELETE /group/subgroup/{id}
   * @group Subgroup Resource
   * @param {string} id.path.required - Subgroup ID
   * @returns {SubgroupDeleteResponse.model} 200 - Status
   * @returns {ErrorResponse.model} 404 - Subgroup not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async deleteSubgroup(req, res) {
    const subgroup = await deleteSubgroup(req);
    return res.status(subgroup.status).json(subgroup);
  }
}

export default new SubgroupResource();
