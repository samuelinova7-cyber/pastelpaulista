import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, Play, ExternalLink, Sparkles, CheckCircle2, Bookmark, Share2, X } from 'lucide-react';
import { INSTAGRAM_POSTS, STORY_HIGHLIGHTS, STORE_INFO } from '../data/menuData';
import { InstagramPost } from '../types';

export const InstagramWidget: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [activeStory, setActiveStory] = useState<{ id: string; title: string; image: string } | null>(null);

  return (
    <section id="instagram" className="py-14 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Instagram Profile Header Bar */}
        <div className="bg-stone-950/80 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Profile Details */}
          <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
            {/* Avatar with Story gradient border */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-lg shadow-rose-500/20 animate-pulse">
                <div className="w-full h-full bg-stone-900 rounded-full p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=200&q=80"
                    alt="Logo Pastel Paulista"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 bg-emerald-500 text-stone-950 p-1 rounded-full border-2 border-stone-900" title="Perfil Ativo">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg sm:text-2xl font-black font-['Outfit'] tracking-tight">
                  {STORE_INFO.instagram}
                </h3>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Oficial
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm text-stone-300 max-w-lg">
                🥟 O melhor pastel de 30cm com recheio farto de ponta a ponta na Praia do Francês - AL | Ter a Dom das 17h às 23h 🌊
              </p>

              {/* Follower Stats */}
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-6 text-xs sm:text-sm text-stone-300">
                <div>
                  <span className="font-extrabold text-white text-base font-['Outfit']">248</span> posts
                </div>
                <div>
                  <span className="font-extrabold text-amber-400 text-base font-['Outfit']">{STORE_INFO.followers}</span> seguidores
                </div>
                <div>
                  <span className="font-extrabold text-white text-base font-['Outfit']">1.2k</span> seguindo
                </div>
              </div>
            </div>
          </div>

          {/* Follow CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              id="instagram-follow-btn"
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 hover:opacity-95 text-white font-extrabold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir no Instagram ({STORE_INFO.followers})</span>
            </a>
          </div>

        </div>

        {/* Story Highlights Circles */}
        <div className="mb-10">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-1">
            Destaques do Instagram:
          </p>
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 no-scrollbar">
            {STORY_HIGHLIGHTS.map(story => (
              <button
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-rose-500 group-hover:scale-105 transition-transform shadow-md">
                  <div className="w-full h-full bg-stone-900 rounded-full p-0.5 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold text-stone-300 group-hover:text-amber-400 transition-colors">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-800 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.imageUrl}
                alt="Post Instagram Pastel Paulista"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Reel icon badge */}
              {post.isReel && (
                <div className="absolute top-2 right-2 bg-stone-900/80 p-1.5 rounded-lg text-white backdrop-blur-xs">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              )}

              {/* Dark Hover Overlay with Likes and Comments */}
              <div className="absolute inset-0 bg-stone-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 text-center text-white backdrop-blur-xs">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    {post.comments}
                  </span>
                </div>
                <span className="text-[10px] text-stone-300 line-clamp-2 px-2">
                  {post.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 hover:underline"
          >
            <span>Ver mais publicações em @pastelpaulistanapraia</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Post Modal Preview */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/80 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square bg-stone-950">
                <img
                  src={selectedPost.imageUrl}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
                    <div className="w-9 h-9 rounded-full bg-amber-500 p-0.5">
                      <img
                        src="https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=100&q=80"
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{STORE_INFO.instagram}</h4>
                      <p className="text-[11px] text-stone-400">Praia do Francês, Alagoas</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {selectedPost.caption}
                  </p>
                  <p className="mt-2 text-[11px] text-stone-500">{selectedPost.date}</p>
                </div>

                <div className="pt-4 border-t border-stone-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center gap-4 font-bold text-white">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        {selectedPost.likes} curtidas
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" />
                        {selectedPost.comments} comentários
                      </span>
                    </div>
                    <Bookmark className="w-4 h-4 text-stone-400 hover:text-white cursor-pointer" />
                  </div>

                  <a
                    href={STORE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Ver no aplicativo do Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story Modal Preview */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-stone-950/80 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Story header bar */}
            <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-stone-950/90 to-transparent z-10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500 overflow-hidden">
                <img src={activeStory.image} alt={activeStory.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{activeStory.title}</p>
                <p className="text-[10px] text-stone-300">Destaque Oficial</p>
              </div>
            </div>

            <div className="relative aspect-[9/16] bg-stone-950">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-stone-900 text-center">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver stories no Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
