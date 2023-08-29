import mongoose, { Schema } from 'mongoose';

/**
 * @typedef Group
 * @property {string} _id
 * @property {string} title.required
 * @property {Array.<Scale>} scales
 * @property {Array.<Subgroup>} subgroups
 */

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    scales: [{
      type: Schema.Types.ObjectId,
      ref: 'Scale',
    }],
    subgroups: [{
      type: Schema.Types.ObjectId,
      ref: 'Subgroup',
    }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Group', groupSchema);
