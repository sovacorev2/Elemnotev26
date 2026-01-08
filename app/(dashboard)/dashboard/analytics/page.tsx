import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityChart } from "@/components/analytics/activity-chart"
import { PerformanceChart } from "@/components/analytics/performance-chart"
import { SubjectBreakdown } from "@/components/analytics/subject-breakdown"
import { RecentActivity } from "@/components/analytics/recent-activity"
import { TrendingUp, Clock, Target, Award } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Analytics</h1>
        <p className="text-muted-foreground">Track your progress and study patterns</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Study Time"
          value="42.5h"
          description="This month"
          icon={Clock}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Average Quiz Score"
          value="85%"
          description="Last 10 quizzes"
          icon={Target}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Learning Streak"
          value="7 days"
          description="Current streak"
          icon={Award}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Improvement Rate"
          value="+15%"
          description="vs last month"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityChart />
        <PerformanceChart />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SubjectBreakdown />
        <RecentActivity />
      </div>
    </div>
  )
}
