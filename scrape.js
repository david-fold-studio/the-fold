const FirecrawlApp =
  require('@mendable/firecrawl-js').default

async function scrapeWebsite() {
  try {
    // Initialize Firecrawl - you'll need to set your API key
    const app = new FirecrawlApp({
      apiKey:
        process.env.FIRECRAWL_API_KEY ||
        'your-api-key-here',
    })

    console.log(
      'Starting to scrape: https://ineffable-employee-445106.framer.app/'
    )

    const scrapeResult = await app.scrapeUrl(
      'https://ineffable-employee-445106.framer.app/',
      {
        formats: ['markdown', 'html'],
        onlyMainContent: false,
        includeTags: [
          'img',
          'a',
          'button',
          'form',
          'nav',
          'header',
          'footer',
          'section',
        ],
        waitFor: 3000,
        mobile: false,
      }
    )

    if (scrapeResult.success) {
      console.log('Scrape successful!')
      console.log('\n=== MARKDOWN CONTENT ===')
      console.log(scrapeResult.data.markdown)

      console.log('\n=== HTML CONTENT ===')
      console.log(scrapeResult.data.html)

      console.log('\n=== METADATA ===')
      console.log(
        JSON.stringify(
          scrapeResult.data.metadata,
          null,
          2
        )
      )

      // Save to files
      const fs = require('fs')
      fs.writeFileSync(
        './scraped-content.md',
        scrapeResult.data.markdown
      )
      fs.writeFileSync(
        './scraped-content.html',
        scrapeResult.data.html
      )
      fs.writeFileSync(
        './scraped-metadata.json',
        JSON.stringify(
          scrapeResult.data.metadata,
          null,
          2
        )
      )

      console.log('\nFiles saved:')
      console.log('- scraped-content.md')
      console.log('- scraped-content.html')
      console.log('- scraped-metadata.json')
    } else {
      console.error(
        'Scrape failed:',
        scrapeResult.error
      )
    }
  } catch (error) {
    console.error('Error:', error.message)

    // Fallback: try without API key (might work with free tier)
    console.log('\nTrying without API key...')
    try {
      const app = new FirecrawlApp()
      const scrapeResult = await app.scrapeUrl(
        'https://ineffable-employee-445106.framer.app/',
        {
          formats: ['markdown', 'html'],
        }
      )

      if (scrapeResult.success) {
        console.log('Fallback scrape successful!')
        console.log(scrapeResult.data.markdown)
      }
    } catch (fallbackError) {
      console.error(
        'Fallback also failed:',
        fallbackError.message
      )
      console.log(
        '\nPlease sign up for a Firecrawl API key at: https://firecrawl.dev'
      )
    }
  }
}

scrapeWebsite()
