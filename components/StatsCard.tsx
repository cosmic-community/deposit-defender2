import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: number
  description: string
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red'
  className?: string
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  description,
  color,
  className = ''
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
  }

  return (
    <div className={`card ${className}`}>
      <div className="card-content p-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {value.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}