const BIBLE_BOOKS = [
  { name: "Genesis", file: "Gen" },
  { name: "Exodus", file: "Exo" },
  { name: "Leviticus", file: "Lev" },
  { name: "Numbers", file: "Num" },
  { name: "Deuteronomy", file: "Deu" },
  { name: "Joshua", file: "Jos" },
  { name: "Judges", file: "Jdg" },
  { name: "Ruth", file: "Rth" },
  { name: "1 Samuel", file: "1Sa" },
  { name: "2 Samuel", file: "2Sa" },
  { name: "1 Kings", file: "1Ki" },
  { name: "2 Kings", file: "2Ki" },
  { name: "1 Chronicles", file: "1Ch" },
  { name: "2 Chronicles", file: "2Ch" },
  { name: "Ezra", file: "Ezr" },
  { name: "Nehemiah", file: "Neh" },
  { name: "Esther", file: "Est" },
  { name: "Job", file: "Job" },
  { name: "Psalms", file: "Psa" },
  { name: "Proverbs", file: "Pro" },
  { name: "Ecclesiastes", file: "Ecc" },
  { name: "Song of Solomon", file: "Sng" },
  { name: "Isaiah", file: "Isa" },
  { name: "Jeremiah", file: "Jer" },
  { name: "Lamentations", file: "Lam" },
  { name: "Ezekiel", file: "Eze" },
  { name: "Daniel", file: "Dan" },
  { name: "Hosea", file: "Hos" },
  { name: "Joel", file: "Joe" },
  { name: "Amos", file: "Amo" },
  { name: "Obadiah", file: "Oba" },
  { name: "Jonah", file: "Jon" },
  { name: "Micah", file: "Mic" },
  { name: "Nahum", file: "Nah" },
  { name: "Habakkuk", file: "Hab" },
  { name: "Zephaniah", file: "Zep" },
  { name: "Haggai", file: "Hag" },
  { name: "Zechariah", file: "Zec" },
  { name: "Malachi", file: "Mal" },
  { name: "Matthew", file: "Mat" },
  { name: "Mark", file: "Mar" },
  { name: "Luke", file: "Luk" },
  { name: "John", file: "Jhn" },
  { name: "Acts", file: "Act" },
  { name: "Romans", file: "Rom" },
  { name: "1 Corinthians", file: "1Co" },
  { name: "2 Corinthians", file: "2Co" },
  { name: "Galatians", file: "Gal" },
  { name: "Ephesians", file: "Eph" },
  { name: "Philippians", file: "Phl" },
  { name: "Colossians", file: "Col" },
  { name: "1 Thessalonians", file: "1Th" },
  { name: "2 Thessalonians", file: "2Th" },
  { name: "1 Timothy", file: "1Ti" },
  { name: "2 Timothy", file: "2Ti" },
  { name: "Titus", file: "Tit" },
  { name: "Philemon", file: "Phm" },
  { name: "Hebrews", file: "Heb" },
  { name: "James", file: "Jas" },
  { name: "1 Peter", file: "1Pe" },
  { name: "2 Peter", file: "2Pe" },
  { name: "1 John", file: "1Jo" },
  { name: "2 John", file: "2Jo" },
  { name: "3 John", file: "3Jo" },
  { name: "Jude", file: "Jde" },
  { name: "Revelation", file: "Rev" }
];

const bookCache = {};

let currentBookIdx = 0;
let currentChapterNum = 1;
let currentTotalChapters = 1;

const bookSelect = document.getElementById('book-select');
const chapterSelect = document.getElementById('chapter-select');
const verseContainer = document.getElementById('verse-container');

const prevBtns = [document.getElementById('prev-btn-top'), document.getElementById('prev-btn-bottom')];
const nextBtns = [document.getElementById('next-btn-top'), document.getElementById('next-btn-bottom')];

function init() {
  populateBookDropdown();

  bookSelect.addEventListener('change', () => {
    const selectedBook = BIBLE_BOOKS[bookSelect.value];
    navigateTo(selectedBook.file, 1);
  });

  chapterSelect.addEventListener('change', () => {
    const selectedBook = BIBLE_BOOKS[bookSelect.value];
    const selectedChap = parseInt(chapterSelect.value, 10);
    navigateTo(selectedBook.file, selectedChap);
  });

  prevBtns.forEach(btn => btn.addEventListener('click', handlePrevChapter));
  nextBtns.forEach(btn => btn.addEventListener('click', handleNextChapter));

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function populateBookDropdown() {
  bookSelect.innerHTML = BIBLE_BOOKS
    .map((b, i) => `<option value="${i}">${b.name}</option>`)
    .join('');
}

async function fetchBookData(fileKey) {
  if (bookCache[fileKey]) return bookCache[fileKey];

  try {
    const res = await fetch(`./json/${fileKey}.json`);
    if (!res.ok) throw new Error(`Could not load ${fileKey}.json`);
    const data = await res.json();
    bookCache[fileKey] = data;
    return data;
  } catch (err) {
    verseContainer.innerHTML = `<p class="error">Error loading file: ${fileKey}.json. Ensure it exists in bible/json/.</p>`;
    return null;
  }
}

function navigateTo(fileKey, chapterNum) {
  window.location.hash = `${fileKey}-${chapterNum}`;
}

// Extracts chapters list cleanly from arrays, object keys, or nested structures
function parseChapters(data) {
  if (!data) return [];
  
  if (Array.isArray(data)) return data;
  
  if (data.chapters) {
    if (Array.isArray(data.chapters)) return data.chapters;
    if (typeof data.chapters === 'object') return Object.values(data.chapters);
  }
  
  if (data.books) {
    if (Array.isArray(data.books)) return data.books;
    if (typeof data.books === 'object') return Object.values(data.books);
  }

  // Handles raw key-value objects: {"1": [...], "2": [...]}
  if (typeof data === 'object') {
    const keys = Object.keys(data).filter(k => !isNaN(parseInt(k, 10)));
    if (keys.length > 0) {
      keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      return keys.map(k => data[k]);
    }
  }

  return [];
}

async function handleRoute() {
  const hash = decodeURIComponent(window.location.hash.replace('#', '')).trim();
  let fileKey = "Gen";
  let chapNum = 1;

  if (hash) {
    const lastDashIdx = hash.lastIndexOf('-');
    if (lastDashIdx !== -1) {
      fileKey = hash.substring(0, lastDashIdx);
      chapNum = parseInt(hash.substring(lastDashIdx + 1), 10);
    } else {
      fileKey = hash;
    }
  }

  // Guard against NaN or 0 chapter numbers
  if (isNaN(chapNum) || chapNum < 1) {
    chapNum = 1;
  }

  const bookIdx = BIBLE_BOOKS.findIndex(b => b.file.toLowerCase() === fileKey.toLowerCase());
  if (bookIdx === -1) {
    navigateTo("Gen", 1);
    return;
  }

  const activeBook = BIBLE_BOOKS[bookIdx];
  bookSelect.value = bookIdx;

  const data = await fetchBookData(activeBook.file);
  if (!data) return;

  const chapters = parseChapters(data);
  const totalChapters = chapters.length;

  if (totalChapters === 0) {
    verseContainer.innerHTML = `<p class="error">No chapters found in ${activeBook.file}.json.</p>`;
    return;
  }

  // Ensure chapter stays within 1 and max chapters
  if (chapNum > totalChapters) chapNum = totalChapters;

  currentBookIdx = bookIdx;
  currentChapterNum = chapNum;
  currentTotalChapters = totalChapters;

  updateChapterDropdown(totalChapters, chapNum);
  updateNavButtons();
  
  // Render array index (chapNum - 1)
  renderChapter(activeBook.name, chapNum, chapters[chapNum - 1]);
}

function updateChapterDropdown(totalChapters, selectedChapNum) {
  chapterSelect.innerHTML = Array.from({ length: totalChapters }, (_, i) => 
    `<option value="${i + 1}">Chapter ${i + 1}</option>`
  ).join('');
  chapterSelect.value = selectedChapNum;
}

function updateNavButtons() {
  const isFirstChapterOverall = (currentBookIdx === 0 && currentChapterNum === 1);
  const isLastChapterOverall = (currentBookIdx === BIBLE_BOOKS.length - 1 && currentChapterNum === currentTotalChapters);

  prevBtns.forEach(btn => btn.disabled = isFirstChapterOverall);
  nextBtns.forEach(btn => btn.disabled = isLastChapterOverall);
}

async function handlePrevChapter() {
  if (currentChapterNum > 1) {
    navigateTo(BIBLE_BOOKS[currentBookIdx].file, currentChapterNum - 1);
  } else if (currentBookIdx > 0) {
    const prevBook = BIBLE_BOOKS[currentBookIdx - 1];
    const prevBookData = await fetchBookData(prevBook.file);
    if (!prevBookData) return;

    const prevChapters = parseChapters(prevBookData);
    navigateTo(prevBook.file, prevChapters.length || 1);
  }
}

function handleNextChapter() {
  if (currentChapterNum < currentTotalChapters) {
    navigateTo(BIBLE_BOOKS[currentBookIdx].file, currentChapterNum + 1);
  } else if (currentBookIdx < BIBLE_BOOKS.length - 1) {
    const nextBook = BIBLE_BOOKS[currentBookIdx + 1];
    navigateTo(nextBook.file, 1);
  }
}

function renderChapter(bookName, chapNum, chapterData) {
  if (!chapterData) {
    verseContainer.innerHTML = `<p class="error">No content found for chapter ${chapNum}.</p>`;
    return;
  }

  let verses = [];
  if (Array.isArray(chapterData)) {
    verses = chapterData;
  } else if (typeof chapterData === 'object' && chapterData !== null) {
    if (chapterData.verses && Array.isArray(chapterData.verses)) {
      verses = chapterData.verses;
    } else {
      // Handles object of verses {"1": "Text...", "2": "Text..."}
      const keys = Object.keys(chapterData).filter(k => !isNaN(parseInt(k, 10)));
      keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      verses = keys.map(k => chapterData[k]);
    }
  }

  if (verses.length === 0) {
    verseContainer.innerHTML = `<p class="error">No verses found in chapter ${chapNum}.</p>`;
    return;
  }

  const verseList = verses.map((v, i) => {
    let text = "";
    if (typeof v === 'string') {
      text = v;
    } else if (typeof v === 'object' && v !== null) {
      text = v.text || v.verse || v.val || "";
    }
    
    return `
      <p class="verse">
        <sup class="verse-num">${i + 1}</sup>
        <span class="verse-text">${text}</span>
      </p>
    `;
  }).join('');

  verseContainer.innerHTML = `
    <h2>${bookName} ${chapNum}</h2>
    <div class="verses">${verseList}</div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

init();