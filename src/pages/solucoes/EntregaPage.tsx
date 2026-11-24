import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function EntregaPage() {
  const { t } = useTranslation('solutions');
  const { t: tc } = useTranslation('common');

  const steps = t('entrega.steps', { returnObjects: true }) as Array<{ num: string; title: string; desc: string }>;

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #073B63 0%, #005FA8 100%)', padding: '160px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
            <Link to="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{tc('breadcrumb.home')}</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>/</span>
            <Link to="/solucoes" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{tc('breadcrumb.solutions')}</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>/</span>
            <Link to="/solucoes/pagamentos" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{tc('breadcrumb.payments')}</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>/</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{t('entrega.hero.title')}</span>
          </div>
          <div style={{ maxWidth: '640px' }}>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.08, color: '#FFFFFF', marginBottom: '20px' }}>
              {t('entrega.hero.title')}
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>{t('entrega.hero.desc')}</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '80px 0 120px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ padding: '36px', borderRadius: '16px', background: '#F5F7F9', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px', color: '#C00000', marginBottom: '16px' }}>{step.num}</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#20252B', letterSpacing: '-0.3px', marginBottom: '10px' }}>{step.title}</div>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#66717D' }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={200}>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <Link to="/contactos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#C00000', color: '#FFFFFF', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#A00000'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#C00000'}
              >
                {tc('cta.requestInstall')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
