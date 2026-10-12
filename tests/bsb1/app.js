document.addEventListener("DOMContentLoaded", () => {
    const bookSelect = document.getElementById("book-select");
    const chapterSelect = document.getElementById("chapter-select");
    const bibleTextContainer = document.getElementById("bible-text");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Search Elements
    const searchToggleBtn = document.getElementById("search-toggle-btn");
    const searchModal = document.getElementById("search-modal");
    const searchCloseBtn = document.getElementById("search-close-btn");
    const searchInput = document.getElementById("search-input");
    const searchSubmitBtn = document.getElementById("search-submit-btn");
    const searchResultsContainer = document.getElementById("search-results-container");

    // Select all Previous and Next buttons (top and bottom)
    const prevBtns = document.querySelectorAll(".prev-btn");
    const nextBtns = document.querySelectorAll(".next-btn");

    let bibleData = [];
    let currentBookIndex = -1;
    let currentChapterIndex = -1;

    // --- Dark Mode Setup ---
    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        applyTheme(!isDark);
    });
    // --- End Dark Mode Setup ---

    // --- Search Modal Toggle ---
    function openSearchModal() {
        searchModal.classList.remove("hidden");
        searchModal.setAttribute("aria-hidden", "false");
        searchInput.focus();
    }

    function closeSearchModal() {
        searchModal.classList.add("hidden");
        searchModal.setAttribute("aria-hidden", "true");
    }

    searchToggleBtn.addEventListener("click", openSearchModal);
    searchCloseBtn.addEventListener("click", closeSearchModal);
    searchModal.addEventListener("click", (e) => {
        if (e.target === searchModal) closeSearchModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !searchModal.classList.contains("hidden")) {
            closeSearchModal();
        }
    });
    // --- End Search Modal Toggle ---

    // --- Bible Search Logic ---
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            searchResultsContainer.innerHTML = `<p class="search-placeholder">Please enter a word or phrase to search.</p>`;
            return;
        }

        if (bibleData.length === 0) {
            searchResultsContainer.innerHTML = `<p class="search-placeholder">Bible data is still loading. Please wait...</p>`;
            return;
        }

        searchResultsContainer.innerHTML = `<p class="search-placeholder">Searching entire Bible...</p>`;

        let results = [];
        const maxResults = 250; // Safety cap to ensure smooth rendering

        // Traverse books, chapters, verses
        for (let bIdx = 0; bIdx < bibleData.length; bIdx++) {
            const book = bibleData[bIdx];
            const bookName = book.name || book.book || book.title || `Book ${bIdx + 1}`;
            const chapters = book.chapters || book.verses || [];

            for (let cIdx = 0; cIdx < chapters.length; cIdx++) {
                const chapterData = chapters[cIdx] || [];
                const verses = Array.isArray(chapterData) 
                    ? chapterData 
                    : (chapterData.verses || chapterData.text || chapterData.content || chapterData.v || []);

                if (Array.isArray(verses)) {
                    for (let vIdx = 0; vIdx < verses.length; vIdx++) {
                        const verse = verses[vIdx];
                        let verseNum = vIdx + 1;
                        let verseText = "";

                        if (typeof verse === "string") {
                            verseText = verse;
                        } else if (typeof verse === "object" && verse !== null) {
                            verseNum = verse.verse || verse.number || verse.verse_num || verse.v || (vIdx + 1);
                            verseText = verse.text || verse.verse_text || verse.content || verse.w || verse.t || "";
                        }

                        if (verseText.toLowerCase().includes(query)) {
                            results.push({
                                bookIndex: bIdx,
                                chapterIndex: cIdx,
                                bookName,
                                chapterNum: cIdx + 1,
                                verseNum,
                                verseText
                            });

                            if (results.length >= maxResults) break;
                        }
                    }
                }
                if (results.length >= maxResults) break;
            }
            if (results.length >= maxResults) break;
        }

        renderSearchResults(results, query);
    }

    function renderSearchResults(results, query) {
        if (results.length === 0) {
            searchResultsContainer.innerHTML = `<p class="search-placeholder">No results found for "${query}".</p>`;
            return;
        }

        let html = `<p class="search-placeholder" style="margin-bottom: 10px;">Found ${results.length} result(s):</p>`;

        results.forEach(res => {
            // Highlight query term in verse text
            const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
            const highlightedText = res.verseText.replace(regex, `<span class="highlight">$1</span>`);

            html += `
                <div class="search-result-item" data-book="${res.bookIndex}" data-chapter="${res.chapterIndex}">
                    <div class="search-result-ref">${res.bookName} ${res.chapterNum}:${res.verseNum}</div>
                    <div class="search-result-text"><sup class="verse-num">${res.verseNum}</sup> ${highlightedText}</div>
                </div>
            `;
        });

        searchResultsContainer.innerHTML = html;

        // Attach click listeners to result items to jump directly to that chapter
        const resultItems = searchResultsContainer.querySelectorAll(".search-result-item");
        resultItems.forEach(item => {
            item.addEventListener("click", () => {
                const bIdx = parseInt(item.getAttribute("data-book"), 10);
                const cIdx = parseInt(item.getAttribute("data-chapter"), 10);

                currentBookIndex = bIdx;
                currentChapterIndex = cIdx;

                bookSelect.value = bIdx;
                populateChapterSelect(bIdx);
                chapterSelect.value = cIdx;

                renderChapter(bIdx, cIdx);
                closeSearchModal();
            });
        });
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    searchSubmitBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });
    // --- End Bible Search Logic ---

    // Fetch the BSB JSON data
    fetch("BSB.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            bibleData = Array.isArray(data) ? data : (data.books || data.verses || data.bible || []);
            populateBookSelect();
            updateNavigationButtons();
        })
        .catch(error => {
            console.error("Error loading BSB.json:", error);
            bibleTextContainer.innerHTML = `<p class="error">Error loading Bible data. Please check console or run via a local web server.</p>`;
        });

    function populateBookSelect() {
        bookSelect.innerHTML = `<option value="">Select Book</option>`;
        
        bibleData.forEach((bookObj, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = bookObj.name || bookObj.book || bookObj.title || `Book ${index + 1}`;
            bookSelect.appendChild(option);
        });
    }

    function populateChapterSelect(bookIndex) {
        chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;
        chapterSelect.disabled = false;

        const book = bibleData[bookIndex];
        const chapters = book ? (book.chapters || book.verses || []) : [];

        chapters.forEach((_, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `Chapter ${index + 1}`;
            chapterSelect.appendChild(option);
        });
    }

    function renderChapter(bookIndex, chapterIndex) {
        const book = bibleData[bookIndex];
        if (!book) return;

        const chapters = book.chapters || book.verses || [];
        const chapterData = chapters[chapterIndex] || [];
        const bookName = book.name || book.book || book.title || "";

        let html = `<h2>${bookName} ${chapterIndex + 1}</h2>`;

        const verses = Array.isArray(chapterData) 
            ? chapterData 
            : (chapterData.verses || chapterData.text || chapterData.content || chapterData.v || []);

        if (Array.isArray(verses)) {
            verses.forEach((verse, vIdx) => {
                if (typeof verse === "string") {
                    html += `<p class="verse"><sup class="verse-num">${vIdx + 1}</sup> ${verse}</p>`;
                } else if (typeof verse === "object" && verse !== null) {
                    const num = verse.verse || verse.number || verse.verse_num || verse.v || (vIdx + 1);
                    const text = verse.text || verse.verse_text || verse.content || verse.w || verse.t || "";
                    html += `<p class="verse"><sup class="verse-num">${num}</sup> ${text}</p>`;
                }
            });
        }

        bibleTextContainer.innerHTML = html;
        bibleTextContainer.focus(); // Focus for accessibility
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        if (currentBookIndex < 0 || currentChapterIndex < 0 || bibleData.length === 0) {
            prevBtns.forEach(btn => btn.disabled = true);
            nextBtns.forEach(btn => btn.disabled = true);
            return;
        }

        const book = bibleData[currentBookIndex];
        const chapters = book ? (book.chapters || book.verses || []) : [];

        const isAtStart = (currentBookIndex === 0 && currentChapterIndex === 0);
        const isAtEnd = (currentBookIndex === bibleData.length - 1 && currentChapterIndex === chapters.length - 1);

        prevBtns.forEach(btn => btn.disabled = isAtStart);
        nextBtns.forEach(btn => btn.disabled = isAtEnd);
    }

    function handlePrevious() {
        if (currentBookIndex < 0 || currentChapterIndex < 0) return;

        if (currentChapterIndex > 0) {
            currentChapterIndex--;
        } else if (currentBookIndex > 0) {
            currentBookIndex--;
            const prevBookChapters = bibleData[currentBookIndex].chapters || bibleData[currentBookIndex].verses || [];
            currentChapterIndex = prevBookChapters.length - 1;
            populateChapterSelect(currentBookIndex);
            bookSelect.value = currentBookIndex;
        }
        chapterSelect.value = currentChapterIndex;
        renderChapter(currentBookIndex, currentChapterIndex);
    }

    function handleNext() {
        if (currentBookIndex < 0 || currentChapterIndex < 0) return;

        const currentBookChapters = bibleData[currentBookIndex].chapters || bibleData[currentBookIndex].verses || [];
        if (currentChapterIndex < currentBookChapters.length - 1) {
            currentChapterIndex++;
        } else if (currentBookIndex < bibleData.length - 1) {
            currentBookIndex++;
            currentChapterIndex = 0;
            populateChapterSelect(currentBookIndex);
            bookSelect.value = currentBookIndex;
        }
        chapterSelect.value = currentChapterIndex;
        renderChapter(currentBookIndex, currentChapterIndex);
    }

    // Event Listeners
    bookSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "") {
            currentBookIndex = -1;
            currentChapterIndex = -1;
            chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;
            chapterSelect.disabled = true;
            bibleTextContainer.innerHTML = `<p class="placeholder">Select a book and chapter to begin reading.</p>`;
            updateNavigationButtons();
            return;
        }

        currentBookIndex = parseInt(val, 10);
        currentChapterIndex = 0;
        populateChapterSelect(currentBookIndex);
        renderChapter(currentBookIndex, currentChapterIndex);
        chapterSelect.value = currentChapterIndex;
    });

    chapterSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "") return;

        currentChapterIndex = parseInt(val, 10);
        renderChapter(currentBookIndex, currentChapterIndex);
    });

    prevBtns.forEach(btn => btn.addEventListener("click", handlePrevious));
    nextBtns.forEach(btn => btn.addEventListener("click", handleNext));
});