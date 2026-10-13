# Deployment

Production is the existing Vercel `portfolio` project under `ichen27s-projects`, serving https://ivanzhchen.com.
The build is a Next.js static export: `npm ci`, `npm run build`, output `out/`.
No environment variables or server runtime are required by this redesign.

Use the existing project and domain; do not create a replacement account or change DNS.
The project is connected to `ichen27/portfolio` through the existing Vercel GitHub integration.
Feature-branch pushes create previews; main publishes production.
Review and merge through GitHub after checks pass. Verify the deployed homepage and a direct case-study URL after publishing.
Roll back using the prior Vercel deployment or a Git revert.
