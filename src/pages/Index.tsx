import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const services = [
  {
    title: 'Веб-дизайн',
    description: 'Создание современных и функциональных интерфейсов, которые решают бизнес-задачи',
    icon: 'Palette',
  },
  {
    title: 'Разработка',
    description: 'Разработка быстрых и масштабируемых веб-приложений на современном стеке',
    icon: 'Code',
  },
  {
    title: 'Брендинг',
    description: 'Разработка уникального визуального стиля и айдентики для вашего бренда',
    icon: 'Sparkles',
  },
  {
    title: 'UX-исследования',
    description: 'Анализ поведения пользователей и оптимизация пользовательского опыта',
    icon: 'Search',
  },
];

const Index = () => {
  const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({});
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = serviceRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && serviceRefs.current[index]) {
          observer.unobserve(serviceRefs.current[index]!);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-in text-indigo-400">Telegram ads</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up font-light">Рекламное агентство по таргетированной рекламе в Telegram

</p>
          <div className="flex gap-4 justify-center items-center pt-8 animate-fade-in-up">
            <Button size="lg" className="rounded-full px-8">
              Начать проект
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Посмотреть работы
            </Button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Услуги
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Telegram как канал продаж: настраиваем, тестируем, масштабируем</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (serviceRefs.current[index] = el)}
                className={`transition-all duration-700 ${
                  isVisible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="p-10 h-full border-border hover:border-accent transition-all duration-300 hover:shadow-xl group">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon
                        name={service.icon as any}
                        className="text-accent"
                        size={28}
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground">© 2024 Все права защищены</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Mail" size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Github" size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Linkedin" size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;