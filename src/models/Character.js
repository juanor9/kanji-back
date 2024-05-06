import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const codepointSchema = new Schema({
    cp_value: [{ value: String, cp_type: String }]
  });
  
  const radicalSchema = new Schema({
    rad_value: [{ value: String, rad_type: String }]
  });
  
  const variantSchema = new Schema({
    value: String,
    var_type: String
  });
  
  const miscSchema = new Schema({
    stroke_count: [String],
    grade: String,
    freq: String,
    jlpt: String,
    variant: [variantSchema]
  });
  
  const dicRefSchema = new Schema({
    value: String,
    dr_type: String,
    m_vol: String,
    m_page: String
  });
  
  const qCodeSchema = new Schema({
    value: String,
    qc_type: String
  });
  
  const readingSchema = new Schema({
    value: String,
    r_type: String
  });
  
  const rmGroupSchema = new Schema({
    reading: [readingSchema],
    meaning: [String],
    nanori: [String]  // Agregar el campo `nanori`
  });
  
  const kanjiSchema = new Schema({
    _id: Schema.Types.ObjectId,
    literal: [String],
    codepoint: [codepointSchema],
    radical: [radicalSchema],
    misc: [miscSchema],
    dic_number: [{
      dic_ref: [dicRefSchema]
    }],
    query_code: [{
      q_code: [qCodeSchema]
    }],
    reading_meaning: [{
      rmgroup: [rmGroupSchema]
    }]
  });

export default model('Character', kanjiSchema, 'kanjidic');
