export type View = "recruiter" | "engineer";
export const VIEWS: View[] = ["recruiter", "engineer"];

/** Same piece of content written for each audience. */
export type PerView<T> = Record<View, T>;

export type Link = { label: string; href: string };

export type Profile = {
  name: string;
  role: string;
  location: string;
  availability: string;
  email: string;
  links: { github: string; linkedin: string; cv: string };
  headline: string;
  intro: PerView<string>;
  /** Short stack list shown to engineers in the hero. */
  coreStack: string[];
};

export type Experience = {
  company: string;
  role: string;
  place: string;
  /** ISO month, e.g. "2023-05". `end: null` means current. */
  start: string;
  end: string | null;
  summary: PerView<string>;
  highlights: PerView<string[]>;
  stack: string[];
  /** Slug of the related case study, if any. */
  project?: string;
};

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  period: string;
  /** One sentence, shown in the project list. */
  summary: PerView<string>;
  metrics: Metric[];
  recruiter: {
    problem: string;
    role: string;
    outcome: string[];
  };
  engineer: {
    architecture: string[];
    decisions: { title: string; body: string }[];
    stack: string[];
  };
  /** Client work: no source or screenshots can be shown. */
  confidential: boolean;
  links?: Link[];
};

export type SkillGroup = { name: string; items: string[] };

export type Education = {
  school: string;
  program: string;
  start: string;
  end: string;
  note?: string;
};

export type Content = {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
};
