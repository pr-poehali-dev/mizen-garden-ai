import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  useEffect(() => {
    if (post) document.title = `${post.title} — Блог MIZEN`;
  }, [post]);

  if (!post) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-[#1B4D3E]">Статья не найдена</h1>
          <Link to="/blog" className="inline-flex items-center gap-2 mt-6 text-[#1B4D3E] font-semibold hover:text-[#D4A574] transition-colors">
            <Icon name="ArrowLeft" size={18} /> Назад к списку
          </Link>
        </div>
      </Layout>
    );
  }

  const related = blogPosts.filter((p) => p.id !== id).slice(0, 2);

  return (
    <Layout>
      <div className="pt-28 pb-20">
        {/* Hero-картинка */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden mb-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E]/70 to-transparent" />
          <div className="absolute bottom-8 container">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors mb-4">
              <Icon name="ArrowLeft" size={16} /> Назад к списку
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-white max-w-2xl leading-snug">{post.title}</h1>
            <div className="flex items-center gap-2 text-white/70 text-sm mt-3">
              <Icon name="Calendar" size={15} /> {post.date}
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="container max-w-3xl mt-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#1B4D3E]/6">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-[#2C2C2C] leading-relaxed text-base mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Теги/категория */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['Ландшафтный дизайн', 'Растения', 'Сибирь'].map((tag) => (
              <span key={tag} className="text-xs font-medium text-[#1B4D3E] bg-[#1B4D3E]/8 px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#1B4D3E] rounded-2xl p-8 text-center">
            <p className="text-white font-bold text-xl mb-2">Хотите красивый сад?</p>
            <p className="text-white/70 text-sm mb-5">Создайте дизайн своего участка за 30 секунд — бесплатно</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-[#D4A574] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#c4925f] transition-colors text-sm"
            >
              Создать проект <Icon name="ArrowRight" size={17} />
            </Link>
          </div>

          {/* Похожие статьи */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-[#1B4D3E] mb-6">Читайте также</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link to={`/blog/${r.id}`} key={r.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-[#6B6B6B] mb-2">{r.date}</div>
                      <h3 className="font-bold text-[#1B4D3E] text-sm leading-snug group-hover:text-[#D4A574] transition-colors">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
