import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap, Code, Star } from 'lucide-react';

const CarbonCalculator = () => {
  // Username direkt olarak atanıyor
  const userName = "Furkan Ayakdaş";
  
  // Check if user is admin
  const isAdmin = userName === "Furkan Ayakdaş" || userName === "Süreyya Armağan";

  // Determine hotel based on username
  const hotelName = userName === "Furkan Ayakdaş" ? "Sherwood Exclusive Lara" : 
                   userName === "Süreyya Armağan" ? "Greenwood Suites Resort" : 
                   isAdmin ? "Admin Panel" :
                   "Hotel Not Found";
  
  // Energy types with their corresponding units and kWh conversion factors
  const energyTypes = [
    { value: "LPG", unit: "Lt", kwhFactor: 6.98 },
    { value: "Elektrik", unit: "kWh", kwhFactor: 1 },
    { value: "Su", unit: "m³", kwhFactor: 2.42 },
    { value: "Kömür", unit: "Kg", kwhFactor: 7.89 },
    { value: "Reşo", unit: "Adet", kwhFactor: 1.5 },
    { value: "LNG", unit: "m³", kwhFactor: 10.55 },
    { value: "Tüp", unit: "Adet", kwhFactor: 13.8 },
    { value: "Doğalgaz", unit: "m³", kwhFactor: 10.64 }
  ];

  // State variables
  const [selectedEnergyType, setSelectedEnergyType] = useState(energyTypes[0].value);
  const [consumptionAmount, setConsumptionAmount] = useState("");
  const [consumptionList, setConsumptionList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [totalKwh, setTotalKwh] = useState(0);
  const [activeTab, setActiveTab] = useState(isAdmin ? 'allCalculations' : 'calculator');
  
  // Mock data için sabit misafir sayısı
  const mockGuestCount = 150;
  
  // Get current hotel's guest count - sabit değer döndür
  const getCurrentHotelGuests = () => {
    return mockGuestCount;
  };
  
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

  // Handle saving all entries - sadece alert göster
  const handleSave = async () => {
    console.log('Kaydedilecek veri:', { userName, hotelName, totalKwh, consumptionList });
    alert('Veriler başarıyla kaydedildi! (Demo mode)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="fixed w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-white text-white p-1 sm:p-2 rounded-xl">
                  <img src="../ComodoTeknoloji.png" alt="Comodo Teknoloji" className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl" />
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                <span className="hidden sm:inline">Sayaç Okuma</span>
              </Link>
              <Link
                to="/carbon-footprint"
                className="flex items-center px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-300 text-sm sm:text-base"
              >
                <Zap className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Karbon Ayakizi</span>
              </Link>
              <Link
                to="/hotel-reviews"
                className="flex items-center px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
              >
                <Star className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Otel Yorumları</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-green-100 border border-green-200 text-xs sm:text-sm mb-4 sm:mb-6">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-600" />
            <span className="text-green-700">Karbon Ayakizi Hesaplama</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Karbon Ayakizi
            </span>
            <br />
            <span className="text-gray-900">Hesaplama Sistemi</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Otel işletmelerinde enerji tüketimi ve karbon ayakizi hesaplama sistemi.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{hotelName}</h2>
            <p className="text-sm text-gray-600">Kullanıcı: {userName}</p>
          </div>

          {/* Daily Guests Information */}
          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Bugünkü Misafir Sayısı</h3>
              <p className="text-2xl font-bold text-blue-600">{getCurrentHotelGuests()} Kişi</p>
            </div>
          </div>

          {/* Input section */}
          <div className="flex flex-wrap mb-6 gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 mb-2 font-medium">
                Tüketilen Enerji Türü:
                <select
                  value={selectedEnergyType}
                  onChange={(e) => setSelectedEnergyType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                >
                  {energyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 mb-2 font-medium">
                Tüketim Miktarı ({getSelectedEnergyTypeInfo().unit}):
                <input
                  type="number"
                  value={consumptionAmount}
                  onChange={(e) => setConsumptionAmount(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                />
              </label>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleAddConsumption}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingItem ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
          
          {/* Consumption list */}
          {consumptionList.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Eklenen Tüketimler</h3>
              <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enerji Türü</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miktar</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">kWh Değeri</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {consumptionList.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 whitespace-nowrap">{item.type}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{item.amount} {item.unit}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{item.kwhEquivalent.toFixed(2)} kWh</td>
                        <td className="px-4 py-2 whitespace-nowrap space-x-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                          >
                            Düzenle
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Total kWh */}
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-lg font-semibold">
                  Toplam kWh Değeri: <span className="text-blue-600">{totalKwh.toFixed(2)} kWh</span>
                </p>
                <p className="text-md font-medium mt-2">
                  Kişi Başına Enerji: <span className="text-green-600">{(totalKwh / getCurrentHotelGuests()).toFixed(2)} kWh/kişi</span>
                </p>
              </div>
            </div>
          )}
          
          {/* Save button */}
          {consumptionList.length > 0 && (
            <button
              onClick={handleSave}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Kaydet
            </button>
          )}

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">
                  {editingItem ? 'Tüketimi Güncelle' : 'Tüketimi Ekle'}
                </h3>
                <div className="mb-4">
                  <p className="text-gray-600">
                    <strong>Enerji Türü:</strong> {selectedEnergyType}
                  </p>
                  <p className="text-gray-600">
                    <strong>Miktar:</strong> {consumptionAmount} {getSelectedEnergyTypeInfo().unit}
                  </p>
                  <p className="text-gray-600">
                    <strong>kWh Değeri:</strong> {calculateKwh(selectedEnergyType, parseFloat(consumptionAmount) || 0).toFixed(2)} kWh
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={cancelConfirmation}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    onClick={confirmAddConsumption}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingItem ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 sm:p-3 rounded-xl">
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

export default CarbonCalculator;