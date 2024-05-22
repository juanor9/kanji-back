import Character from "../models/Character.js";

const resolvers = {
  Query: {
    getCharacterById: async (_, { id }) => {
      try {
        const character = await Character.findById(id);
        return character;
      } catch (error) {
        console.error("Error en getCharacterById:", error);
        throw new Error('Error fetching character by ID');
      }
    },
    entries: async () => {
      try {
        const characters = await Character.find();
        return characters;
      } catch (error) {
        console.error("Error en entries:", error);
        throw new Error('Error fetching entries');
      }
    },
    getAllCharacters: async () => {
      try {
        const characters = await Character.find({});
        return characters;
      } catch (error) {
        console.error("Error en getAllCharacters:", error);
        return [];
      }
    },
    getCharacterByLiteral: async (_, { literal }) => {
      try {
        const characters = await Character.find({ "literal": literal });
        return characters;
      } catch (error) {
        console.error("Error en getCharacterByLiteral:", error);
        return [];
      }
    }
  }
};

export default resolvers;