import {
	semitone,
	notes,
	interval_names_to_semitones,
	semitones_to_interval_names,
	chord_intervals,
} from "./musical_const.js"


class Note {
	constructor(name) {
		this.name = name;

		this.note_index = notes.findIndex((object) => {
			return object === this.name;
		});

		this.n = {};
		let note_value = 0;
		let note_index = this.note_index;

		while (true) {
			Object.assign(this.n, { [note_value]: notes[note_index] });
			note_index >= notes.length - 1 ? (note_index = 0) : note_index++;
			note_value = note_value + 5;
			if (notes[note_index] === this.name) {
				break;
			}
		}
	}

	get_relative_interval(relative_note) {
		let note_index = this.note_index;
		let distance_in_semitones = 0;
		while (true) {
			if (notes[note_index] === relative_note) {
				break;
			}

			distance_in_semitones += 5;
			note_index >= notes.length - 1 ? (note_index = 0) : note_index++;
		}

		return {
			note_name: relative_note,
			note: new Note(relative_note),
			distance_in_semitones: distance_in_semitones,
			interval_name: semitones_to_interval_names[distance_in_semitones],
		};
	}

	root() {
		return new Note(this.n[interval_names_to_semitones["root"]]);
	}

	minor_second() {
		return new Note(this.n[interval_names_to_semitones["minor second"]]);
	}

	major_second() {
		return new Note(this.n[interval_names_to_semitones["major second"]]);
	}

	minor_third() {
		return new Note(this.n[interval_names_to_semitones["minor third"]]);
	}

	major_third() {
		return new Note(this.n[interval_names_to_semitones["major third"]]);
	}

	perfect_fouth() {
		return new Note(this.n[interval_names_to_semitones["perfect fouth"]]);
	}

	augmented_fourth() {
		return new Note(this.n[interval_names_to_semitones["augmented fourth"]]);
	}

	perfect_fifth() {
		return new Note(this.n[interval_names_to_semitones["perfect fifth"]]);
	}

	minor_sixth() {
		return new Note(this.n[interval_names_to_semitones["minor sixth"]]);
	}

	major_sixth() {
		return new Note(this.n[interval_names_to_semitones["major sixth"]]);
	}

	minor_seventh() {
		return new Note(this.n[interval_names_to_semitones["minor seventh"]]);
	}

	major_seventh() {
		return new Note(this.n[interval_names_to_semitones["major seventh"]]);
	}

	octave() {
		return new Note(this.n[interval_names_to_semitones["octave"]]);
	}
}

const tunings = {
	"6 string standard": [
		new Note("E"),
		new Note("A"),
		new Note("D"),
		new Note("G"),
		new Note("B"),
		new Note("E"),
	].reverse(),
};

/**
 * Description
 * @returns {any}
 */
function select_note() {
	const current_string = this.closest(".string");
	const selected_frets =
		current_string.getElementsByClassName("note-bubble selected");

	for (let i = 0; i < selected_frets.length; i++) {
		if (this !== selected_frets[i]) {
			selected_frets[i].click();
		}
	}
	this.classList.toggle("selected");
}

function infer_chords() {
	const selected_frets = this.getElementsByClassName("note-bubble selected");
	let selected_notes = [];
	for (let fret = 0; fret < selected_frets.length; fret++) {
		const selected_note = selected_frets[fret].getAttribute("note");
		selected_notes.push(new Note(selected_note));
	}

	// filter duplicated notes
	let unique_notes = [...new Map(selected_notes.map((v) => [v.name, v])).values()];

	let found_intervals = {};
	for (let n = 0; n < unique_notes.length; n++) {
		let intervals_per_note = {};
		for (let j = 0; j < unique_notes.length; j++) {
			let interval = unique_notes[n].get_relative_interval(unique_notes[j].name);
			Object.assign(intervals_per_note, {
				[interval.interval_name]: interval.note_name,
			});
		}

		Object.assign(found_intervals, {
			[unique_notes[n].name]: intervals_per_note,
		});
	}

	const interval_box = document.getElementById("found-intervals");
	interval_box.innerHTML = "";

	for (const note in found_intervals) {
		let tr = document.createElement("tr");

		for (const interval in interval_names_to_semitones) {
			const cell = document.createElement("td");
			cell.innerHTML =
				interval in found_intervals[note]
					? found_intervals[note][interval]
					: "-";
			tr.appendChild(cell);
		}

		interval_box.appendChild(tr);
	}
}

function create_fretboard(frets, strings, tuning = tunings["6 string standard"]) {
	let fretboard = document.getElementById("fretboard");
	const single_fretmarks = [3, 5, 7, 9, 15, 17, 19, 21];
	const double_fretmark = [12, 24];

	for (let n_string = 0; n_string < strings; n_string++) {
		let string = document.createElement("div");
		string.classList.add("string");

		let n_fret = 0;
		let n_semitone = 0;
		while (n_fret < frets + 1) {
			let note_fret = document.createElement("div");
			let note_bubble = document.createElement("div");
			note_bubble.innerHTML = tuning[n_string].n[semitone * n_semitone];
			note_bubble.classList.add("note-bubble");
			note_bubble.setAttribute("note", tuning[n_string].n[semitone * n_semitone]);
			note_bubble.setAttribute("fret", n_fret);
			note_bubble.addEventListener("click", select_note);

			if (n_fret === 0) {
				note_bubble.classList.add("fixed");
			}

			note_fret.appendChild(note_bubble);

			note_fret.classList.add("note-fret");

			string.appendChild(note_fret);

			if (n_string === 0) {
				if (single_fretmarks.includes(n_fret + 1)) {
					let single_fretmark = document.createElement("div");
					single_fretmark.classList.add("single-fretmark");
					note_fret.appendChild(single_fretmark);
				} else if (double_fretmark.includes(n_fret + 1)) {
					let double_fretmark = document.createElement("div");
					double_fretmark.classList.add("double-fretmark");
					note_fret.appendChild(double_fretmark);
				}
			}

			n_semitone === 11 ? (n_semitone = 0) : n_semitone++;
			n_fret++;
		}

		fretboard.appendChild(string);
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	create_fretboard(12, 6);
	const fretboard = document.getElementById("fretboard");
	fretboard.addEventListener("click", infer_chords);
});
