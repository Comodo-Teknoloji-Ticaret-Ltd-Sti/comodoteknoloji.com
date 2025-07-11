import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Calendar, Eye, Star, Code, Palette, Globe, Zap, Users, ShoppingCart, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebSites = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = [
        { id: 'all', name: 'Tümü', count: 12 },
        { id: 'corporate', name: 'Kurumsal', count: 4 },
        { id: 'ecommerce', name: 'E-ticaret', count: 3 },
        { id: 'restaurant', name: 'Restoran', count: 2 },
        { id: 'healthcare', name: 'Sağlık', count: 2 },
        { id: 'education', name: 'Eğitim', count: 1 }
    ];

    const websites = [
        {
            id: 1,
            title: 'TechCorp Digital Solutions',
            category: 'corporate',
            description: 'Kurumsal kimlik ve dijital çözümler sunan teknoloji firması için modern web sitesi',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['React', 'Node.js', 'MongoDB'],
            features: ['Responsive Tasarım', 'SEO Optimized', 'Admin Panel', 'Çoklu Dil'],
            launchDate: '2024-12-15',
            views: '15.2K',
            rating: 4.9,
            liveUrl: 'https://techcorp-demo.com',
            color: 'from-blue-500 to-purple-600'
        },
        {
            id: 2,
            title: 'Fashion Store Premium',
            category: 'ecommerce',
            description: 'Lüks moda markası için e-ticaret platformu ve marka kimlik tasarımı',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
            features: ['E-ticaret', 'Ödeme Sistemi', 'Stok Takibi', 'Mobil Uygulama'],
            launchDate: '2024-11-20',
            views: '23.8K',
            rating: 4.8,
            liveUrl: 'https://fashion-demo.com',
            color: 'from-pink-500 to-rose-600'
        },
        {
            id: 3,
            title: 'Gourmet Restaurant',
            category: 'restaurant',
            description: 'Fine dining restoran için rezervasyon sistemi ve menü yönetimi',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['Vue.js', 'Firebase', 'Stripe'],
            features: ['Online Rezervasyon', 'Menü Yönetimi', 'QR Kod Menü', 'Müşteri Değerlendirme'],
            launchDate: '2024-10-10',
            views: '12.5K',
            rating: 4.7,
            liveUrl: 'https://gourmet-demo.com',
            color: 'from-orange-500 to-red-600'
        },
        {
            id: 4,
            title: 'MediHealth Clinic',
            category: 'healthcare',
            description: 'Özel sağlık kliniği için randevu sistemi ve hasta takip platformu',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['React', 'Express', 'MySQL'],
            features: ['Randevu Sistemi', 'Hasta Takibi', 'Telemedicine', 'Raporlama'],
            launchDate: '2024-09-05',
            views: '8.9K',
            rating: 4.9,
            liveUrl: 'https://medihealth-demo.com',
            color: 'from-green-500 to-teal-600'
        },
        {
            id: 5,
            title: 'Corporate Finance Pro',
            category: 'corporate',
            description: 'Finans danışmanlığı firması için profesyonel kurumsal web sitesi',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['Angular', 'ASP.NET', 'SQL Server'],
            features: ['Portföy Yönetimi', 'Müşteri Paneli', 'Raporlama', 'Güvenlik'],
            launchDate: '2024-08-22',
            views: '11.3K',
            rating: 4.8,
            liveUrl: 'https://finance-demo.com',
            color: 'from-indigo-500 to-blue-600'
        },
        {
            id: 6,
            title: 'EduTech Academy',
            category: 'education',
            description: 'Online eğitim platformu ve öğrenci yönetim sistemi',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['React', 'Node.js', 'MongoDB'],
            features: ['LMS Sistemi', 'Video Streaming', 'Sınav Sistemi', 'Sertifika'],
            launchDate: '2024-07-18',
            views: '19.6K',
            rating: 4.9,
            liveUrl: 'https://edutech-demo.com',
            color: 'from-purple-500 to-pink-600'
        },
        {
            id: 7,
            title: 'Luxury Hotels Chain',
            category: 'corporate',
            description: 'Lüks otel zinciri için rezervasyon ve yönetim sistemi',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
            features: ['Rezervasyon Sistemi', 'Oda Yönetimi', 'CRM', 'Çoklu Lokasyon'],
            launchDate: '2024-06-12',
            views: '25.4K',
            rating: 4.8,
            liveUrl: 'https://luxury-hotels-demo.com',
            color: 'from-amber-500 to-orange-600'
        },
        {
            id: 8,
            title: 'Fresh Market Store',
            category: 'ecommerce',
            description: 'Organik gıda e-ticaret platformu ve teslimat sistemi',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['Shopify', 'React', 'GraphQL'],
            features: ['E-ticaret', 'Teslimat Takibi', 'Abonelik Sistemi', 'Mobil App'],
            launchDate: '2024-05-28',
            views: '18.7K',
            rating: 4.7,
            liveUrl: 'https://fresh-market-demo.com',
            color: 'from-green-500 to-emerald-600'
        },
        {
            id: 9,
            title: 'Dental Care Center',
            category: 'healthcare',
            description: 'Diş kliniği için modern web sitesi ve randevu yönetimi',
            image: 'https://images.unsplash.com/photo-1609298331087-e5c4e6c8c455?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['WordPress', 'PHP', 'MySQL'],
            features: ['Randevu Sistemi', 'Tedavi Takibi', 'Hasta Portali', 'Online Ödeme'],
            launchDate: '2024-04-15',
            views: '9.8K',
            rating: 4.8,
            liveUrl: 'https://dental-care-demo.com',
            color: 'from-cyan-500 to-blue-600'
        },
        {
            id: 10,
            title: 'Artisan Craft Shop',
            category: 'ecommerce',
            description: 'El sanatları e-ticaret platformu ve sanatçı profilleri',
            image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['WooCommerce', 'React', 'WordPress'],
            features: ['E-ticaret', 'Sanatçı Profilleri', 'Özel Sipariş', 'Galeri'],
            launchDate: '2024-03-08',
            views: '14.2K',
            rating: 4.9,
            liveUrl: 'https://artisan-demo.com',
            color: 'from-violet-500 to-purple-600'
        },
        {
            id: 11,
            title: 'Fitness Pro Gym',
            category: 'corporate',
            description: 'Fitness merkezi için üyelik yönetimi ve antrenman programları',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['React', 'Firebase', 'Stripe'],
            features: ['Üyelik Sistemi', 'Antrenman Programları', 'Beslenme Takibi', 'Mobil App'],
            launchDate: '2024-02-20',
            views: '16.5K',
            rating: 4.7,
            liveUrl: 'https://fitness-pro-demo.com',
            color: 'from-red-500 to-orange-600'
        },
        {
            id: 12,
            title: 'Cozy Café & Bistro',
            category: 'restaurant',
            description: 'Butik kafe için sipariş sistemi ve etkinlik yönetimi',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=450&fit=crop&crop=entropy',
            technologies: ['Vue.js', 'Node.js', 'MongoDB'],
            features: ['Online Sipariş', 'Etkinlik Yönetimi', 'Loyalty Program', 'QR Menü'],
            launchDate: '2024-01-10',
            views: '10.7K',
            rating: 4.8,
            liveUrl: 'https://cozy-cafe-demo.com',
            color: 'from-amber-500 to-yellow-600'
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
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/" 
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Ana Sayfa</span>
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <h1 className="text-xl font-bold text-gray-900">Web Siteleri</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={openWhatsApp}
                                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Teklif Al</span>
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
                            <div key={website.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                
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
                                            onClick={() => window.open(website.liveUrl, '_blank')}
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
