export const site = {
  name: "ModawalLabs",
  owner: "Shivansh Modawal",
  tagline: "Practical playbooks for non-technical founders.",
  description:
    "Seven practical playbooks that take non-technical founders from idea to a launched SaaS. Written by Shivansh Modawal, a full-stack developer and product designer.",
  email: "modawallabs@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/shivansh-modawal",
    stackoverflow: "https://stackoverflow.com/users/22928225/shivansh-modawal",
  },
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export const career = [
  {
    role: "Founder & Director",
    company: "Modawal Labs",
    text: "Designing, building and launching SaaS products with founders, from idea validation to production-ready MVPs.",
  },
  {
    role: "Lead UI/UX Designer",
    company: "QLeapAi LLC",
    text: "Leading the UI/UX design of five AI-powered applications, turning complex AI features into interfaces people understand.",
  },
  {
    role: "Technical Lead",
    company: "MediTechSafe Inc.",
    text: "Led a team of developers and interns, owning code quality, hiring and mentoring while staying hands-on in the product.",
  },
  {
    role: "Full-Stack Developer",
    company: "MediTechSafe Inc.",
    text: "Shipped platform capabilities in risk management, cybersecurity and compliance, from requirements and prototypes to production.",
  },
] as const;
