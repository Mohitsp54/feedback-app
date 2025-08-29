import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [feedback, setFeedback] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedGroups, setExpandedGroups] = useState({
    Bug: true,
    Feature: true,
    Improvement: true
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Bug'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('q', searchTerm);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (sortOrder) params.append('sort', sortOrder);

      const response = await axios.get(`${API_URL}/feedback?${params}`);
      setFeedback(response.data);
    } catch (error) {
      toast.error('Failed to fetch feedback');
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, sortOrder]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/feedback`, formData);
      toast.success('Feedback submitted successfully!');
      setFormData({ title: '', description: '', category: 'Bug' });
      setFormErrors({});
      setIsModalOpen(false);
      fetchFeedback();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (id) => {
    try {
      await axios.put(`${API_URL}/feedback/${id}/vote`);
      fetchFeedback();
      toast.success('Vote added!');
    } catch (error) {
      toast.error('Failed to vote');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await axios.delete(`${API_URL}/feedback/${id}`);
        fetchFeedback();
        toast.success('Feedback deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete feedback');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleGroup = (category) => {
    setExpandedGroups(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const groupedFeedback = feedback.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = ['Bug', 'Feature', 'Improvement'];

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1>FeedbackHub</h1>
            <p>Share your ideas, report bugs, and help us improve</p>
          </div>
          <button 
            className="add-feedback-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Feedback
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Feedback Explorer */}
      <main className="feedback-explorer">
        {loading ? (
          <div className="loading">Loading feedback...</div>
        ) : feedback.length === 0 ? (
          <div className="empty-state">
            <h3>{searchTerm || selectedCategory !== 'All' ? 'No results found' : 'No feedback yet'}</h3>
            <p>
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filters' 
                : 'Be the first to share your feedback!'}
            </p>
          </div>
        ) : (
          <div className="feedback-groups">
            {categories.map(category => {
              const categoryFeedback = groupedFeedback[category] || [];
              if (categoryFeedback.length === 0) return null;
              
              return (
                <div key={category} className="feedback-group">
                  <div 
                    className="group-header"
                    onClick={() => toggleGroup(category)}
                  >
                    <h3>{category} ({categoryFeedback.length})</h3>
                    <span className={`chevron ${expandedGroups[category] ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </div>
                  
                  {expandedGroups[category] && (
                    <div className="feedback-list">
                      {categoryFeedback.map(item => (
                        <div key={item._id} className="feedback-item">
                          <div className="feedback-content">
                            <h4>{item.title}</h4>
                            <p className="description">
                              {item.description.length > 100 
                                ? `${item.description.substring(0, 100)}...` 
                                : item.description}
                            </p>
                            <div className="feedback-meta">
                              <span className={`category ${item.category.toLowerCase()}`}>
                                {item.category}
                              </span>
                              <span className="date">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="feedback-actions">
                            <button 
                              className="vote-btn"
                              onClick={() => handleVote(item._id)}
                            >
                              👍 {item.votes}
                            </button>
                            <button 
                              className="delete-btn"
                              onClick={() => handleDelete(item._id, item.title)}
                              title="Delete feedback"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Feedback</h2>
              <button 
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={formErrors.title ? 'error' : ''}
                />
                {formErrors.title && <span className="error-text">{formErrors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={formErrors.description ? 'error' : ''}
                />
                {formErrors.description && <span className="error-text">{formErrors.description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={formErrors.category ? 'error' : ''}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {formErrors.category && <span className="error-text">{formErrors.category}</span>}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;