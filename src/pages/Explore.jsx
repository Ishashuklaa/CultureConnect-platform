import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LanguageTranslator from '../components/LanguageTranslator';
import { MapPin, Plus, Filter, Search, Star, Calendar, Music, Palette, Users, BookOpen, Heart, Sparkles } from 'lucide-react';

const Explore = () => {
  const { user, api } = useAuth();
  const [selectedState, setSelectedState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [culturalData, setCulturalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Ladakh', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu',
    'Delhi', 'Lakshadweep', 'Puducherry'
  ];

  const categories = [
    { id: 'festivals', name: 'Festivals', icon: Sparkles, color: 'from-pink-500 to-rose-500' },
    { id: 'dance', name: 'Folk Dance', icon: Users, color: 'from-purple-500 to-indigo-500' },
    { id: 'music', name: 'Music', icon: Music, color: 'from-blue-500 to-cyan-500' },
    { id: 'arts', name: 'Arts & Crafts', icon: Palette, color: 'from-green-500 to-emerald-500' },
    { id: 'traditions', name: 'Traditions', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { id: 'languages', name: 'Languages', icon: BookOpen, color: 'from-red-500 to-pink-500' }
  ];

  // Sample cultural data - in production this would come from your API
  const sampleCulturalData = {
    'Rajasthan': {
      festivals: [
        {
          name: 'Desert Festival',
          description: 'A vibrant celebration of Rajasthani culture in the golden city of Jaisalmer',
          image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/01/16154946/Jaisalmer-Desert-Festival-1600x900.jpg',
          location: 'Jaisalmer',
          bestTime: 'February',
          significance: 'Celebrates the rich cultural heritage of the Thar Desert'
        },
        {
          name: 'Pushkar Camel Fair',
          description: 'World famous camel trading fair with cultural performances',
          image: 'https://www.travels2rajasthan.com/uploads/98017_Ps.jpg',
          location: 'Pushkar',
          bestTime: 'November',
          significance: 'Ancient trading tradition combined with spiritual significance'
        }
      ],
      dance: [
        {
          name: 'Ghoomar',
          description: 'Traditional folk dance performed by women in flowing ghagras',
          image: 'https://i.pinimg.com/originals/61/61/5d/61615dcd7ae1155da054a75da73e2ede.jpg',
          location: 'Throughout Rajasthan',
          bestTime: 'Year-round',
          significance: 'Symbol of grace and femininity in Rajasthani culture'
        }
      ],
      music: [
        {
          name: 'Manganiyar Music',
          description: 'Hereditary musicians known for their soulful folk songs',
          image: 'https://imvoyager.com/wp-content/uploads/2022/09/Manganiar-Community-%E2%80%93-Rajasthani-Folk-Musicians.jpeg',
          location: 'Jaisalmer, Barmer',
          bestTime: 'Year-round',
          significance: 'Preserves ancient musical traditions of the desert'
        }
      ],
      arts: [
        {
          name: 'Miniature Paintings',
          description: 'Intricate paintings depicting royal life and mythology',
          image: 'http://4.bp.blogspot.com/-tuZiHR6-uSY/UlOk3_b2JWI/AAAAAAAARgI/hJQrFsO6BmM/s1600/Rajasthani+Miniature+Paintings1.jpg',
          location: 'Udaipur, Jaipur',
          bestTime: 'Year-round',
          significance: 'Royal artistic tradition dating back centuries'
        }
      ]
    },
    'Kerala': {
      festivals: [
        {
          name: 'Onam',
          description: 'Harvest festival celebrating the return of King Mahabali',
          image: 'https://keralaevents.in/wp-content/uploads/2022/08/onam-2022.jpg',
          location: 'Throughout Kerala',
          bestTime: 'August-September',
          significance: 'Most important festival of Kerala showcasing unity and prosperity'
        }
      ],
      dance: [
        {
          name: 'Kathakali',
          description: 'Classical dance-drama with elaborate costumes and makeup',
          image: 'https://livesinasia.com/wp-content/uploads/2020/03/Para1.jpg',
          location: 'Throughout Kerala',
          bestTime: 'Year-round',
          significance: 'Ancient art form combining dance, drama, and music'
        }
      ],
      traditions: [
        {
          name: 'Ayurveda',
          description: 'Ancient system of natural healing and wellness',
          image: 'https://mindisthemaster.com/wp-content/uploads/2019/06/What-is-Ayurveda-and-How-Does-It-Work.jpg',
          location: 'Throughout Kerala',
          bestTime: 'Year-round',
          significance: 'Traditional medicine system promoting holistic health'
        }
      ]
    },
    'Maharashtra': {
      festivals: [
        {
          name: 'Ganesh Chaturthi',
          description: 'Grand celebration of Lord Ganesha with elaborate processions',
          image: 'https://images.news18.com/ibnlive/uploads/2022/08/ganesh-chaturthi-2022-rituals.jpg?impolicy=website&width=0&height=0',
          location: 'Mumbai, Pune',
          bestTime: 'August-September',
          significance: 'Celebrates wisdom and prosperity, brings communities together'
        },
        {
          name: 'Gudi Padwa',
          description: 'Marathi New Year celebrated with traditional decorations',
          image: 'https://media.assettype.com/outlookindia/2024-04/e01dd8ed-09ab-4a1e-a8ab-31d99c9f4040/gudi_padwa.jpg?w=1200&amp;ar=40:21&amp;auto=format%2Ccompress&amp;ogImage=true&amp;mode=crop&amp;enlarge=true&amp;overlay=false&amp;overlay_position=bottom&amp;overlay_width=100',
          location: 'Throughout Maharashtra',
          bestTime: 'March-April',
          significance: 'Marks the beginning of the new year and spring season'
        }
      ],
      dance: [
        {
          name: 'Lavani',
          description: 'Traditional folk dance known for its powerful rhythm',
          image: 'https://im.indiatimes.in/content/2023/Feb/bccl4_63f499e605f3c.jpg?w=725&h=487&cc=1',
          location: 'Throughout Maharashtra',
          bestTime: 'Year-round',
          significance: 'Expresses various emotions and social themes'
        }
      ],
      arts: [
        {
          name: 'Warli Painting',
          description: 'Tribal art form using geometric patterns',
          image: 'https://i1.wp.com/roomfruit.com/wp-content/uploads/2020/04/warli-painting-on-canvas-amazon.jpg?resize=1024%2C799&ssl=1',
          location: 'Thane, Nashik',
          bestTime: 'Year-round',
          significance: 'Ancient tribal art depicting daily life and nature'
        }
      ]
    },
    'West Bengal': {
      festivals: [
        {
          name: 'Durga Puja',
          description: 'Grand celebration of Goddess Durga with artistic pandals',
          image: 'https://images.hindustantimes.com/img/2022/09/30/1600x900/durga_puja_1664502025274_1664502025551_1664502025551.jpg',
          location: 'Kolkata, throughout Bengal',
          bestTime: 'September-October',
          significance: 'Celebrates the victory of good over evil'
        },
        {
          name: 'Kali Puja',
          description: 'Worship of Goddess Kali with elaborate rituals',
          image: 'https://ritualsmart.com/wp-content/uploads/2015/09/Kali-Puja.jpg',
          location: 'Throughout West Bengal',
          bestTime: 'October-November',
          significance: 'Celebrates divine feminine power and protection'
        }
      ],
      dance: [
        {
          name: 'Rabindra Nritya',
          description: 'Dance form based on Rabindranath Tagore\'s compositions',
          image: 'https://www.gosahin.com/go/p/c/t1/1520511092_Rabindra-nritya2.jpg',
          location: 'Kolkata, Santiniketan',
          bestTime: 'Year-round',
          significance: 'Combines poetry, music, and dance in perfect harmony'
        }
      ],
      music: [
        {
          name: 'Rabindra Sangeet',
          description: 'Songs composed by Nobel laureate Rabindranath Tagore',
          image: 'https://i0.wp.com/urbanasian.com/wp-content/uploads/2017/07/unnamed-6.jpg?resize=300%2C200&ssl=1',
          location: 'Throughout West Bengal',
          bestTime: 'Year-round',
          significance: 'Philosophical and spiritual songs that touch the soul'
        }
      ]
    },
    'Tamil Nadu': {
      festivals: [
        {
          name: 'Pongal',
          description: 'Harvest festival celebrating prosperity and gratitude',
          image: 'https://www.tusktravel.com.mx/blog/wp-content/uploads/2024/12/Pongal-Festival-02.jpg',
          location: 'Throughout Tamil Nadu',
          bestTime: 'January',
          significance: 'Thanks giving to nature and cattle for good harvest'
        }
      ],
      dance: [
        {
          name: 'Bharatanatyam',
          description: 'Classical dance form with intricate expressions and movements',
          image: 'https://3.bp.blogspot.com/-4U3eMLoTsgQ/WFD3zxm0bII/AAAAAAAAuAE/h69CnnW6gGAcbVl92kHhN4JtqaiiRSupACLcB/s1600/bharatha+natyam.JPG',
          location: 'Chennai, Thanjavur',
          bestTime: 'Year-round',
          significance: 'Ancient temple dance expressing devotion and stories'
        }
      ],
      arts: [
        {
          name: 'Tanjore Painting',
          description: 'Classical painting style with gold foil and precious stones',
          image: 'http://webneel.com/daily/sites/default/files/images/daily/08-2015/15-tanjore-painting-durga.jpg',
          location: 'Thanjavur',
          bestTime: 'Year-round',
          significance: 'Royal art form depicting Hindu deities and mythology'
        }
      ]
    },
    'Gujarat': {
      festivals: [
        {
          name: 'Navratri',
          description: 'Nine nights of dance, music, and celebration',
          image: 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/09/navratri-1664009877.jpg',
          location: 'Ahmedabad, Vadodara',
          bestTime: 'September-October',
          significance: 'Celebrates divine feminine energy through dance and devotion'
        }
      ],
      dance: [
        {
          name: 'Garba',
          description: 'Traditional folk dance performed during Navratri',
          image: 'https://www.gujarattourism.com/content/dam/gujrattourism/images/home_page/Navratri.jpg',
          location: 'Throughout Gujarat',
          bestTime: 'September-October',
          significance: 'Circular dance representing the cycle of life'
        }
      ],
      arts: [
        {
          name: 'Bandhani',
          description: 'Traditional tie-dye textile art',
          image: 'http://peachmode.com/cdn/shop/articles/all-you-need-to-know-about-bandhani-peachmode.jpg?v=1668998973',
          location: 'Kutch, Jamnagar',
          bestTime: 'Year-round',
          significance: 'Ancient dyeing technique creating beautiful patterns'
        }
      ]
    },
    'Karnataka': {
      festivals: [
        {
          name: 'Mysore Dasara',
          description: 'Royal festival with grand processions and cultural programs',
          image: 'https://www.tusktravel.com/blog/wp-content/uploads/2022/04/Mysore-Dasara-Karnataka3.jpg',
          location: 'Mysore',
          bestTime: 'September-October',
          significance: 'Celebrates victory of good over evil with royal grandeur'
        }
      ],
      dance: [
        {
          name: 'Yakshagana',
          description: 'Traditional theater combining dance, music, and dialogue',
          image: 'https://karnatakatourism.org/wp-content/uploads/2020/05/Yakshagana-2.jpg',
          location: 'Coastal Karnataka',
          bestTime: 'Year-round',
          significance: 'Ancient art form narrating mythological stories'
        }
      ],
      music: [
        {
          name: 'Carnatic Music',
          description: 'Classical music tradition of South India',
          image: 'https://heritage.prssv.org/wp-content/uploads/2021/06/Carnatic-Music-Traditions.jpg',
          location: 'Bangalore, Mysore',
          bestTime: 'Year-round',
          significance: 'Spiritual music tradition with complex ragas and rhythms'
        }
      ]
    },
    'Assam': {
      festivals: [
        {
          name: 'Bihu',
          description: 'New Year festival celebrating spring and harvest',
          image: 'https://www.utsavpedia.com/wp-content/uploads/2013/07/AGSU-MUKALI-BIHU3.jpg',
          location: 'Throughout Assam',
          bestTime: 'April',
          significance: 'Celebrates new beginnings and agricultural prosperity'
        }
      ],
      dance: [
        {
          name: 'Bihu Dance',
          description: 'Folk dance performed during Bihu festival',
          image: 'https://adventurerivercruises.com/wp-content/uploads/2018/11/Experience-Bihu-Dance-Assam-2.jpg',
          location: 'Throughout Assam',
          bestTime: 'April',
          significance: 'Expresses joy and celebration of spring season'
        }
      ],
      arts: [
        {
          name: 'Assam Silk',
          description: 'Traditional silk weaving including Muga and Pat silk',
          image: 'https://i.pinimg.com/originals/fe/66/db/fe66dbc62637b2cfe607944917f681d4.jpg',
          location: 'Sualkuchi',
          bestTime: 'Year-round',
          significance: 'Ancient silk tradition producing golden Muga silk'
        }
      ]
    },
    'Odisha': {
      festivals: [
        {
          name: 'Jagannath Rath Yatra',
          description: 'Grand chariot festival of Lord Jagannath',
          image: 'https://www.dailypioneer.com/uploads/2023/story/images/big/thousands-of-devotees-arrive-in-puri-for-lord-jagannath-s--rath-yatra--2023-06-20.jpg',
          location: 'Puri',
          bestTime: 'June-July',
          significance: 'One of the most sacred Hindu festivals'
        }
      ],
      dance: [
        {
          name: 'Odissi',
          description: 'Classical dance form with graceful movements',
          image: 'https://www.orissapost.com/wp-content/uploads/2018/09/Bhanjakala-Mandap-Re-Ayoujita-Odissi-Dance-Festival-Re-Nrutya-Paribesana-Karuchanty-Nrutyayan-Anustan-Ra-Kalakarmane-16.jpg',
          location: 'Bhubaneswar, Puri',
          bestTime: 'Year-round',
          significance: 'Ancient temple dance expressing devotion and mythology'
        }
      ],
      arts: [
        {
          name: 'Pattachitra',
          description: 'Traditional cloth painting depicting mythological themes',
          image: 'https://images.hindustantimes.com/img/2023/01/20/1600x900/WhatsApp_Imag_1674206063448_1674206063635_1674206063635.jpg',
          location: 'Raghurajpur',
          bestTime: 'Year-round',
          significance: 'Ancient art form used in temple decorations'
        }
      ]
    },
    'Punjab': {
      festivals: [
        {
          name: 'Baisakhi',
          description: 'Harvest festival marking the Sikh New Year',
          image: 'https://img.republicworld.com/all_images/happy-baisakhi-2025-1744460413997-16_9.webp',
          location: 'Throughout Punjab',
          bestTime: 'April',
          significance: 'Celebrates harvest and Sikh heritage'
        }
      ],
      dance: [
        {
          name: 'Bhangra',
          description: 'Energetic folk dance celebrating harvest and joy',
          image: 'https://www.dancewithme.in/wp-content/uploads/2022/01/Bhangra-The-Most-Energetic-Dance-Form-Dance-With-Me-India.jpg',
          location: 'Throughout Punjab',
          bestTime: 'Year-round',
          significance: 'Expression of Punjabi culture and celebration'
        }
      ]
    }
  };

  useEffect(() => {
    setCulturalData(sampleCulturalData);
  }, []);

  const addToItinerary = async (item, state, category) => {
    if (!user) {
      alert('Please login to add items to your itinerary');
      return;
    }

    try {
      console.log('Adding to itinerary:', { item, state, category });
      
      const itineraryData = {
        culturalSite: item.name,
        state: state,
        type: category,
        location: item.location || '',
        bestTime: item.bestTime || '',
        description: item.description || ''
      };

      console.log('Itinerary data:', itineraryData);

      const response = await api.post('/itinerary', itineraryData);
      console.log('Response:', response.data);
      alert(`${item.name} added to your itinerary!`);
    } catch (error) {
      console.error('Error adding to itinerary:', error);
      console.error('Error response:', error.response?.data);
      if (error.response?.status === 400) {
        alert(error.response.data.message || 'This item is already in your itinerary!');
      } else {
        alert(`Error adding to itinerary: ${error.response?.data?.message || 'Please try again.'}`);
      }
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Star;
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'from-gray-500 to-gray-600';
  };

  const filteredData = () => {
    let data = culturalData;

    // Filter by selected state
    if (selectedState) {
      data = { [selectedState]: data[selectedState] || {} };
    }

    // Filter by category
    if (selectedCategory) {
      const filteredByCategory = {};
      Object.keys(data).forEach(state => {
        if (data[state][selectedCategory]) {
          filteredByCategory[state] = { [selectedCategory]: data[state][selectedCategory] };
        }
      });
      data = filteredByCategory;
    }

    // Filter by search term
    if (searchTerm) {
      const filteredBySearch = {};
      Object.keys(data).forEach(state => {
        const stateData = {};
        Object.keys(data[state]).forEach(category => {
          const filteredItems = data[state][category].filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredItems.length > 0) {
            stateData[category] = filteredItems;
          }
        });
        if (Object.keys(stateData).length > 0) {
          filteredBySearch[state] = stateData;
        }
      });
      data = filteredBySearch;
    }

    return data;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-1"></div>
        <div className="absolute inset-0 bg-[url('https://as2.ftcdn.net/v2/jpg/01/86/20/71/1000_F_186207107_svxrRWR71UYPYUzzB3Qh7hMtbSppyE5h.jpg')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore India's
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Cultural Treasures
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Discover festivals, arts, dance, music, traditions, and languages from every state. 
            Plan your cultural journey across incredible India.
          </p>
          
          {/* Language Translator */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
              <LanguageTranslator />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Cultural Interest</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'border-pink-900 bg-pink-900 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${category.color} p-3 rounded-xl inline-flex mb-3`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search festivals, arts, dance, music..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 min-w-[200px]"
            >
              <option value="">All States</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setSelectedState('');
                setSelectedCategory('');
                setSearchTerm('');
              }}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Clear All
            </button>
          </div>
        </div>

        {/* Cultural Content */}
        <div className="space-y-12">
          {Object.keys(filteredData()).length === 0 ? (
            <div className="text-center py-16">
              <MapPin className="mx-auto h-20 w-20 text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Cultural Content Found</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Try adjusting your filters or search terms to discover amazing cultural experiences across India.
              </p>
            </div>
          ) : (
            Object.entries(filteredData()).map(([state, stateData]) => (
              <div key={state} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* State Header */}
                <div className="bg-[url('https://i.pinimg.com/originals/24/3b/bb/243bbbff3d8c832bb89f3e92d9f10962.jpg')] p-8 text-black">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-8 w-8 mr-4" />
                      <div>
                        <h2 className="text-4xl font-bold">{state}</h2>
                        <p className="text-xl opacity-90">
                          {Object.keys(stateData).length} cultural categor{Object.keys(stateData).length !== 1 ? 'ies' : 'y'} to explore
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories for this state */}
                <div className="p-8">
                  {Object.entries(stateData).map(([category, items]) => (
                    <div key={category} className="mb-12 last:mb-0">
                      <div className="flex items-center mb-6">
                        <div className={`bg-gradient-to-r ${getCategoryColor(category)} p-3 rounded-xl mr-4`}>
                          {React.createElement(getCategoryIcon(category), { className: "h-6 w-6 text-white" })}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 capitalize">{category}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <div className="aspect-w-16 aspect-h-9">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                            <div className="p-6">
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                              <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                              
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{item.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>Best time: {item.bestTime}</span>
                                </div>
                              </div>

                              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                                <p className="text-sm text-blue-800">
                                  <strong>Cultural Significance:</strong> {item.significance}
                                </p>
                              </div>

                              <button
                                onClick={() => addToItinerary(item, state, category)}
                                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center"
                              >
                                <Plus className="h-5 w-5 mr-2" />
                                Add to Itinerary
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-[url('https://www.usphsociety.org/wp-content/uploads/2018/05/Filipiniana-POPDC.jpg')] rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Cultural Journey?</h2>
          <p className="text-xl mb-6 opacity-90">
            Plan your itinerary and explore India's incredible cultural diversity across all {Object.keys(sampleCulturalData).length} states and territories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-800 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-all transform hover:scale-105">
              View My Itinerary
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-800 transition-all transform hover:scale-105">
              Explore All {indianStates.length} States & Territories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;