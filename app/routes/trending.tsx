import { Outlet } from '@remix-run/react';
import { mergeMeta } from '~/utils';

import type { Handle } from '~/types/handle';
import { BreadcrumbItem } from '~/components/elements/Breadcrumb';

export const meta = mergeMeta(() => [
  { title: 'AnimeNexus - Trending' },
  { name: 'keywords', content: 'trending, trending movies, trending tv shows, trending anime' },
  { property: 'og:url', content: 'https://anime-nexus-six.vercel.app/trending/' },
  { property: 'og:title', content: 'AnimeNexus - Trending' },
  { name: 'description', content: 'Trending' },
  { property: 'og:description', content: 'Trending' },
  { name: 'twitter:title', content: 'AnimeNexus - Trending' },
  { name: 'twitter:description', content: 'Trending' },
]);

export const handle: Handle = {
  breadcrumb: ({ t }) => (
    <BreadcrumbItem to="/trending/" key="trending">
      {t('trending.title')}
    </BreadcrumbItem>
  ),
};

const Trending = () => <Outlet />;

export default Trending;
