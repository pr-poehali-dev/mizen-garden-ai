import { useState } from 'react';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const THUJA_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/ae35c233-d00d-49ec-b2a6-466691ef6448.jpg';
const HYDRANGEA_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/c3dd0cd5-2498-4986-87e3-f6e0062d2ff2.jpg';
const HOSTA_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/f12150e5-9f2d-47a2-a629-84d50b192ada.jpg';
const FOREST_IMG = 'https://cdn.poehali.dev/projects/3dd5912d-2f10-41f0-9b3d-4cc50f1d8885/files/10e67d20-5e65-4804-b52f-4dea44c8e1ee.jpg';

const ALL_PLANTS = [
  { id: 'thuja', name: 'Туя западная «Смарагд»', category: 'Хвойные', style: 'Классический', price: 1290, image: THUJA_IMG },
  { id: 'spruce', name: 'Ель колючая «Глаука»', category: 'Хвойные', style: 'Лесной', price: 1890, image: THUJA_IMG },
  { id: 'pine', name: 'Сосна горная «Мугус»', category: 'Хвойные', style: 'Лесной', price: 1590, image: THUJA_IMG },
  { id: 'birch', name: 'Берёза повислая', category: 'Лиственные', style: 'Лесной', price: 990, image: FOREST_IMG },
  { id: 'maple', name: 'Клён Гиннала', category: 'Лиственные', style: 'Японский', price: 790, image: FOREST_IMG },
  { id: 'hydrangea', name: 'Гортензия метельчатая', category: 'Кустарники', style: 'Современный', price: 890, image: HYDRANGEA_IMG },
  { id: 'spirea', name: 'Спирея японская', category: 'Кустарники', style: 'Японский', price: 560, image: HYDRANGEA_IMG },
  { id: 'hosta', name: 'Хоста гибридная', category: 'Многолетники', style: 'Японский', price: 420, image: HOSTA_IMG },
];

const CATEGORIES = ['Все', 'Хвойные', 'Лиственные', 'Кустарники', 'Многолетники'];
const STYLES = ['Все', 'Лесной', 'Японский', 'Современный', 'Классический'];

export default function Catalog() {
  const { addItem } = useCart();
  const [category, setCategory] = useState('Все');
  const [style, setStyle] = useState('Все');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const filtered = ALL_PLANTS
    .filter((p) => category === 'Все' || p.category === category)
    .filter((p) => style === 'Все' || p.style === style)
    .sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);

  const handleAdd = (p: typeof ALL_PLANTS[0]) => {
    addItem({ id: p.id, name: p.name, category: p.category, price: p.price, image: p.image });
    toast.success('Добавлено в корзину');
  };

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4D3E]">Каталог растений</h1>
            <p className="text-[#6B6B6B] text-lg mt-4 max-w-xl mx-auto">
              Выберите растения для вашего сада — все адаптированы к сибирскому климату.
            </p>
          </div>

          {/* Фильтры */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#1B4D3E]/8 mb-8 flex flex-wrap gap-5 items-center">
            <div>
              <p className="text-xs text-[#6B6B6B] font-medium mb-2">Категория</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[32px] ${category === c ? 'bg-[#1B4D3E] text-white' : 'bg-[#F0EDEA] text-[#2C2C2C] hover:bg-[#e0ddd9]'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] font-medium mb-2">Стиль</p>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[32px] ${style === s ? 'bg-[#1B4D3E] text-white' : 'bg-[#F0EDEA] text-[#2C2C2C] hover:bg-[#e0ddd9]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-xs text-[#6B6B6B] font-medium mb-2">Сортировка</p>
              <button
                onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-[#F0EDEA] text-[#2C2C2C] hover:bg-[#e0ddd9] transition-colors min-h-[32px]"
              >
                <Icon name={sort === 'asc' ? 'ArrowUpDown' : 'ArrowDownUp'} size={14} />
                {sort === 'asc' ? 'Сначала дешёвые' : 'Сначала дорогие'}
              </button>
            </div>
          </div>

          {/* Сетка */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#6B6B6B]">
              <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-40" />
              <p>Нет растений по выбранным фильтрам</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-xs font-medium text-[#D4A574] bg-[#D4A574]/10 px-2 py-0.5 rounded-full mb-2">{p.category}</span>
                    <h3 className="font-bold text-[#1B4D3E] leading-tight mb-3">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#1B4D3E]">{p.price.toLocaleString('ru-RU')} ₽</span>
                      <button
                        onClick={() => handleAdd(p)}
                        className="inline-flex items-center gap-1.5 bg-[#D4A574] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#c4925f] transition-colors min-h-[44px]"
                      >
                        <Icon name="ShoppingCart" size={16} /> В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
