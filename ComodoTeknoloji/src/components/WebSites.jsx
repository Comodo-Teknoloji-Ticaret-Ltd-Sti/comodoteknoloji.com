import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Calendar, Eye, Star, Code, Palette, Globe, Zap, Users, ShoppingCart, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebSites = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = [
        { id: 'all', name: 'Tümü', count: 7 },
        { id: 'kurumsal', name: 'Kurumsal', count: 2 },
        { id: 'saglik', name: 'Sağlık', count: 2 },
        { id: 'eglence', name: 'Eğlence', count: 1 },
        { id: 'comodo', name: 'Comodo', count: 1 },
        { id: 'eticaret', name: 'E-ticaret', count: 1 }
    ];

    const websites = [
        {
            id: 1,
            title: 'Hukuk Bürosu',
            category: 'kurumsal',
            description: 'Hukuk bürosu için modern ve profesyonel web sitesi tasarımı',
            image: '/websites/attorney.png',
            technologies: ['React', 'JavaScript', 'CSS3'],
            features: ['Responsive Tasarım', 'Hukuk Alanları', 'İletişim Formu', 'Avukat Profilleri'],
            launchDate: '2025-06-20',
            views: '8.5K',
            rating: 4.9,
            liveUrl: 'https://comodo-teknoloji-ticaret-ltd-sti.github.io/attorney/',
            color: 'from-blue-500 to-purple-600'
        },
        {
            id: 2,
            title: 'Diş Kliniği',
            category: 'saglik',
            description: 'Diş kliniği için modern ve güvenilir web sitesi tasarımı',
            image: '/websites/dental.png',
            technologies: ['React', 'JavaScript', 'Bootstrap'],
            features: ['Randevu Sistemi', 'Hizmet Tanıtımı', 'Doktor Profilleri', 'İletişim Bilgileri'],
            launchDate: '2025-04-12',
            views: '12.3K',
            rating: 4.8,
            liveUrl: 'https://comodo-teknoloji-ticaret-ltd-sti.github.io/DentalClinic/',
            color: 'from-green-500 to-teal-600'
        },
        {
            id: 3,
            title: 'Radyoloji Görüntüleme',
            category: 'saglik',
            description: 'Radyoloji merkezi için profesyonel ve güvenilir web sitesi',
            image: '/websites/radiology.png',
            technologies: ['React', 'JavaScript', 'CSS3'],
            features: ['Görüntüleme Hizmetleri', 'Uzman Doktor Kadrosu', 'Online Randevu', 'Sonuç Takibi'],
            launchDate: '2025-02-28',
            views: '9.7K',
            rating: 4.7,
            liveUrl: 'https://comodo-teknoloji-ticaret-ltd-sti.github.io/radiology/',
            color: 'from-cyan-500 to-blue-600'
        },
        {
            id: 4,
            title: 'Rafting',
            category: 'eglence',
            description: 'Rafting işletmesi için eğlenceli ve interaktif web sitesi',
            image: '/websites/raft.png',
            technologies: ['React', 'JavaScript', 'Gaming API'],
            features: ['Etkinlik Paketleri', '3 Farklı Dil Desteği', 'Etkinlik Takvimi', 'Topluluk Forumu'],
            launchDate: '2025-01-15',
            views: '15.2K',
            rating: 4.9,
            liveUrl: 'https://mcraftantalya.com/',
            color: 'from-orange-500 to-red-600'
        },
        {
            id: 5,
            title: 'Yapı Denetim',
            category: 'kurumsal',
            description: 'Yapı denetim firması için kurumsal web sitesi tasarımı',
            image: '/websites/yapidenetim.png',
            technologies: ['React', 'JavaScript', 'CSS3'],
            features: ['Kurumsal Kimlik', 'Hizmet Portfolyosu', 'Proje Galerisi', 'İletişim Bilgileri'],
            launchDate: '2024-12-08',
            views: '6.8K',
            rating: 4.6,
            liveUrl: 'https://gundemydk.com/',
            color: 'from-indigo-500 to-purple-600'
        },
        {
            id: 6,
            title: 'Comodo Bee',
            category: 'comodo',
            description: 'Comodo Bee arıcılık ürünleri satış platformu',
            image: '/websites/cbee.png',
            technologies: ['React', 'JavaScript', 'E-commerce'],
            features: ['Ürün Kataloğu', 'Online Satış', 'Arıcılık Rehberi', 'Müşteri Desteği'],
            launchDate: '2024-11-03',
            views: '11.4K',
            rating: 4.8,
            liveUrl: 'https://comodobee.com/',
            color: 'from-yellow-500 to-amber-600'
        },
        {
            id: 7,
            title: 'Comodo Print',
            category: 'eticaret',
            description: 'Dijital baskı ve tasarım hizmetleri e-ticaret platformu',
            image: '/websites/cprint.png',
            technologies: ['React', 'JavaScript', 'E-commerce'],
            features: ['Online Sipariş', 'Tasarım Editörü', 'Baskı Hesaplama', 'Kargo Takibi'],
            launchDate: '2024-10-17',
            views: '18.9K',
            rating: 4.9,
            liveUrl: 'https://comodoprint.com/',
            color: 'from-purple-500 to-pink-600'
        }
    ];

    const filteredWebsites = selectedCategory === 'all' 
        ? websites 
        : websites.filter(website => website.category === selectedCategory);

    const openWhatsApp = () => {
        window.open('https://wa.me/905059982093?text=Merhaba, web sitesi hizmetleri hakkında bilgi almak istiyorum.', '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link 
                                to="/" 
                                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                            >
                                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base">Ana Sayfa</span>
                            </Link>
                            <div className="h-4 sm:h-6 w-px bg-gray-300"></div>
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Web Siteleri</h1>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <button
                                onClick={openWhatsApp}
                                className="flex items-center space-x-1 sm:space-x-2 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                            >
                                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="text-sm sm:text-base">Teklif Al</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Profesyonel Web Siteleri
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            İşletmenizin dijital kimliğini yansıtan, modern ve kullanıcı dostu web siteleri tasarlıyoruz
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Globe className="w-4 h-4" />
                                <span>Responsive Tasarım</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Zap className="w-4 h-4" />
                                <span>Hızlı Yükleme</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Code className="w-4 h-4" />
                                <span>SEO Optimized</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Palette className="w-4 h-4" />
                                <span>Özel Tasarım</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category.name}
                                <span className="ml-2 text-sm opacity-75">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Website Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredWebsites.map((website) => (
                            <div 
                                key={website.id} 
                                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => window.open(website.liveUrl, '_blank')}
                            >
                                
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={website.image}
                                        alt={website.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(website.liveUrl, '_blank');
                                            }}
                                            className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-white transition-colors duration-300"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Siteyi Görüntüle</span>
                                        </button>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                                            {categories.find(cat => cat.id === website.category)?.name}
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-gray-900">{website.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {website.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {website.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {website.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 mb-4">
                                        {website.features.slice(0, 2).map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                                {feature}
                                            </div>
                                        ))}
                                        {website.features.length > 2 && (
                                            <div className="text-sm text-gray-500">
                                                +{website.features.length - 2} daha fazla özellik
                                            </div>
                                        )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(website.launchDate).toLocaleDateString('tr-TR')}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{website.views} görüntülenme</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Sizin İçin Özel Tasarım Yapalım
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        İşletmenizin ihtiyaçlarına özel, modern ve etkili web sitesi tasarımı için bizimle iletişime geçin
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={openWhatsApp}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>WhatsApp ile İletişim</span>
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                            <Phone className="w-5 h-5" />
                            <span>Telefon: +90 505 998 20 93</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebSites;
