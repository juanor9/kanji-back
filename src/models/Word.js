import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const meaningSchema = new Schema({
  language: { type: String, required: true },
  word: { type: String, required: true }
});

const meaningsSchema = new Schema({
  partOfSpeech: [{ type: String }],
  meaning: [meaningSchema]
});

const kanaSchema = new Schema({
  reading: { type: String, required: true }
});

const kanjiSchema = new Schema({
  writing: { type: String, required: true }
});

const entrySchema = new Schema({
  id: { type: Number, required: true },
  kana: [kanaSchema],
  kanji: [kanjiSchema],
  meanings: [meaningsSchema]
});

const Entry = model('Entry', entrySchema, 'JMDict');



export default Entry;
