import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/blogPosts';

export default function Blog() {
  useEffect(() => { document.title = 'Блог MIZEN — советы по ландшафтному дизайну и уходу за растениями'; }, []);

  return (
    <Layout>
      <div className="pt-32 pb-20">
        <div className="container">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4D3E]">Блог MIZEN</h1>
            <p className="text-[#6B6B6B] text-lg mt-4 max-w-2xl mx-auto">
              Советы по ландшафтному дизайну и уходу за растениями
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-3">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </div>
                  <h2 className="text-lg font-bold text-[#1B4D3E] leading-snug mb-3">{post.title}</h2>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 mt-5 text-[#1B4D3E] font-semibold text-sm hover:text-[#D4A574] transition-colors"
                  >
                    Читать далее <Icon name="ArrowRight" size={16} />
                  </Link>
                </div>
              </article>
            ))}

            {/* Заглушка 4-я статья на всю ширину если 4 */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
