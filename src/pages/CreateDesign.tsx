import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DESIGN_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/686c9b85-7d4d-4ea2-837a-b6b581801ea9.jpg';

const navLinks = ['Конструктор', 'Каталог', 'Блог', 'О нас', 'Контакты'];

const styles = [
  { id: 'forest', title: 'Лесной', icon: 'Trees', bg: 'bg-[#E3EDE3]', iconColor: 'text-[#3A6B4A]' },
  { id: 'japanese', title: 'Японский', icon: 'Cherry', bg: 'bg-[#F6E4E8]', iconColor: 'text-[#C16B7E]' },
  { id: 'modern', title: 'Современный', icon: 'Square', bg: 'bg-[#ECECEC]', iconColor: 'text-[#6B6B6B]' },
  { id: 'classic', title: 'Классический', icon: 'Flower2', bg: 'bg-[#F0E8D8]', iconColor: 'text-[#B08D57]' },
];

const sizes = ['4–6 соток', '6–10 соток', '10–15 соток', '15+ соток'];

const stages = [
  { until: 30, text: 'Анализируем ваш участок…' },
  { until: 70, text: 'Подбираем растения…' },
  { until: 100, text: 'Создаём дизайн…' },
];

const resultPlants = [
  { name: 'Туя западная «Смарагд»', category: 'Хвойные', price: 1290, emoji: '🌲' },
  { name: 'Гортензия метельчатая', category: 'Кустарники', price: 890, emoji: '🌸' },
  { name: 'Можжевельник горизонтальный', category: 'Хвойные', price: 740, emoji: '🌿' },
  { name: 'Спирея японская', category: 'Кустарники', price: 560, emoji: '🌺' },
  { name: 'Хоста гибридная', category: 'Многолетники', price: 420, emoji: '🍃' },
  { name: 'Барбарис Тунберга', category: 'Кустарники', price: 680, emoji: '🍂' },
];

const CreateDesign = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [style, setStyle] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Поддерживаются только JPG и PNG');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Файл больше 10 МБ');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const currentStage = stages.find((s) => progress < s.until) || stages[stages.length - 1];

  const generate = () => {
    if (!photo) return toast.error('Загрузите фото участка');
    if (!style) return toast.error('Выберите стиль сада');
    if (!size) return toast.error('Выберите размер участка');
    setGenerating(true);
    setDone(false);
    setProgress(0);
  };

  useEffect(() => {
    if (!generating) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setGenerating(false);
          setDone(true);
          return 100;
        }
        return Math.min(100, p + 2);
      });
    }, 60);
    return () => clearInterval(timer);
  }, [generating]);

  useEffect(() => {
    if (done) resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [done]);

  const total = resultPlants.reduce((s, p) => s + p.price, 0);

  const addOne = (name: string) => {
    if (cart.includes(name)) return;
    setCart((c) => [...c, name]);
    toast.success('Добавлено в корзину');
  };

  const addAll = useCallback(() => {
    setCart(resultPlants.map((p) => p.name));
    toast.success('Все растения добавлены в корзину');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-primary/10">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="font-display text-2xl font-bold tracking-wide text-primary">MIZEN</a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l} href="#" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="relative text-primary hover:text-accent transition-colors">
              <Icon name="ShoppingBag" size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>
              )}
            </button>
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

      <main className="container pt-28 pb-16 max-w-4xl">
        {/* Заголовки */}
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">Создайте дизайн сада за 30 секунд</h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Загрузите фото участка, выберите стиль и размер — получите готовый проект с подбором растений.
          </p>
        </div>

        {/* Загрузка фото */}
        <section className="mb-14">
          <input ref={fileRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 p-10 text-center ${dragOver ? 'border-primary bg-primary/5' : 'border-primary/30 hover:border-primary/60 hover:bg-card'}`}
          >
            {photo ? (
              <div className="flex flex-col items-center gap-4">
                <img src={photo} alt="Участок" className="max-h-56 rounded-lg object-cover shadow-md animate-fade-in-up" />
                <span className="text-sm text-primary font-medium flex items-center gap-2">
                  <Icon name="RefreshCw" size={16} /> Нажмите, чтобы заменить фото
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-accent">
                  <Icon name="ImageUp" size={30} />
                </div>
                <p className="text-lg font-semibold text-primary">Перетащите фото участка сюда или нажмите для выбора</p>
                <p className="text-sm text-muted-foreground">Поддерживается JPG, PNG, до 10 МБ</p>
              </div>
            )}
          </div>
        </section>

        {/* Стиль */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-primary mb-6">Выберите стиль сада</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`rounded-xl p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${s.bg} ${style === s.id ? 'ring-2 ring-primary shadow-lg' : 'ring-2 ring-transparent'}`}
              >
                <span className={`${s.iconColor}`}><Icon name={s.icon} size={36} /></span>
                <span className="font-semibold text-primary">{s.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Размер */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-primary mb-6">Выберите размер участка</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-lg py-4 font-semibold transition-all duration-300 hover:shadow-md ${size === s ? 'bg-primary text-primary-foreground' : 'bg-[#E0E0E0] text-primary/70 hover:bg-[#d4d4d4]'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Кнопка генерации */}
        <section className="mb-14 text-center">
          <Button
            size="lg"
            onClick={generate}
            disabled={generating}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 text-base font-semibold hover-scale"
          >
            <Icon name="Wand2" size={20} className="mr-1" />
            {generating ? 'Генерируем…' : 'Сгенерировать дизайн'}
          </Button>
        </section>

        {/* Прогресс */}
        {generating && (
          <section className="mb-14 animate-fade-in-up">
            <div className="bg-card rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-primary flex items-center gap-2">
                  <Icon name="Loader" size={18} className="animate-spin" /> {currentStage.text}
                </span>
                <span className="font-bold text-accent">{progress}%</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </section>
        )}

        {/* Результат */}
        {done && (
          <section ref={resultRef} className="mb-14 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-primary mb-6">Ваш дизайн готов!</h2>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-muted">
              <img src={DESIGN_IMG} alt="Дизайн сада" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-primary/60 to-transparent">
                <span className="text-background font-semibold flex items-center gap-2">
                  <Icon name="Sparkles" size={18} /> Здесь будет ваш дизайн
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-primary mt-10 mb-5">Рекомендованные растения</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {resultPlants.map((p) => {
                const inCart = cart.includes(p.name);
                return (
                  <div key={p.name} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center text-3xl shrink-0">{p.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary truncate">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.category}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-primary mb-1">{p.price.toLocaleString('ru-RU')} ₽</div>
                      <button
                        onClick={() => addOne(p.name)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ml-auto ${inCart ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                      >
                        <Icon name={inCart ? 'Check' : 'Plus'} size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-card rounded-2xl p-6 shadow-sm">
              <div>
                <span className="text-muted-foreground">Итоговая сумма</span>
                <div className="text-3xl font-bold text-primary">{total.toLocaleString('ru-RU')} ₽</div>
              </div>
              <Button size="lg" onClick={addAll} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-13 text-base font-semibold hover-scale w-full sm:w-auto">
                <Icon name="ShoppingCart" size={20} className="mr-1" />
                Добавить всё в корзину
              </Button>
            </div>
          </section>
        )}
      </main>

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

export default CreateDesign;
