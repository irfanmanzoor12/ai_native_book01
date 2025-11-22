import React from 'react';
import clsx from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/DocItem/Content';
import LessonTabs from '../../../components/LessonTabs';

// Get lessonId from frontmatter or generate from slug
function getLessonId(metadata: any): string | null {
  // Check if lessonId is set in frontmatter
  if (metadata.frontMatter?.lessonId) {
    return metadata.frontMatter.lessonId;
  }

  // Check if this doc should have tabs enabled
  if (metadata.frontMatter?.enableTabs === false) {
    return null;
  }

  // Use slug as fallback lessonId
  return metadata.slug || metadata.id || null;
}

function useSyntheticTitle(): string | null {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({ children }: Props): JSX.Element {
  const { metadata, frontMatter } = useDoc();
  const syntheticTitle = useSyntheticTitle();
  const lessonId = getLessonId(metadata);

  // Check if tabs should be enabled (default: true for docs)
  const enableTabs = frontMatter.enableTabs !== false && lessonId;

  return (
    <div className={clsx('theme-doc-markdown', 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}

      {enableTabs ? (
        <LessonTabs
          lessonId={lessonId}
          originalContent={<MDXContent>{children}</MDXContent>}
        />
      ) : (
        <MDXContent>{children}</MDXContent>
      )}
    </div>
  );
}
