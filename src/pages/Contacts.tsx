import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Contacts() {
  useEffect(() => { document.title = 'Контакты MIZEN — свяжитесь с нами'; }, []);

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }
    toast.success('Спасибо! Мы свяжемся с вами.');
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  const contacts = [
    { icon: 'MapPin', label: 'Адрес', value: 'г. Новосибирск, ул. Ленина, 12' },
    { icon: 'Phone', label: 'Телефон', value: '+7 (383) 123-45-67' },
    { icon: 'Mail', label: 'Email', value: 'info@mizen.ru' },
    { icon: 'Clock', label: 'Режим работы', value: 'Пн–Пт: 9:00–18:00' },
  ];

  return (
    <Layout>
      <div className="pt-32 pb-20">
        <div className="container">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4D3E]">Свяжитесь с нами</h1>
            <p className="text-[#6B6B6B] text-lg mt-4">Готовы ответить на любые вопросы о нашем сервисе и растениях</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Контакты + карта */}
            <div>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contacts.map((c) => (
                  <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#1B4D3E]/8 flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4A574]/15 flex items-center justify-center text-[#D4A574] shrink-0">
                      <Icon name={c.icon} size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-[#6B6B6B] font-medium">{c.label}</div>
                      <div className="font-semibold text-[#1B4D3E] text-sm mt-0.5">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Соцсети */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#1B4D3E]/8 mb-8">
                <p className="font-semibold text-[#1B4D3E] mb-3">Мы в соцсетях</p>
                <div className="flex gap-3">
                  {[
                    { icon: 'Send', label: 'Telegram' },
                    { icon: 'Users', label: 'VK' },
                    { icon: 'Youtube', label: 'YouTube' },
                  ].map((s) => (
                    <a key={s.label} href="#"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9F6F0] text-[#1B4D3E] text-sm font-medium hover:bg-[#1B4D3E] hover:text-white transition-colors">
                      <Icon name={s.icon} size={16} /> {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Карта-заглушка */}
              <div className="rounded-2xl bg-[#E8F0EC] border-2 border-dashed border-[#1B4D3E]/20 aspect-[16/9] flex flex-col items-center justify-center text-[#1B4D3E]/40">
                <Icon name="Map" size={40} />
                <p className="mt-3 font-medium text-[#6B6B6B]">Карта будет добавлена позже</p>
                <p className="text-sm text-[#6B6B6B]/70 mt-1">г. Новосибирск, ул. Ленина, 12</p>
              </div>
            </div>

            {/* Форма */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#1B4D3E]/8">
                <h2 className="text-2xl font-bold text-[#1B4D3E] mb-6">Написать нам</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', label: 'Имя', type: 'text', placeholder: 'Ваше имя' },
                    { key: 'phone', label: 'Телефон', type: 'tel', placeholder: '+7 (___) ___-__-__' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">{label} <span className="text-red-400">*</span></label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-[#1B4D3E]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B4D3E] transition-colors bg-[#F9F6F0] min-h-[44px]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Сообщение <span className="text-red-400">*</span></label>
                    <textarea
                      placeholder="Расскажите о вашем участке или задайте вопрос..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-[#1B4D3E]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B4D3E] transition-colors bg-[#F9F6F0] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1B4D3E] text-white font-semibold py-4 rounded-full hover:bg-[#163d32] transition-colors text-sm min-h-[44px]"
                  >
                    Отправить сообщение
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
