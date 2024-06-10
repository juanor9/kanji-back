import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RadicalSchema = new Schema({
  id: Number,
  literal: { type: String, required: true },
  meaningES: String,
  strokeNumber: Number,
  pīnyīn: String,
  vietnamese: String,
  hiragana: String,
  hangeul: String,
  meaningEN: String,
  frequency: Number,
});

const Radical = model('Radical', RadicalSchema, 'radicals');

export default Radical;
