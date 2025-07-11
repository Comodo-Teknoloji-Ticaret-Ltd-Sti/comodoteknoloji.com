import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    LineElement,
    PointElement,
    Filler,
    ArcElement
} from 'chart.js';
import { ChevronRight, Code, Globe, Smartphone, Database, Shield, Users, Award, Mail, Phone, MapPin, Menu, X, Star, CheckCircle, ArrowRight, Zap, Target, TrendingUp, Eye, Clock, Palette, Cpu, Layers, Settings, Play, Quote, Briefcase, Rocket, LineChart, MessageCircle, Send, Bot, Minimize2, Maximize2, ChevronDown, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    LineElement,
    PointElement,
    Filler,
    ArcElement
);

const Electric = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [scrollY, setScrollY] = useState(0);

    // Sample data for demonstration


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // JSON dosyasını fetch ile okuma
                const response = await fetch('/data/energy-data.json');
                if (!response.ok) {
                    throw new Error('JSON dosyası yüklenemedi');
                }
                const jsonData = await response.json();
                setData(jsonData);

            } catch (err) {
                setError('Veri yüklenirken hata oluştu: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const groupAndAverageByDevice = (devices) => {
        const grouped = {};
        devices.forEach(d => {
            if (!grouped[d.cihazAdi]) grouped[d.cihazAdi] = [];
            if (d.anlikGuc !== null) grouped[d.cihazAdi].push(d.anlikGuc);
        });

        const labels = Object.keys(grouped);
        const data = labels.map(label => {
            const values = grouped[label];
            const sum = values.reduce((acc, val) => acc + val, 0);
            return (sum / values.length).toFixed(2);
        });

        return { labels, data };
    };

    const getTotalConsumption = (devices) => {
        return devices
            .filter(d => d.anlikGuc !== null)
            .reduce((sum, d) => sum + d.anlikGuc, 0);
    };

    const generateColors = (count) => {
        const colors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(83, 102, 255, 0.8)',
            'rgba(255, 99, 255, 0.8)',
            'rgba(99, 255, 132, 0.8)'
        ];
        return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        size: 10,
                        weight: 'bold'
                    },
                    maxRotation: 90,
                    minRotation: 45,
                    callback: function (value, index, values) {
                        const label = this.getLabelForValue(value);
                        if (label.length > 15) {
                            return label.substring(0, 15) + '...';
                        }
                        return label;
                    }
                }
            }
        }
    };

    const detailedChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    title: function (context) {
                        return context[0].label;
                    },
                    label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y} W`;
                    }
                }
            }
        },
        layout: {
            padding: {
                bottom: 60
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        size: 11
                    },
                    callback: function (value) {
                        return value + ' W';
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#444',
                    font: {
                        size: 9,
                        weight: '600'
                    },
                    maxRotation: 90,
                    minRotation: 45,
                    padding: 10,
                    callback: function (value, index, values) {
                        const label = this.getLabelForValue(value);
                        const parts = label.split('_');
                        if (parts.length > 1) {
                            return parts[0] + '_' + parts[1];
                        }
                        return label.length > 12 ? label.substring(0, 12) + '...' : label;
                    }
                }
            }
        }
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        const percentage = ((context.parsed / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed.toLocaleString()} W (${percentage}%)`;
                    }
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-xl font-semibold text-gray-700">Sayaç verileri yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-xl font-semibold text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    const gsrDevices = data.filter(d => d.cihazAdi.startsWith('Kemer'));
    const selDevices = data.filter(d => d.cihazAdi.startsWith('Lara'));

    const gsrChart = groupAndAverageByDevice(gsrDevices);
    const selChart = groupAndAverageByDevice(selDevices);

    const gsrTotal = getTotalConsumption(gsrDevices);
    const selTotal = getTotalConsumption(selDevices);

    const comparisonData = {
        labels: ['Lara Otel', 'Kemer Otel'],
        datasets: [{
            label: 'Toplam Güç Tüketimi (W)',
            data: [gsrTotal, selTotal],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 99, 132, 0.8)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 2
        }]
    };

    const trendData = {
        labels: [...gsrChart.labels, ...selChart.labels],
        datasets: [
            {
                label: 'Lara Otel Cihazları',
                data: gsrChart.data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Kemer Otel Cihazları',
                data: [...Array(gsrChart.labels.length).fill(null), ...selChart.data],
                borderColor: 'rgb(19, 18, 18)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    // Pie chart data for first 20 devices
    const pieData = {
        labels: data.slice(0, 20).map(d => d.cihazAdi),
        datasets: [{
            data: data.slice(0, 20).map(d => d.anlikGuc),
            backgroundColor: generateColors(Math.min(data.length, 20)),
            borderColor: generateColors(Math.min(data.length, 20)).map(color => color.replace('0.8', '1')),
            borderWidth: 2
        }]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                                <div className="relative bg-white text-white p-2 rounded-xl">
                                    <img src="../ComodoTeknoloji.png" alt="Comodo Teknoloji" className="w-12 h-12 rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
            </div>

            {/* Main Content - Add proper top padding */}
            <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-sm mb-6">
                        <Zap className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-blue-700">IoT Projesi</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Uzaktan Elektrik Sayaçları
                        </span>
                        <br />
                        <span className="text-gray-900">Okuma Sistemi</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        IoT teknolojisi ile elektrik sayaçlarını uzaktan okuma ve izleme sistemi.
                        Gerçek zamanlı veri toplama, analiz ve raporlama çözümü.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {[
                                {
                                    id: 'overview',
                                    label: 'Genel Bakış',
                                    icon: '📊'
                                },
                                {
                                    id: 'detailed',
                                    label: 'Detaylı Analiz',
                                    icon: '🔍'
                                },
                                {
                                    id: 'comparison',
                                    label: 'Karşılaştırma',
                                    icon: '⚖️'
                                },
                                {
                                    id: 'distribution',
                                    label: 'Dağılım & Tablo',
                                    icon: '🥧'
                                }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-3xl">🏨</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Lara Otel</p>
                                <p className="text-2xl font-bold text-blue-600">{gsrTotal.toLocaleString()} W</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-3xl">🏖️</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Kemer Otel</p>
                                <p className="text-2xl font-bold text-pink-600">{selTotal.toLocaleString()} W</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-3xl">⚡</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Toplam Güç</p>
                                <p className="text-2xl font-bold text-purple-600">{(gsrTotal + selTotal).toLocaleString()} W</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                <span className="mr-2">⚖️</span>
                                Tesis Karşılaştırması
                            </h3>
                            <div className="h-80">
                                <Bar data={comparisonData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Project Features Overview */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                                <span className="mr-2">🔧</span>
                                Proje Özellikleri
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>IoT sensörlerle otomatik okuma</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Gerçek zamanlı veri izleme</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Mobil uygulama desteği</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Anomali tespiti ve uyarı sistemi</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Otomatik fatura hesaplama</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Veri analizi ve raporlama</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'detailed' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">🏨 Lara Otel - Detaylı Analiz</h3>
                            <div className="h-96">
                                <Bar data={{
                                    labels: gsrChart.labels,
                                    datasets: [{
                                        label: 'Ortalama Anlık Güç (W)',
                                        data: gsrChart.data,
                                        backgroundColor: generateColors(gsrChart.labels.length),
                                        borderColor: generateColors(gsrChart.labels.length).map(color => color.replace('0.8', '1')),
                                        borderWidth: 2,
                                        borderRadius: 8,
                                        borderSkipped: false,
                                    }]
                                }} options={detailedChartOptions} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">🏖️ Kemer Otel - Detaylı Analiz</h3>
                            <div className="h-96">
                                <Bar data={{
                                    labels: selChart.labels,
                                    datasets: [{
                                        label: 'Ortalama Anlık Güç (W)',
                                        data: selChart.data,
                                        backgroundColor: generateColors(selChart.labels.length),
                                        borderColor: generateColors(selChart.labels.length).map(color => color.replace('0.8', '1')),
                                        borderWidth: 2,
                                        borderRadius: 8,
                                        borderSkipped: false,
                                    }]
                                }} options={detailedChartOptions} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'comparison' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">📈 Trend Analizi</h3>
                            <div className="h-96">
                                <Line data={trendData} options={{
                                    ...chartOptions,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    },
                                    plugins: {
                                        ...chartOptions.plugins,
                                        filler: {
                                            propagate: false,
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'distribution' && (
                    <div className="space-y-8">
                        {/* Pie Chart */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">🥧 Güç Tüketimi Dağılımı</h3>
                            <div className="h-96">
                                <Pie data={pieData} options={pieChartOptions} />
                                <p className="mt-2 text-xs text-gray-500">İlk 20 cihaz gösteriliyor.</p>
                            </div>
                        </div>

                        {/* Detailed Table */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">📋 Detaylı Tüketim Tablosu</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Cihaz Adı
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Seri No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Marka
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Voltaj (V)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Akım (A)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Anlık Güç (W)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Toplam Tüketim (W)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Son Güncelleme
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {data.slice(0, 20).map((device, index) => (
                                            <tr key={device.cihazId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <div className="flex items-center">
                                                        <div className={`w-3 h-3 rounded-full mr-3 ${device.cihazAdi.startsWith('Kemer') ? 'bg-blue-500' : 'bg-pink-500'
                                                            }`}></div>
                                                        {device.cihazAdi}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {device.seriNumarasi}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {device.marka}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {device.voltajlar}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {device.akimlar}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${device.anlikGuc > 50000 ? 'bg-red-100 text-red-800' :
                                                        device.anlikGuc > 30000 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                        {device.anlikGuc.toLocaleString()} W
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {device.toplamTuketim.toLocaleString()} W
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {device.calismaSaati}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-2 text-xs text-gray-500">İlk 20 cihaz gösteriliyor.</p>
                            </div>
                        </div>

                        {/* Summary Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl text-blue-600">📊</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Toplam Cihaz</p>
                                        <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl text-green-600">📈</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Ortalama Tüketim</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {(data.reduce((sum, d) => sum + d.anlikGuc, 0) / data.length).toLocaleString()} W
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl text-red-600">🔥</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">En Yüksek Tüketim</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {Math.max(...data.map(d => d.anlikGuc)).toLocaleString()} W
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl text-blue-600">❄️</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">En Düşük Tüketim</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {Math.min(...data.map(d => d.anlikGuc)).toLocaleString()} W
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl">
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

export default Electric;