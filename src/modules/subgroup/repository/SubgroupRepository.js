import Subgroup from '../entity/Subgroup';

class SubgroupRepository {
  async findAllByGroupId(groupId) {
    try {
      return await Subgroup.find({ group: groupId }).populate({
        path: 'scales',
        model: 'Scale',
        populate: [{ path: 'worship' }, { path: 'people' }],
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findById(id) {
    try {
      return await Subgroup.findById(id).populate({
        path: 'scales',
        model: 'Scale',
        populate: [{ path: 'worship' }, { path: 'people' }],
      }).populate({
        path: 'group',
        model: 'Group',
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async save(subgroup) {
    try {
      return await Subgroup.create(subgroup);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async update(subgroupId, subgroupData) {
    try {
      return await Subgroup.findByIdAndUpdate(subgroupId, subgroupData, { runValidators: true });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async delete(subgroupId) {
    try {
      return await Subgroup.deleteOne({ _id: subgroupId });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

export default new SubgroupRepository();
