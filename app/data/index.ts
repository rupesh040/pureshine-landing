import rawContent from './content.json';

const sections = rawContent.Cleaning.sections;

export const site = sections.Site.variants.CleaningSite1;
export const navbar = {
  ...sections.Topbar.variants.CleaningTopbar1,
  ...sections.Header.variants.CleaningHeader1,
};
export const hero = sections.Banner.variants.CleaningBanner1;
export const stats = sections.CompanyStatistics.variants.CleaningStats1.stats;
export const about = sections.About.variants.CleaningAbout1;
export const whyChooseUs = sections.WhyChooseUs.variants.CleaningWhyChooseUs1;
export const professionalCleaning = sections.ProfessionalCleaning.variants.CleaningProfessionalCleaning1;
export const servicesSection = sections.Services.variants.CleaningServices1;
export const services = sections.ServicesPage.variants.CleaningServicesPage1.items;
export const serviceDetailPage = sections.ServiceDetail.variants.CleaningServiceDetail1;
export const testimonials = sections.Testimonial.variants.CleaningTestimonial1;
export const faqSection = sections.FAQ.variants.CleaningFAQ1;
export const faqs = sections.FAQ.variants.CleaningFAQ1.items;
export const blogs = sections.BlogPage.variants.CleaningBlogPage1.items;
export const blogsPage = sections.BlogPage.variants.CleaningBlogPage1.hero;
export const blogDetailPage = sections.BlogPage.variants.CleaningBlogPage1.detailPage;
export const categories = sections.BlogPage.variants.CleaningBlogPage1.sidebar.categories;
export const contact = sections.Contact.variants.CleaningContact1;
export const contactMap = sections.Contact.variants.CleaningContact1.contactMap;
export const footer = sections.Footer.variants.CleaningFooter1;
export const gallery = sections.Gallery.variants.CleaningGallery1;

const content = {
  site,
  navbar,
  hero,
  stats,
  about,
  whyChooseUs,
  professionalCleaning,
  servicesSection,
  services,
  serviceDetailPage,
  testimonials,
  faqSection,
  faqs,
  blogs,
  blogsPage,
  blogDetailPage,
  categories,
  contact,
  contactMap,
  footer,
  gallery,
};

export default content;
