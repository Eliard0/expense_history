import { openDatabase } from "./store";

interface Expense {
    id: number;
    spent: string;
    descriptionSpent: string;
    typeSpent: string;
    formattedDate: string;
}

interface Balance {
    id: number;
    spent: number;
    currentBalance: number;
    formattedDate: string;
}

export const insertDataSpent = async (spent: number, descriptionSpent: string, typeSpent: string, formattedDate: string) => {
    const db = await openDatabase();
    if (!db) return;

    return new Promise((resolve, reject) => {
        
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO expenses (spent, descriptionSpent, typeSpent, formattedDate) VALUES (?, ?, ?, ?)',
                [spent, descriptionSpent, typeSpent, formattedDate],
                () => {
                    console.log("Cadastrado com sucesso!");
                    resolve(true)
                },
                (error) => {
                    console.log("Erro ao inserir dados: ", error);
                    return true
                }
            );
        });
    })
};

export const fetchDataSpent = async (): Promise<Expense[]> => {
    const db = await openDatabase();
    if (!db) return [];

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM expenses',
                [],
                (_, results) => {
                    const rows = results.rows;
                    const expenses: Expense[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        expenses.push(rows.item(i) as Expense);
                    }
                    resolve(expenses);
                },
                (error) => {
                    console.log("Erro ao recuperar dados: ", error);
                    reject([]);
                }
            );
        });
    });
};

export const fetchDataBalance = async (): Promise<Balance[]> => {
    const db = await openDatabase();
    if (!db) return [];

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM balance',
                [],
                (_, results) => {
                    const rows = results.rows;
                    const balance: Balance[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        balance.push(rows.item(i) as Balance);
                    }
                    resolve(balance);
                },
                (error) => {
                    console.log("Erro ao recuperar dados: ", error);
                    reject([]);
                }
            );
        });
    });
};

export const insertDataBalance = async (balance: number, formattedDate: string, spent?: number) => {
    const db = await openDatabase();
    if (!db) return;

    return new Promise((resolve, reject) => {
        
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO balance (currentBalance, formattedDate, spent) VALUES (?, ?, ?)',
                [balance, formattedDate, spent ?? null],
                () => {
                    console.log("Cadastrado com sucesso!");
                    resolve(true)
                },
                (error) => {
                    console.log("Erro ao inserir dados: ", error);
                    return true
                }
            );
        });
    })
};
