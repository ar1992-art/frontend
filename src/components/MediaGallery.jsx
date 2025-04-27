import React from 'react';

export default function MediaGallery({ media }) {
  if (!Array.isArray(media) || media.length === 0) {
    return <p className="italic text-gray-500">No media provided.</p>;
  }

  const renderItem = (url, i) => {
    // YouTube embed
    const ytMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/
    );
    if (ytMatch) {
      const vid = ytMatch[1];
      return (
        <iframe
          key={i}
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${vid}`}
          title="YouTube video"
          allowFullScreen
          className="rounded"
        />
      );
    }
    // video file
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          key={i}
          controls
          src={url}
          className="w-full h-auto rounded"
        />
      );
    }
    // image
    return (
      <img
        key={i}
        src={url}
        alt=""
        className="object-cover w-full h-48 rounded"
      />
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {media.map(renderItem)}
    </div>
  );
}
