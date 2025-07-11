import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Globe, Smartphone, Database, Shield, Users, Award, Mail, Phone, MapPin, Menu, X, Star, CheckCircle, ArrowRight, Zap, Target, TrendingUp, Eye, Clock, Palette, Cpu, Layers, Settings, Play, Quote, Briefcase, Rocket, LineChart, MessageCircle, Send, Bot, Minimize2, Maximize2, ChevronDown, Home, ArrowLeft, Brain, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HotelReviewsAnalysis = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 text-gray-800">
            {/* Header */}
            <header className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-75"></div>
                                <div className="relative bg-white text-white p-2 rounded-xl">
                                    <img src="../ComodoTeknoloji.png" alt="Comodo Teknoloji" className="w-12 h-12 rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                    Comodo
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1">Teknoloji</p>
                            </div>
                        </div>

                        <nav className="flex items-center space-x-4">
                            <Link
                                to="/"
                                className="flex items-center px-6 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Ana Sayfa
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 border border-green-200 text-sm mb-6">
                            <Brain className="w-4 h-4 mr-2 text-green-600" />
                            <span className="text-green-700">AI Projesi</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Otel Yorumları
                            </span>
                            <br />
                            <span className="text-gray-900">Analiz Platformu</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            AI destekli otel yorumları analiz sistemi ile müşteri memnuniyetini artırın.
                            Doğal dil işleme ve duygu analizi teknolojileri kullanılarak geliştirildi.
                        </p>
                    </div>

                    {/* Project Features */}
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Proje Özellikleri</h2>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Doğal dil işleme (NLP) teknolojisi</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Duygu analizi ve sentiment scoring</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Otomatik kategorizasyon</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Trend analizi ve tahminleme</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Rekabet analizi ve benchmarking</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Gerçek zamanlı dashboard</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-3 rounded-xl">
                            <Code className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">Comodo Teknoloji</h3>
                            <p className="text-gray-400 text-sm">Dijital Dönüşüm Partneri</p>
                        </div>
                    </div>
                    <p className="text-gray-400">&copy; 2025 Comodo Teknoloji. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default HotelReviewsAnalysis;
