import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Globe, Smartphone, Database, Shield, Users, Award, Mail, Phone, MapPin, Menu, X, Star, CheckCircle, ArrowRight, Zap, Target, TrendingUp, Eye, Clock, Palette, Cpu, Layers, Settings, Play, Quote, Briefcase, Rocket, LineChart, MessageCircle, Send, Bot, Minimize2, Maximize2, ChevronDown, Home, ArrowLeft, Brain, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HotelReviewsAnalysis = () => {
    const [scrollY, setScrollY] = useState(0);

    // AI Assistant States
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            text: 'Merhaba! Ben Comodo AI asistanıyım. Otel yorumları analizi hakkında size nasıl yardımcı olabilirim?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // AI Assistant Functions
    const getBotResponse = async (userMessage) => {
        try {
            setIsTyping(true);
            // Simulate AI response delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const responses = [
                "Otel yorumlarını analiz ederek müşteri memnuniyetini artıracak öneriler sunuyoruz.",
                "Sentiment analizi ile pozitif ve negatif yorumları kategorize ediyoruz.",
                "AI destekli analiz ile otel hizmetlerinin güçlü ve zayıf yönlerini belirliyoruz.",
                "Müşteri geri bildirimlerini değerlendirerek hizmet kalitesini artırma önerileri veriyoruz.",
                "Doğal dil işleme teknikleri ile yorumların detaylı analizini yapıyoruz."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const botMessage = {
                id: Date.now(),
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            
            setChatMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        } catch (error) {
            console.error('AI Assistant Error:', error);
            setIsTyping(false);
            const errorMessage = {
                id: Date.now(),
                text: 'Özür dilerim, şu anda bir hata oluştu. Lütfen tekrar deneyin.',
                sender: 'bot',
                timestamp: new Date()
            };
            setChatMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleSendMessage = async () => {
        if (!currentMessage.trim()) return;
        
        const userMessage = {
            id: Date.now(),
            text: currentMessage,
            sender: 'user',
            timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');
        
        // Get bot response
        await getBotResponse(currentMessage);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

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
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-75"></div>
                                <div className="relative bg-white text-white p-1 sm:p-2 rounded-xl">
                                    <img src="../ComodoTeknoloji.png" alt="Comodo Teknoloji" className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                    Comodo
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Teknoloji</p>
                            </div>
                        </div>

                        <nav className="flex items-center space-x-2 sm:space-x-4">
                            <Link
                                to="/"
                                className="flex items-center px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
                            >
                                <Home className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Ana Sayfa</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-green-100 border border-green-200 text-xs sm:text-sm mb-4 sm:mb-6">
                            <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-600" />
                            <span className="text-green-700">AI Projesi</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Otel Yorumları
                            </span>
                            <br />
                            <span className="text-gray-900">Analiz Platformu</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            AI destekli otel yorumları analiz sistemi ile müşteri memnuniyetini artırın.
                            Doğal dil işleme ve duygu analizi teknolojileri kullanılarak geliştirildi.
                        </p>
                    </div>

                    {/* Project Features */}
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Proje Özellikleri</h2>
                        <ul className="space-y-3 sm:space-y-4 text-gray-700">
                            <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Doğal dil işleme (NLP) teknolojisi</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Duygu analizi ve sentiment scoring</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Otomatik kategorizasyon</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Trend analizi ve tahminleme</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Rekabet analizi ve benchmarking</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Gerçek zamanlı dashboard</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* AI Assistant Chat */}
            {
                isChatOpen && (
                    <div className={`fixed bottom-4 right-20 z-[200] transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-80 h-96'
                        } bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}>
                        <div className="h-full flex flex-col">
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Comodo AI</h3>
                                        <p className="text-xs text-green-100">Otel Yorumları Uzmanı</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setIsMinimized(!isMinimized)}
                                        className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-300"
                                    >
                                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setIsChatOpen(false)}
                                        className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {!isMinimized && (
                                <>
                                    {/* Chat Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {chatMessages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-xs px-4 py-2 rounded-2xl ${message.sender === 'user'
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    <p className="text-sm">{message.text}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-gray-100 text-gray-800 max-w-xs px-4 py-2 rounded-2xl">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Chat Input */}
                                    <div className="p-4 border-t border-gray-200">
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={currentMessage}
                                                onChange={(e) => setCurrentMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Mesajınızı yazın..."
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!currentMessage.trim() || isTyping}
                                                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )
            }

            {/* AI Assistant Toggle Button */}
            {
                !isChatOpen && (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-4 right-20 z-[200] w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
                    >
                        <Bot className="w-6 h-6" />
                    </button>
                )
            }

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-2 sm:p-3 rounded-xl">
                            <Code className="w-4 h-4 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-2xl font-bold">Comodo Teknoloji</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">Dijital Dönüşüm Partneri</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-base">&copy; 2025 Comodo Teknoloji. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default HotelReviewsAnalysis;
