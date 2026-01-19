/**
 * Smooth scroll utility for navigating to page sections
 */

/**
 * Scrolls smoothly to a section by its ID
 * @param sectionId - The ID of the element to scroll to (without #)
 * @param offset - Optional offset from the top (default: 0)
 */
export const scrollToSection = (sectionId: string, offset: number = 0) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

/**
 * Scrolls to the top of the page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
