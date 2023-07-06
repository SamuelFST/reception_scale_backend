import ScaleService, { deleteScale } from '../service/ScaleService';

class ScaleResource {
  async findAll(req, res) {
    const scales = await ScaleService.findAll(req);
    return res.status(scales.status).json(scales);
  }

  async findById(req, res) {
    const scale = await ScaleService.findScaleById(req);
    return res.status(scale.status).json(scale);
  }

  async createScale(req, res) {
    const scale = await ScaleService.createScale(req);
    return res.status(scale.status).json(scale);
  }

  async updateScale(req, res) {
    const scale = await ScaleService.updateScale(req);
    return res.status(scale.status).json(scale);
  }

  async deleteScale(req, res) {
    const scale = await deleteScale(req);
    return res.status(scale.status).json(scale);
  }
}

export default new ScaleResource();
