'use client';
import {Bar , BarChart, XAxis , ResponsiveContainer , Legend , Tooltip} from 'recharts';


const mess = [
    {day:'sat' , count : 4},
    {day:'sun' , count : 5},
    {day:'mon' , count : 2},
    {day:'teu' , count : 1},
    {day:'wed' , count : 8},
    {day:'thu' , count : 9},
    {day:'fri' , count : 7},
]

function XYChart(){
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <BarChart width={500} height={400} data={mess} margin={{right:40 , left:40, }} >
            <XAxis dataKey='day' />
            <Tooltip content={<CustomTooltip/>}/>
            <Legend/>
                <Bar type='monotone' dataKey='count' stroke='#053f96' fill='#053f96' />
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