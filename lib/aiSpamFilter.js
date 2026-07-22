/**
 * 🛡️ AI Fake Review & Spam Filter Engine
 * Evaluates review title, comment, and star rating for spam patterns,
 * repetitive bot text, competitor hate speech, and sentiment mismatch.
 */

const SPAM_KEYWORDS = [
  "buy followers",
  "cheap price click here",
  "visit http",
  "www.",
  ".com",
  "telegram",
  "whatsapp group",
  "crypto",
  "earn money",
  "free money",
  "casino",
  "betting",
];

const COMPETITOR_ABUSE_KEYWORDS = [
  "fraud company",
  "total scam",
  "go to competitor",
  "don't buy here buy at",
  "fake business scammer",
];

const GIBBERISH_REGEX = /(.)\1{4,}|(asdf|qwerty|zxcv|12345|test123)/i;

export function analyzeReviewSpam({ title = "", comment = "", rating = 5 }) {
  let riskScore = 0;
  const reasons = [];

  const text = `${title} ${comment}`.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);

  // 1. Check for Spam URLs / External Promotion
  for (const keyword of SPAM_KEYWORDS) {
    if (text.includes(keyword)) {
      riskScore += 50;
      reasons.push("External promo / spam link detected");
      break;
    }
  }

  // 2. Check for Competitor Abuse Patterns
  for (const abuseKw of COMPETITOR_ABUSE_KEYWORDS) {
    if (text.includes(abuseKw)) {
      riskScore += 40;
      reasons.push("Unsubstantiated competitor attack keywords detected");
      break;
    }
  }

  // 3. Check for Gibberish & Character Repetition
  if (GIBBERISH_REGEX.test(text)) {
    riskScore += 35;
    reasons.push("Character repetition / gibberish pattern detected");
  }

  // 4. Check Word Repetition (Bot Pattern e.g. "good good good good")
  const wordFreq = {};
  let maxWordRepeat = 0;
  words.forEach((w) => {
    if (w.length > 2) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
      if (wordFreq[w] > maxWordRepeat) maxWordRepeat = wordFreq[w];
    }
  });

  if (words.length > 5 && maxWordRepeat / words.length > 0.4) {
    riskScore += 40;
    reasons.push("High word repetition spam score");
  }

  // 5. Sentiment Mismatch vs Star Rating
  const positiveWords = ["excellent", "amazing", "loved", "superb", "best", "great", "friendly", "wonderful"];
  const negativeWords = ["terrible", "worst", "horrible", "waste", "rubbish", "pathetic", "hate", "bad"];

  let posCount = 0;
  let negCount = 0;

  positiveWords.forEach((pw) => {
    if (text.includes(pw)) posCount++;
  });

  negativeWords.forEach((nw) => {
    if (text.includes(nw)) negCount++;
  });

  // Mismatch: 5 stars with only negative text
  if (rating === 5 && negCount >= 2 && posCount === 0) {
    riskScore += 35;
    reasons.push("Rating-Sentiment Mismatch (5 Stars with highly negative text)");
  }

  // Mismatch: 1 star with only positive text
  if (rating === 1 && posCount >= 2 && negCount === 0) {
    riskScore += 35;
    reasons.push("Rating-Sentiment Mismatch (1 Star with glowing positive text)");
  }

  // 6. Low effort short text check
  if (comment.trim().length < 10) {
    riskScore += 20;
    reasons.push("Very short comment length");
  }

  // Cap risk score between 0 and 100
  riskScore = Math.min(100, Math.max(0, riskScore));
  const isSpam = riskScore >= 60;

  return {
    isSpam,
    riskScore,
    status: isSpam ? "FLAGGED_SPAM" : "APPROVED",
    reason: reasons.length > 0 ? reasons.join("; ") : "Verified Genuine Customer Review",
  };
}
