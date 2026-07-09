import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, PlayCircle } from 'lucide-react';
import { getArrayPayload } from '../utils/apiResponse';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const studentToken = localStorage.getItem('studentToken');
    const adminToken = localStorage.getItem('adminToken');
    if (!studentToken && !adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setCategoryFilter(cat);
    }
  }, [location]);

  useEffect(() => {
    const fetchSelectData = async () => {
      try {
        const catRes = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/categories`);
        setCategories(getArrayPayload(catRes.data, ['categories', 'data']));
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchSelectData();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        let url = `${import.meta.env.VITE_API_URL || ''}/api/lessons?`;
        if (searchTerm) url += `search=${searchTerm}&`;
        if (categoryFilter) url += `category=${categoryFilter}&`;
        if (yearFilter) url += `year=${yearFilter}&`;

        const { data } = await axios.get(url);
        setLessons(getArrayPayload(data, ['lessons', 'data']));
      } catch (error) {
        console.error('Error fetching lessons', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [searchTerm, categoryFilter, yearFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect dependency change
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-primary-800 rounded-2xl p-8 md:p-12 mb-10 text-white flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Lessons Library</h1>
            <p className="text-primary-100 max-w-xl">Find all classes, paper discussions, and revision materials accurately categorized for your convenience.</p>
          </div>
          <BookOpenIcon />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title or topic..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  navigate('/lessons'); // clear query param if changed
                }}
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="2024 A/L">2024 A/L</option>
                <option value="2025 A/L">2025 A/L</option>
                <option value="2026 A/L">2026 A/L</option>
              </select>
            </div>
          </form>
        </div>

        {/* Lessons List */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading lessons...</div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-20">
            <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No lessons found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchTerm(''); setCategoryFilter(''); setYearFilter(''); navigate('/lessons'); }}
              className="mt-4 text-primary-600 font-medium hover:text-primary-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div key={lesson._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {lesson.thumbnailUrl && <img src={lesson.thumbnailUrl} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                  {!lesson.thumbnailUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <PlayCircle className="h-16 w-16 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <PlayCircle className="text-white opacity-0 group-hover:opacity-100 h-16 w-16 transition-opacity shadow-sm rounded-full" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                    {lesson.categoryId?.name}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-primary-600 font-bold uppercase tracking-wider">{lesson.topic}</span>
                    <span className="text-xs text-gray-500 font-medium">{lesson.academicYear || 'General'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    <Link to={`/lessons/${lesson._id}`} className="hover:text-primary-600">{lesson.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{lesson.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BookOpenIcon = () => (
  <svg className="hidden md:block h-24 w-24 text-primary-400 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

export default Lessons;
