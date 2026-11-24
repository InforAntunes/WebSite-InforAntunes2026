import { useTranslation } from 'react-i18next';
import ProductPage from './ProductPage';

export default function CompactPage() {
  const { t } = useTranslation('solutions');
  const { t: tc } = useTranslation('common');
  return (
    <ProductPage product={{
      name: 'Caixa Automática Compact',
      category: t('compact.category'),
      tagline: t('compact.tagline'),
      description: t('compact.description'),
      heroImage: 'https://images.unsplash.com/photo-1615775036480-f0cff4e2ff6d?w=800&h=500&fit=crop&auto=format',
      accentColor: '#073B63',
      leadForm: 'payments',
      leadFormSource: 'compact',
      breadcrumb: [
        { label: tc('breadcrumb.solutions'), path: '/solucoes' },
        { label: tc('breadcrumb.payments'), path: '/solucoes/pagamentos' },
        { label: 'Caixa Automática Compact', path: '/solucoes/pagamentos/compact' },
      ],
      featuresTitle: t('compact.featuresTitle'),
      ctaTitle: t('compact.ctaTitle'),
      ctaDesc: t('compact.ctaDesc'),
      features: t('compact.features', { returnObjects: true }) as string[],
      applications: t('compact.applications', { returnObjects: true }) as string[],
    }} />
  );
}
