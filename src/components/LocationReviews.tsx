import React from 'react';
import { MapPin, Navigation, Star, Phone, Clock, ExternalLink, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';
import { STORE_INFO, GOOGLE_REVIEWS } from '../data/menuData';

export const LocationReviews: React.FC = () => {
  return (
    <section id="localizacao" className="py-14 sm:py-20 bg-stone-50 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-900 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>Localização & Reputação</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-stone-900 tracking-tight">
            Venha Nos Visitar na Praia do Francês
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            A poucos passos do mar, no coração da Praia do Francês em Marechal Deodoro - AL.
          </p>
        </div>

        {/* Map & Location Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* LEFT: Interactive Location Info & Directions (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl shadow-stone-200/50 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Praia do Francês
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Fácil Acesso
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] text-stone-900 leading-tight">
                {STORE_INFO.name}
              </h3>

              {/* Address details */}
              <div className="mt-5 space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-bold">Endereço Completo:</strong>
                    <span>{STORE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-bold">Horário de Funcionamento:</strong>
                    <span>{STORE_INFO.openingHours}</span>
                    <span className="block text-xs text-amber-700 font-semibold mt-0.5">Segunda-feira fechado para descanso</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-bold">Telefone & WhatsApp de Pedidos:</strong>
                    <a href={`tel:${STORE_INFO.rawPhone}`} className="text-amber-700 hover:underline font-bold text-sm">
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation action buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                id="btn-open-google-maps"
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <Navigation className="w-4 h-4" />
                <span>Abrir Rota no Google Maps</span>
              </a>

              <a
                id="btn-open-waze"
                href={STORE_INFO.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-2xl flex items-center justify-center gap-2 text-xs transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                <span>Navegar pelo Waze</span>
              </a>
            </div>

          </div>

          {/* RIGHT: Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/50 min-h-[380px] flex flex-col relative">
            <div className="p-3.5 bg-stone-900 text-white flex items-center justify-between text-xs px-5">
              <span className="font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                R. Maresia, 381 - Praia do Francês
              </span>
              <span className="text-stone-400">Marechal Deodoro - AL</span>
            </div>

            {/* Google Maps iFrame */}
            <div className="relative flex-1 w-full h-full min-h-[340px]">
              <iframe
                title="Mapa Pastel Paulista na Praia"
                src="https://maps.google.com/maps?q=R.+Maresia,+381+-+Praia+do+Franc%C3%AAs,+Marechal+Deodoro+-+AL,+57160-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] grayscale-[10%]"
              ></iframe>

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-stone-200 text-stone-900 max-w-[220px]">
                <p className="font-black text-xs font-['Outfit']">🥟 Pastel Paulista na Praia</p>
                <p className="text-[11px] text-stone-600 mt-0.5">Praia do Francês, Alagoas</p>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-amber-600">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>4.5 ⭐ (44 avaliações)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* GOOGLE REVIEWS SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl shadow-stone-200/40">
          
          {/* Rating Summary Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google"
                  className="h-5"
                />
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Avaliações no Google</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] text-stone-900">
                O que nossos clientes dizem
              </h3>
            </div>

            {/* Score Pill Card */}
            <div className="flex items-center gap-4 bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-['Outfit']">4.5</span>
                <div className="flex items-center justify-center gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-300/50 text-amber-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="border-l border-amber-200 pl-4 text-xs text-stone-700">
                <p className="font-bold text-stone-900">Excelente Reputação</p>
                <p className="text-stone-500">Baseado em 44 avaliações reais</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">✓ 98% recomendam o pastel de 30cm</p>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {GOOGLE_REVIEWS.map(rev => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-stone-50/70 border border-stone-100 hover:border-amber-200 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover border border-stone-200"
                      />
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1">
                          {rev.author}
                          {rev.verifiedLocal && (
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded" title="Guia Local">
                              Guia Local
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] text-stone-400">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Avaliação Verificada Google
                  </span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <ThumbsUp className="w-3 h-3" /> Útil
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
