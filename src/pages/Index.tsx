import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/f5f0fe3a-46ae-4273-81eb-9df681670173.jpg';
const BA_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/6b4b533c-5106-4f08-b462-c313549afd5c.jpg';

const navLinks = ['Конструктор', 'Каталог', 'Блог', 'О нас', 'Контакты'];

const steps = [
  { icon: 'Upload', title: 'Загрузите фото', text: 'Сделайте снимок участка с телефона и загрузите его в один клик.' },
  { icon: 'Palette', title: 'Выберите стиль и размер', text: 'Лесной, японский, современный или классический — на ваш вкус.' },
  { icon: 'Sprout', title: 'Получите дизайн и закажите', text: 'AI покажет проект и подберёт растения с доставкой на участок.' },
];

const advantages = [
  { icon: 'Snowflake', title: 'Адаптация к Сибири', text: 'Растения, проверенные суровым климатом.' },
  { icon: 'Bot', title: 'AI-архитектор', text: 'Профессиональный дизайн за 30 секунд.' },
  { icon: 'Truck', title: 'Доставка на участок', text: 'Привезём растения прямо к вашему дому.' },
  { icon: 'PlayCircle', title: 'Видеоинструкции', text: 'Покажем, как правильно посадить каждое растение.' },
];

const works = [
  { style: 'Лесной сад', area: '8 соток' },
  { style: 'Японский сад', area: '5 соток' },
  { style: 'Современный', area: '12 соток' },
  { style: 'Классический', area: '15 соток' },
];

const reviews = [
  { name: 'Анна Соколова', city: 'Новосибирск', text: 'За полчаса получила готовый проект и заказала растения. Через неделю всё привезли — сад выглядит как с обложки журнала!', initial: 'А' },
  { name: 'Дмитрий Орлов', city: 'Красноярск', text: 'Сомневался, что AI справится с нашим климатом. Но всё прижилось, видеоинструкции реально помогли с посадкой.', initial: 'Д' },
  { name: 'Елена Маркова', city: 'Томск', text: 'Идеально для тех, кто ничего не понимает в ландшафте. Загрузила фото — и вот он, сад мечты. Восторг!', initial: 'Е' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-primary/10">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="font-display text-2xl font-bold tracking-wide text-primary">MIZEN</a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l} href="#" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="relative text-primary hover:text-accent transition-colors">
              <Icon name="ShoppingBag" size={22} />
            </button>
            <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">Создать проект</Button>
            <button className="md:hidden text-primary" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-primary/10 px-6 py-4 flex flex-col gap-4 animate-fade-in-up">
            {navLinks.map((l) => (
              <a key={l} href="#" className="text-primary/80 font-medium">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMG} alt="Сад мечты" className="w-full h-full object-cover animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-transparent" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold tracking-widest uppercase animate-fade-in-up">
              <Icon name="Sparkles" size={16} /> AI-ландшафтный дизайн
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-background mt-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Сад вашей мечты<br />за 30 секунд
            </h1>
            <p className="text-lg md:text-xl text-background/80 mt-6 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Загрузите фото участка — мы подберём растения и покажем дизайн.
            </p>
            <div className="flex flex-wrap gap-4 mt-9 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-8 h-14 text-base font-semibold hover-scale">
                Создать проект
                <Icon name="ArrowRight" size={20} className="ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base bg-transparent border-background/40 text-background hover:bg-background/10 hover:text-background">
                Смотреть примеры
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Просто и быстро</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-3">Как это работает</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="relative bg-card rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <span className="absolute -top-5 left-8 font-display text-6xl font-bold text-secondary/30">0{i + 1}</span>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Примеры работ */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary text-sm font-semibold tracking-widest uppercase">Реальные проекты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Примеры работ</h2>
            <p className="text-primary-foreground/70 mt-4">До и после преображения с MIZEN</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((w) => (
              <div key={w.style} className="group rounded-3xl overflow-hidden bg-background/5 hover-scale">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={BA_IMG} alt={w.style} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-background/90 text-primary text-xs font-semibold px-3 py-1 rounded-full">До / После</span>
                </div>
                <div className="flex items-center justify-between p-5">
                  <span className="font-bold text-lg">{w.style}</span>
                  <span className="text-secondary text-sm">{w.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Почему MIZEN</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-3">Наши преимущества</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="text-center p-8 rounded-3xl border border-primary/10 hover:border-secondary hover:bg-card transition-all duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center text-accent mb-5">
                  <Icon name={a.icon} size={30} />
                </div>
                <h3 className="font-bold text-lg text-primary mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Нам доверяют</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-3">Отзывы клиентов</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-card rounded-3xl p-8 shadow-sm">
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={18} className="fill-current" />)}
                </div>
                <p className="text-primary/80 leading-relaxed mb-6">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">{r.initial}</div>
                  <div>
                    <div className="font-semibold text-primary">{r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-primary px-8 py-16 md:p-20 text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-background relative">Готовы создать свой сад?</h2>
            <p className="text-background/70 mt-4 max-w-md mx-auto relative">Загрузите фото участка прямо сейчас — это бесплатно.</p>
            <Button size="lg" className="mt-9 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-10 h-14 text-base font-semibold hover-scale relative">
              Создать проект
              <Icon name="ArrowRight" size={20} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground/80 pt-16 pb-8">
        <div className="container grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <span className="font-display text-3xl font-bold text-background">MIZEN</span>
            <p className="mt-4 text-sm leading-relaxed">AI-платформа для ландшафтного дизайна и доставки растений по Сибири.</p>
            <div className="flex gap-3 mt-5">
              {['Send', 'Instagram', 'Youtube'].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Icon name={s} size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-background mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => <li key={l}><a href="#" className="hover:text-secondary transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-background mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Icon name="Phone" size={16} /> +7 (913) 000-00-00</li>
              <li className="flex items-center gap-2"><Icon name="Mail" size={16} /> hello@mizen.ru</li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={16} /> Новосибирск</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-background mb-4">Документы</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Публичная оферта</a></li>
            </ul>
          </div>
        </div>
        <div className="container border-t border-background/10 pt-6 text-sm text-center">© 2026 MIZEN. Все права защищены.</div>
      </footer>
    </div>
  );
};

export default Index;
