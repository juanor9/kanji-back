import Character from "../models/Character.js";
import Entry from "../models/Word.js";
import Radical from "../models/radicals.js";

const resolvers = {
  Query: {
    // Resolver para obtener un kanji por su ID
    getCharacterById: async (_, { id }) => {
      try {
        const character = await Character.findById(id);
        if (!character) {
          throw new Error("Character not found");
        }
        return character;
      } catch (error) {
        console.error("Error en getCharacterById:", error);
        throw new Error("Error fetching character by ID");
      }
    },
    // Resolver para obtener todos los kanji
    getAllCharacters: async () => {
      try {
        const characters = await Character.find();
        return characters;
      } catch (error) {
        console.error("Error en getAllCharacters:", error);
        throw new Error("Error fetching all characters");
      }
    },
    getRandomCharacter: async (_, { jlpt }) => {
      try {
        const filter = {};
        if (jlpt !== undefined) {
          filter.jlpt = jlpt;
        }

        const count = await Character.countDocuments(filter);
        if (!count || count <= 0) {
          throw new Error("No characters found with the specified filter");
        }
        const random = Math.floor(Math.random() * count);
        const character = await Character.findOne(filter).skip(random);
        return character;
      } catch (error) {
        console.error("Error en getRandomCharacter:", error);
        throw new Error("Error fetching random character");
      }
    },
    // Resolver para obtener un kanji por su literal
    getCharacterByLiteral: async (_, { literal }) => {
      try {
        console.log("kanji: ", literal);
        const filter = {};
        if (literal !== undefined) {
          filter.literal = literal;
        }
        const character = await Character.findOne(filter);
        if (!character) {
          throw new Error("Character not found");
        }
        return character;
      } catch (error) {
        console.error("Error en getCharacterByLiteral:", error);
        throw new Error("Error fetching character by literal");
      }
    },
    // Resolver para obtener todas las entradas del diccionario
    getAllEntries: async () => {
      try {
        const entries = await Entry.find();
        return entries;
      } catch (error) {
        console.error("Error en getAllEntries:", error);
        throw new Error("Error fetching all entries");
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
          throw new Error("Entry not found");
        }
        return entry;
      } catch (error) {
        console.error("Error en getEntryById:", error);
        throw new Error("Error fetching entry by id");
      }
    },
    // Resolver para obtener todas las entradas que usan un kanji
    getEntriesByKanjiWriting: async (_, { writing, language }) => {

      try {
        const entries = await Entry.find({
          "kanji.writing": { $regex: writing, $options: "i" },
        });
    
        if (entries.length === 0) {
          throw new Error("Entries not found");
        }
    
        // Encontrar escritura que contenga el kanji buscado..
        const sortWritingEntries = entries.map((entry) => {
          const kanjiFilteredList = entry.kanji.filter((kanji) =>
            kanji.writing.includes(writing)
          );
          return { ...entry._doc, kanji: kanjiFilteredList }; // Asegurarse de conservar todos los campos
        });
    
        const filteredEntriesByLanguage = sortWritingEntries.filter((entry) => {
          if (!language) return true;
          return entry.meanings.some((meaning) =>
            meaning.meaning.some((dictMeaning) => dictMeaning.language === language)
          );
        }).map((entry) => {
          if (!language) return entry;
          const filteredMeanings = entry.meanings.map((meaning) => {
            const filteredDictMeanings = meaning.meaning.filter((dictMeaning) => dictMeaning.language === language);
            return { ...meaning, meaning: filteredDictMeanings };
          }).filter((meaning) => meaning.meaning.length > 0);
          return { ...entry, meanings: filteredMeanings };
        });
    
        const toSort = language ? filteredEntriesByLanguage : sortWritingEntries;
    
        // Ordenar las entradas primero por la longitud de `kanji.writing`
        // y luego por si comienzan con `writing`
        const sortedEntries = toSort.sort((a, b) => {
          const aLength = a.kanji[0].writing.length;
          const bLength = b.kanji[0].writing.length;
    
          if (aLength !== bLength) {
            return aLength - bLength;
          }
    
          const aStartsWith = a.kanji.some((kanji) =>
            kanji.writing.startsWith(writing)
          );
          const bStartsWith = b.kanji.some((kanji) =>
            kanji.writing.startsWith(writing)
          );
    
          if (aStartsWith && !bStartsWith) {
            return -1;
          }
    
          if (!aStartsWith && bStartsWith) {
            return 1;
          }
    
          return 0;
        });
    
        return sortedEntries;
      } catch (error) {
        console.error("Error en getEntriesByKanjiWriting:", error);
        throw new Error("Error fetching entries by kanji");
      }
    },
    
    // Resolver para obtener todos los radicales
    getAllRadicals: async () => {
      try {
        const radicals = await Radical.find();
        return radicals;
      } catch (error) {
        console.error("Error en getAllRadicals:", error);
        throw new Error("Error fetching all radicals");
      }
    },
    // Resolver para obtener un radical por id
    getRadicalById: async (_, { id }) => {
      try {
        const filter = {};
        if (id !== undefined) {
          filter.id = id;
        }
        const radical = await Radical.findOne(filter);
        if (!radical) {
          throw new Error("Radical not found");
        }
        return radical;
      } catch (error) {
        console.error("Error en getRadicalById:", error);
        throw new Error("Error fetching radical by id");
      }
    },
    // Resolver para obtener un radical por literal
    getRadicalByLiteral: async (_, { literal }) => {
      console.log("🚀 ~ getRadicalByLiteral: ~ literal:", literal)
      try {
        const filter = {};
        if (literal !== undefined) {
          filter.literal = literal;
        }
        const radical = await Radical.findOne(filter);
        if (!radical) {
          throw new Error("Radical not found");
        }
        return radical;
      } catch (error) {
        console.error("Error en getRadicalByLiteral:", error);
        throw new Error("Error fetching radical by literal");
      }
    },
  },
};

export default resolvers;
