import type { SimulationInput } from './types'

export interface Example {
  id: string
  title: string
  summary: string
  industry: string
  input: SimulationInput
}

export const examples: Example[] = [
  {
    id: 'delivery-app',
    title: 'تطبيق توصيل وجبات',
    summary:
      'فكرة تطبيق جوال لتوصيل من مطاعم الحي خلال 30 دقيقة. الفئة المستهدفة سكان أحياء سكنية محددة، والتسجيل إجباري قبل الطلب الأول.',
    industry: 'تطبيق جوال',
    input: {
      projectType: 'mobile-app',
      projectName: 'توصيل وجبات الحي',
      audience: 'segmented',
      priceClear: true,
      steps: 6,
      ctaClear: true,
      hasPayment: true,
      hasDirectContact: false,
      requiresLogin: true,
      trustNeed: 'medium',
      complexity: 'moderate',
      hasGuarantees: false,
    },
  },
  {
    id: 'real-estate-web',
    title: 'منصة عقارية للبيع المباشر',
    summary:
      'موقع ويب يربط البائع الفرد بالمشتري بدون وسيط، مع جولات افتراضية وعرض المخططات. القرار حساس والمبلغ كبير.',
    industry: 'موقع ويب',
    input: {
      projectType: 'website',
      projectName: 'منصة بيع عقاري',
      audience: 'segmented',
      priceClear: true,
      steps: 4,
      ctaClear: true,
      hasPayment: false,
      hasDirectContact: true,
      requiresLogin: false,
      trustNeed: 'high',
      complexity: 'complex',
      hasGuarantees: false,
    },
  },
  {
    id: 'service-booking',
    title: 'منصة حجز خدمات منزلية',
    summary:
      'حجز فني تكييف، سباك، كهربائي عند الطلب. التسعير مرن حسب نوع الخدمة، والمستخدم لا يعرف السعر إلا بعد الكشف.',
    industry: 'منصة حجز',
    input: {
      projectType: 'service-booking',
      projectName: 'منصة فنيين منزلية',
      audience: 'general',
      priceClear: false,
      steps: 5,
      ctaClear: true,
      hasPayment: true,
      hasDirectContact: true,
      requiresLogin: false,
      trustNeed: 'medium',
      complexity: 'moderate',
      hasGuarantees: false,
    },
  },
]
