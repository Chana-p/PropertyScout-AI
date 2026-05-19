import axios from 'axios'
import * as cheerio from 'cheerio'
import logger from '../utils/logger.js'

const YAD2_URL = 'https://www.yad2.co.il/real-estate/sale'

/**
 * Scrapes real estate listings from Yad2
 * Note: This is a demo. In production, check robots.txt and terms of service
 */
export async function scrapeYad2() {
  try {
    logger.info('Starting Yad2 scraper...')

    // For now, return mock data
    // In production, this would actually fetch and parse HTML
    const mockListings = generateMockListings()

    logger.success(`Scraped ${mockListings.length} listings from Yad2`)
    return mockListings
  } catch (error) {
    logger.error('Error scraping Yad2', error.message)
    return []
  }
}

/**
 * Generates mock real estate listings for demo purposes
 */
function generateMockListings() {
  const cities = ['תל אביב', 'ירושלים', 'ראשון לציון', 'הרצליה', 'בת ים']
  const types = ['apartment', 'house', 'building']
  const neighborhoods = {
    'תל אביב': ['מרכז', 'דרום', 'צפון', 'מזרח'],
    'ירושלים': ['גבעת מורג', 'רמות', 'רחביה', 'קטמון'],
    'ראשון לציון': ['מרכז', 'מזרח', 'מערב'],
    'הרצליה': ['כנתות', 'מזרח'],
    'בת ים': ['מרכז', 'חוף']
  }

  const listings = []

  for (let i = 0; i < 15; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)]
    const neighborhood = neighborhoods[city][Math.floor(Math.random() * neighborhoods[city].length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const price = Math.floor(Math.random() * 2000000 + 200000)
    const size = Math.floor(Math.random() * 200 + 50)
    const rooms = Math.floor(Math.random() * 5 + 1)

    listings.push({
      id: `yad2-${i + 1}`,
      address: `רחוב ${String.fromCharCode(64 + Math.floor(Math.random() * 26))} ${Math.floor(Math.random() * 300) + 1}`,
      city,
      neighborhood,
      type,
      price,
      size,
      rooms,
      description: `${type === 'apartment' ? 'דירה' : 'בנין'} ${rooms} חדרים, ${size} מ"ר, במיקום טוב`,
      url: `${YAD2_URL}/${i + 1}`,
      source: 'yad2',
      scrapedAt: new Date().toISOString()
    })
  }

  return listings
}

/**
 * Actual scraper function (stub for future implementation)
 * This would need proper HTML parsing and error handling
 */
async function fetchAndParseYad2() {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    const { data } = await axios.get(YAD2_URL, { headers, timeout: 10000 })
    const $ = cheerio.load(data)

    const listings = []

    // Parse listings (this is example selector - would need actual inspection)
    $('[data-listing]').each((index, element) => {
      try {
        const listing = {
          id: $(element).attr('data-listing-id'),
          address: $(element).find('[data-address]').text().trim(),
          price: parsePrice($(element).find('[data-price]').text()),
          size: parseSize($(element).find('[data-size]').text()),
          rooms: parseInt($(element).find('[data-rooms]').text()),
          url: $(element).find('a').attr('href'),
          scrapedAt: new Date().toISOString()
        }

        if (listing.price && listing.address) {
          listings.push(listing)
        }
      } catch (e) {
        logger.warn(`Error parsing listing ${index}`)
      }
    })

    return listings
  } catch (error) {
    logger.error('Error fetching Yad2', error.message)
    return []
  }
}

/**
 * Helper to parse price text
 */
function parsePrice(text) {
  const match = text.match(/\d+/g)
  if (match) {
    return parseInt(match.join(''))
  }
  return null
}

/**
 * Helper to parse size text
 */
function parseSize(text) {
  const match = text.match(/(\d+)\s*מ"?ר?/)
  if (match) {
    return parseInt(match[1])
  }
  return null
}

/**
 * Main function to run scraper
 */
export async function runScraper() {
  logger.info('🕷️ Web Scraper started')
  const listings = await scrapeYad2()

  if (listings.length > 0) {
    logger.success(`Found ${listings.length} listings`)
  } else {
    logger.warn('No listings found')
  }

  return listings
}

// If run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  runScraper().then(listings => {
    console.log(JSON.stringify(listings, null, 2))
  })
}
