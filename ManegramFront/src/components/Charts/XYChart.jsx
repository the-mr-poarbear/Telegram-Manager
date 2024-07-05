'use client';
import {Bar , BarChart, XAxis , ResponsiveContainer , Legend , Tooltip} from 'recharts';


const mess = [
    {'week_day':'sat' , 'day_log' : 4},
    {'week_day':'sun' , 'day_log' : 5},
    {'week_day':'mon' , 'day_log' : 2},
    {'week_day':'teu' , 'day_log' : 1},
    {'week_day':'wed' , 'day_log' : 8},
    {'week_day':'thu' , 'day_log' : 9},
    {'week_day':'fri' , 'day_log' : 7},
]

function XYChart({data}){
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <BarChart width={500} height={400} data={data} margin={{right:40 , left:40, }} >
            <XAxis dataKey='week_day' />
            <Tooltip />
            <Legend/>
                <Bar type='monotone' dataKey='day_log' stroke='#053f96' fill='#053f96' />
            </BarChart>
        </ResponsiveContainer>
        
    );
}

const CustomTooltip = ({active ,label, payload }) =>{
    
    if (active && payload ){
        console.log('gi')
        return (
            <div style={{backgroundColor:'black'}} className='p-4 flex flex-col gap-4 rounded-md'>
                <p className='text-medium text-lg'>{label}</p>
                <p className='text-sm text-blue-400'>count <span className='ms-2'>{payload[0].value}</span></p>
            </div>
        )
    }
}

export default XYChart;