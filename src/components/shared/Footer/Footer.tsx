import Link from "next/link";

const cols = [
  {
    title: "Company",
    links: [
      { name: "About Us", link: "/" },
      { name: "Careers", link: "/" },
      { name: "Blog", link: "/" },
      { name: "Contact", link: "/" },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Luxury Cars", link: "/" },
      { name: "SUVs", link: "/" },
      { name: "Electric Vehicles", link: "/" },
      { name: "Special Deals", link: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", link: "/" },
      { name: "Terms & Conditions", link: "/" },
      { name: "Privacy Policy", link: "/" },
      { name: "Booking Support", link: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "Instagram", link: "/" },
      { name: "X", link: "/" },
      { name: "LinkedIn", link: "/" },
      { name: "YouTube", link: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-background border border-t-gray-500/40">
      <div className="cssContainer py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-md">
            <Link
              href="#home"
              className="font-sans text-2xl font-black tracking-tight"
            >
              Drive<span className="text-accent">Fleet</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              DriveFleet is a modern premium car rental platform designed to
              deliver seamless booking experiences, luxury vehicles, and
              reliable service for every journey.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground">
              <li>
                <Link href={`mailto:support@drivefleet.com`}>
                  support@drivefleet.com
                </Link>
              </li>
              <li>
                <Link href={`tel:+18005552048`}>+1 (800) 555-2048</Link>
              </li>
              <li className="text-muted-foreground">24/7 Customer Support</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h5 className="text-sm! font-extrabold! uppercase tracking-widest text-foreground">
                  {c.title}
                </h5>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.name}>
                      <Link
                        href={`${l.link}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 DriveFleet. All rights reserved.</p>
          <p>Crafted for premium journeys.</p>
        </div>
      </div>
    </footer>
  );
}
