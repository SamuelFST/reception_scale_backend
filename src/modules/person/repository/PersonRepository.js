import Person from '../entity/Person';

class PersonRepository {
  async findAll() {
    try {
      return await Person.find();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findById(id) {
    try {
      return await Person.findById(id);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async save(person) {
    try {
      return await Person.create(person);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async update(personId, personData) {
    try {
      return await Person
        .findByIdAndUpdate(personId, personData, { runValidators: true, new: true });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async delete(personId) {
    try {
      return await Person.deleteOne({ _id: personId });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

export default new PersonRepository();
