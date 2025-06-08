// --- Blog Content Management ---
const blogArticles = [
    {
        id: 'effective-igaming-marketing',
        isFeatured: true,
        title: 'Effective Marketing in Regulated iGaming Sectors',
        excerpt: 'A deep dive into the high-risk, high-reward iGaming markets of Japan and South Korea, analyzing the Ohtani scandal and the strategies for navigating these regulatory minefields.',
        // MODIFICATION: Consolidated thumbnail and heroImage into a single 'image' property.
        image: '../assets/images/blog/igaming-article-hero.jpg',
        contentUrl: 'articles/effective-igaming-marketing.html'
    },
    {
        id: 'latam-cultural-credibility',
        isFeatured: false,
        title: 'Cultural Credibility: What iGaming Brands Get Wrong in LATAM',
        excerpt: 'An honest look at why many global iGaming campaigns fall flat in Latin America and how to fix it through regional teams, slang fluency, and local content creation.',
        image: '../assets/images/blog/latam-cultural-hero.jpg',
        contentUrl: 'articles/latam-cultural-credibility.html'
    },
    {
        id: 'korea-igaming-potential',
        isFeatured: false,
        title: 'The Untapped Potential of Korea\'s iGaming Audience—And What\'s Holding It Back',
        excerpt: 'A deep dive into Korea\'s unique legal and cultural challenges around iGaming, why local interest still exists despite restrictions, and how global brands can engage Korean users responsibly.',
        image: '../assets/images/blog/korea-igaming-hero.jpg',
        contentUrl: 'articles/korea-igaming-potential.html'
    },
    {
        id: 'latam-learns-from-asia',
        isFeatured: false,
        title: 'What LATAM Gaming Companies Can Learn from Asia\'s Mobile Gaming Boom',
        excerpt: 'Latin America\'s booming mobile market can unlock its potential by adapting proven strategies from Asia\'s $40+ billion ecosystem on cultural integration, monetization, and community design.',
        image: '../assets/images/blog/latam-asia-hero.jpg',
        contentUrl: 'articles/latam-learns-from-asia.html'
    },
    {
        id: 'gaming-trends-2025',
        isFeatured: false,
        title: 'Gaming Market Trends 2025',
        excerpt: 'Discover the latest trends shaping the gaming industry and how to capitalize on emerging opportunities in global markets.',
        image: '../assets/images/blog/gaming-trends-2025-hero.jpg',
        contentUrl: 'articles/gaming-trends-2025.html'
    },
    {
        id: 'asian-gaming-markets',
        isFeatured: false,
        title: 'Asian Gaming Markets Guide',
        excerpt: 'Unlock the potential of the world\'s largest gaming region. This guide breaks down the key differences between markets like Japan, South Korea, and Southeast Asia.',
        image: '../assets/images/blog/asian-gaming-markets-hero.jpg',
        contentUrl: 'articles/asian-gaming-markets.html'
    }
];

// --- Page Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // This script is specifically for the blog page, so we can directly call the functions.
    if (document.getElementById('featured-article-container')) {
        displayFeaturedArticle();
    }
    if (document.getElementById('blog-grid-container')) {
        displayLatestArticles();
    }
});

// --- Dynamic Content Functions ---
function displayFeaturedArticle() {
    const featuredContainer = document.getElementById('featured-article-container');
    const featuredArticle = blogArticles.find(article => article.isFeatured);

    if (!featuredContainer || !featuredArticle) return;

    // The image paths in this template literal will now work because the `blogArticles` object has the correct paths.
    const articleHTML = `
        <div class="featured-article-card blog-card" onclick="openBlogModal('${featuredArticle.id}')">
            <div class="featured-article-image">
                <img src="${featuredArticle.image}" alt="${featuredArticle.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1a1a1a/f5f5f5?text=Image+Not+Found';">
            </div>
            <div class="featured-article-content">
                <span class="featured-tag">Featured Article</span>
                <h2>${featuredArticle.title}</h2>
                <p class="article-excerpt">${featuredArticle.excerpt}</p>
                <span class="read-more-link">Read Full Story &rarr;</span>
            </div>
        </div>
    `;
    featuredContainer.innerHTML = articleHTML;
    
    // Use the globally defined observer from scripts.js
    if (typeof animatedElementsObserver !== 'undefined') {
        const cardElement = featuredContainer.querySelector('.featured-article-card');
        if(cardElement) {
            animatedElementsObserver.observe(cardElement);
        }
    }
}

function displayLatestArticles() {
    const gridContainer = document.getElementById('blog-grid-container');
    const latestArticles = blogArticles.filter(article => !article.isFeatured);

    if (!gridContainer) return;

    let articlesHTML = '';
    latestArticles.forEach(article => {
        // The image paths here will also be correct.
        articlesHTML += `
            <div class="blog-card" onclick="openBlogModal('${article.id}')">
                <div class="blog-card-thumbnail">
                    <img src="${article.image}" alt="${article.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/1a1a1a/f5f5f5?text=Image+Not+Found';">
                </div>
                <div class="blog-card-content">
                    <h3>${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <span class="read-more-link">Read More &rarr;</span>
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = articlesHTML;

    // Use the globally defined observer from scripts.js
    if (typeof animatedElementsObserver !== 'undefined') {
        gridContainer.querySelectorAll('.blog-card').forEach(card => {
            animatedElementsObserver.observe(card);
        });
    }
}

// --- Modal Functionality ---
async function openBlogModal(articleId) {
    const articleData = blogArticles.find(a => a.id === articleId);
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMeta = document.getElementById('modal-meta');
    const modalContent = document.getElementById('modal-content');
    const modalHeroImage = document.getElementById('modal-hero-image');

    if (!articleData || !modal) {
        console.error('Article data or modal element not found.');
        return;
    }

    // Set content immediately with correct image paths
    modalTitle.textContent = articleData.title;
    // MODIFICATION: Using the single 'image' property
    modalHeroImage.src = articleData.image;
    modalHeroImage.alt = articleData.title;
    modalMeta.innerHTML = '';
    modalContent.innerHTML = '<p>Loading article...</p>';

    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    // Ensure modal content scrolls to top on open
    const contentBox = modal.querySelector('.blog-modal-content');
    if (contentBox) contentBox.scrollTop = 0;


    if (!articleData.contentUrl) {
        modalContent.innerHTML = '<p>Article content is not available yet. Please check back later.</p>';
        return;
    }

    try {
        // Fetch will now use the corrected path like 'articles/effective-igaming-marketing.html'
        const response = await fetch(articleData.contentUrl, { redirect: 'error' });

        if (!response.ok) {
            throw new Error(`Could not load article. Server responded with status: ${response.status}`);
        }
        
        const htmlString = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || 'Unknown Author';
        const creationDateStr = doc.querySelector('meta[name="creation-date"]')?.getAttribute('content');
        
        let displayDate = 'Unknown Date';
        if (creationDateStr) {
            const date = new Date(creationDateStr + 'T00:00:00');
            displayDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        }

        const articleBody = doc.querySelector('.article-content .article-body')?.innerHTML || doc.querySelector('.article-content')?.innerHTML || '<p>Could not find article content.</p>';

        modalTitle.textContent = doc.querySelector('title')?.textContent || articleData.title;
        modalMeta.innerHTML = `
            <span><strong>By:</strong> ${author}</span>
            <span><strong>Date:</strong> ${displayDate}</span>
        `;
        modalContent.innerHTML = articleBody;

    } catch (error) {
        console.error('Error fetching article content:', error);
        modalContent.innerHTML = `<p>Sorry, there was an error loading the article. Please check that the file path is correct or try again later.</p>`;
    }
}


function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('modal--is-open');
    }
    // checkAndRestoreScroll is defined in scripts.js and will be available
    if(typeof checkAndRestoreScroll === 'function') {
        checkAndRestoreScroll();
    } else {
        document.body.style.overflow = 'auto'; // Fallback
    }
}
