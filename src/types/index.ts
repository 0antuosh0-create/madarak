export type NavTab = 'catalog' | 'resources';

export interface QuizQuestion {
  questionFa: string;
  optionsFa: string[];
  correctIndex: number;
  explanationFa: string;
}

export interface DescriptiveQuestion {
  id: string;
  questionFa: string;
  sourceFa: string;
  detailedAnswerMarkdownFa: string;
}

export interface LessonSummarySection {
  mainFormulas: { labelFa: string; formulaTex: string; explanationFa: string }[];
  rulesAndTheoremsFa: string[];
  examPitfallsFa: string[];
  quickReviewPointsFa: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  titleFa: string;
  titleEn: string;
  summaryFa: string;
  durationMinutes: number;
  keyPointsFa: string[];
  pitfallsFa?: string[];
  diagramType?: string;
  contentMarkdownFa: string;
  comprehensiveSummary?: LessonSummarySection;
  descriptiveQuestions?: DescriptiveQuestion[];
  quiz: QuizQuestion;
}
export interface Module {
  id: string;
  order: number;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  estimatedMinutes: number;
  icon: string;
  lessons: Lesson[];
}

export interface LabStep {
  id: string;
  labelFa: string;
  unitFa: string;
  expectedValue: number;
  tolerance: number; // e.g. 0.05 for 5%
  hintFa: string;
}

export interface LabChallenge {
  id: string;
  order: number;
  titleFa: string;
  chapterRefFa: string;
  difficultyFa: 'مقدماتی' | 'متوسط' | 'پیشرفته' | 'المپیادی / کنکور ارشد';
  descriptionFa: string;
  circuitSummaryFa: string;
  circuitSvgType: 'bridge' | 'ccvs-node' | 'active-thevenin' | 'max-power' | 'opamp-diff' | 'diode-loadline';
  steps: LabStep[];
  hintsFa: string[];
  solutionExplanationFa: string;
}

export interface ResistorColorBand {
  color: string;
  nameFa: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
  hex: string;
  textColor?: string;
}

export interface TheoremItem {
  id: string;
  titleFa: string;
  titleEn: string;
  discoveredByFa: string;
  statementFa: string;
  formulaTex: string;
  conditionsFa: string[];
  examTipsFa: string[];
  applicationsFa: string[];
}
