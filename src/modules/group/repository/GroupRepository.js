import Group from '../entity/Group';

class GroupRepository {
  async findAll() {
    try {
      return await Group.find();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findById(id) {
    try {
      return await Group.findById(id).populate({
        path: 'scales',
        model: 'Scale',
        populate: [{ path: 'worship' }, { path: 'people' }],
      }).populate({
        path: 'subgroups',
        model: 'Subgroup',
        populate: {
          path: 'scales',
          populate: [{ path: 'people' }, { path: 'worship' }],
        },
      }).populate({ path: 'subgroups.scales.people' });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async save(group) {
    try {
      return await Group.create(group);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async update(groupId, groupData) {
    try {
      return await Group.findByIdAndUpdate(groupId, groupData, { runValidators: true });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async delete(groupId) {
    try {
      return await Group.deleteOne({ _id: groupId });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

export default new GroupRepository();
