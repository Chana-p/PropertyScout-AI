import logger from '../utils/logger.js'

/**
 * Analyzes and scores properties based on search criteria
 */
export function analyzeProperties(properties, criteria) {
  if (!properties || !criteria) {
    return []
  }

  logger.info(`Analyzing ${properties.length} properties against ${criteria.length} criteria`)

  return properties.map(property => {
    let totalScore = 0
    let matchedCriteria = []

    // Score against each criterion
    criteria.forEach(criterion => {
      const score = scoreAgainstCriterion(property, criterion)
      if (score > 0) {
        totalScore += score * criterion.weight
        matchedCriteria.push(criterion.name)
      }
    })

    // Normalize score to 0-100
    const normalizedScore = Math.min(100, Math.round(totalScore))

    return {
      ...property,
      score: normalizedScore,
      matchedCriteria,
      matchCount: matchedCriteria.length
    }
  }).filter(p => p.score > 0).sort((a, b) => b.score - a.score)
}

/**
 * Scores a single property against one criterion
 */
function scoreAgainstCriterion(property, criterion) {
  let score = 0

  // Price check
  const price = property.price || 0
  const priceMin = criterion.priceMin || 0
  const priceMax = criterion.priceMax || Infinity

  if (price < priceMin || price > priceMax) {
    return 0 // Doesn't match price range
  }

  // Price score: lower price within range = higher score
  const priceScore = ((priceMax - price) / (priceMax - priceMin)) * 30
  score += priceScore

  // Size check
  const size = property.size || 0
  const sizeMin = criterion.sizeMin || 0

  if (size < sizeMin) {
    return 0 // Doesn't meet minimum size
  }

  // Size score: larger size = slightly higher score
  const sizeScore = Math.min(20, (size / sizeMin) * 10)
  score += sizeScore

  // Location match
  if (criterion.locations && criterion.locations.length > 0) {
    if (criterion.locations.includes(property.city)) {
      score += 25
    } else {
      return 0 // Location not in preferences
    }
  } else {
    score += 25 // No location preference = full points
  }

  // Type match
  if (criterion.type && property.type) {
    if (criterion.type.toLowerCase() === property.type.toLowerCase()) {
      score += 15
    } else {
      return 0 // Type doesn't match
    }
  } else {
    score += 15 // No type preference = full points
  }

  // Keywords match
  if (criterion.keywords && criterion.keywords.length > 0) {
    const description = (property.description || '').toLowerCase()
    let keywordMatches = 0

    criterion.keywords.forEach(keyword => {
      if (description.includes(keyword.toLowerCase())) {
        keywordMatches++
      }
    })

    if (keywordMatches > 0) {
      score += (keywordMatches / criterion.keywords.length) * 10
    }
  }

  return Math.max(0, score)
}

/**
 * Generates a reason text for why a property scored well
 */
export function generateReason(property, matchedCriteria) {
  if (!matchedCriteria || matchedCriteria.length === 0) {
    return 'עסקה טובה'
  }

  const reasons = matchedCriteria.slice(0, 2).join(' + ')
  return `עמדת בקריטריונים: ${reasons}`
}

/**
 * Main analysis function to be called from controllers
 */
export async function analyzeAndScore(properties, criteria) {
  try {
    const analyzed = analyzeProperties(properties, criteria)

    return analyzed.map(property => ({
      ...property,
      reason: generateReason(property, property.matchedCriteria)
    }))
  } catch (error) {
    logger.error('Error in analysis', error.message)
    return []
  }
}
