# Hukamnama API - Enhanced Web Scraping Implementation

## Overview
The Hukamnama API route (`/api/hukamnama`) has been completely rewritten with improved web scraping capabilities specifically tailored to the SGPC website structure at `https://hs.sgpc.net/index.php`.

## Key Improvements

### 1. **Enhanced Data Structure**
```typescript
interface HukamnamaData {
  date: string              // Gregorian date (e.g., "18-06-2025")
  dateNanakshahi: string    // Nanakshahi calendar date (Gurmukhi)
  ang: string               // Page number from Sri Guru Granth Sahib
  raag: string              // Musical mode (e.g., "ਰਾਗੁ ਧਨਾਸਰੀ")
  gurmukhi: string          // Main Gurmukhi text of the Hukamnama
  transliteration: string   // Roman transliteration
  punjabi: string           // Punjabi explanation/interpretation
  english: string           // English translation
  audioHukamnama?: string   // Direct link to Hukamnama audio
  audioKatha?: string       // Direct link to Katha (commentary) audio
  pdfLink?: string          // Link to PDF version
  source: string            // Source attribution
}
```

### 2. **Precise Web Scraping Selectors**

Based on the actual SGPC website HTML structure, the API now uses specific CSS selectors:

- **Date**: `.customDate strong` - Extracts the current date
- **Nanakshahi Date**: `.hukamnama-card .customDate strong` - Extracts Sikh calendar date
- **Ang (Page Number)**: Regex pattern `\(ਅੰਗ:\s*(\d+)\)` to extract page numbers
- **Raag**: `.hukamnama-card h4.hukamnama-title` - Musical mode information
- **Gurmukhi Text**: `.hukamnama-card .hukamnama-text` - Main sacred text
- **Punjabi Explanation**: `.hukamnama-card2:first .hukamnama-text` - Punjabi interpretation
- **English Translation**: `.hukamnama-card2:last .hukamnama-text` - English translation
- **Audio Files**: `audio` elements with `src` attributes
- **PDF Link**: `a[href*="pdfdownload.php"]` - Direct PDF access

### 3. **Enhanced HTTP Headers**
```javascript
headers: {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,pa;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache'
}
```

### 4. **Comprehensive Error Handling & Fallbacks**

- **Graceful Degradation**: If specific content is not found, provides meaningful fallbacks
- **Mool Mantar Fallback**: Returns the fundamental Sikh prayer if main content fails
- **Comprehensive Logging**: Detailed console output for debugging
- **Data Validation**: Ensures minimum content length before proceeding

### 5. **Audio & Media Extraction**

The API now extracts:
- **Hukamnama Audio**: Direct link to the daily recitation
- **Katha Audio**: Link to the commentary/explanation
- **PDF Download**: Direct access to the PDF version

### 6. **Response Format**

```json
{
  "success": true,
  "data": {
    "date": "18-06-2025",
    "dateNanakshahi": "੪ ਹਾੜ (ਸੰਮਤ ੫੫੭ ਨਾਨਕਸ਼ਾਹੀ)",
    "ang": "692",
    "raag": "ਰਾਗੁ ਧਨਾਸਰੀ ਬਾਣੀ ਭਗਤ ਕਬੀਰ ਜੀ ਕੀ",
    "gurmukhi": "ਰਾਮ ਸਿਮਰਿ ਰਾਮ ਸਿਮਰਿ...",
    "punjabi": "ਹੇ ਭਾਈ! ਪ੍ਰਭੂ ਦਾ ਸਿਮਰਨ ਕਰ...",
    "english": "Remember the Lord, remember the Lord...",
    "audioHukamnama": "https://hs.sgpc.net/audiohukamnama/audio-xxx.mp3",
    "audioKatha": "https://hs.sgpc.net/audiokatha/audio-xxx.mp3",
    "pdfLink": "https://hs.sgpc.net/pdfdownload.php?id=xxx",
    "source": "Sri Harmandir Sahib, Amritsar (SGPC)"
  },
  "timestamp": "2025-06-18T21:30:21.000Z",
  "extracted_from": "SGPC Website"
}
```

## Usage

### API Endpoint
```
GET /api/hukamnama
```

### Example Response Fields

1. **date**: Current Gregorian date
2. **dateNanakshahi**: Date in Nanakshahi calendar (Sikh calendar)
3. **ang**: Page number from Sri Guru Granth Sahib
4. **raag**: Musical mode and composer information
5. **gurmukhi**: The actual Gurbani text in Gurmukhi script
6. **punjabi**: Detailed Punjabi explanation and meaning
7. **english**: English translation of the Gurbani
8. **audioHukamnama**: Direct MP3 link for listening to the Hukamnama
9. **audioKatha**: Direct MP3 link for the commentary
10. **pdfLink**: Direct PDF download link

## Benefits

### For Developers
- **Structured Data**: Clear, typed interface for all Hukamnama components
- **Rich Metadata**: Includes dates, page numbers, and audio/PDF links
- **Reliable Fallbacks**: Always returns valid data, even if scraping partially fails
- **Detailed Logging**: Comprehensive console output for debugging

### For Users
- **Daily Updates**: Fresh content scraped from the official SGPC website
- **Multiple Formats**: Text, audio, and PDF access
- **Multilingual**: Gurmukhi, Punjabi, and English content
- **Authentic Source**: Direct from Sri Harmandir Sahib, Amritsar

## Technical Notes

- **Caching**: `cache: 'no-store'` ensures fresh daily content
- **Unicode Support**: Proper handling of Gurmukhi script
- **URL Construction**: Automatic handling of relative/absolute URLs
- **Error Recovery**: Comprehensive fallback mechanisms
- **Performance**: Optimized selectors for fast extraction

## Future Enhancements

- [ ] Add transliteration extraction if available
- [ ] Implement caching with appropriate TTL
- [ ] Add support for historical Hukamnama lookup
- [ ] Include Sangrand (monthly) Hukamnama support
- [ ] Add audio duration metadata
- [ ] Implement retry logic for network failures

---

*This API provides authentic daily Hukamnama content from Sri Harmandir Sahib, Amritsar, through the official SGPC website.* 