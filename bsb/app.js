document.addEventListener("DOMContentLoaded", () => {
    const bookSelect = document.getElementById("book-select");
    const chapterSelect = document.getElementById("chapter-select");
    const bibleTextContainer = document.getElementById("bible-text");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let bibleData = [];
    let currentBookIndex = 0;
    let currentChapterIndex = 0;

    // Fetch the BSB JSON data
    fetch("BSB.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle array of books or object wrapper structures
            bibleData = Array.isArray(data) ? data : (data.books || data.verses || []);
            populateBookSelect();
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
            option.textContent = bookObj.name || bookObj.book || `Book ${index + 1}`;
            bookSelect.appendChild(option);
        });
    }

    function populateChapterSelect(bookIndex) {
        chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;
        chapterSelect.disabled = false;

        const book = bibleData[bookIndex];
        const chapters = book.chapters || book.verses || [];

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

        const chapters = book.chapters || [];
        const verses = chapters[chapterIndex] || [];
        const bookName = book.name || book.book || "";

        let html = `<h2>${bookName} ${chapterIndex + 1}</h2>`;

        if (Array.isArray(verses)) {
            verses.forEach((verse, vIdx) => {
                if (typeof verse === "string") {
                    html += `<p class="verse"><sup class="verse-num">${vIdx + 1}</sup> ${verse}</p>`;
                } else if (typeof verse === "object") {
                    const num = verse.verse || verse.number || (vIdx + 1);
                    const text = verse.text || verse.verse_text || "";
                    html += `<p class="verse"><sup class="verse-num">${num}</sup> ${text}</p>`;
                }
            });
        }

        bibleTextContainer.innerHTML = html;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        const book = bibleData[currentBookIndex];
        const chapters = book ? (book.chapters || []) : [];

        prevBtn.disabled = (currentBookIndex === 0 && currentChapterIndex === 0);
        nextBtn.disabled = (currentBookIndex === bibleData.length - 1 && currentChapterIndex === chapters.length - 1);
    }

    // Event Listeners
    bookSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "") {
            chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;
            chapterSelect.disabled = true;
            bibleTextContainer.innerHTML = `<p class="placeholder">Select a book and chapter to begin reading.</p>`;
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

    prevBtn.addEventListener("click", () => {
        if (currentChapterIndex > 0) {
            currentChapterIndex--;
        } else if (currentBookIndex > 0) {
            currentBookIndex--;
            const prevBookChapters = bibleData[currentBookIndex].chapters || [];
            currentChapterIndex = prevBookChapters.length - 1;
            populateChapterSelect(currentBookIndex);
            bookSelect.value = currentBookIndex;
        }
        chapterSelect.value = currentChapterIndex;
        renderChapter(currentBookIndex, currentChapterIndex);
    });

    nextBtn.addEventListener("click", () => {
        const currentBookChapters = bibleData[currentBookIndex].chapters || [];
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
    });
});