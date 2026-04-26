import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SimulatorPage } from './pages/SimulatorPage'
import { ResultPage } from './pages/ResultPage'
import { ExamplesPage } from './pages/ExamplesPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ScrollToTop } from './components/ScrollToTop'

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
