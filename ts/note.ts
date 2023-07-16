import { noteNames, intervalValues, intervalNames } from "./globals.js";

class Note {
	name: string;
	index: number;
	intervals: Partial<{
		[key: number]: string;
	}>;

	constructor(name: string) {
		this.name = name;

		this.index = noteNames.findIndex((name: string) => {
			return name === this.name;
		});

		this.intervals = {};

		let noteValue = 0;
		let index = this.index;

		while (true) {
			Object.assign(this.intervals, { [noteValue]: noteNames[index] });
			index >= noteNames.length - 1 ? (index = 0) : index++;
			noteValue = noteValue + 5;
			if (noteNames[index] === this.name) {
				break;
			}
		}
	}

	getRelativeInterval(relativeNote: string): {
		note: Note;
		semitones: Number;
		intervalName: string;
	} {
		let index: number = this.index;
		let semitones: number = 0;

		while (true) {
			if (noteNames[index] === relativeNote) {
				break;
			}

			semitones += 5;
			index >= noteNames.length - 1 ? (index = 0) : index++;
		}

		return {
			note: new Note(relativeNote),
			semitones: semitones,
			intervalName: intervalNames[semitones],
		};
	}

	root(): Note {
		return new Note(this.intervals[intervalValues["root"]]);
	}

	minor_second(): Note {
		return new Note(this.intervals[intervalValues["minor second"]]);
	}

	major_second(): Note {
		return new Note(this.intervals[intervalValues["major second"]]);
	}

	minor_third(): Note {
		return new Note(this.intervals[intervalValues["minor third"]]);
	}

	major_third(): Note {
		return new Note(this.intervals[intervalValues["major third"]]);
	}

	perfect_fouth(): Note {
		return new Note(this.intervals[intervalValues["perfect fouth"]]);
	}

	augmented_fourth(): Note {
		return new Note(this.intervals[intervalValues["augmented fourth"]]);
	}

	perfect_fifth(): Note {
		return new Note(this.intervals[intervalValues["perfect fifth"]]);
	}

	minor_sixth(): Note {
		return new Note(this.intervals[intervalValues["minor sixth"]]);
	}

	major_sixth(): Note {
		return new Note(this.intervals[intervalValues["major sixth"]]);
	}

	minor_seventh(): Note {
		return new Note(this.intervals[intervalValues["minor seventh"]]);
	}

	major_seventh(): Note {
		return new Note(this.intervals[intervalValues["major seventh"]]);
	}

	octave(): Note {
		return new Note(this.intervals[intervalValues["octave"]]);
	}
}

export { Note };
