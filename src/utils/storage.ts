export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, { score: number; maxScore: number; date: string }>;
  completedLabs: string[];
  bookmarkedLessons: string[];
  terminalHistory: string[];
  theme: 'dark' | 'light';
  lastVisitedLessonId?: string;
}

const STORAGE_KEY = 'madarak_user_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  completedLabs: [],
  bookmarkedLessons: [],
  terminalHistory: [],
  theme: 'dark',
};

export function loadProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(data) };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function toggleLessonCompletion(lessonId: string): boolean {
  const progress = loadProgress();
  const exists = progress.completedLessons.includes(lessonId);
  if (exists) {
    progress.completedLessons = progress.completedLessons.filter((id) => id !== lessonId);
  } else {
    progress.completedLessons.push(lessonId);
  }
  saveProgress(progress);
  return !exists;
}

export function saveQuizScore(lessonId: string, score: number, maxScore: number): void {
  const progress = loadProgress();
  progress.quizScores[lessonId] = {
    score,
    maxScore,
    date: new Date().toISOString(),
  };
  if (score === maxScore && !progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  saveProgress(progress);
}

export function toggleLabCompletion(labId: string): boolean {
  const progress = loadProgress();
  const exists = progress.completedLabs.includes(labId);
  if (exists) {
    progress.completedLabs = progress.completedLabs.filter((id) => id !== labId);
  } else {
    progress.completedLabs.push(labId);
  }
  saveProgress(progress);
  return !exists;
}

export function exportProgressBackup(): void {
  const progress = loadProgress();
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `madarak_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProgressBackup(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString) as Partial<UserProgress>;
    if (parsed && typeof parsed === 'object') {
      const merged: UserProgress = {
        ...defaultProgress,
        ...parsed,
      };
      saveProgress(merged);
      return true;
    }
  } catch (err) {
    console.error('Invalid backup JSON:', err);
  }
  return false;
}
