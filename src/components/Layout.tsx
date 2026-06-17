import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

const navItems = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Конструктор', to: '/create' },
  { label: 'Блог', to: '/blog' },
  { label: 'О нас', to: '/about' },
  { label: 'Контакты', to: '/contacts' },
];

const Footer = () => (
  <footer className="bg-[#1B4D3E] text-white/80 pt-14 pb-8">
    <div className="container grid md:grid-cols-4 gap-10 mb-10">
      <div>
        <span className="text-2xl font-bold text-white tracking-wide">MIZEN</span>
        <p className="mt-3 text-sm leading-relaxed">AI-платформа для ландшафтного дизайна и доставки растений по Сибири.</p>
        <div className="flex gap-3 mt-5">
          <a href="#" aria-label="Telegram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A574] hover:text-white transition-colors">
            <Icon name="Send" size={16} />
          </a>
          <a href="#" aria-label="VK" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A574] hover:text-white transition-colors">
            <Icon name="Users" size={16} />
          </a>
          <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A574] hover:text-white transition-colors">
            <Icon name="Youtube" size={16} />
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Навигация</h4>
        <ul className="space-y-2 text-sm">
          {navItems.map((n) => (
            <li key={n.to}><Link to={n.to} className="hover:text-[#D4A574] transition-colors">{n.label}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Контакты</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2"><Icon name="MapPin" size={15} className="mt-0.5 shrink-0" /> г. Новосибирск, ул. Ленина, 12</li>
          <li className="flex items-center gap-2"><Icon name="Phone" size={15} /> +7 (383) 123-45-67</li>
          <li className="flex items-center gap-2"><Icon name="Mail" size={15} /> info@mizen.ru</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Правовые документы</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/privacy" className="hover:text-[#D4A574] transition-colors">Политика конфиденциальности</Link></li>
          <li><a href="#" className="hover:text-[#D4A574] transition-colors">Публичная оферта</a></li>
        </ul>
      </div>
    </div>
    <div className="container border-t border-white/10 pt-6 text-sm text-center">© 2026 MIZEN. Все права защищены.</div>
  </footer>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#2C2C2C]">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#F9F6F0]/80 border-b border-[#1B4D3E]/10">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold tracking-wide text-[#1B4D3E]">MIZEN</Link>
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`text-sm font-medium transition-colors ${location.pathname === n.to ? 'text-[#1B4D3E] font-semibold' : 'text-[#6B6B6B] hover:text-[#1B4D3E]'}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative text-[#1B4D3E] hover:text-[#D4A574] transition-colors p-1">
              <Icon name="ShoppingBag" size={22} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4A574] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{count}</span>
              )}
            </Link>
            <Link to="/create" className="hidden sm:flex items-center gap-1.5 bg-[#1B4D3E] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#163d32] transition-colors">
              Создать проект
            </Link>
            <button className="md:hidden text-[#1B4D3E]" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#F9F6F0] border-t border-[#1B4D3E]/10 px-6 py-5 flex flex-col gap-4 animate-fade-in-up">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenuOpen(false)}
                className={`font-medium ${location.pathname === n.to ? 'text-[#1B4D3E]' : 'text-[#6B6B6B]'}`}
              >{n.label}</Link>
            ))}
            <Link to="/create" onClick={() => setMenuOpen(false)} className="bg-[#1B4D3E] text-white text-sm font-semibold px-4 py-3 rounded-full text-center">Создать проект</Link>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
