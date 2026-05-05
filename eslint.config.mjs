import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

export default [
  ...coreWebVitals,
  ...typescript,
  {
    // shadcn/ui auto-generated files — do not modify or lint
    ignores: [
      'src/components/ui/**',
      'src/hooks/use-mobile.tsx',
      'src/hooks/use-toast.ts',
    ],
  },
  {
    // Disable react-hooks/set-state-in-effect — new aggressive rule in
    // react-hooks v5 that rejects the common "reset loading at effect start"
    // pattern. Not appropriate for this project.
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
