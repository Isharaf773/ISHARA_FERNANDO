import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, Calendar, Download, Tag, ArrowLeft } from 'lucide-react';

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const studentToken = localStorage.getItem('studentToken');
    const adminToken = localStorage.getItem('adminToken');
    if (!studentToken && !adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/lessons/${id}`);
        setLesson(data);
      } catch {
        setError('Lesson not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-20 text-center">Loading lesson details...</div>;
  if (error || !lesson) return <div className="min-h-screen pt-20 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm font-medium text-gray-500">
            <Link to="/lessons" className="hover:text-primary-600 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              All Lessons
            </Link>
            <span className="mx-2 flex items-center">
              <ChevronRight className="h-4 w-4" />
            </span>
            <Link to={`/lessons?category=${lesson.categoryId?._id}`} className="hover:text-primary-600">
              {lesson.categoryId?.name}
            </Link>
            <span className="mx-2 flex items-center">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span className="text-gray-900 truncate max-w-xs">{lesson.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3">
            {/* Video Player Container */}
            <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9 relative mb-6" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>

            {/* Lesson Title and Meta */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-6 pb-6 border-b border-gray-100">
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-1 text-primary-500" />
                  {lesson.topic || 'General'}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-primary-500" />
                  {lesson.classDate ? new Date(lesson.classDate).toLocaleDateString() : 'N/A'}
                </span>
                <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md font-medium text-xs">
                  {lesson.academicYear || 'General Year'}
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-medium text-xs">
                  {lesson.language}
                </span>
              </div>

              <div className="prose max-w-none text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About this lesson</h3>
                <p className="whitespace-pre-line">{lesson.description || 'No description provided.'}</p>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-1/3">
            {/* Downloadable Resources */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b border-gray-100 pb-2">
                <Download className="h-5 w-5 mr-2 text-primary-600" />
                Resources & PDFs
              </h3>
              
              {lesson.attachments && lesson.attachments.length > 0 ? (
                <ul className="space-y-3">
                  {lesson.attachments.map((resource, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="bg-red-100 p-2 rounded text-red-600 flex-shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {resource.title || `Resource ${index + 1}`}
                        </span>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium flex-shrink-0 ml-2"
                      >
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 text-sm text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  No attachments available for this lesson.
                </div>
              )}

              {/* Tags Area */}
              {lesson.tags && lesson.tags.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {lesson.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Contact Box */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-sm p-6 text-white mb-6">
              <h3 className="text-lg font-bold mb-2">Need help with this topic?</h3>
              <p className="text-primary-100 text-sm mb-4">Contact tutor directly via WhatsApp to clarify any doubts.</p>
              <a 
                href="https://wa.me/94764726172" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-white text-primary-700 py-2 rounded-md font-bold hover:bg-gray-50 transition-colors"
              >
                WhatsApp Tutor
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Extracted simple icon for the resource item
const FileText = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default LessonDetail;
