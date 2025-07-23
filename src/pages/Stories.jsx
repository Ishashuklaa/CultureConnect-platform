import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, MessageCircle, Bookmark, Plus, Filter, Search } from 'lucide-react';

const Stories = () => {
  const { user, api } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    state: '',
    search: ''
  });
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    category: 'tradition',
    state: '',
    tags: ''
  });

  const categories = ['tradition', 'festival', 'dance', 'music', 'art', 'language', 'ritual', 'food'];
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  useEffect(() => {
    fetchStories();
  }, [filters]);

  const fetchStories = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.state) params.append('state', filters.state);
      
      const response = await api.get(`/stories?${params.toString()}`);
      setStories(response.data.stories || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newStory.title);
      formData.append('content', newStory.content);
      formData.append('category', newStory.category);
      formData.append('state', newStory.state);
      
      const tags = newStory.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      tags.forEach(tag => formData.append('tags', tag));
      
      if (newStory.image) {
        formData.append('image', newStory.image);
      }
      
      await api.post('/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowCreateStory(false);
      setNewStory({ title: '', content: '', category: 'tradition', state: '', tags: '', image: null });
      fetchStories();
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  const handleLike = async (storyId) => {
    try {
      await api.post(`/stories/${storyId}/like`);
      fetchStories();
    } catch (error) {
      console.error('Error liking story:', error);
    }
  };

  const handleSaveStory = async (storyId) => {
    try {
      await api.post(`/users/save-story/${storyId}`);
      fetchStories();
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  const filteredStories = stories.filter(story => 
    story && (
      (story.title && story.title.toLowerCase().includes(filters.search.toLowerCase())) ||
      (story.content && story.content.toLowerCase().includes(filters.search.toLowerCase()))
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cultural Stories</h1>
            <p className="text-gray-600">Share and discover amazing cultural experiences</p>
          </div>
          {user && (
            <button
              onClick={() => setShowCreateStory(true)}
              className="mt-4 md:mt-0 bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Share Story
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">All States</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <button
              onClick={() => setFilters({ category: '', state: '', search: '' })}
              className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Create Story Modal */}
        {showCreateStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Share Your Story</h2>
              </div>
              <form onSubmit={handleCreateStory} className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Story Title"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newStory.category}
                    onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newStory.state}
                    onChange={(e) => setNewStory({ ...newStory, state: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Share your cultural experience..."
                  value={newStory.content}
                  onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewStory({ ...newStory, image: e.target.files[0] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={newStory.tags}
                  onChange={(e) => setNewStory({ ...newStory, tags: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateStory(false)}
                    className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all"
                  >
                    Share Story
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stories List */}
        <div className="space-y-8">
          {filteredStories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No stories found. Be the first to share!</p>
            </div>
          ) : (
            filteredStories.map((story) => (
              <div key={story._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Story Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {story.author?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900">{story.author?.name || 'Unknown User'}</h3>
                      <p className="text-sm text-gray-500">
                        {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : 'Unknown date'} • {story.state || 'Unknown location'}
                      </p>
                    </div>
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {story.category ? story.category.charAt(0).toUpperCase() + story.category.slice(1) : 'General'}
                    </div>
                  </div>

                  {/* Story Content */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{story.title || 'Untitled Story'}</h2>
                  
                  {/* Story Image */}
                  {story.image && (
                    <div className="mb-6">
                      <img
                        src={`http://localhost:5000${story.image}`}
                        alt={story.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">{story.content || 'No content available'}</p>

                  {/* Tags */}
                  {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {story.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleLike(story._id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${story.likes && story.likes.some(like => like.user === user?.id) ? 'fill-current text-red-500' : ''}`} />
                      <span>{story.likes ? story.likes.length : 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{story.comments ? story.comments.length : 0}</span>
                    </button>
                    <button 
                      onClick={() => handleSaveStory(story._id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                    >
                      <Bookmark className="h-5 w-5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;