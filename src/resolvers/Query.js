import Character from "../models/Character.js";
import Entry from "../models/Word.js";

const resolvers = {
  Query: {
    // Resolver para obtener un kanji por su ID
    getCharacterById: async (_, { id }) => {
      try {
        const character = await Character.findById(id);
        if (!character) {
          throw new Error('Character not found');
        }
        return character;
      } catch (error) {
        console.error("Error en getCharacterById:", error);
        throw new Error('Error fetching character by ID');
      }
    },
    // Resolver para obtener todos los kanji
    getAllCharacters: async () => {
      try {
        const characters = await Character.find();
        return characters;
      } catch (error) {
        console.error("Error en getAllCharacters:", error);
        throw new Error('Error fetching all characters');
      }
    },
    getRandomCharacter: async (_, {jlpt}) => {
      try {
        const filter = {};
        if (jlpt !== undefined) {
          filter.jlpt = jlpt;
        }

        const count = await Character.countDocuments(filter);
        if (!count || count <= 0){
          throw new Error('No characters found with the specified filter');
        }
        const random = Math.floor(Math.random() * count);
        const character = await Character.findOne(filter).skip(random);
        return character;
      } catch (error) {
        console.error("Error en getRandomCharacter:", error);
        throw new Error('Error fetching random character');
      }
    },
    // Resolver para obtener un kanji por su literal
    getCharacterByLiteral: async (_, { literal }) => {
      try {
        console.log('kanji: ', literal);
        const filter = {};
        if (literal !== undefined) {
          filter.literal = literal;
        }
        const character = await Character.findOne(filter);
        if (!character) {
          throw new Error('Character not found');
        }
        return character;
      } catch (error) {
        console.error("Error en getCharacterByLiteral:", error);
        throw new Error('Error fetching character by literal');
      }
    },
    // Resolver para obtener todas las entradas del diccionario
    getAllEntries: async () => {
      try {
        const entries = await Entry.find();
        return entries;
      } catch (error) {
        console.error("Error en getAllEntries:", error);
        throw new Error('Error fetching all entries');
      }
    },
    // Resolver para obtener una entrada del diccionario por su id
    getEntryById: async (_, { id }) => {
      try {
        const filter = {};
        if (id !== undefined) {
          filter.id = id;
        }
        const entry = await Entry.findOne(filter);
        if (!entry) {
          throw new Error('Entry not found');
        }
        return entry;
      } catch (error) {
        console.error("Error en getEntryById:", error);
        throw new Error('Error fetching entry by id');
      }
    },
    // Resolver para obtener todas las entradas que usan un kanji
    getEntriesByKanjiWriting: async (_, { writing  }) => {
      try {
        
        const entries = await Entry.find({ 'kanji.writing': { $regex: writing, $options: 'i' } });;
        if (!entries) {
          throw new Error('Entries not found');
        }
        return entries;
      } catch (error) {
        console.error("Error en getEntriesByKanjiWriting:", error);
        throw new Error('Error fetching entries by kanji');
      }
    },
  }
};

export default resolvers;

