// src/pages/CaseEditor.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import {
  createCaseStudy,
  getCaseStudy,
  updateCaseStudy
} from '../services/api';
import MediaGallery from '../components/MediaGallery';
import Timeline from '../components/Timeline';
import ToolBadge from '../components/ToolBadge';

export default function CaseEditor() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();          // 'new' or existing ID
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [form, setForm] = useState({
    title: '',
    slug: '',
    overview: '',
    media_gallery: [],
    timeline: '',
    tools_used: '',
    outcomes: '',
  });
  const [errors, setErrors] = useState({});

  // Load existing case study for edit
  useEffect(() => {
    if (!isNew) {
      getCaseStudy(id)
        .then(res => setForm(res.data))
        .catch(() => navigate('/dashboard'));
    }
  }, [id, isNew, navigate]);

  // Redirect unauthenticated user to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Base input styling based on theme
  const baseInput = 'w-full px-3 py-2 rounded';
  const darkInput = 'bg-gray-800 text-white border-gray-700 focus:border-blue-500';
  const lightInput = 'bg-white text-black border-gray-300 focus:border-blue-500';
  const inputClass = `${baseInput} border ${theme === 'modern' ? darkInput : lightInput}`;

  // Handle generic input change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Handle comma-separated media URLs
  const handleMediaChange = e => {
    setForm(f => ({
      ...f,
      media_gallery: e.target.value
        .split(',')
        .map(u => u.trim())
        .filter(Boolean),
    }));
  };

  // Submission
  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    try {
      if (isNew) {
        await createCaseStudy(form);
      } else {
        await updateCaseStudy(id, form);
      }
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className={`text-2xl font-bold mb-6 ${theme === 'modern' ? 'text-white' : 'text-black'}`}>
        {isNew ? 'Create New Case Study' : `Edit Case Study: ${form.title}`}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.slug && <p className="text-red-500 mt-1">{errors.slug}</p>}
        </div>

        {/* Overview */}
        <div>
          <label className="block font-medium mb-1">Overview</label>
          <textarea
            name="overview"
            value={form.overview}
            onChange={handleChange}
            rows={4}
            className={inputClass}
          />
          {errors.overview && <p className="text-red-500 mt-1">{errors.overview}</p>}
        </div>

        {/* Timeline */}
        <div>
          <label className="block font-medium mb-1">Timeline</label>
          <textarea
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            rows={3}
            placeholder="One step per line"
            className={inputClass}
          />
          {errors.timeline && <p className="text-red-500 mt-1">{errors.timeline}</p>}
        </div>

        {/* Tools Used */}
        <div>
          <label className="block font-medium mb-1">Tools &amp; Technologies Used</label>
          <input
            name="tools_used"
            value={form.tools_used}
            onChange={handleChange}
            placeholder="Comma-separated"
            className={inputClass}
          />
          {errors.tools_used && <p className="text-red-500 mt-1">{errors.tools_used}</p>}
        </div>

        {/* Outcomes */}
        <div>
          <label className="block font-medium mb-1">Outcomes</label>
          <textarea
            name="outcomes"
            value={form.outcomes}
            onChange={handleChange}
            rows={3}
            className={inputClass}
          />
          {errors.outcomes && <p className="text-red-500 mt-1">{errors.outcomes}</p>}
        </div>

        {/* Media Gallery URLs */}
        <div>
          <label className="block font-medium mb-1">Media Gallery URLs</label>
          <input
            name="media_gallery"
            type="text"
            value={form.media_gallery.join(', ')}
            onChange={handleMediaChange}
            placeholder="e.g. https://..., https://..."
            className={inputClass}
          />
          {errors.media_gallery && (
            <p className="text-red-500 mt-1">{errors.media_gallery}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isNew ? 'Create Case Study' : 'Save Changes'}
        </button>
      </form>

      {/* Live Preview */}
      <div className="mt-12">
        <h2 className={`text-xl font-semibold mb-4 ${theme === 'modern' ? 'text-white' : 'text-black'}`}>
          Live Preview
        </h2>
        <section className="border p-4 rounded space-y-4 bg-opacity-50" >
          <h3 className="text-2xl font-bold">{form.title || 'Title'}</h3>
          <p>{form.overview || 'Project overview will appear here.'}</p>

          {form.tools_used && (
            <div className="flex flex-wrap">
              {form.tools_used.split(',').map(t => (
                <ToolBadge key={t.trim()} tool={t.trim()} />
              ))}
            </div>
          )}

          <MediaGallery media={form.media_gallery} />
          <Timeline entries={form.timeline} />

          {form.outcomes && (
            <div>
              <h4 className="font-semibold">Outcomes</h4>
              <p>{form.outcomes}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
