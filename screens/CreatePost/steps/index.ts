/**
 * CreatePost Step Components
 *
 * Barrel export for all step components used in the CreatePost wizard flow.
 * Each step handles a specific part of the post creation process.
 *
 * Steps:
 * 1. PhotoStep - Select/upload verification photo
 * 2. AvatarStep - Build avatar of the person they saw
 * 3. NoteStep - Write a personalized note
 * 4. LocationStep - Select where they saw the person
 * 5. TimeStep - Optional time specification for when they saw the person
 * 6. ReviewStep - Review and submit the post
 *
 * @example
 * ```tsx
 * import { PhotoStep, AvatarStep, NoteStep, LocationStep, TimeStep, ReviewStep } from './steps'
 * ```
 */

// Photo selection step
export { PhotoStep, type PhotoStepProps } from './PhotoStep'

// Avatar builder step
export { AvatarStep, type AvatarStepProps } from './AvatarStep'

// Note writing step
export { NoteStep, type NoteStepProps } from './NoteStep'

// Location selection step
export { LocationStep, type LocationStepProps } from './LocationStep'

// Time specification step (optional)
export { TimeStep, type TimeStepProps } from './TimeStep'

// Review and submit step
export { ReviewStep, type ReviewStepProps } from './ReviewStep'
