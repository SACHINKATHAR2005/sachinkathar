export interface Project {
  _id: string
  title: string
  description: string
  image?: string
  techStack: string[]
  link?: string
  github?: string
  blogLink?: string
  company?: string
  category?: 'project' | 'internship'
  startDate?: string
  endDate?: string
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export interface Blog {
  _id: string
  title: string
  description: string
  link?: string
  category?: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface Certificate {
  _id: string
  title: string
  issuer?: string
  image?: string
  date?: string
  link?: string
  category?: string
  description?: string
  createdAt: string
  updatedAt: string
}
export interface Hero {
  _id: string;
  name: string;
  titles?: string[];
  about: string;
  education?: string; // legacy single-field
  educations?: EducationEntry[]; // structured entries
  avatar? :string,
  location?: string;
  resume?: {
    url: string;
    publicId: string;
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
    x?: string;
    instagram?: string;
  };
  musicEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface EducationEntry {
  _id?: string
  institute: string
  logo?: string
  mode?: 'Online' | 'Offline'
  degree?: string
  stream?: string
  startYear?: string
  endYear?: string
  tags?: string[]
  url?: string
}

export interface User {
  _id: string
  email: string
  name: string
  role?: string
}

// Skills
export interface Skill {
  _id: string
  name: string
  icon?: string
  category: string
  createdAt?: string
  updatedAt?: string
}
