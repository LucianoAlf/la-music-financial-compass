import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CostCenterIndicatorCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  alert?: 'success' | 'warning' | 'danger';
  progressValue?: number;
  icon?: LucideIcon;
  onClick?: () => void;
  description?: string;
}

export const CostCenterIndicatorCard = ({
  title,
  value,
  subtitle,
  trend = 'stable',
  alert,
  progressValue,
  icon: Icon,
  onClick,
  description
}: CostCenterIndicatorCardProps) => {
  const getAlertColor = () => {
    switch (alert) {
      case 'success': return 'border-success-500 bg-success-50';
      case 'warning': return 'border-warning-500 bg-warning-50';
      case 'danger': return 'border-danger-500 bg-danger-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getIconColor = () => {
    switch (alert) {
      case 'success': return 'text-success-600';
      case 'warning': return 'text-warning-600';
      case 'danger': return 'text-danger-600';
      default: return 'text-primary-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  const handleClick = () => {
    if (onClick) {
      console.log('🎯 [CostCenterIndicatorCard] Card clicked:', title);
      onClick();
    }
  };

  return (
    <div 
      className={cn(
        "p-6 rounded-xl border-2 shadow-sm transition-all duration-200",
        getAlertColor(),
        onClick ? "cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95" : "hover:shadow-md"
      )}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {Icon && <Icon className={cn("w-5 h-5", getIconColor())} />}
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <span className="text-lg opacity-70">{getTrendIcon()}</span>
            </div>
            
            {subtitle && (
              <p className={cn("text-sm font-medium", 
                alert === 'success' ? 'text-success-600' :
                alert === 'warning' ? 'text-warning-600' : 
                alert === 'danger' ? 'text-danger-600' : 'text-gray-600'
              )}>
                {subtitle}
              </p>
            )}
            
            {description && (
              <p className="text-xs text-gray-500">
                {description}
              </p>
            )}
            
            {progressValue !== undefined && (
              <div className="space-y-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      alert === 'success' ? 'bg-success-500' : 
                      alert === 'warning' ? 'bg-warning-500' : 'bg-danger-500'
                    )}
                    style={{ 
                      width: `${Math.min(100, Math.max(0, progressValue))}%`
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {progressValue.toFixed(0)}% de atividade
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {alert && (
            <div className={cn(
              "w-3 h-3 rounded-full animate-pulse-glow",
              alert === 'success' ? 'bg-success-500' :
              alert === 'warning' ? 'bg-warning-500' : 'bg-danger-500'
            )} />
          )}
          
          {onClick && (
            <div className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">
              Clique para detalhes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};