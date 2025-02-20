import React, { useEffect, useState } from 'react';

// Custom Include component
export default function Include({ src }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => setContent(`⚠️ Error loading: ${src}`));
  }, [src]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
