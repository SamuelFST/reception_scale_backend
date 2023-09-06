import GroupService from '../service/GroupService';

class GroupResource {
  /**
   * Get all saved groups
   * @route GET /group
   * @group Group Resource
   * @returns {GroupListResponse.model} 200 - Status and Array of Groups
   * @returns {ErrorResponse.model} Empty - No saved Groups
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findAll(req, res) {
    const groups = await GroupService.findAll(req);
    return res.status(groups.status).json(groups);
  }

  /**
   * Get a Group by ID
   * @route GET /group/{id}
   * @group Group Resource
   * @param {string} id.path.required - Group ID
   * @returns {GroupResponse.model} 200 - Status and Group data
   * @returns {ErrorResponse.model} 404 - Group not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async findById(req, res) {
    const group = await GroupService.findGroupById(req);
    return res.status(group.status).json(group);
  }

  /**
   * Creates a new Group
   * @route POST /group
   * @group Group Resource
   * @param {Group.model} group.body.required
   * @returns {GroupCreateResponse.model} 200 - Status and created Group data
   * @returns {ErrorResponse.model} 400 - Request body not sent or title not informed
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async createGroup(req, res) {
    const group = await GroupService.createGroup(req);
    return res.status(group.status).json(group);
  }

  /**
   * Updates a created Group
   * @route PUT /group/{id}
   * @group Group Resource
   * @param {string} id.path.required - Group ID
   * @param {Group.model} group.body.required
   * @returns {GroupUpdateResponse.model} 200 - Status and updated Group data
   * @returns {ErrorResponse.model} 400 - Request body not sent or title not informed
   * @returns {ErrorResponse.model} 404 - Group not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async updateGroup(req, res) {
    const group = await GroupService.updateGroup(req);
    return res.status(group.status).json(group);
  }

  /**
   * Deletes a created Group and all its subgroups & scales associated
   * @route DELETE /group/{id}
   * @group Group Resource
   * @param {string} id.path.required - Group ID
   * @returns {GroupDeleteResponse.model} 200 - Status
   * @returns {ErrorResponse.model} 404 - Group not found with the given ID
   * @returns {ErrorResponse.model} 500 - Unexpected Error
   */
  async deleteGroup(req, res) {
    const group = await GroupService.deleteGroup(req);
    return res.status(group.status).json(group);
  }
}

export default new GroupResource();
