import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Globe,
  ShoppingBag,
  Calendar,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSimStore } from '../store/useSimStore'
import { simulate } from '../lib/engine'
import type { ProjectType, AudienceTightness, TrustNeed, Complexity } from '../lib/types'
import { getPlatform } from '../lib/labels'
import { StepHeader } from '../components/form/StepHeader'
import { OptionCard } from '../components/form/OptionCard'
import { Toggle } from '../components/form/Toggle'
import { StepCounter } from '../components/form/StepCounter'

const projectOptions: {
  value: ProjectType
  label: string
  icon: React.ElementType
  hint: string
}[] = [
  { value: 'mobile-app', label: 'تطبيق جوال', icon: Smartphone, hint: 'iOS / Android، تجربة داخل التطبيق' },
  { value: 'website', label: 'موقع ويب', icon: Globe, hint: 'موقع تعريفي، خدمات، محتوى' },
  { value: 'ecommerce', label: 'متجر إلكتروني', icon: ShoppingBag, hint: 'بيع منتجات مادية أو رقمية' },
  { value: 'service-booking', label: 'منصة حجز', icon: Calendar, hint: 'مواعيد، جلسات، خدمات حسب الطلب' },
  { value: 'dashboard', label: 'لوحة تحكم', icon: LayoutDashboard, hint: 'أداة داخلية، SaaS، إدارة بيانات' },
  { value: 'other', label: 'فكرة غير محددة', icon: Sparkles, hint: 'لم أحسم النوع بعد' },
]

const audienceOptions: { value: AudienceTightness; label: string; description: string }[] = [
  { value: 'general', label: 'جمهور عام واسع', description: 'كل من يستطيع استخدام المنتج تقريبًا.' },
  { value: 'segmented', label: 'شريحة محددة', description: 'فئة بصفات واضحة (مثلاً: عوائل في الرياض).' },
  { value: 'niche', label: 'فئة دقيقة جدًا', description: 'مهنة أو حالة محددة (مثلاً: عيادات أسنان).' },
]

const trustOptions: { value: TrustNeed; label: string; description: string }[] = [
  { value: 'low', label: 'قرار سريع', description: 'مبلغ صغير، مخاطرة منخفضة.' },
  { value: 'medium', label: 'قرار متوسط', description: 'يحتاج تفكير دقيقتين قبل الإقدام.' },
  { value: 'high', label: 'قرار حساس', description: 'مبلغ كبير أو نتيجة لا يمكن التراجع عنها.' },
]

const complexityOptions: { value: Complexity; label: string; description: string }[] = [
  { value: 'simple', label: 'بسيط', description: 'صفحات قليلة وفكرة محددة.' },
  { value: 'moderate', label: 'متوسط', description: 'عدة وحدات تتفاعل مع بعضها.' },
  { value: 'complex', label: 'معقّد', description: 'منصة متكاملة بأدوار متعددة.' },
]

const TOTAL = 4

export function SimulatorPage() {
  const navigate = useNavigate()
  const { input, setField, setInput, setResult } = useSimStore()
  const [step, setStep] = useState(1)
  const platform = getPlatform(input.projectType)
  const isMobile = platform === 'mobile'

  const canNext = useMemo(() => {
    if (step === 1) return input.projectName.trim().length >= 2
    return true
  }, [step, input.projectName])

  function next() {
    if (step < TOTAL) setStep((s) => s + 1)
    else submit()
  }

  function back() {
    setStep((s) => Math.max(1, s - 1))
  }

  function submit() {
    const result = simulate(input)
    setResult(result)
    navigate('/result')
  }

  function loadDemo() {
    const demo = {
      ...input,
      projectName: input.projectName || (isMobile ? 'تطبيق توصيل وجبات' : 'موقع متجر هدايا'),
      projectType: input.projectType,
      audience: 'segmented' as AudienceTightness,
      priceClear: false,
      steps: 6,
      ctaClear: true,
      hasPayment: true,
      hasDirectContact: false,
      requiresLogin: isMobile,
      trustNeed: 'medium' as TrustNeed,
      complexity: 'moderate' as Complexity,
      hasGuarantees: false,
    }
    setInput(demo)
  }

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand">المحاكي</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-text sm:text-[28px]">
              دعنا نفهم فكرتك أولًا
            </h1>
          </div>
          <button
            type="button"
            onClick={loadDemo}
            className="text-xs text-text-dim underline-offset-4 hover:text-text hover:underline"
          >
            تعبئة بيانات تجريبية
          </button>
        </div>

        <div className="card p-6 sm:p-8">
          <StepHeader
            index={step}
            total={TOTAL}
            title={
              step === 1
                ? 'ما هو مشروعك؟'
                : step === 2
                  ? 'لمن تتحدث، وكيف يفهم القيمة؟'
                  : step === 3
                    ? isMobile
                      ? 'كيف ستبدو رحلة المستخدم داخل التطبيق؟'
                      : 'كيف ستبدو رحلة الزائر داخل الموقع؟'
                    : 'ما طبيعة القرار وحجم المنتج؟'
            }
            hint={
              step === 1
                ? 'اسم مبدئي يكفي. لن نشاركه مع أحد، الكل يبقى في متصفحك.'
                : step === 2
                  ? 'وضوح الجمهور والتسعير يحددان جودة الانطباع الأول.'
                  : step === 3
                    ? isMobile
                      ? 'ركّز على ما يلمسه المستخدم في أول دقيقة بعد فتح التطبيق.'
                      : 'ركّز على ما يراه الزائر في أول شاشة من الموقع.'
                    : 'القرارات الحساسة تحتاج طبقة ثقة أعلى.'
            }
          />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="projectName" className="label">
                        اسم المشروع
                      </label>
                      <input
                        id="projectName"
                        type="text"
                        autoFocus
                        value={input.projectName}
                        onChange={(e) => setField('projectName', e.target.value)}
                        placeholder="مثلاً: تطبيق توصيل وجبات الحي"
                        className="input"
                      />
                    </div>

                    <div>
                      <div className="label">نوع المشروع</div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {projectOptions.map((opt) => {
                          const Icon = opt.icon
                          return (
                            <OptionCard
                              key={opt.value}
                              selected={input.projectType === opt.value}
                              onSelect={() => setField('projectType', opt.value)}
                              title={opt.label}
                              description={opt.hint}
                              icon={<Icon size={18} />}
                              compact
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <div className="label">الجمهور المستهدف</div>
                      <div className="grid gap-3">
                        {audienceOptions.map((opt) => (
                          <OptionCard
                            key={opt.value}
                            selected={input.audience === opt.value}
                            onSelect={() => setField('audience', opt.value)}
                            title={opt.label}
                            description={opt.description}
                          />
                        ))}
                      </div>
                    </div>
                    <Toggle
                      label="هل السعر أو الخدمة واضحة من البداية؟"
                      description={
                        isMobile
                          ? 'يجب أن يفهم المستخدم القيمة والسعر في أول شاشة من التطبيق.'
                          : 'السعر الظاهر مبكرًا في الموقع يبني ثقة، حتى لو كان مرتفعًا.'
                      }
                      value={input.priceClear}
                      onChange={(v) => setField('priceClear', v)}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <div className="label">كم خطوة يحتاجها المستخدم للوصول للهدف؟</div>
                      <StepCounter
                        value={input.steps}
                        onChange={(n) => setField('steps', n)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Toggle
                        label="هل يوجد زر تواصل أو طلب واضح؟"
                        description={
                          isMobile
                            ? 'زر سفلي ثابت أو إجراء أساسي في أول شاشة.'
                            : 'زر بلون مختلف وفعل واضح في أعلى الصفحة (احجز، اطلب، تواصل).'
                        }
                        value={input.ctaClear}
                        onChange={(v) => setField('ctaClear', v)}
                      />
                      <Toggle
                        label="هل الفكرة تحتاج تسجيل دخول؟"
                        description={
                          isMobile
                            ? 'تسجيل إجباري قبل التجربة هو السبب الأول لإلغاء التثبيت.'
                            : 'حجب المحتوى خلف تسجيل قد يطرد زوار الإعلانات والبحث.'
                        }
                        value={input.requiresLogin}
                        onChange={(v) => setField('requiresLogin', v)}
                      />
                      <Toggle
                        label="هل يوجد دفع داخل المنتج؟"
                        description="مدى، Apple Pay، STC Pay، تحويل بنكي…"
                        value={input.hasPayment}
                        onChange={(v) => setField('hasPayment', v)}
                      />
                      <Toggle
                        label="هل يوجد قناة تواصل مباشرة؟"
                        description={
                          isMobile
                            ? 'محادثة داخل التطبيق، واتساب، أو زر مساعدة يردّ فيه إنسان.'
                            : 'واتساب، شات داخلي، أو رقم اتصال يردّ فيه إنسان.'
                        }
                        value={input.hasDirectContact}
                        onChange={(v) => setField('hasDirectContact', v)}
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <div className="label">هل المشروع يحتاج ثقة عالية من المستخدم؟</div>
                      <div className="grid gap-3">
                        {trustOptions.map((opt) => (
                          <OptionCard
                            key={opt.value}
                            selected={input.trustNeed === opt.value}
                            onSelect={() => setField('trustNeed', opt.value)}
                            title={opt.label}
                            description={opt.description}
                          />
                        ))}
                      </div>
                    </div>

                    <Toggle
                      label="هل تعرض ضمانات أو إثباتات ظاهرة؟"
                      description="تقييمات حقيقية، شعارات شركاء، رخصة، سياسة استرجاع."
                      value={input.hasGuarantees}
                      onChange={(v) => setField('hasGuarantees', v)}
                    />

                    <div>
                      <div className="label">مستوى تعقيد المنتج</div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {complexityOptions.map((opt) => (
                          <OptionCard
                            key={opt.value}
                            selected={input.complexity === opt.value}
                            onSelect={() => setField('complexity', opt.value)}
                            title={opt.label}
                            description={opt.description}
                            compact
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="btn-quiet disabled:opacity-30 disabled:hover:text-text-dim"
            >
              <ArrowRight size={16} />
              <span>السابق</span>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="btn-primary disabled:opacity-50 disabled:hover:bg-brand"
            >
              <span>{step === TOTAL ? 'احسب النتيجة' : 'التالي'}</span>
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-text-mute">
          إجاباتك تُحفظ تلقائيًا في متصفحك فقط — يمكنك إغلاق الصفحة والعودة لاحقًا.
        </p>
      </div>
    </section>
  )
}
