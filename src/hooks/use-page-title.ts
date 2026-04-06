import { useEffect } from 'react';

const BASE_TITLE = 'Sparkling Bear';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${BASE_TITLE}`
      : `${BASE_TITLE} – Motorcycle Accessories & Riding Gear | Bangalore`;
  }, [title]);
}
