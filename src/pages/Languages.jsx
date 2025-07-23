import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Play, Award, Star, ChevronRight } from 'lucide-react';

const Languages = () => {
  const { user, api } = useAuth();
  const [selectedState, setSelectedState] = useState('');
  const [languageData, setLanguageData] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  const indianStates = [
    'Tamil Nadu', 'Gujarat', 'Maharashtra', 'West Bengal', 'Kerala', 'Punjab',
    'Rajasthan', 'Karnataka', 'Andhra Pradesh', 'Odisha'
  ];

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserProgress(response.data.languageProgress || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const fetchLanguageData = async (state) => {
    setLoading(true);
    try {
      const response = await api.get(`/languages/state/${state}`);
      setLanguageData(response.data);
    } catch (error) {
      console.error('Error fetching language data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (language, state, progress, level) => {
    try {
      await api.post('/languages/progress', { language, state, progress, level });
      fetchUserProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getStateProgress = (state) => {
    return userProgress.find(p => p.state === state) || { progress: 0, level: 'beginner' };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn Indian Languages</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master regional languages through interactive lessons and cultural context
          </p>
        </div>

        {/* State Selection */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a State to Begin</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {indianStates.map((state) => {
              const progress = getStateProgress(state);
              return (
                <button
                  key={state}
                  onClick={() => {
                    setSelectedState(state);
                    fetchLanguageData(state);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                    selectedState === state
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-2">{state}</h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{progress.progress}%</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Content */}
        {selectedState && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
              </div>
            ) : languageData ? (
              <>
                <div className="bg-pink-500 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">{languageData.language}</h2>
                  <p className="text-xl opacity-90">Language of {selectedState}</p>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Progress Overview */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h3>
                        <div className="space-y-4">
                          {user ? (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Level</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(getStateProgress(selectedState).level)}`}>
                                  {getStateProgress(selectedState).level}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Progress</span>
                                <span className="text-lg font-bold text-pink-600">
                                  {getStateProgress(selectedState).progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-pink-500 h-3 rounded-full transition-all duration-500"
                                  style={{ width: `${getStateProgress(selectedState).progress}%` }}
                                ></div>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-600">Please login to track your progress</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Lessons</h3>
                      <div className="space-y-4">
                        {languageData.lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900">{lesson.title}</h4>
                                  <p className="text-gray-600">{lesson.content}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                                  {lesson.difficulty}
                                </span>
                                <button
                                  onClick={() => user && updateProgress(languageData.language, selectedState, Math.min(100, (index + 1) * 20), lesson.difficulty)}
                                  className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-all"
                                >
                                  <Play className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">No language data available for {selectedState}</p>
              </div>
            )}
          </div>
        )}

        {/* Default State */}
        {!selectedState && (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-20 w-20 text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Select a State to Start Learning</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose any Indian state from above to begin your language learning journey. 
              Each state offers unique lessons in their regional language with cultural context.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Languages;