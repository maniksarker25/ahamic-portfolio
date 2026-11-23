import React from 'react';

/**
 * Re-mounts on every navigation, so the CSS fade-in replays per page.
 * Pure CSS: content is visible as soon as it is painted, without waiting for JavaScript.
 */
export default function Template({ children }: {children: React.ReactNode;}) {
  return <div className="animate-page-in">{children}</div>;
}
