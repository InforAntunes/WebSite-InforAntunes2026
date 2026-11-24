import { useTranslation } from 'react-i18next';
import ProductPage from './ProductPage';

export default function EticadataPage() {
  const { t } = useTranslation('solutions');
  const { t: tc } = useTranslation('common');
  return (
    <ProductPage product={{
      name: 'Eticadata',
      category: t('eticadata.category'),
      tagline: t('eticadata.tagline'),
      description: t('eticadata.description'),
      heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop&auto=format',
      accentColor: '#005FA8',
      breadcrumb: [
        { label: tc('breadcrumb.solutions'), path: '/solucoes' },
        { label: tc('breadcrumb.software'), path: '/solucoes/softwares' },
        { label: 'Eticadata', path: '/solucoes/softwares/eticadata' },
      ],
      featuresTitle: t('eticadata.featuresTitle'),
      sectorsTitle: t('eticadata.sectorsTitle'),
      ctaTitle: `${t('eticadata.ctaTitle')}`,
      ctaDesc: t('eticadata.ctaDesc'),
      features: t('eticadata.features', { returnObjects: true }) as string[],
      applications: t('eticadata.applications', { returnObjects: true }) as string[],
    }} />
  );
}
