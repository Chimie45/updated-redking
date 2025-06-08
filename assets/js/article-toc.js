document.addEventListener('DOMContentLoaded', function() {
    const tocContainer = document.getElementById('toc-placeholder');
    const articleContent = document.querySelector('.article-content');

    if (!tocContainer || !articleContent) {
        return; // Exit if the necessary elements aren't on the page
    }

    // Find all h2 and h3 headings within the article content
    const headings = articleContent.querySelectorAll('h2, h3');
    
    if (headings.length < 2) {
        // Don't generate a TOC if there are fewer than 2 headings
        tocContainer.style.display = 'none';
        return;
    }

    let tocHTML = '<div class="toc-container"><h3>Table of Contents</h3><ul>';

    headings.forEach((heading, index) => {
        const level = heading.tagName.toLowerCase(); // 'h2' or 'h3'
        const title = heading.textContent;
        
        // Create a unique ID for the heading if it doesn't have one
        let id = heading.getAttribute('id');
        if (!id) {
            id = 'toc-heading-' + index;
            heading.setAttribute('id', id);
        }

        // Add the list item to the TOC html string
        tocHTML += `<li class="toc-level-${level.charAt(1)}"><a href="#${id}">${title}</a></li>`;
    });

    tocHTML += '</ul></div>';
    
    // Insert the generated HTML into the placeholder
    tocContainer.innerHTML = tocHTML;

    // Smooth scrolling for TOC links
    tocContainer.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                 // Adjust for the height of the fixed navigation bar
                const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20; // 20px buffer

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
