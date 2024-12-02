import SQLite from 'react-native-sqlite-storage';

export const openDatabase = async () => {

  let db;

  try {
    db = await SQLite.openDatabase({ name: 'expenses.db', location: 'default' });
    // console.log("Banco de dados aberto com sucesso!");

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, spent REAL, descriptionSpent TEXT, typeSpent TEXT, formattedDate TEXT)',
        [],
        () => {
          // console.log("Tabela criada expense");
        },
        (error) => {
          console.log("Erro ao criar a tabela: ", error);
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS balance (id INTEGER PRIMARY KEY AUTOINCREMENT, formattedDate TEXT, currentBalance REAL, spent REAL)',
        [],
        () => {
          // console.log("Tabela criada balance");
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