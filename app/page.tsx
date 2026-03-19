import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { FeaturedProjects } from "@/components/featured-projects";
import { OtherProjects } from "@/components/other-projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { SiteNav } from "@/components/site-nav";
import { projectManifest } from "@/lib/projects";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

export default function Home() {
  const siteUrl = getSiteUrl();
  const ogImageUrl = new URL("/og-image.svg", siteUrl).toString();
  const ogImageId = `${siteUrl}#primary-image`;
  const profileUrl = `${siteUrl}#profile`;
  const sameAsLinks = Object.values(siteConfig.social);
  const manifestTopics = Array.from(new Set(projectManifest.flatMap((project) => project.tech))).sort();
  const sectionElementsJsonLd = siteConfig.sectionLinks.map((section) => ({
    "@type": "WebPageElement",
    "@id": `${siteUrl}#section-${section.id}`,
    name: section.label,
    url: `${siteUrl}#${section.id}`,
  }));
  const siteNavigationJsonLd = siteConfig.sectionLinks.map((section, index) => ({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${siteUrl}#nav-item-${section.id}`,
    name: section.label,
    url: `${siteUrl}#${section.id}`,
    position: index + 1,
  }));

  const imageObjectJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": ogImageId,
    url: ogImageUrl,
    contentUrl: ogImageUrl,
    width: 1200,
    height: 630,
    caption: `${siteConfig.name} portfolio preview image`,
  };
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": profileUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    jobTitle: "Software Engineer",
    alumniOf: "Syracuse University",
    url: siteUrl,
    image: {
      "@id": ogImageId,
    },
    email: siteConfig.email,
    knowsAbout: manifestTopics,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "portfolio inquiries",
      email: siteConfig.email,
      telephone: siteConfig.phoneE164,
      url: `${siteUrl}#contact`,
    },
    sameAs: sameAsLinks,
    mainEntityOfPage: {
      "@type": "ProfilePage",
      "@id": `${siteUrl}#profile-page`,
    },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: `${siteConfig.name} Portfolio`,
    url: siteUrl,
    description: siteConfig.description,
    image: {
      "@id": ogImageId,
    },
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      "@id": profileUrl,
    },
    mainEntity: {
      "@type": "Person",
      "@id": profileUrl,
    },
    hasPart: siteNavigationJsonLd.map((navigationItem) => ({
      "@type": "SiteNavigationElement",
      "@id": navigationItem["@id"],
    })),
  };
  const projectsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}#projects-list`,
    name: `${siteConfig.name} Project Portfolio`,
    url: `${siteUrl}#projects`,
    inLanguage: "en-US",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: projectManifest.length,
    about: {
      "@type": "Person",
      "@id": profileUrl,
    },
    itemListElement: projectManifest.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        "@id": `${siteUrl}#project-${project.id}`,
        name: project.title,
        description: project.description,
        codeRepository: project.github ?? undefined,
        programmingLanguage: project.tech[0] ?? "Unknown",
        url: project.github ?? `${siteUrl}#projects`,
      },
    })),
  };
  const projectsCollectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}#projects-page`,
    name: `${siteConfig.name} Projects`,
    url: `${siteUrl}#projects`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${siteUrl}#projects-list`,
    },
    about: {
      "@type": "Person",
      "@id": profileUrl,
    },
    hasPart: projectManifest.map((project) => ({
      "@type": "SoftwareSourceCode",
      "@id": `${siteUrl}#project-${project.id}`,
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}#breadcrumbs`,
    },
  };
  const softwareSourceCodeJsonLd = projectManifest.map((project) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${siteUrl}#project-${project.id}`,
    name: project.title,
    description: project.description,
    codeRepository: project.github ?? undefined,
    programmingLanguage: project.tech.join(", "),
    runtimePlatform: "Web",
    url: project.github ?? `${siteUrl}#projects`,
    creator: {
      "@type": "Person",
      "@id": profileUrl,
    },
    keywords: project.tech.join(", "),
    isPartOf: {
      "@type": "CollectionPage",
      "@id": `${siteUrl}#projects-page`,
    },
  }));
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}#profile-page`,
    mainEntity: {
      "@type": "Person",
      "@id": profileUrl,
      name: siteConfig.name,
      url: siteUrl,
    },
    about: siteConfig.description,
    url: siteUrl,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
    },
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}#webpage`,
    name: `${siteConfig.name} Portfolio`,
    url: siteUrl,
    description: siteConfig.description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
    },
    about: {
      "@type": "Person",
      "@id": profileUrl,
    },
    primaryImageOfPage: {
      "@id": ogImageId,
    },
    image: {
      "@id": ogImageId,
    },
    inLanguage: "en-US",
    significantLink: siteConfig.sectionLinks.map((section) => `${siteUrl}#${section.id}`),
    mainEntity: [
      {
        "@type": "Person",
        "@id": profileUrl,
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}#projects-list`,
      },
    ],
    hasPart: sectionElementsJsonLd,
  };
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}#contact-page`,
    name: `Contact ${siteConfig.name}`,
    url: `${siteUrl}#contact`,
    description: `Contact information for ${siteConfig.name}.`,
    about: {
      "@type": "Person",
      "@id": profileUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
    },
    inLanguage: "en-US",
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}#breadcrumbs`,
    itemListElement: siteConfig.sectionLinks.map((section, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: section.label,
      item: `${siteUrl}#${section.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            imageObjectJsonLd,
            personJsonLd,
            websiteJsonLd,
            webPageJsonLd,
            profilePageJsonLd,
            projectsItemListJsonLd,
            projectsCollectionPageJsonLd,
            ...softwareSourceCodeJsonLd,
            ...siteNavigationJsonLd,
            contactPageJsonLd,
            breadcrumbJsonLd,
          ]),
        }}
      />
      <SiteNav />
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Main content"
        className="min-h-screen bg-[#0a0a0a] pt-14 focus:outline-none"
      >
        <Hero />
        <About />
        <Experience />
        <FeaturedProjects />
        <OtherProjects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
