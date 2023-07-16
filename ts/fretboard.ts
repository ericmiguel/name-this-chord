import { semitone, intervalValues } from "./globals.js";
import { Note } from "./note.js";
import { Chord } from "./chord.js";

var nStrings: number = 6;
var nFrets: number = 12;

const tunings: { [key: string]: Note[] } = {
	"6 string standard": [
		new Note("E"),
		new Note("A"),
		new Note("D"),
		new Note("G"),
		new Note("B"),
		new Note("E"),
	].reverse(),
};

function selectNote() {
	const currentString = this.closest(".string");
	const selectedFrets = currentString.getElementsByClassName("note-bubble selected");

	for (let i = 0; i < selectedFrets.length; i++) {
		if (this !== selectedFrets[i]) {
			selectedFrets[i].click();
		}
	}
	this.classList.toggle("selected");
}

function findIntervals(fretboard: Element): {
	[key: string]: { [key: string]: string };
} {
	const selectedFrets = fretboard.getElementsByClassName("note-bubble selected");
	let selectedNotes = [];
	for (let fret = 0; fret < selectedFrets.length; fret++) {
		const selectedNote = selectedFrets[fret].getAttribute("note");
		selectedNotes.push(new Note(selectedNote));
	}

	// assumes duplicated notes as octaves
	const duplicatedNotes = {};
	selectedNotes.forEach(function (x) {
		duplicatedNotes[x.name] = (duplicatedNotes[x.name] || 0) + 1;
	});

	// filter duplicated notes
	let uniqueNotes = [...new Map(selectedNotes.map((v) => [v.name, v])).values()];

	let foundIntervals = {};
	for (let n = 0; n < uniqueNotes.length; n++) {
		let noteRelatives = {};
		for (let j = 0; j < uniqueNotes.length; j++) {
			let interval = uniqueNotes[n].getRelativeInterval(uniqueNotes[j].name);

			Object.assign(noteRelatives, {
				[interval.intervalName]: interval.note.name,
			});

			if (duplicatedNotes[uniqueNotes[n].name] > 1) {
				Object.assign(noteRelatives, {
					octave: uniqueNotes[n].name,
				});
			}
		}

		Object.assign(foundIntervals, {
			[uniqueNotes[n].name]: noteRelatives,
		});
	}

	return foundIntervals;
}

function displayIntervals() {
	const foundIntervals = findIntervals(this);

	let foundChords = [];
	for (const note in foundIntervals) {
		foundChords.push(new Chord(note, foundIntervals[note]));
	}

	const chordsBox = document.getElementById("found-chords");
	chordsBox.innerHTML = "";

	for (const chord in foundChords) {
		const chip = document.createElement("span");
		chip.classList.add("chord-bubble");

		chip.innerHTML = foundChords[chord].getChordName();

		console.log(foundChords[chord]);

		if (foundChords[chord].power === true) {
			chip.classList.add("power-chord");
		} else if (foundChords[chord].major === true) {
			chip.classList.add("major-chord");
		} else if (foundChords[chord].minor === true) {
			chip.classList.add("minor-chord");
		} else if (foundChords[chord].sus === true) {
			chip.classList.add("sus-chord");
		}

		if (foundChords[chord].diminished === true) {
			chip.classList.add("diminished-chord");
			chip.classList.remove("minor-chord");
		} else if (foundChords[chord].augmented === true) {
			chip.classList.add("augmented-chord");
			chip.classList.remove("major-chord");
		}

		chordsBox.appendChild(chip);
	}

	// intervals
	const intervalBox = document.getElementById("found-intervals");
	intervalBox.innerHTML = "";

	for (const note in foundIntervals) {
		let tr = document.createElement("tr");

		for (const interval in intervalValues) {
			const cell = document.createElement("td");
			const noteCell = document.createElement("span");
			const emptyCell = document.createElement("span");

			noteCell.classList.add("table-note");
			noteCell.innerHTML = foundIntervals[note][interval];

			foundIntervals[note].hasOwnProperty(interval)
				? cell.appendChild(noteCell)
				: cell.appendChild(emptyCell);
			tr.appendChild(cell);
		}

		intervalBox.appendChild(tr);
	}
}

function createFretboard(
	frets: number,
	strings: number,
	tuning: Note[] = tunings["6 string standard"]
) {
	let fretboard = document.getElementById("fretboard");
	const singleFretmarks = [3, 5, 7, 9, 15, 17, 19, 21];
	const doubleFretmarks = [12, 24];

	for (let nString = 0; nString < strings; nString++) {
		let string = document.createElement("div");
		string.classList.add("string");
		string.setAttribute("string", nString.toString());

		let nFret = 0;
		let nSemitone = 0;
		while (nFret < frets + 1) {
			let noteFret = document.createElement("div");
			let noteBubble = document.createElement("div");
			noteBubble.innerHTML = tuning[nString].intervals[semitone * nSemitone];
			noteBubble.classList.add("note-bubble");
			noteBubble.setAttribute(
				"note",
				tuning[nString].intervals[semitone * nSemitone]
			);
			noteBubble.setAttribute("fret", nFret.toString());
			noteBubble.addEventListener("click", selectNote);

			if (nFret === 0) {
				noteBubble.classList.add("fixed");
			}

			noteFret.appendChild(noteBubble);

			noteFret.classList.add("note-fret");

			string.appendChild(noteFret);

			if (nString === 0) {
				if (singleFretmarks.includes(nFret + 1)) {
					let singleFretmark = document.createElement("div");
					singleFretmark.classList.add("single-fretmark");
					noteFret.appendChild(singleFretmark);
				} else if (doubleFretmarks.includes(nFret + 1)) {
					let doubleFretmark = document.createElement("div");
					doubleFretmark.classList.add("double-fretmark");
					noteFret.appendChild(doubleFretmark);
				}
			}

			nSemitone === 11 ? (nSemitone = 0) : nSemitone++;
			nFret++;
		}

		fretboard.appendChild(string);
	}
}

function setInitialChord() {
	const strings: HTMLCollectionOf<Element> =
		document.getElementsByClassName("string");

	(strings[0].getElementsByClassName("note-bubble")[3] as HTMLElement).click();
	(strings[1].getElementsByClassName("note-bubble")[3] as HTMLElement).click();
	(strings[2].getElementsByClassName("note-bubble")[0] as HTMLElement).click();
	(strings[3].getElementsByClassName("note-bubble")[0] as HTMLElement).click();
	(strings[4].getElementsByClassName("note-bubble")[2] as HTMLElement).click();
	(strings[5].getElementsByClassName("note-bubble")[3] as HTMLElement).click();
}

window.addEventListener("load", () => {
	createFretboard(nFrets, nStrings);
	const fretboard: Element = document.getElementById("fretboard");
	fretboard.addEventListener("click", displayIntervals);
	setInitialChord();
});
