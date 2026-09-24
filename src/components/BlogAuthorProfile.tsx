type AuthorProfile = {
  authorName?: string;
  designation?: string;
  bio?: string;
  authorImage?: { node: { sourceUrl: string } };
  socialProfiles?: { name?: string; url?: string }[];
};

function SocialIcon({ name }: { name: string }) {
  const key = name.toLowerCase();

  if (key.includes("linkedin")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  if (key === "x" || key.includes("twitter")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );
  }

  if (key.includes("facebook")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    );
  }

  if (key.includes("instagram")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  if (key.includes("behance")) {
    return (
      <svg width="20" height="14" viewBox="0 0 24 16" fill="currentColor" aria-hidden>
        <path d="M9.8 5.2H5.3v1.8h4.3c.7 0 1.1-.3 1.1-.9 0-.6-.4-.9-1-.9zm.1 4.2H5.3v2.1h4.7c.8 0 1.3-.4 1.3-1.1 0-.7-.6-1-1.4-1zM13.9 8.8c0 3.2 2.1 5.2 5.1 5.2 1.9 0 3.3-.7 4.1-1.9l-1.9-1.1c-.4.7-1.2 1.1-2.1 1.1-1.4 0-2.4-.9-2.6-2.3h7.1c.1-.4.1-.8.1-1.1 0-3.1-1.9-5.4-5-5.4-3.1-.1-4.8 2.3-4.8 5.5zm5-2.7c1.1 0 1.9.7 2.1 1.8h-4.3c.3-1.1 1.1-1.8 2.2-1.8zM0 0h8.8C11.5 0 13.4 1.5 13.4 4c0 1.6-.9 2.9-2.3 3.5 1.8.6 2.9 2.1 2.9 4.1 0 2.8-2.2 4.4-5.4 4.4H0V0zm4.1 6.5h3.7c1.2 0 1.9-.6 1.9-1.6 0-1-.7-1.5-1.9-1.5H4.1v3.1zm0 6.6h4.1c1.4 0 2.2-.6 2.2-1.8 0-1.1-.8-1.8-2.3-1.8H4.1v3.6z" />
      </svg>
    );
  }

  return (
    <span className="text-[13px] font-medium leading-none" style={{ letterSpacing: "-0.02em" }}>
      {name}
    </span>
  );
}

export default function BlogAuthorProfile({ author }: { author?: AuthorProfile }) {
  if (!author?.authorName) return null;

  return (
    <section
      className="mt-14 lg:mt-16 pt-10 pb-2"
      style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        {author.authorImage?.node?.sourceUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.authorImage.node.sourceUrl}
            alt={author.authorName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/15 shrink-0" />
        )}

        <div className="min-w-0 flex-1">
          <p
            className="text-white/45 font-medium uppercase tracking-[0.12em] mb-2"
            style={{ fontSize: "12px" }}
          >
            About the author
          </p>
          <h3
            className="text-white font-semibold leading-tight"
            style={{ fontSize: "clamp(22px, 2vw, 28px)", letterSpacing: "-0.03em" }}
          >
            {author.authorName}
          </h3>
          {author.designation ? (
            <p
              className="text-white/55 font-normal mt-1.5"
              style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
            >
              {author.designation}
            </p>
          ) : null}
          {author.bio ? (
            <p
              className="text-white/75 font-normal leading-relaxed mt-4 max-w-2xl"
              style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
            >
              {author.bio}
            </p>
          ) : null}

          {author.socialProfiles?.length ? (
            <div className="flex flex-wrap items-center gap-3 mt-5">
              {author.socialProfiles
                .filter((profile): profile is { name: string; url: string } =>
                  Boolean(profile.name && profile.url),
                )
                .map((profile) => (
                  <a
                    key={`${profile.name}-${profile.url}`}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#0A0A0C] transition-colors duration-200"
                    title={profile.name}
                    aria-label={profile.name}
                  >
                    <SocialIcon name={profile.name} />
                  </a>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
