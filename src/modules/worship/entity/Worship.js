import mongoose from 'mongoose';

/**
 * @typedef Worship
 * @property {string} _id
 * @property {string} type.required
 */

const worshipSchema = new mongoose.Schema(
  {
    type: {
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

export default mongoose.model('Worship', worshipSchema);
