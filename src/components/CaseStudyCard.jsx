// src/components/CaseStudyCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { recordCaseStudyClick } from '../services/api';

export default function CaseStudyCard({ study, username }) {
  const handleClick = () => recordCaseStudyClick(study.id).catch(() => {});

  return (
    <Link to={`/${username}/${study.slug}`} onClick={handleClick}>
      <div className="p-4 border rounded-lg hover:shadow space-y-2">
        <h3 className="text-xl font-bold">{study.title}</h3>
        <p className="text-sm text-gray-500">by {study.owner_username}</p>
        <p className="text-gray-600">
          {study.overview.length > 100
            ? `${study.overview.slice(0, 100)}…`
            : study.overview}
        </p>
      </div>
    </Link>
  );
}
