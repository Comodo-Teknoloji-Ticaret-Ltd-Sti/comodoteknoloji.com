import React, { useState } from 'react';
import { TrendingUp, Zap, Users, BarChart3, Calendar, Leaf, Award, Target, ArrowRight, Activity } from 'lucide-react';

const CarbonCalculator = ({ userName = "Furkan Ayakdaş" }) => {
  // Hotel mapping
  const hotelMapping = {
    'GSR': 'İstanbul Otel',
    'GKR': 'Kemer Otel',
    'SDR': 'Lara Otel',
    'SEK': 'Antalya Otel',
    'SEL': 'Danimarka Otel',
    'SPR': ' Premio Hotel',
    'TBB': 'TUI  Belek'
  };

  // Sabit misafir sayısı
  const fixedGuestCount = 900;

  // Hotel adı
  const hotelName = "Antalya Otel";

  // Energy types with their corresponding units and kWh conversion factors
  const energyTypes = [
    { value: "LPG", unit: "Lt", kwhFactor: 6.98, icon: "🔥" },
    { value: "Elektrik", unit: "kWh", kwhFactor: 1, icon: "⚡" },
    { value: "Su", unit: "m³", kwhFactor: 2.42, icon: "💧" },
    { value: "Kömür", unit: "Kg", kwhFactor: 7.89, icon: "⚫" },
    { value: "Reşo", unit: "Adet", kwhFactor: 1.5, icon: "🔥" },
    { value: "LNG", unit: "m³", kwhFactor: 10.55, icon: "🏭" },
    { value: "Tüp", unit: "Adet", kwhFactor: 13.8, icon: "🔶" },
    { value: "Doğalgaz", unit: "m³", kwhFactor: 10.64, icon: "🏢" }
  ];

  // State variables
  const [selectedEnergyType, setSelectedEnergyType] = useState(energyTypes[0].value);
  const [consumptionAmount, setConsumptionAmount] = useState("");
  const [consumptionList, setConsumptionList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [totalKwh, setTotalKwh] = useState(0);
  const [activeTab, setActiveTab] = useState('calculator');
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [allCalculations, setAllCalculations] = useState([]);
  const [allConsumptions, setAllConsumptions] = useState([]);

  // Get unit and kWh factor for selected energy type
  const getSelectedEnergyTypeInfo = () => {
    return energyTypes.find(type => type.value === selectedEnergyType) || energyTypes[0];
  };

  // Calculate kWh equivalent
  const calculateKwh = (type, amount) => {
    const energyType = energyTypes.find(t => t.value === type);
    if (energyType && !isNaN(amount)) {
      return amount * energyType.kwhFactor;
    }
    return 0;
  };

  // Update total kWh whenever consumption list changes
  React.useEffect(() => {
    const newTotal = consumptionList.reduce((sum, item) => {
      return sum + calculateKwh(item.type, item.amount);
    }, 0);
    setTotalKwh(newTotal);
  }, [consumptionList]);

  // Handle adding new consumption entry
  const handleAddConsumption = () => {
    if (consumptionAmount && !isNaN(parseFloat(consumptionAmount))) {
      setShowConfirmation(true);
    }
  };

  // Confirm adding consumption
  const confirmAddConsumption = () => {
    const energyTypeInfo = getSelectedEnergyTypeInfo();

    if (editingItem) {
      // Update existing item
      const updatedList = consumptionList.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              type: selectedEnergyType,
              amount: parseFloat(consumptionAmount),
              unit: energyTypeInfo.unit,
              kwhEquivalent: calculateKwh(selectedEnergyType, parseFloat(consumptionAmount))
            }
          : item
      );
      setConsumptionList(updatedList);
      setEditingItem(null);
    } else {
      // Add new item
      const newEntry = {
        id: Date.now(),
        type: selectedEnergyType,
        amount: parseFloat(consumptionAmount),
        unit: energyTypeInfo.unit,
        kwhEquivalent: calculateKwh(selectedEnergyType, parseFloat(consumptionAmount))
      };
      setConsumptionList([...consumptionList, newEntry]);
    }

    setConsumptionAmount("");
    setShowConfirmation(false);
  };

  // Cancel confirmation
  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  // Edit an item
  const handleEdit = (item) => {
    setSelectedEnergyType(item.type);
    setConsumptionAmount(item.amount.toString());
    setEditingItem(item);
  };

  // Delete an item
  const handleDelete = (id) => {
    setConsumptionList(consumptionList.filter(item => item.id !== id));
  };

  // Handle saving all entries (local only)
  const handleSave = () => {
    // Save to local state for demonstration
    const saveData = {
      id: Date.now(),
      kullaniciAdi: userName,
      hotelName: hotelName,
      misafirSayisi: fixedGuestCount,
      toplamKwh: totalKwh,
      kisiBasinaEnerji: totalKwh / fixedGuestCount,
      enerjiTuketimleri: consumptionList.map(item => ({
        enerjiTuru: item.type,
        miktar: item.amount,
        birim: item.unit,
        kwhDegeri: item.kwhEquivalent
      })),
      eklenmeTarihi: new Date().toISOString(),
      tuketimSayisi: consumptionList.length
    };
    setReports([saveData, ...reports]);
    setAllCalculations([saveData, ...allCalculations]);
    setAllConsumptions([
      ...allConsumptions,
      ...consumptionList.map(item => ({
        id: Date.now() + Math.random(),
        hesaplamaId: saveData.id,
        enerjiTuru: item.type,
        miktar: item.amount,
        birim: item.unit,
        kwhDegeri: item.kwhEquivalent,
        kullaniciAdi: userName
      }))
    ]);
    
    // Show success animation
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
    successDiv.innerHTML = '✅ Veriler başarıyla kaydedildi!';
    document.body.appendChild(successDiv);
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  };

  // Stats calculation (local)
  React.useEffect(() => {
    if (reports.length > 0) {
      const toplamKayitSayisi = reports.length;
      const toplamKwh = reports.reduce((sum, r) => sum + r.toplamKwh, 0);
      const ortalamaMisafirSayisi = fixedGuestCount;
      const ortalamaKisiBasinaEnerji = toplamKwh / (toplamKayitSayisi * fixedGuestCount);
      const sonKayitTarihi = reports[0].eklenmeTarihi;
      // Enerji türü dağılımı
      const enerjiTuruDagilimi = {};
      reports.forEach(report => {
        report.enerjiTuketimleri.forEach(item => {
          if (!enerjiTuruDagilimi[item.enerjiTuru]) {
            enerjiTuruDagilimi[item.enerjiTuru] = { adet: 0, toplamKwh: 0 };
          }
          enerjiTuruDagilimi[item.enerjiTuru].adet += 1;
          enerjiTuruDagilimi[item.enerjiTuru].toplamKwh += item.kwhDegeri;
        });
      });
      setStats({
        toplamKayitSayisi,
        toplamKwh,
        ortalamaMisafirSayisi,
        ortalamaKisiBasinaEnerji,
        sonKayitTarihi,
        enerjiTuruDagilimi: Object.entries(enerjiTuruDagilimi).map(([enerjiTuru, val]) => ({
          enerjiTuru,
          adet: val.adet,
          toplamKwh: val.toplamKwh
        }))
      });
    } else {
      setStats(null);
    }
  }, [reports]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <Leaf className="mr-3 h-10 w-10" />
                Enerji Yönetim Sistemi
              </h1>
              <h2 className="text-2xl font-semibold text-blue-100">{hotelName}</h2>
              <p className="text-lg text-blue-200 mt-2">👤 {userName}</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Award className="h-12 w-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-sm">Sürdürülebilirlik</p>
                <p className="text-sm">Sertifikası</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation with modern design */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2">
            <nav className="flex flex-wrap space-x-1">
              {[
                { key: 'calculator', label: 'Enerji Hesaplama', icon: Zap },
                { key: 'stats', label: 'İstatistikler', icon: BarChart3 },
                { key: 'reports', label: 'Raporlar', icon: TrendingUp },
                { key: 'allCalculations', label: 'Tüm Hesaplamalar', icon: Activity },
                { key: 'allConsumptions', label: 'Tüm Tüketimler', icon: Target }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="space-y-8">
            {/* Guest Information Card */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Users className="mr-3 h-8 w-8" />
                    Günlük Misafir Analizi
                  </h3>
                  <div className="flex items-center space-x-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-4xl font-bold">{fixedGuestCount}</p>
                      <p className="text-lg">Aktif Misafir</p>
                    </div>
                    <ArrowRight className="h-8 w-8 text-white/60" />
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-lg">Doluluk Oranı</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <Calendar className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Bugün</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input section with modern design */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Zap className="mr-3 h-6 w-6 text-blue-500" />
                Enerji Tüketimi Girişi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 mb-3 font-semibold">
                    Enerji Türü Seçin:
                  </label>
                  <select
                    value={selectedEnergyType}
                    onChange={(e) => setSelectedEnergyType(e.target.value)}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    {energyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-3 font-semibold">
                    Tüketim Miktarı ({getSelectedEnergyTypeInfo().unit}):
                  </label>
                  <input
                    type="number"
                    value={consumptionAmount}
                    onChange={(e) => setConsumptionAmount(e.target.value)}
                    placeholder="Miktar giriniz..."
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleAddConsumption}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
                  >
                    {editingItem ? '✏️ Güncelle' : '➕ Ekle'}
                  </button>
                </div>
              </div>
            </div>

            {/* Consumption list with enhanced table */}
            {consumptionList.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Activity className="mr-3 h-6 w-6 text-green-500" />
                  Eklenen Tüketimler
                </h3>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                          Enerji Türü
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                          Miktar
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                          kWh Değeri
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {consumptionList.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">
                                {energyTypes.find(t => t.value === item.type)?.icon}
                              </span>
                              <span className="font-semibold text-gray-900">{item.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-lg font-medium text-gray-900">
                              {item.amount.toLocaleString()} {item.unit}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              ⚡ {item.kwhEquivalent.toLocaleString()} kWh
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-3">
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors transform hover:scale-105"
                            >
                              ✏️ Düzenle
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors transform hover:scale-105"
                            >
                              🗑️ Sil
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Summary */}
                <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{totalKwh.toLocaleString()}</p>
                      <p className="text-lg">Toplam kWh</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{(totalKwh / fixedGuestCount).toFixed(2)}</p>
                      <p className="text-lg">kWh/Kişi</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{consumptionList.length}</p>
                      <p className="text-lg">Tüketim Kalemi</p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-bold text-lg"
                  >
                    💾 Verileri Kaydet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div>
            {stats ? (
              <div className="space-y-8">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Toplam Kayıt</p>
                        <p className="text-3xl font-bold">{stats.toplamKayitSayisi}</p>
                      </div>
                      <BarChart3 className="h-12 w-12 text-blue-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Toplam kWh</p>
                        <p className="text-3xl font-bold">{stats.toplamKwh.toLocaleString()}</p>
                      </div>
                      <Zap className="h-12 w-12 text-green-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Ortalama Misafir</p>
                        <p className="text-3xl font-bold">{stats.ortalamaMisafirSayisi}</p>
                      </div>
                      <Users className="h-12 w-12 text-purple-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Kişi Başına Enerji</p>
                        <p className="text-2xl font-bold">{stats.ortalamaKisiBasinaEnerji.toFixed(2)}</p>
                        <p className="text-sm text-orange-200">kWh/kişi</p>
                      </div>
                      <Target className="h-12 w-12 text-orange-200" />
                    </div>
                  </div>
                </div>

                {/* Last Record Date */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Calendar className="mr-3 h-6 w-6 text-blue-500" />
                    Son Kayıt Tarihi
                  </h4>
                  <p className="text-xl text-gray-600">
                    {new Date(stats.sonKayitTarihi).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Energy Distribution */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <BarChart3 className="mr-3 h-6 w-6 text-green-500" />
                    Enerji Türü Dağılımı
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats.enerjiTuruDagilimi.map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="text-2xl mr-3">
                                {energyTypes.find(t => t.value === item.enerjiTuru)?.icon}
                              </span>
                              <p className="font-bold text-gray-800 text-lg">{item.enerjiTuru}</p>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{item.adet} kayıt</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600 text-xl">{item.toplamKwh.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">kWh</p>
                            <p className="text-sm font-medium text-green-600">
                              {((item.toplamKwh / stats.toplamKwh) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${((item.toplamKwh / stats.toplamKwh) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">İstatistik verisi bulunamadı.</p>
                <p className="text-gray-500 mt-2">Veri girişi yaptıktan sonra istatistikler görüntülenecektir.</p>
              </div>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            {reports.length > 0 ? (
              <div className="space-y-6">
                {reports.map((report, index) => (
                  <div key={report.id} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center">
                          <TrendingUp className="mr-3 h-6 w-6 text-blue-500" />
                          Rapor #{report.id}
                        </h4>
                        <p className="text-gray-600 mt-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(report.eklenmeTarihi).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="text-right bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl">
                        <p className="text-sm font-medium">Toplam Enerji</p>
                        <p className="text-2xl font-bold">{report.toplamKwh.toLocaleString()} kWh</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-sm font-medium text-blue-600">Kullanıcı</p>
                        <p className="text-lg font-bold text-blue-800">{report.kullaniciAdi}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                        <p className="text-sm font-medium text-green-600">Misafir Sayısı</p>
                        <p className="text-lg font-bold text-green-800">{report.misafirSayisi}</p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <p className="text-sm font-medium text-purple-600">Kişi Başına Enerji</p>
                        <p className="text-lg font-bold text-purple-800">{report.kisiBasinaEnerji.toFixed(2)} kWh</p>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                        <p className="text-sm font-medium text-orange-600">Tüketim Sayısı</p>
                        <p className="text-lg font-bold text-orange-800">{report.tuketimSayisi}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h5 className="text-lg font-bold text-gray-800 mb-4">Enerji Tüketimleri</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.enerjiTuketimleri.map((item, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">
                                {energyTypes.find(t => t.value === item.enerjiTuru)?.icon}
                              </span>
                              <div>
                                <p className="font-semibold text-gray-800">{item.enerjiTuru}</p>
                                <p className="text-sm text-gray-600">{item.miktar} {item.birim}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">{item.kwhDegeri.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">kWh</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Henüz rapor bulunamadı.</p>
                <p className="text-gray-500 mt-2">Veri girişi yaptıktan sonra raporlar görüntülenecektir.</p>
              </div>
            )}
          </div>
        )}

        {/* All Calculations Tab */}
        {activeTab === 'allCalculations' && (
          <div>
            {allCalculations.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Activity className="mr-3 h-6 w-6" />
                    Tüm Hesaplamalar
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Misafir Sayısı</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam kWh</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kişi Başına Enerji</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tüketim Sayısı</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allCalculations.map((calc, index) => (
                        <tr key={calc.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{calc.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {calc.kullaniciAdi}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {calc.hotelName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {calc.misafirSayisi}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {calc.toplamKwh.toLocaleString()} kWh
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {calc.kisiBasinaEnerji.toFixed(2)} kWh
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {calc.tuketimSayisi}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(calc.eklenmeTarihi).toLocaleDateString('tr-TR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <Activity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Henüz hesaplama bulunamadı.</p>
                <p className="text-gray-500 mt-2">Veri girişi yaptıktan sonra hesaplamalar görüntülenecektir.</p>
              </div>
            )}
          </div>
        )}

        {/* All Consumptions Tab */}
        {activeTab === 'allConsumptions' && (
          <div>
            {allConsumptions.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Target className="mr-3 h-6 w-6" />
                    Tüm Tüketimler
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hesaplama ID</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enerji Türü</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miktar</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birim</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">kWh Değeri</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allConsumptions.map((consumption, index) => (
                        <tr key={consumption.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{consumption.id.toString().slice(-6)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            #{consumption.hesaplamaId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {consumption.kullaniciAdi}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">
                                {energyTypes.find(t => t.value === consumption.enerjiTuru)?.icon}
                              </span>
                              {consumption.enerjiTuru}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {consumption.miktar.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {consumption.birim}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {consumption.kwhDegeri.toLocaleString()} kWh
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <Target className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Henüz tüketim bulunamadı.</p>
                <p className="text-gray-500 mt-2">Veri girişi yaptıktan sonra tüketimler görüntülenecektir.</p>
              </div>
            )}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {editingItem ? 'Güncelleme Onayı' : 'Ekleme Onayı'}
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700">
                  <strong>Enerji Türü:</strong> {getSelectedEnergyTypeInfo().icon} {selectedEnergyType}
                </p>
                <p className="text-gray-700">
                  <strong>Miktar:</strong> {consumptionAmount} {getSelectedEnergyTypeInfo().unit}
                </p>
                <p className="text-gray-700">
                  <strong>kWh Değeri:</strong> {calculateKwh(selectedEnergyType, parseFloat(consumptionAmount)).toLocaleString()} kWh
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={confirmAddConsumption}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold"
                >
                  ✅ Onayla
                </button>
                <button
                  onClick={cancelConfirmation}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold"
                >
                  ❌ İptal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonCalculator;