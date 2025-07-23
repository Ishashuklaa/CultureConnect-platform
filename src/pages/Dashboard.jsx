import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, BookOpen, Bookmark, Map, Languages, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user, api } = useAuth();
  const [savedStories, setSavedStories] = useState([]);
  const [languageProgress, setLanguageProgress] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setError(null);
      const [savedResponse, itineraryResponse, userResponse] = await Promise.all([
        api.get('/users/saved-stories'),
        api.get('/itinerary'),
        api.get('/auth/me')
      ]);
      
      setSavedStories(savedResponse.data || []);
      setItinerary(itineraryResponse.data || []);
      setLanguageProgress(userResponse.data?.languageProgress || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load dashboard data');
      setSavedStories([]);
      setItinerary([]);
      setLanguageProgress([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchUserData();
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Here's your cultural exploration dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Bookmark className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{savedStories.length}</p>
                <p className="text-gray-600">Saved Stories</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Languages className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{languageProgress.length}</p>
                <p className="text-gray-600">Languages Learning</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Map className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{itinerary.length}</p>
                <p className="text-gray-600">Itinerary Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(languageProgress.reduce((acc, lang) => acc + lang.progress, 0) / languageProgress.length) || 0}%
                </p>
                <p className="text-gray-600">Avg Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saved Stories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Stories</h2>
            {savedStories.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">No saved stories yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedStories.slice(0, 3).map((story) => (
                  <div key={story?._id || Math.random()} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{story?.title || 'Untitled Story'}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{story?.content || 'No content available'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">by {story?.author?.name || 'Unknown Author'}</span>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                        {story?.category || 'General'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Language Progress</h2>
            {languageProgress.length === 0 ? (
              <div className="text-center py-8">
                <Languages className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Start learning a language!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {languageProgress.map((lang, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{lang?.language || 'Unknown Language'}</h3>
                      <span className="text-sm text-gray-600">{lang?.state || 'Unknown State'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${lang?.progress || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{lang?.progress || 0}%</span>
                    </div>
                    <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {lang?.level || 'beginner'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cultural Itinerary */}
        {itinerary.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cultural Itinerary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {itinerary.slice(0, 6).map((item) => (
                <div key={item?._id || Math.random()} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item?.culturalSite || 'Unknown Site'}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item?.state || 'Unknown State'}</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      {item?.type || 'General'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;