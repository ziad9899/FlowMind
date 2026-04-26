import type {
  SimulationInput,
  SimulationResult,
  Issue,
  Recommendation,
  JourneyStep,
  Platform,
} from './types'
import { getPlatform } from './labels'

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n))

interface Buckets {
  clarity: number
  trust: number
  usability: number
  conversion: number
  issues: Issue[]
  recommendations: Recommendation[]
}

function adjust(buckets: Buckets, deltas: Partial<Omit<Buckets, 'issues' | 'recommendations'>>) {
  if (deltas.clarity) buckets.clarity += deltas.clarity
  if (deltas.trust) buckets.trust += deltas.trust
  if (deltas.usability) buckets.usability += deltas.usability
  if (deltas.conversion) buckets.conversion += deltas.conversion
}

export function simulate(input: SimulationInput): SimulationResult {
  const platform = getPlatform(input.projectType)

  const b: Buckets = {
    clarity: 78,
    trust: 70,
    usability: 75,
    conversion: 68,
    issues: [],
    recommendations: [],
  }

  // Pricing / service clarity
  if (!input.priceClear) {
    adjust(b, { clarity: -16, trust: -10, conversion: -14 })
    b.issues.push({
      id: 'price',
      title: 'السعر أو الخدمة غير واضحة من البداية',
      detail:
        platform === 'mobile'
          ? 'حين لا يجد المستخدم السعر أو طبيعة الخدمة في أول شاشة من التطبيق، يفترض أنها مخفية لسبب ما، ويغلق التطبيق.'
          : 'حين لا يجد الزائر السعر بسرعة في الموقع، يفترض أنه مرتفع أو يخفي شيئًا، ثم يخرج لمقارنة بدائل أوضح.',
      severity: 'high',
    })
    b.recommendations.push({
      id: 'price-rec',
      title:
        platform === 'mobile'
          ? 'اعرض السعر أو ملخص الخدمة في أول شاشة بعد الفتح'
          : 'اعرض السعر في أول شاشة من الموقع',
      detail:
        'حتى لو كان السعر يبدأ من نطاق، اكتبه صراحة. الوضوح يبني ثقة أكبر من إخفاء الرقم.',
    })
  }

  // Number of steps in flow
  if (input.steps >= 6) {
    adjust(b, { usability: -22, conversion: -18 })
    b.issues.push({
      id: 'steps-many',
      title: `عدد الخطوات للوصول للهدف مرتفع (${input.steps})`,
      detail:
        platform === 'mobile'
          ? 'كل شاشة إضافية على الجوال تفقد جزءًا من المستخدمين. بعد الشاشة الرابعة يبدأ التخلي بالارتفاع بوضوح.'
          : 'كل خطوة إضافية تفقد جزءًا من المستخدمين. بعد الخطوة الرابعة يبدأ معدل التخلي بالارتفاع بوضوح.',
      severity: 'high',
    })
    b.recommendations.push({
      id: 'steps-rec',
      title: 'اختصر الرحلة إلى 3 خطوات',
      detail:
        platform === 'mobile'
          ? 'ادمج الشاشات المتتابعة، وأجّل أي حقل غير ضروري لما بعد إكمال الإجراء الأول.'
          : 'ادمج الحقول المتشابهة في صفحة واحدة، وأجّل ما ليس ضروريًا للحظة الإكمال إلى ما بعد التحويل.',
    })
  } else if (input.steps === 5) {
    adjust(b, { usability: -10, conversion: -8 })
    b.issues.push({
      id: 'steps-medium',
      title: 'الرحلة تقترب من الحد المقبول',
      detail: 'خمس خطوات قابلة للإدارة، لكن أي عثرة فيها قد تتحول إلى نقطة خروج.',
      severity: 'medium',
    })
  } else if (input.steps <= 2) {
    adjust(b, { usability: 6, conversion: 4 })
  }

  // CTA / primary action clarity
  if (!input.ctaClear) {
    adjust(b, { clarity: -10, conversion: -16 })
    b.issues.push({
      id: 'cta',
      title:
        platform === 'mobile'
          ? 'لا يوجد إجراء أساسي واضح في أول شاشة من التطبيق'
          : 'لا يوجد زر تواصل أو طلب واضح في أول صفحة',
      detail:
        platform === 'mobile'
          ? 'بدون زر «ابدأ» أو «اطلب» مميز في أول شاشة، يضيع المستخدم بين الواجهات قبل أن يفهم ماذا يفعل، فيغلق التطبيق.'
          : 'بدون زر رئيسي يجذب النظر في أعلى الصفحة، يتشتت الزائر بين خيارات متساوية بصريًا فيتردد ثم يغادر.',
      severity: 'high',
    })
    b.recommendations.push({
      id: 'cta-rec',
      title: 'حدد إجراءً واحدًا أوليًا في كل شاشة',
      detail:
        platform === 'mobile'
          ? 'زر سفلي ثابت بلون مميز ولفظ يبدأ بفعل: «ابدأ الطلب»، «احجز موعدًا»، «جرّب الآن».'
          : 'زر بلون مميز في أعلى الصفحة الأولى ولفظ يبدأ بفعل واضح: «احجز الآن»، «اطلب عرضًا»، «جرّب مجانًا».',
    })
  }

  // Direct contact channel
  if (!input.hasDirectContact) {
    adjust(b, { trust: -12, conversion: -6 })
    b.issues.push({
      id: 'contact',
      title: 'لا يوجد تواصل مباشر مع فريقك',
      detail:
        platform === 'mobile'
          ? 'في التطبيقات، غياب زر مساعدة أو محادثة داخل التطبيق يُفسَّر كغياب التزام، خاصة عند أول مشكلة.'
          : 'في المواقع، غياب رقم واتساب أو محادثة مباشرة يُفسَّر كغياب التزام، خاصة للقرارات الحساسة.',
      severity: 'medium',
    })
    b.recommendations.push({
      id: 'contact-rec',
      title:
        platform === 'mobile'
          ? 'أضف زر «مساعدة» أو واتساب داخل التطبيق'
          : 'أضف زر واتساب ثابتًا في الزاوية',
      detail: 'يقلل الاحتكاك ويحوّل التردد إلى محادثة فعلية بدل مغادرة صامتة.',
    })
  }

  // Mandatory login on day-one (mostly hurts mobile)
  if (input.requiresLogin && (input.trustNeed === 'low' || input.trustNeed === 'medium')) {
    if (platform === 'mobile') {
      adjust(b, { usability: -10, conversion: -12 })
      b.issues.push({
        id: 'login-wall',
        title: 'تسجيل دخول إجباري قبل تجربة التطبيق',
        detail:
          'إجبار المستخدم على إنشاء حساب قبل أن يرى القيمة هو السبب الأول لإلغاء تثبيت التطبيق في أول دقيقة.',
        severity: 'high',
      })
      b.recommendations.push({
        id: 'login-rec',
        title: 'اسمح بتجربة الميزة الأساسية قبل التسجيل',
        detail: 'اطلب التسجيل فقط عند الحاجة الفعلية: عند الحفظ، الدفع، أو ربط بيانات شخصية.',
      })
    } else {
      adjust(b, { conversion: -8 })
      b.issues.push({
        id: 'login-gate',
        title: 'محتوى الموقع محجوب خلف تسجيل دخول',
        detail:
          'الزائر القادم من إعلان أو بحث يخرج فورًا إذا قابلته شاشة تسجيل قبل أن يفهم العرض.',
        severity: 'medium',
      })
      b.recommendations.push({
        id: 'login-rec',
        title: 'اعرض القيمة كاملة قبل أي طلب تسجيل',
        detail: 'اجعل التسجيل مطلوبًا فقط عند الإجراء الذي يستحقه (شراء، حجز، حفظ).',
      })
    }
  }

  // Trust + guarantees
  if (input.trustNeed === 'high' && !input.hasGuarantees) {
    adjust(b, { trust: -18, conversion: -10 })
    b.issues.push({
      id: 'guarantees',
      title: 'القرار يحتاج ثقة عالية بدون ضمانات معروضة',
      detail:
        'منتجات الثقة العالية (عقار، خدمات قانونية، طبية، استثمار) تحتاج إثباتات: تقييمات، رخص، ضمان استرجاع، صور حقيقية.',
      severity: 'high',
    })
    b.recommendations.push({
      id: 'guarantees-rec',
      title: 'أضف طبقة إثبات ظاهرة',
      detail: 'تقييمات حقيقية بأسماء، شعارات شركاء، رخصة تجارية، ضمانات صريحة قبل زر الدفع.',
    })
  }

  // Audience targeting
  if (input.audience === 'general') {
    adjust(b, { clarity: -8, conversion: -10 })
    b.issues.push({
      id: 'audience',
      title: 'الاستهداف عام جدًا',
      detail:
        'حين تخاطب الجميع، لا أحد يشعر أن الكلام موجّه له. النسخة العامة تضعف رسالة القيمة.',
      severity: 'medium',
    })
    b.recommendations.push({
      id: 'audience-rec',
      title: 'حدد شريحة أولى بوضوح',
      detail:
        'اختر فئة واحدة جدًا (مثلاً: مطاعم صغيرة في الرياض)، اكتب لها، ثم وسّع لاحقًا.',
    })
  } else if (input.audience === 'niche') {
    adjust(b, { clarity: 4, conversion: 6 })
  }

  // Payments without trust signals
  if (input.hasPayment && !input.hasGuarantees) {
    adjust(b, { trust: -8, conversion: -6 })
    b.issues.push({
      id: 'pay-trust',
      title: 'دفع إلكتروني بدون مؤشرات أمان ظاهرة',
      detail:
        'شعار بوابة الدفع، سياسة استرجاع، ورمز SSL ظاهر — غيابها يجعل المستخدم يتراجع عند ملء بطاقته.',
      severity: 'medium',
    })
    b.recommendations.push({
      id: 'pay-trust-rec',
      title: 'اعرض أيقونات الدفع وضمان الاسترجاع بجانب الزر',
      detail: 'وضوح طبقة الأمان لحظة الدفع يرفع التحويل بنسبة ملحوظة في السوق المحلي.',
    })
  }

  // Complexity
  if (input.complexity === 'complex') {
    adjust(b, { usability: -10 })
    b.issues.push({
      id: 'complex',
      title: 'تعقيد المنتج قد يثقل أول تجربة',
      detail:
        platform === 'mobile'
          ? 'التطبيقات المركّبة تحتاج Onboarding تدريجي على عدة شاشات، لا قائمة طويلة من الميزات في الشاشة الأولى.'
          : 'المنتجات المركّبة تحتاج إدخالًا تدريجيًا، لا صفحة واحدة تشرح كل شيء دفعة واحدة.',
      severity: 'medium',
    })
    b.recommendations.push({
      id: 'complex-rec',
      title: 'صمّم Onboarding من 3 خطوات',
      detail: 'أظهر قيمة واحدة في كل خطوة بدل عرض كل المزايا في أول دقيقة.',
    })
  } else if (input.complexity === 'simple') {
    adjust(b, { usability: 6, clarity: 4 })
  }

  // Clamp scores
  b.clarity = clamp(Math.round(b.clarity))
  b.trust = clamp(Math.round(b.trust))
  b.usability = clamp(Math.round(b.usability))
  b.conversion = clamp(Math.round(b.conversion))

  const overall = Math.round(
    b.clarity * 0.22 + b.trust * 0.28 + b.usability * 0.22 + b.conversion * 0.28,
  )

  // Sort issues by severity, top 3
  const severityWeight = { high: 3, medium: 2, low: 1 } as const
  const issues = b.issues
    .sort((a, z) => severityWeight[z.severity] - severityWeight[a.severity])
    .slice(0, 3)

  // Recommendations: 2 dynamic + at least 1 platform baseline (or fill from baselines)
  const recommendations = mergeRecommendations(b.recommendations, platform)

  // Journey
  const journey = buildJourney(input, b, platform)

  return {
    scores: {
      overall: clamp(overall),
      clarity: b.clarity,
      trust: b.trust,
      usability: b.usability,
      conversion: b.conversion,
    },
    issues,
    recommendations,
    journey,
    createdAt: Date.now(),
  }
}

function platformBaseline(platform: Platform): Recommendation[] {
  if (platform === 'mobile') {
    return [
      {
        id: 'mobile-base-steps',
        title: 'قلل خطوات التسجيل قدر الإمكان',
        detail:
          'كل حقل تطلبه قبل أن يرى المستخدم قيمة التطبيق هو سبب محتمل للتسرّب. ابدأ بالحد الأدنى وأكمل لاحقًا.',
      },
      {
        id: 'mobile-base-onboarding',
        title: 'اجعل أول تجربة داخل التطبيق واضحة خلال أول 10 ثوانٍ',
        detail:
          'في أول عشر ثوانٍ يجب أن يفهم المستخدم لماذا فتح التطبيق وما الإجراء التالي. لا شاشات تعريف طويلة.',
      },
      {
        id: 'mobile-base-permissions',
        title: 'لا تطلب صلاحيات الجوال إلا عند الحاجة',
        detail:
          'موقع، إشعارات، كاميرا، جهات اتصال — اطلبها لحظة استخدامها فعلًا، لا في أول فتح للتطبيق.',
      },
    ]
  }
  return [
    {
      id: 'web-base-cta',
      title: 'اجعل زر التواصل أو الطلب واضحًا في أول شاشة',
      detail:
        'يجب أن يجد الزائر زر «تواصل» أو «اطلب الآن» دون تمرير. الوضوح في الأعلى أهم من جمال التصميم.',
    },
    {
      id: 'web-base-services',
      title: 'اعرض الخدمات والأسعار بدون إخفاء المعلومات المهمة',
      detail:
        'لا تخفي تفاصيل العرض خلف نموذج تواصل أو نافذة منبثقة. الشفافية المبكرة ترفع جودة الزوار الواصلين.',
    },
    {
      id: 'web-base-mobile',
      title: 'تأكد أن الموقع سريع وواضح على الجوال',
      detail:
        'أكثر من 70% من زوار المواقع المحلية من الجوال. اختبر الموقع بنفسك على هاتف بطيء قبل الإطلاق.',
    },
  ]
}

function mergeRecommendations(dynamic: Recommendation[], platform: Platform): Recommendation[] {
  const baseline = platformBaseline(platform)
  const final: Recommendation[] = []
  const seen = new Set<string>()

  // Take up to 2 dynamic recommendations first (issue-driven, more relevant)
  for (const r of dynamic) {
    if (final.length >= 2) break
    if (!seen.has(r.id)) {
      final.push(r)
      seen.add(r.id)
    }
  }

  // Fill remaining slots from platform baselines
  for (const r of baseline) {
    if (final.length >= 3) break
    if (!seen.has(r.id)) {
      final.push(r)
      seen.add(r.id)
    }
  }

  // If still under 3 (unlikely), pull more dynamic
  for (const r of dynamic) {
    if (final.length >= 3) break
    if (!seen.has(r.id)) {
      final.push(r)
      seen.add(r.id)
    }
  }

  return final
}

function buildJourney(input: SimulationInput, b: Buckets, platform: Platform): JourneyStep[] {
  const steps: JourneyStep[] = []
  const isMobile = platform === 'mobile'

  steps.push({
    id: 'land',
    label: isMobile ? 'فتح التطبيق' : 'وصول الزائر',
    status: input.audience === 'general' ? 'warn' : 'ok',
    note:
      input.audience === 'general'
        ? isMobile
          ? 'المستخدم يفتح التطبيق ولا يشعر أن المحتوى موجّه له تحديدًا.'
          : 'الزائر لا يشعر أن الرسالة موجهة له تحديدًا.'
        : isMobile
          ? 'المحتوى يخاطب شريحته بوضوح، الانطباع الأول إيجابي.'
          : 'الرسالة موجهة لشريحة واضحة، الانطباع الأول إيجابي.',
  })

  steps.push({
    id: 'understand',
    label: isMobile ? 'فهم القيمة في أول 10 ثوانٍ' : 'فهم القيمة',
    status: input.priceClear && input.ctaClear ? 'ok' : !input.ctaClear ? 'risk' : 'warn',
    note: !input.ctaClear
      ? isMobile
        ? 'لا يجد المستخدم زرًا واضحًا للبدء، فيتنقل بين الشاشات بلا هدف.'
        : 'لا يجد الزائر ما يجب فعله، فيتنقل بلا هدف.'
      : !input.priceClear
        ? 'يفهم الفكرة لكن غموض السعر أو الخدمة يبدأ في الظهور.'
        : 'يفهم العرض ويعرف الإجراء التالي.',
  })

  steps.push({
    id: 'consider',
    label: 'مرحلة التفكير',
    status:
      input.trustNeed === 'high' && !input.hasGuarantees
        ? 'risk'
        : !input.hasDirectContact
          ? 'warn'
          : 'ok',
    note:
      input.trustNeed === 'high' && !input.hasGuarantees
        ? 'يحتاج ضمانات قبل المتابعة، ولا يجدها.'
        : !input.hasDirectContact
          ? 'يبحث عن طريق سؤال سريع، فلا يجد قناة مباشرة.'
          : 'يجد ما يبدّد شكوكه ويستمر بثقة.',
  })

  steps.push({
    id: 'flow',
    label: isMobile
      ? input.requiresLogin
        ? 'تسجيل الدخول وإكمال الإجراء'
        : 'إكمال الإجراء داخل التطبيق'
      : 'إكمال الإجراء',
    status: input.steps >= 6 ? 'risk' : input.steps === 5 ? 'warn' : 'ok',
    note:
      input.steps >= 6
        ? `الرحلة طويلة (${input.steps} خطوات). نسبة كبيرة تتسرّب قبل الإكمال.`
        : input.steps === 5
          ? 'الرحلة محتملة لكنها على الحافة.'
          : 'رحلة قصيرة وسلسة.',
  })

  steps.push({
    id: 'pay',
    label: input.hasPayment ? 'الدفع' : 'تأكيد الطلب',
    status:
      input.hasPayment && !input.hasGuarantees
        ? 'warn'
        : b.trust < 55
          ? 'warn'
          : 'ok',
    note:
      input.hasPayment && !input.hasGuarantees
        ? 'لحظة الدفع حساسة. غياب مؤشرات الأمان يخسر تحويلات حقيقية.'
        : 'لحظة الإكمال نظيفة بصريًا والمستخدم مرتاح.',
  })

  steps.push({
    id: 'after',
    label: 'ما بعد التحويل',
    status: input.hasDirectContact ? 'ok' : 'warn',
    note: input.hasDirectContact
      ? isMobile
        ? 'هناك قناة داخل التطبيق لمتابعة الطلب أو الاستفسار.'
        : 'هناك قناة لمتابعة الطلب أو الاستفسار، تبني تجربة طويلة الأمد.'
      : 'بعد الإكمال، لا يجد المستخدم من يكلمه إذا واجه مشكلة.',
  })

  return steps
}
