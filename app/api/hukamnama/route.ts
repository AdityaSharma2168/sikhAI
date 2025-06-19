import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

interface HukamnamaData {
  date: string
  dateNanakshahi: string
  ang: string
  raag: string
  gurmukhi: string
  transliteration: string
  punjabi: string
  english: string
  audioHukamnama?: string
  audioKatha?: string
  pdfLink?: string
  source: string
}

export async function GET() {
  try {
    // Fetch the SGPC Hukamnama page with proper headers
    const response = await fetch('https://hs.sgpc.net/index.php', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,pa;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      cache: 'no-store' // Ensure fresh data
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Initialize the data object
    const hukamnamaData: HukamnamaData = {
      date: '',
      dateNanakshahi: '',
      ang: '',
      raag: '',
      gurmukhi: '',
      transliteration: '',
      punjabi: '',
      english: '',
      audioHukamnama: '',
      audioKatha: '',
      pdfLink: '',
      source: 'Sri Harmandir Sahib, Amritsar (SGPC)'
    }

    console.log('Starting to extract Hukamnama data...')

    // Extract date - look for the date in customDate class
    const dateElement = $('.customDate strong').first()
    if (dateElement.length > 0) {
      hukamnamaData.date = dateElement.text().trim()
      console.log('Found date:', hukamnamaData.date)
    }

    // Extract Nanakshahi date from the Gurmukhi section
    const nanakshahiElement = $('.hukamnama-card .customDate strong').first()
    if (nanakshahiElement.length > 0) {
      hukamnamaData.dateNanakshahi = nanakshahiElement.text().trim()
      console.log('Found Nanakshahi date:', hukamnamaData.dateNanakshahi)
    }

    // Extract Ang (page number)
    const angElement = $('.hukamnama-card .customDate strong').last()
    if (angElement.length > 0) {
      const angText = angElement.text().trim()
      const angMatch = angText.match(/\(ਅੰਗ:\s*(\d+)\)/)
      if (angMatch) {
        hukamnamaData.ang = angMatch[1]
        console.log('Found Ang:', hukamnamaData.ang)
      }
    }

    // Extract Raag from the title
    const raagElement = $('.hukamnama-card h4.hukamnama-title').first()
    if (raagElement.length > 0) {
      hukamnamaData.raag = raagElement.text().trim()
      console.log('Found Raag:', hukamnamaData.raag)
    }

    // Extract main Gurmukhi text
    const gurmukhiElement = $('.hukamnama-card .hukamnama-text').first()
    if (gurmukhiElement.length > 0) {
      // Get the main shabad text, excluding the date and ang info
      let gurmukhiText = gurmukhiElement.text().trim()
      
      // Clean up any extra whitespace
      gurmukhiText = gurmukhiText.replace(/\s+/g, ' ').trim()
      
      hukamnamaData.gurmukhi = gurmukhiText
      console.log('Found Gurmukhi text length:', gurmukhiText.length)
    }

    // Extract Punjabi explanation
    const punjabiCard = $('.hukamnama-card2').first()
    if (punjabiCard.length > 0) {
      const punjabiText = punjabiCard.find('.hukamnama-text').text().trim()
      if (punjabiText) {
        hukamnamaData.punjabi = punjabiText.replace(/\s+/g, ' ').trim()
        console.log('Found Punjabi explanation length:', hukamnamaData.punjabi.length)
      }
    }

    const englishCard = $('.hukamnama-card2').last()
    if (englishCard.length > 0) {
      const englishText = englishCard.find('.hukamnama-text').text().trim()
      if (englishText) {
        hukamnamaData.english = englishText.replace(/\s+/g, ' ').trim()
        console.log('Found English explanation length:', hukamnamaData.english.length)
      }
    }

    /*
    // Extract English translation - Enhanced extraction
    const englishCards = $('.hukamnama-card2')
    console.log('Found hukamnama-card2 elements:', englishCards.length)
    
    // Look for English content in multiple ways
    let englishText = ''
    
    // Method 1: Check each card for English content
    englishCards.each((index, card) => {
      const cardTitle = $(card).find('h4.hukamnama-title').text().trim()
      const cardText = $(card).find('.hukamnama-text').text().trim()
      
      console.log(`Card ${index} title:`, cardTitle)
      console.log(`Card ${index} text length:`, cardText.length)
      
      // Look for "English Translation" title or English text patterns
      if (cardTitle.toLowerCase().includes('english') || 
          cardTitle.includes('Translation') ||
          cardText.match(/^[A-Z][A-Za-z\s,.:;!?"'-]+$/)) {
        
        if (cardText && cardText !== hukamnamaData.punjabi && cardText.length > 50) {
          englishText = cardText
          console.log('Found English translation via method 1')
        }
      }
    })
    
    // Method 2: If not found, look for the last hukamnama-card2 (typically English)
    if (!englishText) {
      const lastCard = englishCards.last()
      if (lastCard.length > 0) {
        const lastCardText = lastCard.find('.hukamnama-text').text().trim()
        if (lastCardText && lastCardText !== hukamnamaData.punjabi && lastCardText.length > 50) {
          // Check if it contains mostly English characters
          const englishCharRatio = (lastCardText.match(/[a-zA-Z\s.,;:!?"'-]/g) || []).length / lastCardText.length
          if (englishCharRatio > 0.7) {
            englishText = lastCardText
            console.log('Found English translation via method 2')
          }
        }
      }
    }
    
    // Method 3: Look for specific English translation selectors
    if (!englishText) {
      const englishSelectors = [
        'h4:contains("English Translation") + .hukamnama-text',
        '.hukamnama-card2:contains("English") .hukamnama-text',
        '.hukamnama-card2:last .hukamnama-text'
      ]
      
      for (const selector of englishSelectors) {
        const element = $(selector)
        if (element.length > 0) {
          const text = element.text().trim()
          if (text && text !== hukamnamaData.punjabi && text.length > 50) {
            englishText = text
            console.log('Found English translation via method 3:', selector)
            break
          }
        }
      }
    }
    
    if (englishText) {
      hukamnamaData.english = englishText.replace(/\s+/g, ' ').trim()
      console.log('Final English translation length:', hukamnamaData.english.length)
    } else {
      console.log('No English translation found, will use fallback if needed')
    }
    */
   
    // Extract audio links
    const audioElements = $('audio')
    audioElements.each((index, element) => {
      const src = $(element).attr('src')
      if (src) {
        if (index === 0) {
          hukamnamaData.audioHukamnama = src.startsWith('http') ? src : `https://hs.sgpc.net${src}`
          console.log('Found Hukamnama audio:', hukamnamaData.audioHukamnama)
        } else if (index === 1) {
          hukamnamaData.audioKatha = src.startsWith('http') ? src : `https://hs.sgpc.net${src}`
          console.log('Found Katha audio:', hukamnamaData.audioKatha)
        }
      }
    })

    // Extract PDF link
    const pdfLink = $('a[href*="pdfdownload.php"]').attr('href')
    if (pdfLink) {
      hukamnamaData.pdfLink = pdfLink.startsWith('http') ? pdfLink : `https://hs.sgpc.net/${pdfLink}`
      console.log('Found PDF link:', hukamnamaData.pdfLink)
    }

    // Set fallback date if not found
    if (!hukamnamaData.date) {
      hukamnamaData.date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    // Validation and fallback content
    if (!hukamnamaData.gurmukhi || hukamnamaData.gurmukhi.length < 50) {
      console.log('Insufficient Gurmukhi content found, using fallback')
      
      // Fallback to Mool Mantar
      hukamnamaData.gurmukhi = 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥'
      hukamnamaData.raag = 'ਮੂਲ ਮੰਤਰ'
      hukamnamaData.transliteration = 'Ik Onkar Sat Nam Karta Purakh Nirbhau Nirvair Akal Moorat Ajooni Saibhang Gur Prasad'
      hukamnamaData.english = 'One Universal Creator God. Truth Is The Name. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru\'s Grace.'
      hukamnamaData.punjabi = 'ਇਹ ਮੂਲ ਮੰਤਰ ਹੈ, ਸਿੱਖ ਧਰਮ ਦਾ ਬੁਨਿਆਦੀ ਮੰਤਰ। ਇਹ ਪਰਮਾਤਮਾ ਦੇ ਮੁੱਢਲੇ ਸੁਭਾਅ ਦਾ ਵਰਣਨ ਕਰਦਾ ਹੈ - ਇੱਕ ਸਿਰਜਣਹਾਰ ਜੋ ਸੱਚ ਹੈ, ਨਿਡਰ ਹੈ, ਵੈਰ ਰਹਿਤ ਹੈ, ਸਮੇਂ ਤੋਂ ਪਰੇ ਹੈ, ਅਤੇ ਸਵੈ-ਮੌਜੂਦ ਹੈ। ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ, ਅਸੀਂ ਇਸ ਦਿਵੀ ਸੱਚ ਨੂੰ ਸਮਝ ਸਕਦੇ ਹਾਂ। ਅੱਜ ਦੇ ਖਾਸ ਹੁਕਮਨਾਮੇ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਗੁਰਦਵਾਰੇ ਜਾਓ ਜਾਂ SGPC ਦੀ ਵੈੱਬਸਾਈਟ ਸਿੱਧੇ ਚੈੱਕ ਕਰੋ।'
      hukamnamaData.ang = '1'
    }

    // Ensure English translation is available
    if (!hukamnamaData.english || hukamnamaData.english.length < 20) {
      console.log('English translation missing or too short, providing fallback message')
      hukamnamaData.english = 'English translation not available for today\'s Hukamnama. Please visit your local Gurdwara or check the SGPC website directly for the complete translation. The Gurmukhi text and Punjabi explanation are available above.'
    }

    // Generate transliteration if missing but we have English
    if (!hukamnamaData.transliteration && hukamnamaData.english && hukamnamaData.gurmukhi) {
      hukamnamaData.transliteration = 'Transliteration not available - please refer to the Gurmukhi text above'
    }

    // Log extraction results
    console.log('Hukamnama extraction complete:', {
      date: hukamnamaData.date,
      dateNanakshahi: hukamnamaData.dateNanakshahi,
      ang: hukamnamaData.ang,
      raag: hukamnamaData.raag,
      gurmukhiLength: hukamnamaData.gurmukhi.length,
      punjabiLength: hukamnamaData.punjabi.length,
      englishLength: hukamnamaData.english.length,
      hasAudio: !!hukamnamaData.audioHukamnama,
      hasKatha: !!hukamnamaData.audioKatha,
      hasPdf: !!hukamnamaData.pdfLink
    })

    return NextResponse.json({ 
      success: true, 
      data: hukamnamaData,
      timestamp: new Date().toISOString(),
      extracted_from: 'SGPC Website'
    })

  } catch (error) {
    console.error('Error fetching Hukamnama:', error)
    
    // Return comprehensive fallback content
    const fallbackData: HukamnamaData = {
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric", 
        month: "long",
        day: "numeric",
      }),
      dateNanakshahi: 'ਨਾਨਕਸ਼ਾਹੀ ਕੈਲੰਡਰ',
      ang: '1',
      raag: 'ਮੂਲ ਮੰਤਰ',
      gurmukhi: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      transliteration: 'Ik Onkar Sat Nam Karta Purakh Nirbhau Nirvair Akal Moorat Ajooni Saibhang Gur Prasad',
      punjabi: 'ਇਹ ਮੂਲ ਮੰਤਰ ਹੈ, ਸਿੱਖ ਧਰਮ ਦਾ ਬੁਨਿਆਦੀ ਮੰਤਰ। ਇਹ ਪਰਮਾਤਮਾ ਦੇ ਮੁੱਢਲੇ ਸੁਭਾਅ ਦਾ ਵਰਣਨ ਕਰਦਾ ਹੈ। ਅੱਜ ਦੇ ਖਾਸ ਹੁਕਮਨਾਮੇ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਗੁਰਦਵਾਰੇ ਜਾਓ ਜਾਂ SGPC ਦੀ ਵੈੱਬਸਾਈਟ ਸਿੱਧੇ ਚੈੱਕ ਕਰੋ।',
      english: 'One Universal Creator God. Truth Is The Name. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru\'s Grace. This is the Mool Mantar, the root mantra that describes the fundamental nature of the Divine. Please visit your local Gurdwara or check the SGPC website directly for today\'s specific Hukamnama.',
      source: 'Sri Harmandir Sahib, Amritsar (SGPC) - Fallback Content'
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Unable to fetch current Hukamnama',
      data: fallbackData,
      timestamp: new Date().toISOString(),
      note: 'Fallback content provided. Please visit SGPC website or local Gurdwara for today\'s Hukamnama.'
    })
  }
} 