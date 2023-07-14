import Worship from '../entity/Worship';

class WorshipRepository {
  async findAll() {
    try {
      return await Worship.find();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findById(id) {
    try {
      return await Worship.findById(id);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async save(worship) {
    try {
      return await Worship.create(worship);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async update(worshipId, worshipData) {
    try {
      return await Worship
        .findByIdAndUpdate(worshipId, worshipData, { runValidators: true, new: true });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async delete(worshipId) {
    try {
      return await Worship.deleteOne({ _id: worshipId });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

export default new WorshipRepository();
