import Scale from '../entity/Scale';

class ScaleRepository {
  async findAll() {
    try {
      return await Scale.find()
        .populate('people')
        .populate('group')
        .populate('worship')
        .populate('subgroup');
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findById(id) {
    try {
      return await Scale.findById(id).populate({
        path: 'worship',
        model: 'Worship',
      }, {
        path: 'people',
        model: 'Person',
      }, {
        path: 'group',
        model: 'Group',
      }, {
        path: 'subgroup',
        model: 'Subgroup',
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async save(scale) {
    try {
      return await Scale.create(scale);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async update(scaleId, scaleData) {
    try {
      return await Scale.findByIdAndUpdate(scaleId, scaleData, { runValidators: true });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async delete(scaleId) {
    try {
      return await Scale.deleteOne({ _id: scaleId });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

export default new ScaleRepository();
