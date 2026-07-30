export type CoreValue = {
  name: string
  explanation: string
  icon: 'diversity' | 'moments' | 'growth' | 'innovation'
  needsClientConfirmation: boolean
}

export const clientVisionStatement: string | null = null

export const coreValues: CoreValue[] = [
  {
    name: 'Thriving through diversity',
    explanation: 'Welcoming different people, ideas, and cultures across the group.',
    icon: 'diversity',
    needsClientConfirmation: true,
  },
  {
    name: 'Inspiring moments',
    explanation: 'Creating memorable guest and team experiences through thoughtful service.',
    icon: 'moments',
    needsClientConfirmation: true,
  },
  {
    name: 'Living by growth',
    explanation: 'Improving skills, standards, and opportunities with every new step.',
    icon: 'growth',
    needsClientConfirmation: true,
  },
  {
    name: 'Promoting innovation',
    explanation: 'Building better food, retail, and business practices for Nepal.',
    icon: 'innovation',
    needsClientConfirmation: true,
  },
]
