import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RadicalSchema = new Schema({
  radType: String,
  code: String
});

const ReadingSchema = new Schema({
  kunyomi: [String],
  onyomi: [String],
  nanori: [String]
});

const MeaningSchema = new Schema({
  language: String,
  meaning: String
});

const VariantSchema = new Schema({
  varType: String,
  varCode: String
});

const DictionarySchema = new Schema({
  dictionaryName: String,
  code: String
});

const QueryCodeSchema = new Schema({
  queryType: String,
  qCode: String
});

const CodepointSchema = new Schema({
  cpType: String,
  code: String
});

const KanjiSchema = new Schema({
  literal: { type: String, required: true },
  radicals: [RadicalSchema],
  readings: ReadingSchema,
  meanings: [MeaningSchema],
  grade: Number,
  strokes: [Number],
  jlpt: Number,
  freq: Number,
  variant: [VariantSchema],
  dictionaries: [DictionarySchema],
  queryCodes: [QueryCodeSchema],
  codepoints: [CodepointSchema]
});

const Character = model('Character', KanjiSchema, 'kanjidic');

export default Character;
