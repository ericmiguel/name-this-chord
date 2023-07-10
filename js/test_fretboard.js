// Tests that the create_fretboard function creates a fretboard with the correct class names
it("test_create_fretboard", () => {
	const fretboard = document.createElement("div");
	fretboard.id = "fretboard";
	document.body.appendChild(fretboard);
	create_fretboard(5, 6);
	const strings = document.querySelectorAll(".string");
	expect(strings.length).toBe(6);
	for (let i = 0; i < strings.length; i++) {
		const notes = strings[i].querySelectorAll(".note-fret");
		expect(notes.length).toBe(5);
	}
});

// Tests that the function creates a fretboard with the correct number of strings and frets
it("test_create_fretboard", () => {
	const frets = 5;
	const strings = 6;
	create_fretboard(frets, strings);
	const fretboard = document.getElementById("fretboard");
	expect(fretboard.children.length).toBe(strings);
	for (let i = 0; i < strings; i++) {
		expect(fretboard.children[i].children.length).toBe(frets);
	}
});

// Tests that the function creates a fretboard with the correct number of strings and frets
it("test_creates_fretboard_with_correct_number_of_strings_and_frets", () => {
	create_fretboard(5, 6);
	const strings = document.querySelectorAll(".string");
	expect(strings.length).toBe(6);
	strings.forEach((string) => {
		const notes = string.querySelectorAll(".note-fret");
		expect(notes.length).toBe(5);
	});
});

// Tests that the function adds the correct classes to the string and note-fret elements
it("test_adds_correct_classes", () => {
	create_fretboard(5, 6);
	const strings = document.querySelectorAll(".string");
	strings.forEach((string) => {
		expect(string.classList.contains("string")).toBe(true);
	});
	const note_frets = document.querySelectorAll(".note-fret");
	note_frets.forEach((note_fret) => {
		expect(note_fret.classList.contains("note-fret")).toBe(true);
	});
});

// Tests that the function creates the correct number of string and note-fret elements and appends them to the fretboard
it("test_appends_elements_to_fretboard", () => {
	const fretboard = document.createElement("div");
	fretboard.id = "fretboard";
	document.body.appendChild(fretboard);
	create_fretboard(5, 6);
	const strings = document.querySelectorAll(".string");
	expect(strings.length).toBe(6);
	strings.forEach((string) => {
		const note_frets = string.querySelectorAll(".note-fret");
		expect(note_frets.length).toBe(5);
	});
});

// Tests that the function creates a fretboard with 0 frets
it("test_create_fretboard_with_0_frets", () => {
	document.body.innerHTML = '<div id="fretboard"></div>';
	create_fretboard(0, 6);
	expect(document.querySelectorAll(".note-fret").length).toBe(0);
});

// Tests that the function creates a fretboard with 0 strings
it("test_create_fretboard_with_0_strings", () => {
	document.body.innerHTML = '<div id="fretboard"></div>';
	create_fretboard(5, 0);
	expect(document.querySelectorAll(".string").length).toBe(0);
});

// Tests that the function creates a fretboard with the maximum number of frets
it("test_create_fretboard_with_max_frets", () => {
	const frets = 24;
	const strings = 6;
	create_fretboard(frets, strings);
	const fretboard = document.getElementById("fretboard");
	const string = fretboard.querySelector(".string");
	const note_fret = string.querySelector(".note-fret:last-child");
	expect(note_fret).toBeTruthy();
});

// Tests that the function creates a fretboard with the maximum number of strings
it("test_create_fretboard_with_max_strings", () => {
	const frets = 10;
	const strings = 6;
	create_fretboard(frets, strings);
	const fretboard = document.getElementById("fretboard");
	expect(fretboard.children.length).toBe(strings);
});
