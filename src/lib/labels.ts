import type { ProjectType, Platform, AudienceTightness, TrustNeed, Complexity } from './types'

export const projectTypeLabel: Record<ProjectType, string> = {
  'mobile-app': 'تطبيق جوال',
  website: 'موقع ويب',
  ecommerce: 'متجر إلكتروني',
  'service-booking': 'منصة حجز',
  dashboard: 'لوحة تحكم',
  other: 'فكرة غير محددة',
}

export const projectTypeOrder: ProjectType[] = [
  'mobile-app',
  'website',
  'ecommerce',
  'service-booking',
  'dashboard',
  'other',
]

export function getPlatform(t: ProjectType): Platform {
  return t === 'mobile-app' ? 'mobile' : 'web'
}

export const audienceLabel: Record<AudienceTightness, string> = {
  general: 'جمهور عام واسع',
  segmented: 'شريحة محددة',
  niche: 'فئة دقيقة جدًا',
}

export const trustLabel: Record<TrustNeed, string> = {
  low: 'قرار سريع وبسيط',
  medium: 'قرار متوسط، يحتاج تفكير',
  high: 'قرار حساس، يحتاج ثقة عالية',
}

export const complexityLabel: Record<Complexity, string> = {
  simple: 'بسيط — صفحات قليلة',
  moderate: 'متوسط — عدة وحدات',
  complex: 'معقّد — منصة متكاملة',
}
