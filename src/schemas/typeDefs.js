import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const radicalSchema = new Schema({
  radType: String,
  code: String,
}, { _id: false });

const readingSchema = new Schema({
  kunyomi: [String],
  onyomi: [String],
  nanori: [String],
}, { _id: false });

const meaningSchema = new Schema({
  language: String,
  meaning: String,
}, { _id: false });

const variantSchema = new Schema({
  varType: String,
  varCode: String,
}, { _id: false });

const dictionarySchema = new Schema({
  dictionaryName: String,
  code: String,
}, { _id: false });

const queryCodeSchema = new Schema({
  queryType: String,
  qCode: String,
}, { _id: false });

const codepointSchema = new Schema({
  cpType: String,
  code: String,
}, { _id: false });

const kanjiSchema = new Schema({
  _id: Schema.Types.ObjectId,
  literal: String,
  radicals: [radicalSchema],
  readings: readingSchema,
  meanings: [meaningSchema],
  grade: Number,
  strokes: [Number],
  jlpt: Number,
  freq: Number,
  variant: [variantSchema],
  dictionaries: [dictionarySchema],
  queryCodes: [queryCodeSchema],
  codepoints: [codepointSchema],
}, { collection: 'kanjidic' });

export default model('Character', kanjiSchema);
