import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#F10270', '#5DBCD2'];

const RemainingBalanceChart = (props) => {
  return(
    <ResponsiveContainer width="100%" height={300}>
      <PieChart height={250}>
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index
          }) => {
            const RADIAN = Math.PI / 180;
            // eslint-disable-next-line
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            // eslint-disable-next-line
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            // eslint-disable-next-line
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            console.log(RADIAN, radius, x, y)
            return (
              <text
                x={x}
                y={y}
                fill="#F0F0F0"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {props.data[index].name} - {value}%
              </text>
            );
          }}
        >
        {
          props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default RemainingBalanceChart