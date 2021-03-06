import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#F10270', '#5DBCD2'];

const RemainingBalanceChart = (props) => { 
  const { data } = props;
  return (
    <div className="content">
      <ResponsiveContainer  width="100%" height={300}>
        <PieChart height={250}>
          <Pie
            data={data}
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
              return (
                <text
                  x={x}
                  y={y}
                  fill="#F0F0F0"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {data[index].name.slice(0,3)} - {value}%
                </text>
              );
            }}
          >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RemainingBalanceChart