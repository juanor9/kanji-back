import { gql } from "apollo-server";

const typeDefs = gql`
  type Radical {
    radType: String
    code: String
  }

  type Reading {
    kunyomi: [String]
    onyomi: [String]
    nanori: [String]
  }

  type Meaning {
    language: String
    meaning: String
  }

  type Variant {
    varType: String
    varCode: String
  }

  type Dictionary {
    dictionaryName: String
    code: String
  }

  type QueryCode {
    queryType: String
    qCode: String
  }

  type Codepoint {
    cpType: String
    code: String
  }

  type Character {
    _id: ID
    literal: String
    radicals: [Radical]
    readings: Reading
    meanings: [Meaning]
    grade: Int
    strokes: [Int]
    jlpt: Int
    freq: Int
    variant: [Variant]
    dictionaries: [Dictionary]
    queryCodes: [QueryCode]
    codepoints: [Codepoint]
  }
  type DictMeaning {
    language: String
    word: String
  }

  type Meanings {
    partOfSpeech: [String]
    meaning: [DictMeaning]
  }

  type Kana {
    reading: String
  }

  type DictKanji {
    writing: String
  }

  type Entry {
    _id: ID
    id: Int
    kana: [Kana]
    kanji: [DictKanji]
    meanings: [Meanings]
  }

  type Query {
    getCharacterById(id: ID!): Character
    getAllCharacters: [Character]
    getRandomCharacter(jlpt: Int): Character
    getCharacterByLiteral(literal: String): Character

    getEntryById(id: Int!): Entry
    getAllEntries: [Entry]
    getEntriesByKanjiWriting(writing: String!, language: String): [Entry]
  }
`;

export default typeDefs;
