import { createWhatsAppLink, siteConfig } from "../site-config";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16.1 3C9 3 3.2 8.7 3.2 15.8c0 2.2.6 4.4 1.7 6.3L3 29l7-1.8c1.8 1 3.9 1.5 6.1 1.5 7.1 0 12.9-5.7 12.9-12.8S23.2 3 16.1 3Zm0 23.5c-2 0-3.9-.5-5.5-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.5 10.5 0 0 1-1.6-5.6c0-5.9 4.8-10.7 10.8-10.7 2.9 0 5.6 1.1 7.6 3.1a10.6 10.6 0 0 1 3.2 7.6c0 5.8-4.8 10.6-10.8 10.6Zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.3 3.6 5.7 5 .8.3 1.4.6 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.4-.3-.7-.4Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7.2 3.5 4.8 4.6c-.8.4-1.2 1.2-1 2.1 1.2 6.7 6.5 12 13.2 13.2.9.2 1.7-.2 2.1-1l1.1-2.4c.3-.7.1-1.5-.5-1.9l-3.1-2.2c-.6-.4-1.4-.4-1.9.1l-1.4 1.4a13 13 0 0 1-3.5-3.5l1.4-1.4c.5-.5.5-1.3.1-1.9L9.1 4c-.4-.6-1.2-.8-1.9-.5Z" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export default function ContactDock() {
  const whatsappLink = createWhatsAppLink("Hello SANKALP, I would like to enquire about your steel furniture.");

  return (
    <aside className="contact-dock" aria-label="Quick contact options">
      <a
        className="contact-dock-item contact-dock-location"
        href={siteConfig.showroomMapUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Get directions to the SANKALP showroom"
        title="Showroom location"
      >
        <LocationIcon />
        <span>Showroom</span>
      </a>
      <a
        className="contact-dock-item contact-dock-call"
        href={`tel:${siteConfig.phoneNumber}`}
        aria-label={`Call SANKALP at ${siteConfig.phoneDisplay}`}
        title="Call SANKALP"
      >
        <PhoneIcon />
        <span>Call now</span>
      </a>
      <a
        className="contact-dock-item contact-dock-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire with SANKALP on WhatsApp"
        title="WhatsApp enquiry"
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
