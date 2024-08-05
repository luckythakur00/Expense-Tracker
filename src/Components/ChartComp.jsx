import React, { useContext } from 'react'
import Chart from 'react-apexcharts'
import { GlobalContext } from '../Context/GlobalStore';

function ChartComp() {
    const { totalIncome, totalExpense } = useContext(GlobalContext)

    const chartOpetions = {
        labels: ['Income', 'Expense'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    const chartSeries = [totalIncome, totalExpense];

    return (
        <div className='h-full w-full ml-5 sm:w-11/12 sm:mt-10' >
            <div className='h-full w-full flex justify-center items-center m-auto ' >
                <Chart options={chartOpetions} series={chartSeries} type='pie' width='350' height='100%' />
            </div>
        </div>
    )
}

export default ChartComp