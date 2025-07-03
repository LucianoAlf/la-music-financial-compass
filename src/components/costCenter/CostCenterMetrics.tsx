
import { useState } from 'react';
import { CostCenterKPICard } from './CostCenterKPICard';
import { CostCenterDetailModal } from './CostCenterDetailModal';
import { TrendingUp, TrendingDown, DollarSign, Target, Award, AlertTriangle } from 'lucide-react';
import { CostCenterMetrics as Metrics } from '@/types/costCenter';

interface CostCenterMetricsProps {
  metrics: Metrics;
}

export const CostCenterMetrics = ({ metrics }: CostCenterMetricsProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'total' | 'categories' | 'highest' | 'lowest' | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Alert system based on thresholds
  const getExpenseAlert = () => {
    if (metrics.monthlyGrowth > 10) return 'danger';
    if (metrics.monthlyGrowth > 5) return 'warning';
    return 'success';
  };

  const getCategoriesAlert = () => {
    if (metrics.categoryCount < 3) return 'warning';
    if (metrics.categoryCount > 8) return 'danger';
    return 'success';
  };

  const getHighestCategoryAlert = () => {
    if (metrics.highestCategory.percentage > 60) return 'danger';
    if (metrics.highestCategory.percentage > 40) return 'warning';
    return 'success';
  };

  const getLowestCategoryAlert = () => {
    if (metrics.lowestCategory.percentage < 2) return 'warning';
    return 'success';
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CostCenterKPICard
          title="Total de Despesas"
          value={formatCurrency(metrics.totalExpenses)}
          change={metrics.monthlyGrowth}
          icon={DollarSign}
          format="currency"
          alert={getExpenseAlert()}
          onClick={() => setSelectedMetric('total')}
          trend={metrics.monthlyGrowth > 0 ? 'up' : metrics.monthlyGrowth < 0 ? 'down' : 'stable'}
          subtitle={`Variação: ${metrics.monthlyGrowth >= 0 ? '+' : ''}${formatPercentage(metrics.monthlyGrowth)}`}
        />

        <CostCenterKPICard
          title="Categorias Ativas"
          value={metrics.categoryCount.toString()}
          icon={Target}
          format="number"
          alert={getCategoriesAlert()}
          onClick={() => setSelectedMetric('categories')}
          subtitle={`Média: ${formatCurrency(metrics.averagePerCategory)}`}
          trend="stable"
        />

        <CostCenterKPICard
          title="Maior Categoria"
          value={formatPercentage(metrics.highestCategory.percentage)}
          icon={Award}
          format="percentage"
          alert={getHighestCategoryAlert()}
          onClick={() => setSelectedMetric('highest')}
          subtitle={metrics.highestCategory.name}
          progressValue={metrics.highestCategory.percentage}
          trend="up"
        />

        <CostCenterKPICard
          title="Menor Categoria"
          value={formatPercentage(metrics.lowestCategory.percentage)}
          icon={AlertTriangle}
          format="percentage"
          alert={getLowestCategoryAlert()}
          onClick={() => setSelectedMetric('lowest')}
          subtitle={metrics.lowestCategory.name}
          progressValue={metrics.lowestCategory.percentage}
          trend="down"
        />
      </div>

      <CostCenterDetailModal
        open={selectedMetric !== null}
        onOpenChange={(open) => !open && setSelectedMetric(null)}
        metricType={selectedMetric}
        metrics={metrics}
      />
    </>
  );
};
