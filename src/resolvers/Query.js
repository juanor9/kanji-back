import Character from "../models/Character.js";


const resolvers = {
  Query: {
    getCharacterById: async (_, { id }) => {
      try {
        const character = await Character.findById(id);
        return character;
      } catch (error) {
        console.error("Error en getCharacterById:", error);
        return null;
      }
    }
  }
}

export default resolvers;
