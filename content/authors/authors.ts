export type Author = {
  photo: string; // url of photo relative to content/authors/images/, EXCLUDING EXTENSION
  name: string;
  title: string;
  blurb: string;
  email?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  codeforces?: string;
  youtube?: string;
  reddit?: string;
};

export const Authors: Author[] = [
  {
    photo: 'ojtinjacar',
    name: 'Oscar Julián Tinjacá Reyes',
    title: 'CEO',
    blurb: 'Estudiante de Ingenieria de Sistemas y Computación - UNAL',
    website: 'https://github.com/Ojtinjacar',
    email: 'ojtinjacar@unal.edu.co',
    github: 'Ojtinjacar',
  },
  {
    photo: 'lmbaeza',
    name: 'Luis Miguel Báez Aponte',
    title: 'CTO',
    blurb: 'Estudiante de Ingenieria de Sistemas y Computación - UNAL',
    email: 'lmbaeza',
    website: 'https://github.com/LuisMBaezCo',
    linkedin: 'luismbaezco',
    github: 'LuisMBaezco',
  },
];
