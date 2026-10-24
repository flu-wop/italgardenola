import Link from "next/link";
import Image from "next/image";
import { CONTACT, HOURS_SUMMARY, LINKS, NAV_LINKS, SOCIAL } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-espresso text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4 md:px-6">
        <div>
          <Image src="/images/logo.png" alt="I-tal Garden" width={640} height={857} className="h-28 w-auto rounded-xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/75">100% plant-based meals made with wholesome ingredients, bold seasonings, and soulful tradition.</p>
        </div>

        <div>
          <p className="eyebrow mb-4 !text-sun">Visit</p>
          <address className="text-sm not-italic leading-relaxed text-paper/85">
            {CONTACT.addressLine1}
            <br />
            {CONTACT.addressLine2}
            <br />
            <a href={CONTACT.phoneHref} className="underline-offset-4 hover:underline">
              {CONTACT.phone}
            </a>
          </address>
          <p className="mt-3 text-sm text-paper/85">{HOURS_SUMMARY}</p>
        </div>

        <div>
          <p className="eyebrow mb-4 !text-sun">Explore</p>
          <ul className="space-y-2 text-sm text-paper/85">
            {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className="underline-offset-4 hover:underline">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a href={LINKS.giftCards} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                Gift Cards
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 !text-sun">Follow</p>
          <ul className="space-y-2 text-sm text-paper/85">
            <li>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                Instagram — {SOCIAL.instagramHandle}
              </a>
            </li>
            <li>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="break-all underline-offset-4 hover:underline">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15 px-5 py-6 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center text-xs text-paper/70 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} I-tal Garden. All rights reserved.</p>
          <p>Designed by IN-FLU-ENTIAL</p>
        </div>
      </div>
    </footer>
  );
}
