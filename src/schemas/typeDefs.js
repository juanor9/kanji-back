import { gql } from 'apollo-server';

const typeDefs = gql`
  # Definiciones de tipos para GraphQL
  type Codepoint {
    cp_value: String
    cp_type: String
  }

  type RadicalValue {
    value: String
    rad_type: String
  }

  type Radical {
    rad_value: [RadicalValue]
  }

  type Misc {
    grade: String
    stroke_count: Int
    variant: String
    freq: Int
    jlpt: String
  }

  type DicRef {
    value: String
    dr_type: String
    m_vol: String
    m_page: String
  }

  type QueryCode {
    q_code: String
    qc_type: String
  }

  type Reading {
    value: String
    r_type: String
  }

  type Meaning {
    text: String
    m_lang: String
  }

  type ReadingMeaning {
    reading: [Reading]
    meaning: [Meaning]
  }

  type Character {
    id: ID
    literal: [String]
    codepoint: [Codepoint]
    radical: [Radical]
    misc: Misc
    dic_number: [DicRef]
    query_code: [QueryCode]
    reading_meaning: ReadingMeaning
    nanori: [String]
  }

  # Query definitions
  type Query {
    getCharacterById(id: ID!): Character
    getAllCharacters: [Character]
  }

  # Mutation definitions
  type Mutation {
    addCharacter(character: CharacterInput): Character
  }

  # Input types for mutations
  input CharacterInput {
    literal: [String]
    # Other fields can be added here
  }
`;

export default typeDefs;
