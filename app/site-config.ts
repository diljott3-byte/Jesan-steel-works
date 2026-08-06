export const siteConfig = {
  brandName: "SANKALP",
  parentBrand: "Jesan Steel Works",
  establishedYear: "2018",
  location: "Chintpurni Road, Hoshiarpur, Punjab",
  showroomAddress: "Chintpurni Road, Near Hotel Royal Plaza, New Colony Chohal, Hoshiarpur, Punjab 146024",
  showroomMapUrl: "https://www.google.com/maps/search/?api=1&query=Jesan%20Steel%20Works%2C%20Chintpurni%20Road%2C%20Near%20Hotel%20Royal%20Plaza%2C%20New%20Colony%20Chohal%2C%20Hoshiarpur%2C%20Punjab%20146024",
  whatsappNumber: "919876158523",
  phoneNumber: "+919876158523",
  phoneDisplay: "+91 98761 58523",
};

export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}

export function createWhatsAppLink(message: string) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : "";
}
