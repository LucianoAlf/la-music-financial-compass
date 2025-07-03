import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Check, ChevronDown, Sparkles, TrendingUp, BarChart3, Target, Clock, Zap, Shield, Star, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onSignupClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard Intuitivo",
      description: "Visualize seus KPIs e métricas financeiras em tempo real com gráficos interativos e relatórios personalizados.",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Análise de Performance",
      description: "Compare o desempenho entre unidades e períodos com insights automáticos baseados em IA.",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: Target,
      title: "Relatórios DRE",
      description: "Gere demonstrativos de resultado automatizados com estruturas personalizáveis por unidade.",
      color: "from-indigo-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Planejamento Financeiro",
      description: "Defina metas e projete cenários futuros com ferramentas avançadas de planejamento.",
      color: "from-violet-500 to-indigo-500"
    }
  ];

  const benefits = [
    { text: "Tomada de decisão mais rápida e assertiva", icon: Zap },
    { text: "Visibilidade completa da performance financeira", icon: BarChart3 },
    { text: "Redução de tempo em relatórios manuais", icon: TrendingUp },
    { text: "Identificação automática de oportunidades", icon: Target }
  ];

  const stats = [
    { value: "95%", label: "Precisão nas análises financeiras", icon: Target },
    { value: "-40%", label: "Redução no tempo de relatórios", icon: Clock },
    { value: "+200%", label: "Melhoria na visibilidade financeira", icon: BarChart3 },
    { value: "100+", label: "Indicadores monitorados", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen gradient-purple-subtle">
      {/* Floating elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
      </div>

      {/* Header */}
      <header className="gradient-purple-glass sticky top-0 z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center animate-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                AfinaFinanças
              </span>
              <span className="text-xs text-muted-foreground">Sistema Financeiro Inteligente</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={onLoginClick} className="hover-lift text-primary border-primary/20">
              Entrar
            </Button>
            <Button onClick={onSignupClick} className="gradient-primary hover-lift glow-purple">
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-4 relative">
        <div className={`container mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-8 bg-primary-100 text-primary-800 hover:bg-primary-200 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            AfinaFinanças - Gestão Inteligente
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-foreground">Transforme sua</span>
            <br />
            <span className="bg-gradient-to-br from-primary via-primary-glow to-primary-dark bg-clip-text text-transparent animate-pulse" style={{ textShadow: '0 0 30px hsl(var(--primary-glow) / 0.5)' }}>
              Gestão Financeira
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Uma plataforma completa para monitoramento de KPIs, análise de performance 
            e tomada de decisões estratégicas em tempo real com inteligência artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={onSignupClick} 
              className="text-lg px-10 py-4 gradient-primary hover-lift glow-purple"
            >
              <Play className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onLoginClick} 
              className="text-lg px-10 py-4 border-primary text-primary hover:bg-primary hover:text-white hover-lift"
            >
              Fazer Login
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="gradient-purple-glass border-primary/20 hover-lift">
                  <CardContent className="p-4 text-center">
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-16 animate-bounce">
            <ArrowDown className="h-8 w-8 text-primary mx-auto" />
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-24 px-4 gradient-purple-glass">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Recursos Principais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para uma gestão financeira eficiente e estratégica
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature === index;
              return (
                <Card 
                  key={index} 
                  className={`group cursor-pointer transition-all duration-500 hover-lift border-0 gradient-purple-glass ${
                    isActive ? 'scale-105 glow-purple' : ''
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} ${isActive ? 'animate-glow' : ''}`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
          <h2 className="text-5xl font-bold text-foreground mb-8">
            Por que escolher o AfinaFinanças?
          </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Nossa plataforma oferece insights precisos e automação inteligente 
                para maximizar seus resultados financeiros.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 group hover-lift">
                      <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-foreground font-medium text-lg group-hover:text-primary transition-colors">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="gradient-purple-glass rounded-3xl p-12 hover-lift">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-full mb-8 animate-glow">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div className="text-6xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
                  95%
                </div>
                <div className="text-xl text-muted-foreground">Precisão nas análises financeiras</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-8">
              Pronto para transformar sua gestão?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Comece hoje mesmo e veja como nossa plataforma pode revolucionar 
              seus processos financeiros com inteligência artificial.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={onSignupClick}
              className="text-lg px-12 py-4 bg-white text-primary hover:bg-white/90 hover-lift glow-purple"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Começar Agora - É Gratuito
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/95 backdrop-blur border-t border-primary/20 py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                AfinaFinanças
              </span>
              <span className="text-sm text-muted-foreground">Sistema Financeiro Inteligente</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            © 2024 AfinaFinanças. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};