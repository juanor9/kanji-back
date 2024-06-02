import { gql } from 'apollo-server';

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

  type Query {
    getCharacterById(id: ID!): Character
    getAllCharacters: [Character]
    getRandomCharacter(jlpt: Int): Character
    getCharacterByLiteral(literal: String): Character
  }
`;

export default typeDefs;
