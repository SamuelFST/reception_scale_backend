import WorshipService from '../service/WorshipService';

class WorshipResource {
  async findAll(req, res) {
    const worships = await WorshipService.findAll(req);
    return res.status(worships.status).json(worships);
  }

  async findById(req, res) {
    const worship = await WorshipService.findWorshipById(req);
    return res.status(worship.status).json(worship);
  }

  async createWorship(req, res) {
    const worship = await WorshipService.createWorship(req);
    return res.status(worship.status).json(worship);
  }

  async updateWorship(req, res) {
    const worship = await WorshipService.updateWorship(req);
    return res.status(worship.status).json(worship);
  }

  async deleteWorship(req, res) {
    const worship = await WorshipService.deleteWorship(req);
    return res.status(worship.status).json(worship);
  }
}

export default new WorshipResource();
