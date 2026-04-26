import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { examples } from '../lib/examples'
import { simulate } from '../lib/engine'
import { useSimStore } from '../store/useSimStore'
import { SectionHeader } from '../components/SectionHeader'

export function ExamplesPage() {
  const navigate = useNavigate()
  const { setInput, setResult } = useSimStore()

  function open(exampleId: string) {
    const ex = examples.find((e) => e.id === exampleId)
    if (!ex) return
    const result = simulate(ex.input)
    setInput(ex.input)
    setResult(result)
    navigate('/result')
  }

  return (
    <section className="container-page py-12 sm:py-16">
      <SectionHeader
        eyebrow="أمثلة جاهزة"
        title="ثلاث أفكار مشاريع، ثلاث محاكاات مختلفة"
        description="بدل أن تبدأ من الصفر، اطّلع على نتائج محاكاة لمشاريع شائعة في السوق المحلي. اضغط أي مثال لرؤية تقريره الكامل."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {examples.map((ex, i) => {
          const preview = simulate(ex.input)
          return (
            <motion.article
              key={ex.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="card card-hover flex h-full flex-col overflow-hidden"
            >
              <div className="border-b border-line bg-ink-900/40 p-6">
                <div className="flex items-center justify-between">
                  <span className="chip">{ex.industry}</span>
                  <span className="text-xs text-text-mute">مثال {i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug text-text">
                  {ex.title}
                </h3>
                <p className="mt-2 text-[13px] leading-7 text-text-dim">{ex.summary}</p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <Mini label="عام" value={preview.scores.overall} accent />
                  <Mini label="وضوح" value={preview.scores.clarity} />
                  <Mini label="ثقة" value={preview.scores.trust} />
                  <Mini label="تحويل" value={preview.scores.conversion} />
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-2 text-xs text-text-dim">
                    <AlertTriangle size={12} className="text-warn" />
                    أبرز نقطة خطر
                  </div>
                  <p className="mt-2 text-[13px] leading-7 text-text">
                    {preview.issues[0]?.title || 'لا توجد نقاط خطر بارزة.'}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 text-xs text-text-dim">
                    <Sparkles size={12} className="text-ok" />
                    أهم توصية
                  </div>
                  <p className="mt-2 text-[13px] leading-7 text-text">
                    {preview.recommendations[0]?.title || 'استمر باختبار المستخدم الفعلي.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => open(ex.id)}
                  className="btn-ghost mt-6 w-full"
                >
                  <span>افتح التقرير الكامل</span>
                  <ArrowLeft size={14} />
                </button>
              </div>
            </motion.article>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-text-dim">جاهز لمحاكاة فكرتك أنت؟</p>
        <button
          type="button"
          onClick={() => navigate('/simulator')}
          className="btn-primary mt-4 inline-flex"
        >
          ابدأ محاكاتك الآن
          <ArrowLeft size={16} />
        </button>
      </div>
    </section>
  )
}

function Mini({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-ink-900/40 px-2 py-3">
      <div
        className={`font-display text-lg font-bold tabular-nums ${
          accent ? 'text-brand' : 'text-text'
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[11px] text-text-mute">{label}</div>
    </div>
  )
}
