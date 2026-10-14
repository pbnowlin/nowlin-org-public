let BIBLE_DATA = [];
let currentBookIdx = 0;
let currentChapterIdx = 0;

const bookSelect = document.getElementById('book-select');
const chapterSelect = document.getElementById('chapter-select');
const verseContainer = document.getElementById('verse-container');

const prevBtns = [document.getElementById('prev-btn-top'), document.getElementById('prev-btn-bottom')];
const nextBtns = [document.getElementById('next-btn-top'), document.getElementById('next-btn-bottom')];

async function init() {
  try {
    const res = await fetch('./KJVPCE.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawData = await res.json();
    
    BIBLE_DATA = normalizeBibleData(rawData);

    if (BIBLE_DATA.length === 0) {
      throw new Error("Could not parse books from KJVPCE.json");
    }

    populateBookDropdown();
    setupEventListeners();

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  } catch (err) {
    verseContainer.innerHTML = `<p class="error">Failed to load KJVPCE.json: ${err.message}</p>`;
  }
}

function normalizeBibleData(data) {
  if (Array.isArray(data)) {
    return data.map(b => ({
      name: b.name || b.title || b.book || "Unknown",
      chapters: b.chapters || b.verses || []
    }));
  }
  
  if (typeof data === 'object' && data !== null) {
    if (data.books && Array.isArray(data.books)) return normalizeBibleData(data.books);
    
    return Object.keys(data).map(bookName => {
      const chapsObj = data[bookName];
      let chapters = [];
      
      if (Array.isArray(chapsObj)) {
        chapters = chapsObj;
      } else if (typeof chapsObj === 'object') {
        const chapKeys = Object.keys(chapsObj).filter(k => !isNaN(parseInt(k, 10)));
        chapKeys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
        chapters = chapKeys.map(k => chapsObj[k]);
      }
      
      return { name: bookName, chapters: chapters };
    });
  }

  return [];
}

function populateBookDropdown() {
  bookSelect.innerHTML = BIBLE_DATA.map((b, i) => 
    `<option value="${i}">${b.name}</option>`
  ).join('');
}

function setupEventListeners() {
  bookSelect.addEventListener('change', () => {
    const bookIdx = parseInt(bookSelect.value, 10);
    navigateTo(bookIdx, 0);
  });

  chapterSelect.addEventListener('change', () => {
    const chapIdx = parseInt(chapterSelect.value, 10);
    navigateTo(currentBookIdx, chapIdx);
  });

  prevBtns.forEach(btn => btn.addEventListener('click', handlePrev));
  nextBtns.forEach(btn => btn.addEventListener('click', handleNext));
}

function navigateTo(bookIdx, chapIdx) {
  const bookName = BIBLE_DATA[bookIdx].name.replace(/\s+/g, '');
  window.location.hash = `${bookName}-${chapIdx + 1}`;
}

function handleRoute() {
  const hash = decodeURIComponent(window.location.hash.replace('#', '')).trim();
  
  if (!hash) {
    renderView(0, 0);
    return;
  }

  const lastDash = hash.lastIndexOf('-');
  if (lastDash === -1) {
    renderView(0, 0);
    return;
  }

  const rawBookStr = hash.substring(0, lastDash).toLowerCase();
  const chapNum = parseInt(hash.substring(lastDash + 1), 10) || 1;

  const bookIdx = BIBLE_DATA.findIndex(b => 
    b.name.toLowerCase().replace(/\s+/g, '') === rawBookStr
  );

  const safeBookIdx = bookIdx !== -1 ? bookIdx : 0;
  const safeChapIdx = Math.max(0, chapNum - 1);

  renderView(safeBookIdx, safeChapIdx);
}

function renderView(bookIdx, chapIdx) {
  currentBookIdx = bookIdx;
  const book = BIBLE_DATA[bookIdx];
  const chapters = book.chapters || [];

  currentChapterIdx = Math.min(Math.max(0, chapIdx), chapters.length - 1);

  bookSelect.value = currentBookIdx;
  updateChapterDropdown(chapters.length, currentChapterIdx);
  updateNavButtons(chapters.length);

  renderVerses(book.name, currentChapterIdx + 1, chapters[currentChapterIdx]);
}

function updateChapterDropdown(totalChapters, selectedChapIdx) {
  chapterSelect.innerHTML = Array.from({ length: totalChapters }, (_, i) => 
    `<option value="${i}">Chapter ${i + 1}</option>`
  ).join('');
  chapterSelect.value = selectedChapIdx;
}

function updateNavButtons(totalChaptersInBook) {
  const isFirst = (currentBookIdx === 0 && currentChapterIdx === 0);
  const isLast = (currentBookIdx === BIBLE_DATA.length - 1 && currentChapterIdx === totalChaptersInBook - 1);

  prevBtns.forEach(btn => btn.disabled = isFirst);
  nextBtns.forEach(btn => btn.disabled = isLast);
}

function handlePrev() {
  if (currentChapterIdx > 0) {
    navigateTo(currentBookIdx, currentChapterIdx - 1);
  } else if (currentBookIdx > 0) {
    const prevBookChaps = BIBLE_DATA[currentBookIdx - 1].chapters.length;
    navigateTo(currentBookIdx - 1, prevBookChaps - 1);
  }
}

function handleNext() {
  const currentBookChaps = BIBLE_DATA[currentBookIdx].chapters.length;
  if (currentChapterIdx < currentBookChaps - 1) {
    navigateTo(currentBookIdx, currentChapterIdx + 1);
  } else if (currentBookIdx < BIBLE_DATA.length - 1) {
    navigateTo(currentBookIdx + 1, 0);
  }
}

function renderVerses(bookName, chapNum, rawVerses) {
  if (!rawVerses) {
    verseContainer.innerHTML = `<p class="error">No content found for this chapter.</p>`;
    return;
  }

  let verses = [];

  if (Array.isArray(rawVerses)) {
    verses = rawVerses;
  } else if (typeof rawVerses === 'object' && rawVerses !== null) {
    if (rawVerses.verses) {
      return renderVerses(bookName, chapNum, rawVerses.verses);
    }
    const keys = Object.keys(rawVerses).filter(k => !isNaN(parseInt(k, 10)));
    keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    verses = keys.map(k => rawVerses[k]);
  }

  if (verses.length === 0) {
    verseContainer.innerHTML = `<p class="error">No verses found in chapter ${chapNum}.</p>`;
    return;
  }

  const verseHtml = verses.map((v, i) => {
    let text = "";
    let verseNum = i + 1;

    if (typeof v === 'string') {
      text = v;
    } else if (typeof v === 'object' && v !== null) {
      text = v.text || v.verse || v.val || v.content || v.value || "";
      if (v.verse && !isNaN(parseInt(v.verse, 10))) verseNum = v.verse;
      if (v.number && !isNaN(parseInt(v.number, 10))) verseNum = v.number;
    }

    return `
      <p class="verse">
        <sup class="verse-num">${verseNum}</sup>
        <span class="verse-text">${text}</span>
      </p>
    `;
  }).join('');

  verseContainer.innerHTML = `
    <h2>${bookName} ${chapNum}</h2>
    <div class="verses">${verseHtml}</div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

init();