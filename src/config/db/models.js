import Person from '../../modules/person/entity/Person';
import Group from '../../modules/group/entity/Group';
import Scale from '../../modules/scale/entity/Scale';
import Subgroup from '../../modules/subgroup/entity/Subgroup';
import Worship from '../../modules/worship/entity/Worship';

export default () => [
  Person.modelName,
  Group.modelName,
  Scale.modelName,
  Subgroup.modelName,
  Worship.modelName,
];
