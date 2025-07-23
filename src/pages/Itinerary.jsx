import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Map, Trash2, Calendar, MapPin, Eye } from 'lucide-react';

const Itinerary = () => {
  const { user, api } = useAuth();
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    fetchItinerary();
  }, []);

  useEffect(() => {
    // Group itinerary items by state
    const grouped = itinerary.reduce((acc, item) => {
      if (!acc[item.state]) {
        acc[item.state] = [];
      }
      acc[item.state].push(item);
      return acc;
    }, {});
    setGroupedItems(grouped);
  }, [itinerary]);

  const fetchItinerary = async () => {
    try {
      const response = await api.get('/itinerary');
      setItinerary(response.data);
    } catch (error) {
      console.error('Error fetching itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/itinerary/${itemId}`);
      fetchItinerary();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      traditions: 'bg-blue-100 text-blue-800',
      dance: 'bg-purple-100 text-purple-800',
      arts: 'bg-green-100 text-green-800',
      music: 'bg-yellow-100 text-yellow-800',
      festivals: 'bg-pink-100 text-pink-800',
      rituals: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Cultural Itinerary</h1>
          <p className="text-xl text-gray-600">Plan your cultural exploration journey across India</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
              <Map className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{itinerary.length}</p>
            <p className="text-gray-600">Total Items</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{Object.keys(groupedItems).length}</p>
            <p className="text-gray-600">States to Visit</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full inline-flex mb-4">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(itinerary.map(item => item.type)).size}
            </p>
            <p className="text-gray-600">Categories</p>
          </div>
        </div>

        {itinerary.length === 0 ? (
          <div className="text-center py-16">
            <Map className="mx-auto h-20 w-20 text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Itinerary is Empty</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start exploring cultural content and add items to your itinerary to plan your journey across India's rich heritage.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedItems).map(([state, items]) => (
              <div key={state} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/032/189/899/large_2x/seamless-vector-tribal-ethnic-pattern-hand-drawn-african-background-ethnic-fabric-pattern-african-tribal-pattern-in-colorful-ai-generated-free-photo.jpg')] p-6 text-white">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 mr-3" />
                    <div>
                      <h2 className="text-3xl font-bold">{state}</h2>
                      <p className="opacity-90">{items.length} cultural site{items.length !== 1 ? 's' : ''} to explore</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 flex-1">{item.culturalSite}</h3>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.dateAdded).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;