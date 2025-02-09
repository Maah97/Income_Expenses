import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GraphIncomesExpenses (props) {
    const [data, setData] = useState([])
    useEffect(() => {
        setTimeout(() => {
          setData(props.data)
        }, 100);
    });
    return (
        <div className='graph'>
            <p style={props.type === "expenses" ? {color: "rgb(173, 0, 0)"} : {color: "rgb(0, 107, 0)"}}>Graph of {props.type === "expenses" ? "expenses" : "incomes"}</p>
            <div className='line'></div>
            {
                data.length > 0 ? 
                <ResponsiveContainer key={JSON.stringify(data)} width="85%" height={300}>
                    <BarChart barSize={30} data={data}>
                        <XAxis dataKey="category" />
                        <YAxis dataKey="amount"/>
                        <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer> : 
                <p>Chargement en cours...</p>
            }
        </div>
    )
}

GraphIncomesExpenses.propTypes = {
    type: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
            category: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired
    })).isRequired,
}