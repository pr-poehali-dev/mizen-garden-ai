import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, total } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', date: '', agree: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.address || !form.date) {
      toast.error('Пожалуйста, заполните все поля'); return;
    }
    if (!form.agree) { toast.error('Подтвердите согласие с условиями'); return; }
    toast.success('Заказ оформлен! Спасибо! Мы свяжемся с вами в ближайшее время.');
    clearCart();
    setShowForm(false);
    setForm({ name: '', phone: '', email: '', address: '', date: '', agree: false });
  };

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-[#1B4D3E] mb-10">Ваша корзина</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#1B4D3E]/8 flex items-center justify-center text-[#1B4D3E]/40 mb-5">
                <Icon name="ShoppingBag" size={36} />
              </div>
              <p className="text-[#6B6B6B] text-lg mb-6">Корзина пуста</p>
              <Link to="/catalog" className="inline-flex items-center gap-2 bg-[#1B4D3E] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#163d32] transition-colors">
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-[#1B4D3E]/6">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1B4D3E] text-sm leading-tight">{item.name}</div>
                      <div className="text-xs text-[#6B6B6B] mt-0.5">{item.category}</div>
                      <div className="font-bold text-[#1B4D3E] mt-1">{item.price.toLocaleString('ru-RU')} ₽</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-9 h-9 rounded-full bg-[#F0EDEA] text-[#2C2C2C] flex items-center justify-center hover:bg-[#e0ddd9] transition-colors"
                      >
                        <Icon name="Minus" size={16} />
                      </button>
                      <span className="w-7 text-center font-bold text-[#1B4D3E]">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-9 h-9 rounded-full bg-[#F0EDEA] text-[#2C2C2C] flex items-center justify-center hover:bg-[#e0ddd9] transition-colors"
                      >
                        <Icon name="Plus" size={16} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-9 h-9 rounded-full text-[#6B6B6B] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors ml-1"
                      >
                        <Icon name="X" size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1B4D3E]/10 flex flex-col sm:flex-row items-center justify-between gap-5 mb-8">
                <div>
                  <p className="text-[#6B6B6B] text-sm">Итого</p>
                  <p className="text-3xl font-bold text-[#1B4D3E]">{total.toLocaleString('ru-RU')} ₽</p>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-[#1B4D3E] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#163d32] transition-colors text-sm w-full sm:w-auto justify-center min-h-[44px]"
                >
                  <Icon name="CreditCard" size={19} />
                  Оформить заказ
                </button>
              </div>

              {/* Форма заказа */}
              {showForm && (
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#1B4D3E]/10 animate-fade-in-up">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1B4D3E]">Оформление заказа</h2>
                    <button onClick={() => setShowForm(false)} className="text-[#6B6B6B] hover:text-[#1B4D3E] transition-colors">
                      <Icon name="X" size={22} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { key: 'name', label: 'Имя', type: 'text', placeholder: 'Ваше имя' },
                      { key: 'phone', label: 'Телефон', type: 'tel', placeholder: '+7 (___) ___-__-__' },
                      { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                      { key: 'address', label: 'Адрес доставки', type: 'text', placeholder: 'Город, улица, дом' },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">{label} <span className="text-red-400">*</span></label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form] as string}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="w-full border border-[#1B4D3E]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B4D3E] transition-colors bg-[#F9F6F0]"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">Дата доставки <span className="text-red-400">*</span></label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border border-[#1B4D3E]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B4D3E] transition-colors bg-[#F9F6F0]"
                      />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                        className="mt-1 accent-[#1B4D3E]"
                      />
                      <span className="text-sm text-[#6B6B6B]">
                        Согласен с <Link to="/privacy" className="text-[#1B4D3E] underline">условиями обработки данных</Link>
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-[#1B4D3E] text-white font-semibold py-4 rounded-full hover:bg-[#163d32] transition-colors text-sm min-h-[44px] mt-2"
                    >
                      Оплатить — {total.toLocaleString('ru-RU')} ₽
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
