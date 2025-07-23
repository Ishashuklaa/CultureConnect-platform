import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star, MapPin, Plus, Filter } from 'lucide-react';

const CulturalExplorer = () => {
  const { category } = useParams();
  const { user, api } = useAuth();
  const [culturalData, setCulturalData] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(true);

  const categoryTitles = {
    traditions: 'Indian Traditions',
    dance: 'Folk Dance Forms',
    arts: 'Arts & Crafts',
    music: 'Musical Heritage',
    festivals: 'Cultural Festivals',
    rituals: 'Sacred Rituals'
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  useEffect(() => {
    fetchCulturalData();
  }, [category, selectedState]);

  const fetchCulturalData = async () => {
    try {
      const params = selectedState ? `?state=${selectedState}` : '';
      const response = await api.get(`/culture/${category}${params}`);
      setCulturalData(response.data);
    } catch (error) {
      console.error('Error fetching cultural data:', error);
      setCulturalData({});
    } finally {
      setLoading(false);
    }
  };

  const addToItinerary = async (item, state) => {
    if (!user) {
      alert('Please login to add items to your itinerary');
      return;
    }

    try {
      await api.post('/itinerary', {
        culturalSite: item.name,
        state: state,
        type: category
      });
      alert('Added to your itinerary!');
    } catch (error) {
      console.error('Error adding to itinerary:', error);
      alert('Error adding to itinerary');
    }
  };

  const renderCulturalItems = () => {
    if (selectedState && culturalData[selectedState]) {
      // Display items for selected state
      return culturalData[selectedState].map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{selectedState}</span>
              </div>
              <button
                onClick={() => addToItinerary(item, selectedState)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Itinerary
              </button>
            </div>
          </div>
        </div>
      ));
    } else if (typeof culturalData === 'object' && Object.keys(culturalData).length > 0) {
      // Display all states with their items
      return Object.entries(culturalData).map(([state, items]) => (
        <div key={state} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="h-8 w-8 text-orange-500 mr-3" />
            {state}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <button
                    onClick={() => addToItinerary(item, state)}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105"
                  >
                    Add to Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ));
    }

    return (
      <div className="text-center py-16">
        <Star className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">No cultural data available</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {categoryTitles[category] || 'Cultural Heritage'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the rich {category} of India, state by state
          </p>
        </div>

        {/* State Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All States</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <button
              onClick={() => setSelectedState('')}
              className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        </div>

        {/* Cultural Content */}
        <div>
          {renderCulturalItems()}
        </div>
      </div>
    </div>
  );
};

export default CulturalExplorer;