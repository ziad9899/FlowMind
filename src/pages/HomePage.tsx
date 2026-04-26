import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  PlayCircle,
  Compass,
  TrendingUp,
  Target,
  Layers,
  ListChecks,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { MiniFlow } from '../components/MiniFlow'
import { SectionHeader } from '../components/SectionHeader'

export function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Why />
      <How />
      <DemoSection />
      <FinalCTA />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-soft-bg" aria-hidden="true" />
      <div className="container-page relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-800/60 px-3 py-1 text-xs text-text-dim"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand animate-pulseDot" />
              نسخة تجريبية — تعمل محليًا في متصفحك
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="mt-5 font-display text-balance text-[34px] font-bold leading-[1.15] text-text sm:text-[46px]"
            >
              اختبر فكرة مشروعك
              <br />
              <span className="text-brand">قبل أن تبدأ بالتنفيذ</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-5 max-w-xl text-[16px] leading-9 text-text-dim text-pretty"
            >
              محاكي ذكي يساعدك على فهم كيف قد يتصرف المستخدم داخل مشروعك،
              وأين قد يتردد أو يخرج قبل إتمام الطلب — في أقل من دقيقة، بدون تسجيل.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link to="/simulator" className="btn-primary">
                <span>ابدأ المحاكاة</span>
                <ArrowLeft size={16} />
              </Link>
              <Link to="/examples" className="btn-ghost">
                <PlayCircle size={16} />
                <span>شاهد مثالًا</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-text-dim"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand" />
                بدون تسجيل أو إيميل
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-brand" />
                نتيجة فورية على الجهاز
              </div>
              <div className="flex items-center gap-2">
                <Target size={16} className="text-brand" />
                9 أسئلة فقط
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <MiniFlow />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Logos() {
  const items = [
    'فكرة قبل التنفيذ',
    'بدون كود',
    'يعمل محليًا',
    'تقرير فوري',
    'موجّه لـ SMB',
  ]
  return (
    <section className="border-y border-line/60 bg-ink-900/30">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-xs uppercase tracking-[0.2em] text-text-mute">
        {items.map((it) => (
          <span key={it}>{it}</span>
        ))}
      </div>
    </section>
  )
}

const whyItems = [
  {
    icon: Compass,
    title: 'تكتشف نقاط الخروج مبكرًا',
    detail:
      'تعرف أين سيتوقف المستخدم: عند السعر؟ عند طول النموذج؟ عند غياب الثقة؟ قبل أن تكتب سطرًا واحدًا من الكود.',
  },
  {
    icon: TrendingUp,
    title: 'تقيس فكرتك بأربعة معايير',
    detail:
      'الوضوح، الثقة، سهولة الاستخدام، احتمال التحويل. بدل الحدس، تمتلك أرقامًا تحاور بها فريقك أو شريكك.',
  },
  {
    icon: Layers,
    title: 'توصيات عملية لا نظرية',
    detail:
      'لكل مشكلة، تحصل على إجراء قابل للتطبيق فورًا — مكان زر الـ CTA، طريقة عرض السعر، عدد خطوات النموذج.',
  },
  {
    icon: ListChecks,
    title: 'مبني على ممارسات حقيقية',
    detail:
      'القواعد مستخلصة من تجارب فعلية في تصميم منتجات التجارة والخدمات والعقار في السوق المحلي.',
  },
]

function Why() {
  return (
    <section className="container-page py-20 sm:py-24">
      <SectionHeader
        eyebrow="لماذا تحتاجها"
        title="لأن أصعب لحظة في أي مشروع هي إعادة بنائه بعد الإطلاق"
        description="معظم الإخفاقات لا تأتي من الكود، بل من قرارات منتج اتُخذت بسرعة. هذه الأداة تمنحك مساحة هادئة لاختبار فكرتك من زاوية المستخدم قبل أن تكلّفك المراجعات وقتًا ومالًا."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {whyItems.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="card card-hover p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-[17px] font-semibold text-text">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-7 text-text-dim">{item.detail}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

const steps = [
  {
    n: '01',
    title: 'تجيب على 9 أسئلة قصيرة',
    detail: 'نوع المشروع، جمهورك، خطوات الطلب، طبيعة القرار. لا حقول نصية مرهقة.',
  },
  {
    n: '02',
    title: 'يعمل المحرك محليًا داخل متصفحك',
    detail: 'بدون إرسال بياناتك لأي خادم. القواعد مكتوبة وقابلة للمراجعة، ليست صندوقًا أسود.',
  },
  {
    n: '03',
    title: 'تحصل على تقرير قابل للتنفيذ',
    detail: 'درجات، رحلة مستخدم متوقعة، أهم 3 مشاكل وأفضل 3 تحسينات — في صفحة واحدة.',
  },
]

function How() {
  return (
    <section className="border-t border-line/60 bg-ink-900/20">
      <div className="container-page py-20 sm:py-24">
        <SectionHeader
          eyebrow="كيف تعمل"
          title="ثلاث خطوات. أقل من دقيقة."
          description="ليست استشارة، وليست استبيانًا طويلًا. مجرد محاكاة سريعة تساعدك على رؤية فكرتك من خارجها."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="card relative overflow-hidden p-6"
            >
              <div className="absolute -top-2 -left-3 font-display text-[80px] font-black leading-none text-ink-700/60 select-none">
                {s.n}
              </div>
              <div className="relative">
                <div className="text-xs text-text-mute">الخطوة {s.n}</div>
                <h3 className="mt-2 font-display text-[18px] font-semibold text-text">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-text-dim">{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  return (
    <section className="container-page py-20 sm:py-24">
      <div className="card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="p-8 sm:p-10">
            <div className="text-xs uppercase tracking-widest text-brand">رؤية فعلية</div>
            <h3 className="mt-3 font-display text-[24px] font-bold leading-snug text-text sm:text-[28px]">
              تخيّل نفسك تطلب من تطبيقك. أين ستتوقف؟
            </h3>
            <p className="mt-4 text-[15px] leading-8 text-text-dim">
              المحاكاة تأخذ مدخلاتك وتعيد بناء رحلة المستخدم خطوة بخطوة، مع إشارات مرور
              للحظات التي تستحق الانتباه: لحظة فهم العرض، لحظة الثقة، لحظة الدفع، لحظة المتابعة.
            </p>

            <ul className="mt-6 space-y-3 text-[14px] text-text-dim">
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                مؤشرات لحظية لكل مرحلة من الرحلة
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                ربط كل مشكلة بسببها وحلها العملي
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                نتائج تشاركها مع المصمم أو فريق التطوير مباشرة
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/simulator" className="btn-primary">
                <span>جرّب الآن</span>
                <ArrowLeft size={16} />
              </Link>
              <Link to="/examples" className="btn-ghost">
                أمثلة جاهزة
              </Link>
            </div>
          </div>

          <div className="border-t border-line bg-ink-900/40 p-6 lg:border-r lg:border-t-0">
            <MiniFlow />
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="container-page py-20 sm:py-24">
      <div className="card relative overflow-hidden p-8 sm:p-12">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[680px] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand">الخطوة التالية</div>
            <h3 className="mt-3 font-display text-[24px] font-bold leading-snug text-text sm:text-[30px] text-balance">
              هل تريد تحويل فكرتك إلى تجربة استخدام واضحة فعلًا؟
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-8 text-text-dim">
              أفق التقنية تساعدك على الانتقال من المحاكاة إلى منتج حقيقي قابل للإطلاق —
              تصميم، تطوير، وتجربة مستخدم مدروسة من أول يوم.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to="/contact" className="btn-primary justify-center">
              تواصل مع أفق التقنية
              <ArrowLeft size={16} />
            </Link>
            <Link to="/simulator" className="btn-ghost justify-center">
              جرّب المحاكي أولًا
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
