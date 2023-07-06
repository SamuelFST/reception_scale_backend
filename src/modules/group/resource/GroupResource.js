import GroupService from '../service/GroupService';

class GroupResource {
  async findAll(req, res) {
    const groups = await GroupService.findAll(req);
    return res.status(groups.status).json(groups);
  }

  async findById(req, res) {
    const group = await GroupService.findGroupById(req);
    return res.status(group.status).json(group);
  }

  async createGroup(req, res) {
    const group = await GroupService.createGroup(req);
    return res.status(group.status).json(group);
  }

  async updateGroup(req, res) {
    const group = await GroupService.updateGroup(req);
    return res.status(group.status).json(group);
  }

  async deleteGroup(req, res) {
    const group = await GroupService.deleteGroup(req);
    return res.status(group.status).json(group);
  }
}

export default new GroupResource();
