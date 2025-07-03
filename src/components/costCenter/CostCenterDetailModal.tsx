import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown, DollarSign, Target, Award, AlertTriangle } from 'lucide-react';
import { CostCenterMetrics } from '@/types/costCenter';

interface CostCenterDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: 'total' | 'categories' | 'highest' | 'lowest' | null;
  metrics: CostCenterMetrics;
}

export const CostCenterDetailModal = ({
  open,
  onOpenChange,
  metricType,
  metrics
}: CostCenterDetailModalProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getModalContent = () => {
    switch (metricType) {
      case 'total':
        return {
          title: 'Total de Despesas',
          icon: DollarSign,
          description: 'Análise detalhada do total de despesas do período',
          mainValue: formatCurrency(metrics.totalExpenses),
          sections: [
            {
              title: 'Comparação Mensal',
              items: [
                { label: 'Mês Atual', value: formatCurrency(metrics.totalExpenses) },
                { label: 'Variação', value: `${metrics.monthlyGrowth >= 0 ? '+' : ''}${formatPercentage(metrics.monthlyGrowth)}`, color: metrics.monthlyGrowth >= 0 ? 'text-red-600' : 'text-green-600' },
                { label: 'Média por Categoria', value: formatCurrency(metrics.averagePerCategory) }
              ]
            },
            {
              title: 'Distribuição',
              items: [
                { label: 'Categorias Ativas', value: `${metrics.categoryCount} categorias` },
                { label: 'Maior Categoria', value: `${metrics.highestCategory.name} (${formatPercentage(metrics.highestCategory.percentage)})` },
                { label: 'Menor Categoria', value: `${metrics.lowestCategory.name} (${formatPercentage(metrics.lowestCategory.percentage)})` }
              ]
            }
          ]
        };

      case 'categories':
        return {
          title: 'Categorias Ativas',
          icon: Target,
          description: 'Visão geral das categorias de custo ativas',
          mainValue: `${metrics.categoryCount} categorias`,
          sections: [
            {
              title: 'Estatísticas',
              items: [
                { label: 'Total de Categorias', value: `${metrics.categoryCount} ativas` },
                { label: 'Média por Categoria', value: formatCurrency(metrics.averagePerCategory) },
                { label: 'Distribuição', value: 'Balanceada entre as categorias' }
              ]
            },
            {
              title: 'Performance',
              items: [
                { label: 'Categoria Dominante', value: `${metrics.highestCategory.name} (${formatPercentage(metrics.highestCategory.percentage)})` },
                { label: 'Categoria Menor', value: `${metrics.lowestCategory.name} (${formatPercentage(metrics.lowestCategory.percentage)})` },
                { label: 'Variação Total', value: formatPercentage(metrics.monthlyGrowth) }
              ]
            }
          ]
        };

      case 'highest':
        return {
          title: 'Maior Categoria',
          icon: Award,
          description: `Análise detalhada da categoria ${metrics.highestCategory.name}`,
          mainValue: formatPercentage(metrics.highestCategory.percentage),
          sections: [
            {
              title: 'Detalhes da Categoria',
              items: [
                { label: 'Nome', value: metrics.highestCategory.name },
                { label: 'Valor Total', value: formatCurrency(metrics.highestCategory.amount) },
                { label: 'Participação', value: formatPercentage(metrics.highestCategory.percentage) }
              ]
            },
            {
              title: 'Impacto',
              items: [
                { label: 'Sobre o Total', value: `${formatPercentage(metrics.highestCategory.percentage)} do orçamento` },
                { label: 'Valor Absoluto', value: formatCurrency(metrics.highestCategory.amount) },
                { label: 'Status', value: 'Categoria prioritária para análise', color: 'text-orange-600' }
              ]
            }
          ]
        };

      case 'lowest':
        return {
          title: 'Menor Categoria',
          icon: AlertTriangle,
          description: `Análise detalhada da categoria ${metrics.lowestCategory.name}`,
          mainValue: formatPercentage(metrics.lowestCategory.percentage),
          sections: [
            {
              title: 'Detalhes da Categoria',
              items: [
                { label: 'Nome', value: metrics.lowestCategory.name },
                { label: 'Valor Total', value: formatCurrency(metrics.lowestCategory.amount) },
                { label: 'Participação', value: formatPercentage(metrics.lowestCategory.percentage) }
              ]
            },
            {
              title: 'Análise',
              items: [
                { label: 'Sobre o Total', value: `${formatPercentage(metrics.lowestCategory.percentage)} do orçamento` },
                { label: 'Valor Absoluto', value: formatCurrency(metrics.lowestCategory.amount) },
                { label: 'Status', value: 'Categoria com menor impacto', color: 'text-green-600' }
              ]
            }
          ]
        };

      default:
        return null;
    }
  };

  const content = getModalContent();
  if (!content) return null;

  const IconComponent = content.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">{content.title}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                {content.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Value Display */}
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {content.mainValue}
            </div>
            <Badge variant="outline" className="text-sm">
              Valor Principal
            </Badge>
          </div>

          {/* Detailed Sections */}
          {content.sections.map((section, index) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-sm font-medium ${item.color || 'text-gray-900'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              {index < content.sections.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}

          {/* Growth Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t">
            {metrics.monthlyGrowth >= 0 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
            <span className={`text-sm font-medium ${
              metrics.monthlyGrowth >= 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {metrics.monthlyGrowth >= 0 ? 'Aumento' : 'Redução'} de {formatPercentage(Math.abs(metrics.monthlyGrowth))} vs mês anterior
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};