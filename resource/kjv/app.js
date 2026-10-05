'use strict';

let BIBLE_DATA = [];
let currentBookIdx = 0;
let currentChapterIdx = 0;

const bookSelect = document.getElementById('book-select');
const chapterSelect = document.getElementById('chapter-select');
const verseContainer = document.getElementById('verse-container');

const prevBtns = [
  document.getElementById('prev-btn-top'),
  document.getElementById('prev-btn-bottom')
].filter(Boolean);

const nextBtns = [
  document.getElementById('next-btn-top'),
  document.getElementById('next-btn-bottom')
].filter(Boolean);

async function init() {
  if (!bookSelect || !chapterSelect || !verseContainer) {
    console.error('Required page elements are missing.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('./KJVPCE.json');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const rawData = await response.json();
    BIBLE_DATA = normalizeBibleData(rawData);

    if (!BIBLE_DATA.length) {
      throw new Error('No books were found in KJVPCE.json.');
    }

    populateBookDropdown();
    setupEventListeners();

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  } catch (error) {
    console.error('Could not load Bible data:', error);
    verseContainer.textContent =
      `Failed to load KJVPCE.json. ${error.message}`;
    verseContainer.classList.add('error');
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading) {
  verseContainer.setAttribute('aria-busy', String(isLoading));
}

function normalizeBibleData(data) {
  let books;

  if (Array.isArray(data)) {
    books = data;
  } else if (data && typeof data === 'object' && Array.isArray(data.books)) {
    books = data.books;
  } else if (data && typeof data === 'object') {
    books = Object.entries(data).map(([name, chapters]) => ({
      name,
      chapters
    }));
  } else {
    return [];
  }

  return books
    .map((book, index) => {
      if (!book || typeof book !== 'object') return null;

      const name = String(book.name || book.title || book.book || `Book ${index + 1}`);
      const chapterData = book.chapters ?? book.verses ?? [];

      return {
        name,
        chapters: normalizeChapters(chapterData)
      };
    })
    .filter(Boolean);
}

function normalizeChapters(chapterData) {
  if (Array.isArray(chapterData)) {
    return chapterData;
  }

  if (!chapterData || typeof chapterData !== 'object') {
    return [];
  }

  return Object.keys(chapterData)
    .filter(key => /^\d+$/.test(key))
    .sort((a, b) => Number(a) - Number(b))
    .map(key => chapterData[key]);
}

function populateBookDropdown() {
  bookSelect.replaceChildren();

  BIBLE_DATA.forEach((book, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = book.name;
    bookSelect.append(option);
  });
}

function setupEventListeners() {
  bookSelect.addEventListener('change', () => {
    const bookIdx = Number.parseInt(bookSelect.value, 10);
    if (Number.isInteger(bookIdx)) navigateTo(bookIdx, 0);
  });

  chapterSelect.addEventListener('change', () => {
    const chapterIdx = Number.parseInt(chapterSelect.value, 10);
    if (Number.isInteger(chapterIdx)) {
      navigateTo(currentBookIdx, chapterIdx);
    }
  });

  prevBtns.forEach(button => button.addEventListener('click', handlePrev));
  nextBtns.forEach(button => button.addEventListener('click', handleNext));
}

function navigateTo(bookIdx, chapterIdx) {
  const book = BIBLE_DATA[bookIdx];

  if (!book || !book.chapters.length) return;

  const safeChapterIdx = Math.min(
    Math.max(chapterIdx, 0),
    book.chapters.length - 1
  );

  // Encode the book name so names containing punctuation or spaces work in URLs.
  const bookSlug = encodeURIComponent(book.name);
  const newHash = `#${bookSlug}-${safeChapterIdx + 1}`;

  if (window.location.hash === newHash) {
    handleRoute();
  } else {
    window.location.hash = newHash;
  }
}

function handleRoute() {
  if (!BIBLE_DATA.length) return;

  const rawHash = window.location.hash.slice(1);

  if (!rawHash) {
    renderView(0, 0);
    return;
  }

  const lastDash = rawHash.lastIndexOf('-');

  if (lastDash < 0) {
    renderView(0, 0);
    return;
  }

  let rawBookName;
  try {
    rawBookName = decodeURIComponent(rawHash.slice(0, lastDash));
  } catch {
    renderView(0, 0);
    return;
  }

  const chapterNumber = Number.parseInt(rawHash.slice(lastDash + 1), 10);
  const bookIdx = BIBLE_DATA.findIndex(
    book => normalizeBookName(book.name) === normalizeBookName(rawBookName)
  );

  if (bookIdx < 0 || !Number.isInteger(chapterNumber) || chapterNumber < 1) {
    renderView(0, 0);
    return;
  }

  renderView(bookIdx, chapterNumber - 1);
}

function normalizeBookName(name) {
  return String(name).toLowerCase().replace(/[\s._-]+/g, '');
}

function renderView(bookIdx, chapterIdx) {
  const book = BIBLE_DATA[bookIdx];

  if (!book || !Array.isArray(book.chapters) || book.chapters.length === 0) {
    currentBookIdx = bookIdx;
    currentChapterIdx = 0;
    chapterSelect.replaceChildren();
    chapterSelect.disabled = true;
    setNavButtonsDisabled(true);
    verseContainer.textContent = book
      ? `No chapter content is available for ${book.name}.`
      : 'The requested book could not be found.';
    return;
  }

  currentBookIdx = bookIdx;
  currentChapterIdx = Math.min(
    Math.max(chapterIdx, 0),
    book.chapters.length - 1
  );

  bookSelect.value = String(currentBookIdx);
  updateChapterDropdown(book.chapters.length, currentChapterIdx);
  updateNavButtons(book.chapters.length);
  renderVerses(
    book.name,
    currentChapterIdx + 1,
    book.chapters[currentChapterIdx]
  );
}

function updateChapterDropdown(totalChapters, selectedChapterIdx) {
  chapterSelect.replaceChildren();

  for (let index = 0; index < totalChapters; index += 1) {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `Chapter ${index + 1}`;
    chapterSelect.append(option);
  }

  chapterSelect.disabled = totalChapters === 0;
  chapterSelect.value = String(selectedChapterIdx);
}

function updateNavButtons(totalChaptersInBook) {
  const isFirst = currentBookIdx === 0 && currentChapterIdx === 0;
  const isLast =
    currentBookIdx === BIBLE_DATA.length - 1 &&
    currentChapterIdx === totalChaptersInBook - 1;

  prevBtns.forEach(button => {
    button.disabled = isFirst;
  });

  nextBtns.forEach(button => {
    button.disabled = isLast;
  });
}

function setNavButtonsDisabled(disabled) {
  prevBtns.forEach(button => {
    button.disabled = disabled;
  });

  nextBtns.forEach(button => {
    button.disabled = disabled;
  });
}

function handlePrev() {
  if (currentChapterIdx > 0) {
    navigateTo(currentBookIdx, currentChapterIdx - 1);
    return;
  }

  if (currentBookIdx > 0) {
    const previousBookIdx = currentBookIdx - 1;
    const previousBook = BIBLE_DATA[previousBookIdx];

    if (previousBook?.chapters.length) {
      navigateTo(previousBookIdx, previousBook.chapters.length - 1);
    }
  }
}

function handleNext() {
  const currentBook = BIBLE_DATA[currentBookIdx];
  if (!currentBook) return;

  if (currentChapterIdx < currentBook.chapters.length - 1) {
    navigateTo(currentBookIdx, currentChapterIdx + 1);
    return;
  }

  for (let nextBookIdx = currentBookIdx + 1; nextBookIdx < BIBLE_DATA.length; nextBookIdx += 1) {
    if (BIBLE_DATA[nextBookIdx].chapters.length) {
      navigateTo(nextBookIdx, 0);
      return;
    }
  }
}

function renderVerses(bookName, chapterNumber, rawVerses) {
  const verses = normalizeVerses(rawVerses);

  if (!verses.length) {
    verseContainer.textContent = `No verses found in ${bookName}, chapter ${chapterNumber}.`;
    return;
  }

  const heading = document.createElement('h2');
  heading.textContent = `${bookName} ${chapterNumber}`;

  const verseList = document.createElement('div');
  verseList.className = 'verses';

  verses.forEach((verse, index) => {
    const { text, number } = getVerseDetails(verse, index);

    const paragraph = document.createElement('p');
    paragraph.className = 'verse';

    const verseNumber = document.createElement('sup');
    verseNumber.className = 'verse-num';
    verseNumber.textContent = String(number);

    const verseText = document.createElement('span');
    verseText.className = 'verse-text';
    verseText.textContent = text;

    paragraph.append(verseNumber, ' ', verseText);
    verseList.append(paragraph);
  });

  verseContainer.replaceChildren(heading, verseList);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function normalizeVerses(rawVerses) {
  if (Array.isArray(rawVerses)) return rawVerses;

  if (!rawVerses || typeof rawVerses !== 'object') return [];

  if (rawVerses.verses !== undefined) {
    return normalizeVerses(rawVerses.verses);
  }

  return Object.keys(rawVerses)
    .filter(key => /^\d+$/.test(key))
    .sort((a, b) => Number(a) - Number(b))
    .map(key => rawVerses[key]);
}

function getVerseDetails(verse, index) {
  if (typeof verse === 'string' || typeof verse === 'number') {
    return { text: String(verse), number: index + 1 };
  }

  if (!verse || typeof verse !== 'object') {
    return { text: '', number: index + 1 };
  }

  const text =
    verse.text ??
    verse.content ??
    verse.val ??
    verse.value ??
    (typeof verse.verse === 'string' && !/^\d+$/.test(verse.verse)
      ? verse.verse
      : '');

  const suppliedNumber = verse.number ?? (
    /^\d+$/.test(String(verse.verse ?? '')) ? verse.verse : null
  );

  return {
    text: String(text),
    number: suppliedNumber ?? index + 1
  };
}

init();
