import SQLite from 'react-native-sqlite-storage';
import { Platform } from 'react-native';

export const openDatabase = async () => {

  let db;

    try {
      db = await SQLite.openDatabase({ name: 'expenses.db', location: 'default' });
      console.log("Banco de dados aberto com sucesso!");

      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, spent TEXT, descriptionSpent TEXT, typeSpent TEXT, formattedDate TEXT)',
          [],
          () => {
            console.log("Tabela criada");
          },
          (error) => {
            console.log("Erro ao criar a tabela: ", error);
          }
        );
      });

    } catch (error) {
      console.log("Erro ao abrir banco de dados: ", error);
      return null;
    }

  return db;
};