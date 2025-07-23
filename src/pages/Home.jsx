import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  BookOpen,
  ShoppingBag,
  Languages,
  Map,
  Star,
  Sparkles,
  Music,
  Palette,
  Heart
} from 'lucide-react';


const Home = () => {
  const culturalCategories = [
    {
      title: 'Ancient Traditions',
      description: 'Discover timeless customs passed down through generations',
      icon: Star,
      image: 'https://heenatours.in/blog/wp-content/uploads/2017/06/kerala-Culture.jpg',
      path: '/explore/traditions'
    },
    {
      title: 'Vibrant Festivals',
      description: 'Experience colorful celebrations across India',
      icon: Sparkles,
      image: 'https://3.bp.blogspot.com/-gK6rMz0PWuc/WmrJJkrMciI/AAAAAAAAAEg/h2SNC0pDNQw8r31fXfqqdm7ScTeJGfaqQCPcBGAYYCw/s1600/festivals-of-india.jpg',
      path: '/explore/festivals'
    },
    {
      title: 'Classical Music',
      description: 'Listen to melodious ragas and folk songs',
      icon: Music,
      image: 'https://i.ytimg.com/vi/AAZ7xMSKAS8/maxresdefault.jpg',
      path: '/explore/music'
    },
    {
      title: 'Folk Dance Forms',
      description: 'Witness graceful movements and rhythmic expressions',
      icon: Compass,
      image: 'https://www.authenticindiatours.com/app/uploads/2021/02/Customs-and-traditions-in-Indian-culture-Kathakali-1400x550-c-default.jpg',
      path: '/explore/dance'
    },
    {
      title: 'Exquisite Arts & Crafts',
      description: 'Marvel at intricate handicrafts and paintings',
      icon: Palette,
      image: 'https://1.bp.blogspot.com/-2bpWqCuv-fs/UrAeYiiEnmI/AAAAAAAAOvg/-b4tF7LKdi4/s1600/pottery+bengal.jpg',
      path: '/explore/arts'
    },
    {
      title: 'Sacred Rituals',
      description: 'Understand spiritual ceremonies and practices',
      icon: Heart,
      image: 'https://getethnic.com/wp-content/uploads/2020/05/Indian-Wedding-Customs-Bidai-RamitBatra-06-1-1.jpg',
      path: '/explore/rituals'
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Share Stories',
      description: 'Share your cultural experiences and read others\' stories'
    },
    {
      icon: ShoppingBag,
      title: 'Cultural Marketplace',
      description: 'Buy and sell authentic cultural products'
    },
    {
      icon: Languages,
      title: 'Learn Languages',
      description: 'Master regional languages with interactive lessons'
    },
    {
      icon: Map,
      title: 'Plan Itinerary',
      description: 'Create your cultural exploration journey'
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-pink-600 to-purple-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-1"></div>
        <div className="absolute inset-0 bg-[url('https://www.privatetour.com/images/india/rich-culture-and-heritage-of-india-with-golden-triangle/rich-culture-and-heritage-of-india-with-golden-triangle-3-2018-12-13.jpg')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Discover India's
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Rich Heritage
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect with India's diverse cultural tapestry. Explore traditions, share stories, 
            learn languages, and discover authentic cultural products from every corner of our incredible nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="bg-white text-yellow-700 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Exploring
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Cultural Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover India's Rich Cultural Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immerse yourself in the diverse traditions, festivals, arts, music, dance, and rituals that make India truly incredible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {culturalCategories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <category.icon className="h-6 w-6 mr-2 text-yellow-400" />
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Additional Cultural Highlights */}
          <div className="bg-pink-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cultural Highlights</h3>
              <p className="text-gray-600">Explore the essence of Indian culture through these key elements</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">37</div>
                <div className="text-sm text-gray-600">States & Territories</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-pink-600 mb-1">1600+</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-1">200+</div>
                <div className="text-sm text-gray-600">Dance Forms</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">5000+</div>
                <div className="text-sm text-gray-600">Festivals</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">100+</div>
                <div className="text-sm text-gray-600">Art Forms</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-indigo-600 mb-1">Ancient</div>
                <div className="text-sm text-gray-600">Traditions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to explore and connect with Indian culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="bg-pink-300 p-4 rounded-2xl inline-flex mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[url('https://www.usphsociety.org/wp-content/uploads/2018/05/Filipiniana-POPDC.jpg')] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Start Your Cultural Journey?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of cultural enthusiasts exploring India's incredible heritage
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-yellow-800 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;