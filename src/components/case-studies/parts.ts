// The names of a study's parts, shared by the reading version (StudySection) and the presenting
// version (present/Deck), so both say the same thing.
type Translate = (en: string, ru: string) => string;

export type Part = 'problem' | 'goal' | 'constraints' | 'research' | 'decisions' | 'results' | 'reflection' | 'next';

export const partLabels = (t: Translate): Record<Part, string> => ({
  problem: t('Problem', 'Проблема'),
  goal: t('Goal', 'Цель'),
  constraints: t('Constraints', 'Ограничения'),
  research: t('Research', 'Исследование'),
  decisions: t('Decisions', 'Решения'),
  results: t('Results', 'Результаты'),
  reflection: t('Reflection', 'Выводы'),
  next: t('Next steps', 'Что дальше'),
});
