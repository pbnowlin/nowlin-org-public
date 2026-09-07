// Map human-readable names to Kaiserlik 3-letter file keys
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

const bookSelect = document.getElementById('book-select');
const chapterSelect = document.getElementById('chapter-select');
const verseContainer = document.getElementById('verse-container');

function init() {
  populateBookDropdown();

  bookSelect.addEventListener('change', () => {
    const selectedBook = BIBLE_BOOKS[bookSelect.value];
    navigateTo(selectedBook.file, 1);
  });

  chapterSelect.addEventListener('change', () => {
    const selectedBook = BIBLE_BOOKS[bookSelect.value];
    const selectedChap = parseInt(chapterSelect.value, 10) + 1;
    navigateTo(selectedBook.file, selectedChap);
  });

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

async function handleRoute() {
  const hash = window.location.hash.replace('#', '').trim();
  let fileKey = "Gen";
  let chapNum = 1;

  if (hash) {
    const parts = hash.split('-');
    if (parts.length === 2) {
      fileKey = parts[0];
      chapNum = parseInt(parts[1], 10) || 1;
    }
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

  // Unify chapters payload format
  const chapters = Array.isArray(data) ? data : (data.chapters || data.books || []);
  const totalChapters = chapters.length;

  let targetChapIdx = chapNum - 1;
  if (targetChapIdx < 0) targetChapIdx = 0;
  if (targetChapIdx >= totalChapters) targetChapIdx = totalChapters - 1;

  updateChapterDropdown(totalChapters, targetChapIdx);
  renderChapter(activeBook.name, targetChapIdx + 1, chapters[targetChapIdx]);
}

function updateChapterDropdown(totalChapters, selectedChapIdx) {
  chapterSelect.innerHTML = Array.from({ length: totalChapters }, (_, i) => 
    `<option value="${i}">Chapter ${i + 1}</option>`
  ).join('');
  chapterSelect.value = selectedChapIdx;
}

function renderChapter(bookName, chapNum, chapterData) {
  if (!chapterData) {
    verseContainer.innerHTML = `<p>No content found for chapter ${chapNum}.</p>`;
    return;
  }

  // Handle array of strings or array of verse objects
  const verses = Array.isArray(chapterData) ? chapterData : (chapterData.verses || []);
  
  const verseList = verses.map((v, i) => {
    let text = "";
    if (typeof v === 'string') {
      text = v;
    } else if (typeof v === 'object' && v !== null) {
      text = v.text || v.verse || v.val || JSON.stringify(v);
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
}

init();