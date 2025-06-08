const blogArticles = [
    {
        id: 'effective-igaming-marketing',
        isFeatured: true,
        title: 'Effective Marketing in Regulated iGaming Sectors',
        excerpt: 'Japan and Korea represent billion-dollar iGaming opportunities trapped in regulatory minefields. Cultural taboos and legal complexity make these lucrative markets dangerous for unprepared brands.',
        image: '/assets/images/blog/igaming-article-hero.jpg',
        contentUrl: '/blog/articles/effective-igaming-marketing'
    },
    {
        id: 'latam-cultural-credibility',
        isFeatured: false,
        title: 'What iGaming Brands Get Wrong in LATAM',
        excerpt: 'International brands burn millions in Latin America by treating diverse markets as homogeneous. Cultural blindness, payment misunderstanding, and regulatory ignorance cost sustainable growth opportunities.',
        image: '/assets/images/blog/latam-cultural-hero.jpg',
        contentUrl: '/blog/articles/latam-cultural-credibility'
    },
    {
        id: 'korea-igaming-potential',
        isFeatured: false,
        title: 'The Untapped Potential of Korean iGaming',
        excerpt: 'South Korea represents a massive untapped iGaming market with 52 million tech-savvy consumers, but regulatory complexity and cultural taboos create both opportunity and risk for international operators.',
        image: '/assets/images/blog/korea-igaming-hero.jpg',
        contentUrl: '/blog/articles/korea-igaming-potential'
    },
    {
        id: 'latam-learns-from-asia',
        isFeatured: false,
        title: 'What LATAM Gaming Companies Can Learn from Asia',
        excerpt: 'LATAM gaming companies are leaving billions on the table by ignoring Asia\'s proven playbook. After watching both markets evolve, the lessons are obvious—if you\'re willing to learn.',
        image: '/assets/images/blog/latam-asia-hero.jpg',
        contentUrl: '/blog/articles/latam-learns-from-asia'
    },
    {
        id: 'gaming-trends-2025',
        isFeatured: false,
        title: 'Gaming Market Trends 2025',
        excerpt: 'Gaming evolves beyond entertainment into cultural infrastructure. Cross-platform engagement, creator-driven discovery, and AI personalization reshape marketing strategies for 2025\'s $300+ billion industry.',
        image: '/assets/images/blog/gaming-trends-2025-hero.jpg',
        contentUrl: '/blog/articles/gaming-trends-2025'
    },
    {
        id: 'asian-gaming-markets',
        isFeatured: false,
        title: 'Asian Gaming Markets Guide',
        excerpt: 'Unlock the potential of the world\'s largest gaming region. This guide breaks down the key differences between markets like Japan, South Korea, and Southeast Asia.',
        image: '/assets/images/blog/asian-gaming-markets-hero.jpg',
        contentUrl: '/blog/articles/asian-gaming-markets'
    }
];
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('featured-article-container')) {
        displayFeaturedArticle();
    }
    if (document.getElementById('blog-grid-container')) {
        displayLatestArticles();
    }
});
async function displayFeaturedArticle() {
    const featuredContainer = document.getElementById('featured-article-container');
    const featuredArticle = blogArticles.find(article => article.isFeatured);

    if (!featuredContainer || !featuredArticle) return;

    let author = 'RedKing Marketing';
    let displayDate = 'Recent';

    if (featuredArticle.contentUrl) {
        try {
            const response = await fetch(featuredArticle.contentUrl);
            if (response.ok) {
                const htmlString = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, 'text/html');

                const authorMeta = doc.querySelector('meta[name="author"]')?.getAttribute('content');
                const creationDateStr = doc.querySelector('meta[name="creation-date"]')?.getAttribute('content');
                
                if (authorMeta) {
                    author = authorMeta;
                }
                
                if (creationDateStr) {
                    const date = new Date(creationDateStr + 'T00:00:00');
                    displayDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
                }
            }
        } catch (error) {
            console.log('Could not fetch article metadata for featured article:', error);
        }
    }

    const articleHTML = `
        <div class="featured-article-card blog-card" onclick="openBlogModal('${featuredArticle.id}')">
            <div class="featured-article-image">
                <img src="${featuredArticle.image}" alt="${featuredArticle.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1a1a1a/f5f5f5?text=Image+Not+Found';">
            </div>
            <div class="featured-article-content">
                <h2>${featuredArticle.title}</h2>
                <div class="featured-article-meta">
                    <span class="featured-tag">Featured</span>
                    <span class="featured-author">${author}</span>
                    <span class="featured-date">${displayDate}</span>
                </div>
                <p class="article-excerpt">${featuredArticle.excerpt}</p>
                <span class="read-more-link">Read Full Article &rarr;</span>
            </div>
        </div>
    `;
    featuredContainer.innerHTML = articleHTML;
    
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

    if (typeof animatedElementsObserver !== 'undefined') {
        gridContainer.querySelectorAll('.blog-card').forEach(card => {
            animatedElementsObserver.observe(card);
        });
    }
}

async function openBlogModal(articleId) {
    const articleData = blogArticles.find(a => a.id === articleId);
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMeta = document.getElementById('modal-meta');
    const modalContent = document.getElementById('modal-content');
    const modalHeroImage = document.getElementById('modal-hero-image');

    if (!articleData || !modal) {
        console.error('Article data or modal element not found for ID:', articleId);
        return;
    }

    modalTitle.textContent = articleData.title;
    modalHeroImage.src = articleData.image;
    modalHeroImage.alt = articleData.title;
    modalMeta.innerHTML = '';
    modalContent.innerHTML = '<p>Loading article...</p>';

    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    const contentBox = modal.querySelector('.blog-modal-content');
    if (contentBox) contentBox.scrollTop = 0;

    if (!articleData.contentUrl) {
        console.error('Article has no contentUrl defined:', articleData.title);
        modalContent.innerHTML = '<p>Article content is not available yet. Please check back later.</p>';
        return;
    }
    
    console.log(`Attempting to fetch article from: ${articleData.contentUrl}`);

    try {
        const response = await fetch(articleData.contentUrl, { redirect: 'error' });

        if (!response.ok) {
            throw new Error(`Could not load article. Server responded with status: ${response.status} (${response.statusText}) for URL: ${response.url}`);
        }
        
        const htmlString = await response.text();
        console.log('Successfully fetched article content.');
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || 'Unknown Author';
        const creationDateStr = doc.querySelector('meta[name="creation-date"]')?.getAttribute('content');
        
        let displayDate = 'Unknown Date';
        if (creationDateStr) {
            const date = new Date(creationDateStr + 'T00:00:00');
            displayDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        }
        
        const articleBodyContent = doc.querySelector('.article-body')?.innerHTML || doc.querySelector('.article-content')?.innerHTML || '<p>Could not find article content within the fetched file.</p>';

        modalTitle.textContent = doc.querySelector('title')?.textContent || articleData.title;
        modalMeta.innerHTML = `
            <span><strong>By:</strong> ${author}</span>
            <span><strong>Date:</strong> ${displayDate}</span>
        `;

        modalContent.innerHTML = `<div class="article-body">${articleBodyContent}</div>`;

    } catch (error) {
        console.error('Error fetching article content:', error);
        modalContent.innerHTML = `<p>Sorry, there was an error loading the article. Please try again later. Check the console for more details.</p>`;
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('modal--is-open');
    }
    if(typeof checkAndRestoreScroll === 'function') {
        checkAndRestoreScroll();
    } else {
        document.body.style.overflow = 'auto';
    }
}
