// src/pages/CaseStudyPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import API from '../services/api';
import MediaGallery from '../components/MediaGallery';
import Timeline from '../components/Timeline';
import ToolBadge from '../components/ToolBadge';

export default function CaseStudyPage() {
  const { username, slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    // Fetch the portfolio then pick out the matching case study
    API.get(`portfolio/${username}/`)
      .then(res => {
        const found = res.data.case_studies.find(c => c.slug === slug);
        if (found) {
          setCaseStudy(found);
        } else {
          setErrorCode(404);
        }
      })
      .catch(err => {
        setErrorCode(err.response?.status || 500);
      });
  }, [username, slug]);

  if (errorCode === 404) {
    return <div className="p-6">Case study “{slug}” not found for user {username}.</div>;
  }
  if (errorCode) {
    return <div className="p-6">Error loading case study (code: {errorCode}).</div>;
  }
  if (!caseStudy) {
    return <div className="p-6">Loading case study…</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">{caseStudy.title}</h1>
      <p className="italic mb-4">@{username}</p>
      <p className="mb-4">{caseStudy.overview}</p>

      <div className="flex flex-wrap mb-4">
        {caseStudy.tools_used.split(',').map(t => (
          <ToolBadge key={t.trim()} tool={t.trim()} />
        ))}
      </div>

      <MediaGallery media={caseStudy.media_gallery} />

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Timeline</h2>
        <Timeline entries={caseStudy.timeline} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Outcomes</h2>
        <p>{caseStudy.outcomes}</p>
      </div>
    </div>
  );
}
