import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(null);
    const [model, setModel] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [incomeTransaction, setIncomeTransaction] = useState([]);
    const [expenseTransaction, setExpenseTransaction] = useState([]);

    return <GlobalContext.Provider
        value={{
            totalIncome, setTotalIncome,
            totalExpense, setTotalExpense,
            totalBalance, setTotalBalance,
            model, setModel,
            description, setDescription,
            amount, setAmount,
            type, setType,
            incomeTransaction, setIncomeTransaction,
            expenseTransaction, setExpenseTransaction
        }} >
        {children}
    </GlobalContext.Provider>
}