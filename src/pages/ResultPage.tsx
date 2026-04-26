import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, AlertTriangle, Lightbulb, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSimStore } from '../store/useSimStore'
import { ScoreGauge } from '../components/result/ScoreGauge'
import { ScoreBar } from '../components/result/ScoreBar'
import { JourneyTimeline } from '../components/result/JourneyTimeline'
import { projectTypeLabel } from '../lib/labels'

export function ResultPage() {
  const navigate = useNavigate()
  const { result, input } = useSimStore()

  useEffect(() => {
    if (!result) navigate('/simulator', { replace: true })
  }, [result, navigate])

  if (!result) return null

  const sevColor: Record<string, string> = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#9CA3AF',
  }
  const sevLabel: Record<string, string> = {
    high: 'حرجة',
    medium: 'متوسطة',
    low: 'خفيفة',
  }

  return (
    <section className="container-page py-12 sm:py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand">نتيجة المحاكاة</p>
          <h1 className="mt-2 font-display text-[28px] font-bold text-text sm:text-[34px]">
            {input.projectName || 'فكرة المشروع'}
          </h1>
          <p className="mt-2 text-sm text-text-dim">
            {projectTypeLabel[input.projectType]} — تحليل مبني على{' '}
            <span className="text-text">9 إشارات</span> من إدخالاتك.
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/simulator" className="btn-ghost text-sm">
            <RefreshCw size={14} />
            عدّل الإجابات
          </Link>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card flex flex-col items-center p-8"
        >
          <p className="text-xs uppercase tracking-widest text-text-dim">المؤشر العام</p>
          <div className="mt-4">
            <ScoreGauge value={result.scores.overall} />
          </div>
          <p className="mt-6 max-w-xs text-center text-[13px] leading-7 text-text-dim">
            مؤشر مركّب يجمع الوضوح والثقة وسهولة الاستخدام واحتمال التحويل بأوزان مختلفة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="card p-6 sm:p-8"
        >
          <h3 className="font-display text-lg font-semibold text-text">الأبعاد الأربعة</h3>
          <p className="mt-1 text-sm text-text-dim">
            كل بُعد يقيس زاوية مختلفة من تجربة المستخدم.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <ScoreBar
              label="وضوح الفكرة"
              value={result.scores.clarity}
              hint="هل يفهم الزائر العرض في ثوانٍ؟"
            />
            <ScoreBar
              label="الثقة"
              value={result.scores.trust}
              hint="هل يطمئن الزائر للالتزام؟"
            />
            <ScoreBar
              label="سهولة الاستخدام"
              value={result.scores.usability}
              hint="هل يكمل دون احتكاك زائد؟"
            />
            <ScoreBar
              label="احتمال التحويل"
              value={result.scores.conversion}
              hint="هل يصل إلى الإجراء النهائي؟"
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="card p-6 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bad/15 text-bad">
              <AlertTriangle size={18} />
            </div>
            <h3 className="font-display text-lg font-semibold text-text">أهم 3 مشاكل</h3>
          </div>

          {result.issues.length === 0 ? (
            <p className="mt-6 text-sm text-text-dim">
              لم يرصد المحاكي مشاكل واضحة بناءً على إدخالاتك. هذا مؤشر جيد، لكنه لا يلغي اختبار
              المستخدم الفعلي.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {result.issues.map((issue, i) => (
                <li
                  key={issue.id}
                  className="rounded-xl border border-line bg-ink-900/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-text-mute tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="font-medium text-text">{issue.title}</span>
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px]"
                      style={{
                        background: sevColor[issue.severity] + '15',
                        color: sevColor[issue.severity],
                      }}
                    >
                      {sevLabel[issue.severity]}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-7 text-text-dim">{issue.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="card p-6 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ok/15 text-ok">
              <Lightbulb size={18} />
            </div>
            <h3 className="font-display text-lg font-semibold text-text">أفضل 3 تحسينات</h3>
          </div>

          {result.recommendations.length === 0 ? (
            <p className="mt-6 text-sm text-text-dim">
              ابقِ ما لديك على ما هو عليه، وركز على اختبار حقيقي مع مستخدمين أوائل.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {result.recommendations.map((rec, i) => (
                <li
                  key={rec.id}
                  className="rounded-xl border border-line bg-ink-900/40 p-4"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm text-text-mute tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="font-medium text-text">{rec.title}</span>
                  </div>
                  <p className="mt-2 pr-6 text-[13px] leading-7 text-text-dim">{rec.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>

      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <JourneyTimeline steps={result.journey} />
        </motion.div>
      </div>

      <div className="mt-10">
        <div className="card relative overflow-hidden p-8 sm:p-10">
          <div
            className="pointer-events-none absolute -bottom-32 right-1/2 h-64 w-[640px] translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand">
                <MessageSquare size={14} />
                الخطوة التالية
              </div>
              <h3 className="mt-3 font-display text-[22px] font-bold leading-snug text-text sm:text-[28px] text-balance">
                هل تريد تحويل فكرتك إلى تجربة استخدام واضحة؟
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-8 text-text-dim">
                أفق التقنية تساعدك على تطبيق هذه التحسينات فعليًا — تصميم، تطوير، وإطلاق
                منتج جاهز للسوق.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/contact" className="btn-primary justify-center">
                تواصل مع أفق التقنية
                <ArrowLeft size={16} />
              </Link>
              <Link to="/examples" className="btn-ghost justify-center">
                شاهد أمثلة أخرى
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
