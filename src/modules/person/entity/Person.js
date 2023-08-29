import mongoose from 'mongoose';
/**
 * @typedef Person
 * @property {string} _id
 * @property {string} name.required
 */

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Person', personSchema);
