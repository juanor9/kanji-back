import Character from "../models/Character.js";

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
        console.log('jplt', jlpt);
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
    }
  }
};

export default resolvers;

