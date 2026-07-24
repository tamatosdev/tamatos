import { defineConfig } from 'sanity';
import { buildLegacyTheme } from 'sanity'
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schema';
import { structure } from './src/sanity/structure';
import './src/sanity/studio-custom.css';

const myTheme = buildLegacyTheme({
  '--black': '#0f0f0f',
  '--white': '#ffffff',

  // Brand primary color
  '--brand-primary': '#6C47FF',

  // Default button color
  '--default-button-color': '#6C47FF',
  '--default-button-primary-color': '#6C47FF',

  // States
  '--state-info-color': '#3B82F6',
  '--state-success-color': '#22C55E',
  '--state-warning-color': '#F59E0B',
  '--state-danger-color': '#EF4444',

  // Fonts
  '--font-family-base': "'Inter', sans-serif",
})

export default defineConfig({
  name: 'tamatos-new',
  title: 'Tamatos New',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dqyqsbas',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: { types: schema.types },
  theme: myTheme,
});
