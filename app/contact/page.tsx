import type { Metadata } from "next";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CONTACT, HOURS, SITE, SOCIAL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    `Visit I-tal Garden at ${CONTACT.fullAddress}. Hours, phone, directions, and how to reach us.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact & Location — ${SITE.name}`, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section className="pb-10 pt-16 md:pt-20">
        <Eyebrow>Contact & Location</Eyebrow>
        <SectionHeading>
          Come <span className="script text-leaf">see us</span>
        </SectionHeading>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="mb-3 eyebrow text-bark">Address</p>
              <address className="not-italic font-body text-lg leading-relaxed text-espresso">
                {CONTACT.addressLine1}
                <br />
                {CONTACT.addressLine2}
              </address>
              <Button href={CONTACT.mapsUrl} external variant="outline" className="mt-4">
                Get Directions
              </Button>
            </div>

            <div>
              <p className="mb-3 eyebrow text-bark">Hours</p>
              <table className="w-full max-w-xs font-body text-sm text-ink/90">
                <tbody>
                  {HOURS.map((h) => (
                    <tr key={h.day} className="border-b border-espresso/10 last:border-0">
                      <td className="py-2 text-ink/75">{h.day}</td>
                      <td className="py-2 text-right">{h.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <p className="mb-3 eyebrow text-bark">Reach Us</p>
              <ul className="space-y-2 font-body text-base text-ink/90">
                <li>
                  <a href={CONTACT.phoneHref} className="hover:text-leaf">
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-leaf">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-leaf">
                    Instagram — {SOCIAL.instagramHandle}
                  </a>
                </li>
                <li>
                  <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-leaf">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-espresso/15">
            <iframe
              title={`Map to ${SITE.name}`}
              src={CONTACT.mapsEmbedSrc}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
