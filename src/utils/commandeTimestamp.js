// Nouveau fichier utilitaire pour gérer les dates locales des commandes
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyForId = (id) => `commande_ts_${id}`;

export const saveCommandeTimestamp = async (id, isoString) => {
  try {
    await AsyncStorage.setItem(keyForId(id), isoString);
  } catch (e) {
    console.log('Erreur sauvegarde timestamp', e);
  }
};

export const getCommandeTimestamp = async (id) => {
  try {
    return await AsyncStorage.getItem(keyForId(id));
  } catch (e) {
    console.log('Erreur lecture timestamp', e);
    return null;
  }
}; 