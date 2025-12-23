# Manual Mind Profile Image Upload Guide

## How to add images for remaining minds

### Mentes sem imagem (14)

#### 1. **alex_hormozi** 
- Sources: LinkedIn, Twitter, official website
- Download and save as: `public/minds-profile-images/alex_hormozi.jpg`

#### 2. **russel_brunson**
- Sources: Wikipedia redirect or LinkedIn
- File: `russel_brunson.jpg`

#### 3. **marty_cagan** 
- Sources: SVPG website, LinkedIn
- File: `marty_cagan.jpg`

#### 4. **jeff_patton**
- Sources: His personal site, LinkedIn
- File: `jeff_patton.jpg`

#### 5. **dan_kennedy**
- Sources: Marketing blogs, courses
- File: `dan_kennedy.jpg`

#### 6. **jon_benson**
- Sources: VSL (Video Sales Letter) site
- File: `jon_benson.jpg`

#### 7. **dan_koe**
- Sources: Twitter, YouTube
- File: `dan_koe.jpg`

#### 8-12. **Brazilian minds** (pedro_valerio, adriano-de-marqui, joao_lozano, rafa_medeiros, thiago_finch)
- Check Brazilian professional networks
- Files: `pedro_valerio.jpg`, `adriano-de-marqui.jpg`, etc.

#### 13. **cagan_patton** (special)
- Combined persona - use Marty Cagan image or create composite
- File: `cagan_patton.jpg`

#### 14. **ricky_and_morty** (cartoon)
- Use cartoon title card or character image
- File: `ricky_and_morty.jpg`

## Steps to add an image

1. Download JPG image (preferably square or portrait)
2. Resize to ~500x500px for consistency
3. Save to: `public/minds-profile-images/{slug}.jpg`
4. Update `app/hooks/useMinds.ts` - add slug to `MINDS_WITH_AVATAR` set
5. Test in gallery

## Recommended sources
- LinkedIn: direct profile photos
- Wikipedia: official biographies  
- Twitter/X: profile images
- Company websites: employee bios
- Google Images: with rights filter
