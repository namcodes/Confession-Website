import {Schema, model, models} from 'mongoose';

const confessionSchema = new Schema({
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  confess: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});


const tbl_confessions = models.tbl_confessions || model("tbl_confessions", confessionSchema);

export default tbl_confessions;