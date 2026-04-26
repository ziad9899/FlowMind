import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="container-page py-32 text-center">
      <p className="text-sm text-text-dim">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-text">الصفحة غير موجودة</h1>
      <p className="mt-3 text-text-dim">يبدو أن الرابط غير صحيح أو أن المحتوى نُقل.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        العودة للرئيسية
      </Link>
    </section>
  )
}
