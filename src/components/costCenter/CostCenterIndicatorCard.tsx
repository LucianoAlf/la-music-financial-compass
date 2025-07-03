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

  const getAlertBadgeColor = () => {
    switch (alert) {
      case 'success': return 'text-success-600 bg-success-100';
      case 'warning': return 'text-warning-600 bg-warning-100';
      case 'danger': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-danger-500" />;
      default: return null;
    }
  };

  const handleClick = () => {
    if (onClick) {
      console.log('🎯 [CostCenterIndicatorCard] Card clicked:', title);
      onClick();
    }
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-200 border-2",
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
      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5" />}
            {title}
          </CardTitle>
          {alert && (
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full animate-pulse-glow",
                alert === 'success' ? 'bg-success-500' :
                alert === 'warning' ? 'bg-warning-500' : 'bg-danger-500'
              )} />
              {onClick && (
                <div className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">
                  Clique para detalhes
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="text-3xl font-bold text-primary">
              {value}
            </div>
            {getTrendIcon()}
          </div>
          
          {subtitle && (
            <p className="text-sm text-gray-600">
              {subtitle}
            </p>
          )}

          {alert && (
            <Badge className={getAlertBadgeColor()}>
              {alert === 'success' ? 'Excelente' : 
               alert === 'warning' ? 'Atenção' : 'Crítico'}
            </Badge>
          )}

          {progressValue !== undefined && (
            <div className="space-y-2">
              <Progress 
                value={progressValue} 
                className="h-2"
              />
              <div className="text-xs text-gray-500">
                {progressValue.toFixed(0)}% de atividade
              </div>
            </div>
          )}

          {description && (
            <p className="text-xs text-gray-500 mt-2">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};