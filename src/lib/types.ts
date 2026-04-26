export type ProjectType =
  | 'mobile-app'
  | 'website'
  | 'ecommerce'
  | 'service-booking'
  | 'dashboard'
  | 'other'

export type Platform = 'mobile' | 'web'

export type AudienceTightness = 'general' | 'segmented' | 'niche'
export type TrustNeed = 'low' | 'medium' | 'high'
export type Complexity = 'simple' | 'moderate' | 'complex'

export interface SimulationInput {
  projectType: ProjectType
  projectName: string
  audience: AudienceTightness
  priceClear: boolean
  steps: number
  ctaClear: boolean
  hasPayment: boolean
  hasDirectContact: boolean
  requiresLogin: boolean
  trustNeed: TrustNeed
  complexity: Complexity
  hasGuarantees: boolean
}

export type Severity = 'low' | 'medium' | 'high'

export interface Issue {
  id: string
  title: string
  detail: string
  severity: Severity
}

export interface Recommendation {
  id: string
  title: string
  detail: string
}

export interface JourneyStep {
  id: string
  label: string
  status: 'ok' | 'warn' | 'risk'
  note: string
}

export interface SimulationResult {
  scores: {
    overall: number
    clarity: number
    trust: number
    usability: number
    conversion: number
  }
  issues: Issue[]
  recommendations: Recommendation[]
  journey: JourneyStep[]
  createdAt: number
}

export interface ContactMessage {
  id: string
  name: string
  phone: string
  projectType: string
  message: string
  createdAt: number
}
