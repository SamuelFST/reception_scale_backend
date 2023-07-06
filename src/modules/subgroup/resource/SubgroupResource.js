import SubgroupService, { deleteSubgroup } from '../service/SubgroupService';

class GroupResource {
  async findAll(req, res) {
    const subgroups = await SubgroupService.findAll(req);
    return res.status(subgroups.status).json(subgroups);
  }

  async findById(req, res) {
    const subgroup = await SubgroupService.findSubgroupById(req);
    return res.status(subgroup.status).json(subgroup);
  }

  async createSubgroup(req, res) {
    const subgroup = await SubgroupService.createSubgroup(req);
    return res.status(subgroup.status).json(subgroup);
  }

  async updateSubgroup(req, res) {
    const subgroup = await SubgroupService.updateSubgroup(req);
    return res.status(subgroup.status).json(subgroup);
  }

  async deleteSubgroup(req, res) {
    const subgroup = await deleteSubgroup(req);
    return res.status(subgroup.status).json(subgroup);
  }
}

export default new GroupResource();
