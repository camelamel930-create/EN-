/**
 * Types and interfaces for Emmanuel Nwigwe Portfolio
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  deliverables: string[];
  colors: string[]; // Color hexes or names for the design system visualizer
  tools: string[];
  interactiveSvgType: 'church' | 'event' | 'book' | 'coffee';
  client: string;
  year: string;
  category: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  rating?: number;
  projectAssociated?: string;
}

export interface Tool {
  name: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
