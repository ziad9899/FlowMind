import { Globe, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.05c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.99 10.99 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink-900/40">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo subtitle="ar" />
            <p className="mt-4 max-w-md text-sm leading-7 text-text-dim">
              أداة عرض من أفق التقنية. تساعدك على فحص فكرة مشروعك من زاوية المستخدم قبل أن تبدأ
              في التنفيذ، حتى لا تكتشف المشاكل بعد فوات الأوان.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text">روابط</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-dim">
              <li>
                <Link to="/" className="hover:text-text">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/simulator" className="hover:text-text">
                  ابدأ المحاكاة
                </Link>
              </li>
              <li>
                <Link to="/examples" className="hover:text-text">
                  أمثلة جاهزة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-text">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text">أفق التقنية</h4>
            <ul className="mt-4 space-y-3 text-sm text-text-dim">
              <li>
                <a
                  href="https://ofqtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-text"
                >
                  <Globe size={16} />
                  <span>ofqtech.com</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ziad9899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-text"
                >
                  <GithubIcon size={16} />
                  <span>github.com/ziad9899</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 border-t border-line pt-6 text-xs text-text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            تم تطوير هذا النموذج بواسطة{' '}
            <a
              href="https://ofqtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-brand"
            >
              أفق التقنية
            </a>
            .
          </p>
          <p>© {new Date().getFullYear()} FlowMind. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
