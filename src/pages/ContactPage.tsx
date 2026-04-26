import { useEffect, useState } from 'react'
import { Send, CheckCircle2, Mail, Clock, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { load, save } from '../lib/storage'
import type { ContactMessage } from '../lib/types'

const STORAGE_KEY = 'contact:messages'
const WHATSAPP_NUMBER = '966564450461'

const projectOptions = [
  'تطبيق جوال',
  'موقع ويب',
  'متجر إلكتروني',
  'منصة حجز',
  'لوحة تحكم',
  'فكرة غير محددة',
]

interface FormState {
  name: string
  phone: string
  projectType: string
  message: string
}

const empty: FormState = {
  name: '',
  phone: '',
  projectType: 'تطبيق جوال',
  message: '',
}

function buildWhatsappUrl(form: FormState): string {
  const lines = [
    'مرحبًا، وصلك طلب استشارة جديد من موقع FlowMind',
    '',
    'الاسم:',
    form.name.trim(),
    '',
    'رقم الجوال:',
    form.phone.trim(),
    '',
    'نوع المشروع:',
    form.projectType,
    '',
    'وصف الفكرة:',
    form.message.trim(),
    '',
    'المصدر:',
    'FlowMind - نموذج أفق التقنية',
  ]
  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [sent, setSent] = useState(false)
  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    const list = load<ContactMessage[]>(STORAGE_KEY, [])
    setSavedCount(list.length)
  }, [])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (form.name.trim().length < 2) next.name = 'الاسم الكامل مطلوب.'
    const phone = form.phone.replace(/[\s\-+]/g, '')
    if (!phone) next.phone = 'رقم الجوال مطلوب.'
    else if (!/^\d{8,15}$/.test(phone)) next.phone = 'أدخل رقم جوال صحيح.'
    if (!form.projectType.trim()) next.projectType = 'اختر نوع المشروع.'
    if (form.message.trim().length < 10) next.message = 'وصف الفكرة مطلوب (10 أحرف على الأقل).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const list = load<ContactMessage[]>(STORAGE_KEY, [])
    const entry: ContactMessage = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      projectType: form.projectType,
      message: form.message.trim(),
      createdAt: Date.now(),
    }
    save(STORAGE_KEY, [entry, ...list])
    setSavedCount((c) => c + 1)

    const url = buildWhatsappUrl(form)
    window.open(url, '_blank', 'noopener,noreferrer')

    setSent(true)
    setForm(empty)
  }

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand">تواصل معنا</p>
          <h1 className="mt-3 font-display text-[28px] font-bold leading-tight text-text sm:text-[34px] text-balance">
            من فكرة على ورق إلى منتج جاهز للسوق
          </h1>
          <p className="mt-4 text-[15px] leading-8 text-text-dim">
            شارك تفاصيل مشروعك مع أفق التقنية، وسنرتب لك جلسة مجانية قصيرة لمناقشة أين يمكن
            أن نضيف قيمة فعلية — لا عروض تجارية مبهمة.
          </p>

          <ul className="mt-8 space-y-4">
            <Item icon={Clock} title="نرد خلال يوم عمل واحد" />
            <Item icon={ShieldCheck} title="بياناتك تبقى داخل متصفحك، تُرسَل عبر واتساب فقط بضغطة منك" />
            <Item icon={Mail} title="بدون نشرات بريدية، بدون رسائل متابعة مزعجة" />
          </ul>

          {savedCount > 0 && (
            <p className="mt-10 text-xs text-text-mute">
              يوجد {savedCount} {savedCount === 1 ? 'طلب محفوظ' : 'طلبات محفوظة'} في متصفحك من
              جلسات سابقة.
            </p>
          )}
        </div>

        <div>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card flex flex-col items-center p-10 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ok/15 text-ok">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-text">
                تم تجهيز الرسالة وفتح واتساب لإرسال الطلب.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-text-dim">
                إن لم يفتح واتساب تلقائيًا، تأكد من السماح بفتح النوافذ ثم أعد المحاولة.
                نسخة من طلبك محفوظة محليًا في متصفحك.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn-ghost mt-7"
              >
                إرسال طلب آخر
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8" noValidate>
              <div>
                <label htmlFor="name" className="label">
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="input"
                  placeholder="مثلاً: محمد العتيبي"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-bad">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="label">
                    رقم الجوال
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="input text-right"
                    placeholder="05XXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-bad">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectType" className="label">
                    نوع المشروع
                  </label>
                  <select
                    id="projectType"
                    value={form.projectType}
                    onChange={(e) => update('projectType', e.target.value)}
                    className="input appearance-none"
                  >
                    {projectOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1.5 text-xs text-bad">{errors.projectType}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="label">
                  وصف الفكرة
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="input resize-none"
                  placeholder="ماذا تبني، لمن، ومتى تخطط للإطلاق؟"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-bad">{errors.message}</p>
                )}
              </div>

              <div className="flex flex-col-reverse items-stretch gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-text-mute">
                  بالضغط على إرسال، سيُفتح واتساب بمحادثة جاهزة فيها بياناتك. الإرسال يتم من
                  جهازك بضغطة منك.
                </p>
                <button type="submit" className="btn-primary">
                  <Send size={16} />
                  إرسال عبر واتساب
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Item({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-800 text-brand">
        <Icon size={16} />
      </div>
      <div className="text-[14px] leading-7 text-text">{title}</div>
    </li>
  )
}
