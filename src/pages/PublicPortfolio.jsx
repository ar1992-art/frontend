// src/pages/PublicPortfolio.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPortfolio,
  recordCaseStudyView
} from '../services/api';
import MediaGallery from '../components/MediaGallery';
import Timeline from '../components/Timeline';
import ToolBadge from '../components/ToolBadge';

export default function PublicPortfolio() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    getPortfolio(username)
      .then(res => {
        setPortfolio(res.data);
        setErrorCode(null);
        // Fire view analytics for each case study
        res.data.case_studies.forEach(cs => {
          recordCaseStudyView(cs.id).catch(() => {});
        });
      })
      .catch(err => setErrorCode(err.response?.status));
  }, [username]);

  if (errorCode === 404) {
    return <div className="p-6">No portfolio found for “{username}.”</div>;
  }
  if (!portfolio) {
    return <div className="p-6">Loading portfolio…</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold">{username}’s Portfolio</h1>
      {portfolio.case_studies.map(cs => (
        <section key={cs.id} className="border-b pb-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">{cs.title}</h2>
          <p className="mb-4">{cs.overview}</p>

          <div className="mb-4 flex flex-wrap">
            {cs.tools_used.split(',').map(t => (
              <ToolBadge key={t.trim()} tool={t.trim()} />
            ))}
          </div>

          <MediaGallery media={cs.media_gallery} />

          <Timeline entries={cs.timeline} />

          <div className="mt-4">
            <h3 className="font-semibold mb-1">Outcomes</h3>
            <p>{cs.outcomes}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
