import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const codepointSchema = new Schema({
    cp_value: String,
    cp_type: String
});

const radicalValueSchema = new Schema({
    value: String,
    rad_type: String
});

const radicalSchema = new Schema({
    rad_value: [radicalValueSchema]
});

const miscSchema = new Schema({
    grade: String,
    stroke_count: Number,
    variant: String,
    freq: Number,
    jlpt: String
});

const dicRefSchema = new Schema({
    value: String,
    dr_type: String,
    m_vol: String,
    m_page: String
});

const queryCodeSchema = new Schema({
    q_code: String,
    qc_type: String
});

const readingSchema = new Schema({
    value: String,
    r_type: String
});

const meaningSchema = new Schema({
    text: String,
    m_lang: String
});

const readingMeaningSchema = new Schema({
    reading: [readingSchema],
    meaning: [meaningSchema]
});

const characterSchema = new Schema({
    literal: [String],
    codepoint: [codepointSchema],
    radical: [radicalSchema],
    misc: miscSchema,
    dic_number: [dicRefSchema],
    query_code: [queryCodeSchema],
    reading_meaning: readingMeaningSchema,
    nanori: [String]
});

export default model('Character', characterSchema);
