export type View = "recruiter" | "engineer";
export const VIEWS: View[] = ["recruiter", "engineer"];

/** Same piece of content written for each audience. */
export type PerView<T> = Record<View, T>;

export type Link = { label: string; href: string };

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** A screenshot of real work. `device` sets the frame and aspect ratio. */
export type Shot = Photo & {
  device: "desktop" | "mobile";
  caption: string;
};

export type Profile = {
  name: string;
  role: string;
  photo: Photo;
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
  /** Client work: source can't be shared. Screenshots use dummy or masked data. */
  confidential: boolean;
  shots?: Shot[];
  links?: Link[];
};

/** Public side project with code (and ideally a live demo). */
export type OpenSource = {
  name: string;
  summary: PerView<string>;
  stack: string[];
  repo: string;
  demo?: string;
  year: string;
  image?: Photo;
};

export type SkillGroup = { name: string; items: string[] };

export type Education = {
  school: string;
  program: string;
  /** Optional: the CV lists the degree without dates. */
  start?: string;
  end?: string;
  note?: string;
};

export type Content = {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  openSource: OpenSource[];
  skills: SkillGroup[];
  education: Education[];
};
