import { create } from 'zustand'
import type { SimulationInput, SimulationResult } from '../lib/types'
import { load, save } from '../lib/storage'

const INPUT_KEY = 'sim:input.v2'
const RESULT_KEY = 'sim:result.v2'

export const defaultInput: SimulationInput = {
  projectType: 'website',
  projectName: '',
  audience: 'segmented',
  priceClear: true,
  steps: 4,
  ctaClear: true,
  hasPayment: false,
  hasDirectContact: true,
  requiresLogin: false,
  trustNeed: 'medium',
  complexity: 'moderate',
  hasGuarantees: false,
}

interface SimState {
  input: SimulationInput
  result: SimulationResult | null
  setField: <K extends keyof SimulationInput>(key: K, value: SimulationInput[K]) => void
  setInput: (input: SimulationInput) => void
  setResult: (result: SimulationResult | null) => void
  reset: () => void
}

export const useSimStore = create<SimState>((set) => ({
  input: load<SimulationInput>(INPUT_KEY, defaultInput),
  result: load<SimulationResult | null>(RESULT_KEY, null),
  setField: (key, value) =>
    set((state) => {
      const next = { ...state.input, [key]: value }
      save(INPUT_KEY, next)
      return { input: next }
    }),
  setInput: (input) => {
    save(INPUT_KEY, input)
    set({ input })
  },
  setResult: (result) => {
    save(RESULT_KEY, result)
    set({ result })
  },
  reset: () => {
    save(INPUT_KEY, defaultInput)
    save(RESULT_KEY, null)
    set({ input: defaultInput, result: null })
  },
}))
