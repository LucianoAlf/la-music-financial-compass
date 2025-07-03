import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Users, DollarSign } from 'lucide-react';
import { CostCenterCategory } from '@/types/costCenter';

interface CostCenterIndicatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  indicatorType: 'concentration' | 'categories' | 'ticket' | null;
  categories: CostCenterCategory[];
}

export const CostCenterIndicatorModal = ({
  open,
  onOpenChange,
  indicatorType,
  categories
}: CostCenterIndicatorModalProps) => {
  const totalExpenses = categories.reduce((sum, cat) => sum + cat.totalAmount, 0);
  const activeCategories = categories.filter(cat => cat.isActive);
  const topCategories = categories.sort((a, b) => b.percentage - a.percentage).slice(0, 3);
  const costConcentration = topCategories.reduce((sum, cat) => sum + cat.percentage, 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const getModalContent = () => {
    switch (indicatorType) {
      case 'concentration':
        return {
          title: 'Concentração de Custos',
          icon: Target,
          description: 'Análise da distribuição de custos entre as principais categorias',
          mainValue: `${costConcentration.toFixed(1)}%`,
          sections: [
            {
              title: 'Top 3 Categorias',
              items: topCategories.map((cat, index) => ({
                label: `${index + 1}º ${cat.name}`,
                value: `${formatCurrency(cat.totalAmount)} (${cat.percentage.toFixed(1)}%)`,
                color: cat.percentage > 30 ? 'text-danger-600' : 
                       cat.percentage > 20 ? 'text-warning-600' : 'text-success-600'
              }))
            },
            {
              title: 'Análise de Concentração',
              items: [
                { 
                  label: 'Nível de Concentração', 
                  value: costConcentration > 80 ? 'Alto' : costConcentration > 60 ? 'Médio' : 'Baixo',
                  color: costConcentration > 80 ? 'text-danger-600' : 
                         costConcentration > 60 ? 'text-warning-600' : 'text-success-600'
                },
                { label: 'Total das Top 3', value: `${costConcentration.toFixed(1)}%` },
                { label: 'Demais Categorias', value: `${(100 - costConcentration).toFixed(1)}%` }
              ]
            }
          ]
        };

      case 'categories':
        return {
          title: 'Categorias Ativas',
          icon: Users,
          description: 'Visão detalhada das categorias de custo ativas',
          mainValue: `${activeCategories.length}`,
          sections: [
            {
              title: 'Distribuição das Categorias',
              items: activeCategories.slice(0, 5).map(cat => ({
                label: cat.name,
                value: `${formatCurrency(cat.totalAmount)} (${cat.percentage.toFixed(1)}%)`,
                color: 'text-gray-900'
              }))
            },
            {
              title: 'Estatísticas Gerais',
              items: [
                { label: 'Total de Categorias', value: `${categories.length}` },
                { label: 'Categorias Ativas', value: `${activeCategories.length}` },
                { label: 'Taxa de Atividade', value: `${((activeCategories.length / categories.length) * 100).toFixed(1)}%` },
                { label: 'Média por Categoria Ativa', value: formatCurrency(totalExpenses / activeCategories.length) }
              ]
            }
          ]
        };

      case 'ticket':
        const ticketMedio = totalExpenses / activeCategories.length;
        return {
          title: 'Ticket Médio por Categoria',
          icon: DollarSign,
          description: 'Análise do valor médio gasto por categoria ativa',
          mainValue: formatCurrency(ticketMedio),
          sections: [
            {
              title: 'Comparação por Categoria',
              items: activeCategories.slice(0, 5).map(cat => ({
                label: cat.name,
                value: formatCurrency(cat.totalAmount),
                color: cat.totalAmount > ticketMedio ? 'text-danger-600' : 'text-success-600'
              }))
            },
            {
              title: 'Análise do Ticket Médio',
              items: [
                { label: 'Ticket Médio', value: formatCurrency(ticketMedio) },
                { label: 'Maior Categoria', value: formatCurrency(Math.max(...activeCategories.map(c => c.totalAmount))) },
                { label: 'Menor Categoria', value: formatCurrency(Math.min(...activeCategories.map(c => c.totalAmount))) },
                { label: 'Variação', value: '+5.2% vs mês anterior', color: 'text-success-600' }
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

          {/* Progress Indicator for Concentration */}
          {indicatorType === 'concentration' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nível de Concentração</span>
                <span>{costConcentration.toFixed(1)}%</span>
              </div>
              <Progress value={costConcentration} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Distribuído</span>
                <span>Concentrado</span>
              </div>
            </div>
          )}

          {/* Trend Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t">
            <TrendingUp className="h-4 w-4 text-success-500" />
            <span className="text-sm font-medium text-success-600">
              Tendência positiva no período
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};