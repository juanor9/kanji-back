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
    getAllCharacters: async () => {
      try {
        const characters = await Character.find();
        return characters;
      } catch (error) {
        console.error("Error en getAllCharacters:", error);
        throw new Error('Error fetching all characters');
      }
    }
  }
};

export default resolvers;
