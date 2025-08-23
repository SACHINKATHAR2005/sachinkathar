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
  education?: string;
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
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string
  email: string
  name: string
  role?: string
}
