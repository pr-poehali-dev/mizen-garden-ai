import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';

const TEAM_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/cdcb93d6-4b2b-48e1-a476-39d307b4b93e.jpg';
const GARDEN_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/c76a2133-ffef-4cfa-8466-d2ec2535c35b.jpg';

const advantages = [
  { icon: 'Snowflake', title: 'Растения, адаптированные к Сибири', text: 'Все виды подобраны с учётом сибирского климата и зимостойкости.' },
  { icon: 'Brain', title: 'Дизайн от AI-архитектора', text: 'Профессиональный ландшафтный проект за 30 секунд.' },
  { icon: 'Truck', title: 'Доставка на участок', text: 'Привезём растения прямо к вашему загородному дому.' },
  { icon: 'Play', title: 'Видеоинструкции по посадке', text: 'Покажем, как правильно посадить каждое растение из набора.' },
];

const team = [
  { name: 'Алексей Громов', role: 'CEO & Co-founder', initial: 'А' },
  { name: 'Мария Соболева', role: 'Главный ландшафтный архитектор', initial: 'М' },
  { name: 'Дмитрий Кравцов', role: 'Руководитель AI-разработки', initial: 'Д' },
];

const stats = [
  { value: '1 200+', label: 'Проектов создано' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '15+', label: 'Регионов Сибири' },
  { value: '3 года', label: 'На рынке' },
];

export default function About() {
  useEffect(() => { document.title = 'О компании MIZEN — AI-платформа для ландшафтного дизайна'; }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#1B4D3E] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={GARDEN_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">О компании MIZEN</h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">AI-платформа для ландшафтного дизайна частных садов и участков в Сибири</p>
        </div>
      </section>

      {/* Кто мы */}
      <section className="py-20 bg-[#F9F6F0]">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-[#D4A574] tracking-widest uppercase">Кто мы</span>
              <h2 className="text-3xl font-bold text-[#1B4D3E] mt-3 mb-5">Мы делаем красивые сады доступными</h2>
              <p className="text-[#6B6B6B] leading-relaxed text-base">
                MIZEN — AI-платформа для ландшафтного дизайна частных домов и участков в Сибири. Мы создаём сады мечты за 30 секунд, подбирая растения, адаптированные к суровому сибирскому климату.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed text-base mt-4">
                Наша технология анализирует фото вашего участка, учитывает климатическую зону, стиль и размер — и выдаёт готовый профессиональный дизайн с подбором растений и возможностью мгновенного заказа с доставкой.
              </p>
            </div>
            <div className="relative">
              <img src={GARDEN_IMG} alt="Сад MIZEN" className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3]" />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4A574]/20 flex items-center justify-center text-[#D4A574]">
                  <Icon name="Sparkles" size={20} />
                </div>
                <div>
                  <div className="font-bold text-[#1B4D3E] text-sm">30 секунд</div>
                  <div className="text-xs text-[#6B6B6B]">до готового дизайна</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Цифры */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-[#F9F6F0]">
                <div className="text-3xl md:text-4xl font-bold text-[#1B4D3E]">{s.value}</div>
                <div className="text-sm text-[#6B6B6B] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Миссия */}
      <section className="py-20 bg-[#1B4D3E]">
        <div className="container max-w-3xl text-center">
          <span className="text-xs font-semibold text-[#D4A574] tracking-widest uppercase">Наша миссия</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">Красивый сад — для каждого</h2>
          <p className="text-white/75 leading-relaxed text-lg">
            Сделать ландшафтный дизайн доступным и понятным каждому владельцу загородного дома. Мы верим, что красивый сад — это не роскошь, а необходимость для комфортной жизни.
          </p>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-[#F9F6F0]">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#1B4D3E] text-center mb-12">Почему выбирают нас</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="text-center p-7 rounded-2xl bg-white border border-[#1B4D3E]/8 hover:border-[#D4A574] hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#D4A574]/15 flex items-center justify-center text-[#D4A574] mb-4">
                  <Icon name={a.icon} size={28} />
                </div>
                <h3 className="font-bold text-[#1B4D3E] mb-2 leading-tight text-sm">{a.title}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#1B4D3E] text-center mb-12">Наша команда</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-[#1B4D3E] text-white flex items-center justify-center text-3xl font-bold mb-4">
                  {m.initial}
                </div>
                <h3 className="font-bold text-[#1B4D3E]">{m.name}</h3>
                <p className="text-sm text-[#6B6B6B] mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
