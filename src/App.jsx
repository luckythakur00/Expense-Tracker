import React, { useContext, useEffect } from 'react'
import './App.css'
import Summary from './Components/Summary'
import Expense from './Components/Expense'
import ChartComp from './Components/ChartComp'
import Transaction from './Components/Transaction'
import { GlobalContext } from './Context/GlobalStore'

function App() {
  const { model, setModel,
    totalIncome, setTotalIncome,
    totalExpense, setTotalExpense,
    totalBalance, setTotalBalance,
    incomeTransaction, setIncomeTransaction,
    expenseTransaction, setExpenseTransaction } = useContext(GlobalContext);

  useEffect(() => {
    setIncomeTransaction(JSON.parse(localStorage.getItem('income')))
    setExpenseTransaction(JSON.parse(localStorage.getItem('expense')))
    setTotalIncome(JSON.parse(localStorage.getItem('totalincome')))
    setTotalExpense(JSON.parse(localStorage.getItem('totalexpense')))
    setTotalBalance(JSON.parse(localStorage.getItem('totalbalance')))
  }, [])

  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(incomeTransaction))
    localStorage.setItem('expense', JSON.stringify(expenseTransaction))
    localStorage.setItem('totalincome', JSON.stringify(totalIncome))
    localStorage.setItem('totalexpense', JSON.stringify(totalExpense))
    localStorage.setItem('totalbalance', JSON.stringify(totalBalance))
  }, [totalIncome, totalExpense, incomeTransaction, expenseTransaction, totalBalance])


  return (
    <div className='h-full sm:h-screen w-screen '>
      <div className='h-10 w-full px-4 py-6 sm:py-10 border-b border-white flex justify-between items-center' >
        <h1 className='text-xl font-semibold text-white  sm:text-3xl ' >Expense Tracker</h1>
        <button onClick={() => setModel(!model)} className='h-8 w-28 transition-transform duration-100 hover:scale-105 hover:bg-blue-600 text-sm sm:text-base sm:h-10 rounded font-semibold text-black bg-blue-500 sm:w-52  '> Add Transaction</button>
      </div>
      <div className='w-11/12 flex justify-center items-center flex-col sm:flex-row ' >
        <div className='h-56 w-full sm:mb-4 sm:min-h-72 sm:w-1/2  ' >
          <Summary />
        </div>
        <div className='h-60 w-full sm:min-h-72 sm:w-1/2' >
          {
            totalIncome === 0 && totalExpense === 0 ? <h1 className='font-semibold text-lg sm:text-2xl text-center pt-10 sm:pt-32 text-white' >Add Transactions <span onClick={() => setModel(true)} className='text-blue-700 cursor-pointer' >Click Here!</span></h1> : <ChartComp />
          }
        </div>
        <div >
          {
            model ? <Transaction /> : null
          }
        </div>
      </div>
      <div className='h-1 sm:h-10 w-full sm:mt-20 sm:mb-8 bg-gray-400 ' ></div>
      <div className='h-52 min-h-52 w-full' >
        <Expense />
      </div>
    </div>
  )
}

export default App
