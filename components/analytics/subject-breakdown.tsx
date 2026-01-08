"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Computer Science", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Chemistry", value: 25, color: "hsl(var(--chart-2))" },
  { name: "History", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Mathematics", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Physics", value: 5, color: "hsl(var(--chart-5))" },
]

export function SubjectBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Time by Subject</CardTitle>
        <CardDescription>Distribution of your study hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
