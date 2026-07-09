import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Video, Folder, MessageSquare, Plus, Trash2, Edit } from 'lucide-react';
import { getArrayPayload } from '../utils/apiResponse';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [lessons, setLessons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    categoryId: '',
    topic: '',
    classDate: '',
    academicYear: '',
    language: 'Sinhala',
    thumbnailUrl: '',
    videoUrl: '',
    featured: false
  });
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [lessonsRes, categoriesRes, messagesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL || ''}/api/lessons/admin`, config),
          axios.get(`${import.meta.env.VITE_API_URL || ''}/api/categories`),
          axios.get(`${import.meta.env.VITE_API_URL || ''}/api/contact`, config)
        ]);

        setLessons(getArrayPayload(lessonsRes.data, ['lessons', 'data']));
        setCategories(getArrayPayload(categoriesRes.data, ['categories', 'data']));
        setMessages(getArrayPayload(messagesRes.data, ['messages', 'data']));
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const deleteLesson = async (id) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || ''}/api/lessons/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLessons(lessons.filter(l => l._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure? This will not delete associated lessons.')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || ''}/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(categories.filter(c => c._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || ''}/api/categories`,
        { name: newCategoryName, description: newCategoryDescription },
        config
      );
      setCategories([data, ...categories]);
      setNewCategoryName('');
      setNewCategoryDescription('');
      setShowCategoryForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const createLesson = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        ...newLesson,
        featured: newLesson.featured,
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || ''}/api/lessons`,
        payload,
        config
      );
      setLessons([data, ...lessons]);
      setNewLesson({
        title: '',
        description: '',
        categoryId: '',
        topic: '',
        classDate: '',
        academicYear: '',
        language: 'Sinhala',
        thumbnailUrl: '',
        videoUrl: '',
        featured: false
      });
      setShowLessonForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'lessons' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Video className="h-5 w-5 mr-3" /> Lessons
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'categories' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Folder className="h-5 w-5 mr-3" /> Categories
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'messages' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <MessageSquare className="h-5 w-5 mr-3" /> Inbox
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Video className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Lessons</p>
              <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="p-4 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Folder className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
            <div className="p-4 rounded-full bg-green-100 text-green-600 mr-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Unread Messages</p>
              <p className="text-2xl font-bold text-gray-900">{messages.filter(m => !m.read).length}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Views */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {activeTab === 'lessons' && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Manage Lessons</h3>
                <button onClick={() => setShowLessonForm(!showLessonForm)} className="flex items-center text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <Plus className="h-4 w-4 mr-1" /> {showLessonForm ? 'Close Form' : 'Add Lesson'}
                </button>
              </div>
              {showLessonForm && (
                <form onSubmit={createLesson} className="p-6 border-b border-gray-200 space-y-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} placeholder="Title" required className="w-full px-4 py-3 border rounded-lg" />
                    <input value={newLesson.topic} onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })} placeholder="Topic" className="w-full px-4 py-3 border rounded-lg" />
                    <select value={newLesson.categoryId} onChange={(e) => setNewLesson({ ...newLesson, categoryId: e.target.value })} required className="w-full px-4 py-3 border rounded-lg">
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                      ))}
                    </select>
                    <input value={newLesson.academicYear} onChange={(e) => setNewLesson({ ...newLesson, academicYear: e.target.value })} placeholder="Academic Year" className="w-full px-4 py-3 border rounded-lg" />
                    <input value={newLesson.classDate} onChange={(e) => setNewLesson({ ...newLesson, classDate: e.target.value })} type="date" className="w-full px-4 py-3 border rounded-lg" />
                    <input value={newLesson.language} onChange={(e) => setNewLesson({ ...newLesson, language: e.target.value })} placeholder="Language" className="w-full px-4 py-3 border rounded-lg" />
                    <input value={newLesson.videoUrl} onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })} placeholder="YouTube Embed URL" required className="w-full px-4 py-3 border rounded-lg" />
                    <input value={newLesson.thumbnailUrl} onChange={(e) => setNewLesson({ ...newLesson, thumbnailUrl: e.target.value })} placeholder="Thumbnail URL" className="w-full px-4 py-3 border rounded-lg" />
                  </div>
                  <textarea value={newLesson.description} onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })} placeholder="Description" rows="3" className="w-full px-4 py-3 border rounded-lg" />
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2"><input type="checkbox" checked={newLesson.featured} onChange={(e) => setNewLesson({ ...newLesson, featured: e.target.checked })} /> Featured</label>
                    <button type="submit" className="ml-auto px-5 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save Lesson</button>
                  </div>
                </form>
              )}
              <ul className="divide-y divide-gray-200">
                {lessons.map(lesson => (
                  <li key={lesson._id} className="p-6 hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-bold text-gray-900">{lesson.title}</h4>
                      <p className="text-sm text-gray-500">{lesson.categoryId?.name} • {lesson.topic}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="p-2 text-gray-400 hover:text-primary-600"><Edit className="h-5 w-5" /></button>
                      <button onClick={() => deleteLesson(lesson._id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="h-5 w-5" /></button>
                    </div>
                  </li>
                ))}
                {lessons.length === 0 && <li className="p-6 text-center text-gray-500">No lessons found.</li>}
              </ul>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Manage Categories</h3>
                <button onClick={() => setShowCategoryForm(!showCategoryForm)} className="flex items-center text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  <Plus className="h-4 w-4 mr-1" /> {showCategoryForm ? 'Close Form' : 'Add Category'}
                </button>
              </div>
              {showCategoryForm && (
                <form onSubmit={createCategory} className="p-6 border-b border-gray-200 space-y-4 bg-gray-50">
                  <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Category Name" required className="w-full px-4 py-3 border rounded-lg" />
                  <textarea value={newCategoryDescription} onChange={(e) => setNewCategoryDescription(e.target.value)} placeholder="Description" rows="3" className="w-full px-4 py-3 border rounded-lg" />
                  <button type="submit" className="px-5 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save Category</button>
                </form>
              )}
              <ul className="divide-y divide-gray-200">
                {categories.map(category => (
                  <li key={category._id} className="p-6 hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-bold text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="p-2 text-gray-400 hover:text-primary-600"><Edit className="h-5 w-5" /></button>
                      <button onClick={() => deleteCategory(category._id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="h-5 w-5" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Inbox</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {messages.map(msg => (
                  <li key={msg._id} className={`p-6 hover:bg-gray-50 ${!msg.read ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`text-md ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{msg.name}</h4>
                      <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{msg.message}</p>
                    <div className="text-xs text-gray-500">
                      {msg.email} {msg.phone && `• ${msg.phone}`}
                    </div>
                  </li>
                ))}
                {messages.length === 0 && <li className="p-6 text-center text-gray-500">No messages found.</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
