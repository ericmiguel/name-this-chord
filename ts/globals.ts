const semitone = 5;

const noteNames: string[] = [
	"C",
	"Db",
	"D",
	"Eb",
	"E",
	"F",
	"F#",
	"G",
	"Ab",
	"A",
	"Bb",
	"B",
];

const intervalValues: { [key: string]: number } = {
	root: semitone * 0,
	"minor second": semitone * 1,
	"major second": semitone * 2,
	"minor third": semitone * 3,
	"major third": semitone * 4,
	"perfect fourth": semitone * 5,
	"augmented fourth": semitone * 6,
	"perfect fifth": semitone * 7,
	"minor sixth": semitone * 8,
	"major sixth": semitone * 9,
	"minor seventh": semitone * 10,
	"major seventh": semitone * 11,
	octave: semitone * 12,
};

const intervalNames: { [key: number]: string } = {
	[semitone * 0]: "root",
	[semitone * 1]: "minor second",
	[semitone * 2]: "major second",
	[semitone * 3]: "minor third",
	[semitone * 4]: "major third",
	[semitone * 5]: "perfect fourth",
	[semitone * 6]: "augmented fourth",
	[semitone * 7]: "perfect fifth",
	[semitone * 8]: "minor sixth",
	[semitone * 9]: "major sixth",
	[semitone * 10]: "minor seventh",
	[semitone * 11]: "major seventh",
	[semitone * 12]: "octave",
};

const chordStructures: { [key: string]: string[] } = {
	power: ["root", "perfect fifth"],
	major: ["root", "major third", "perfect fifth"],
	minor: ["root", "minor third", "perfect fifth"],
	sus2: ["root", "major second", "perfect fifth"],
	sus4: ["root", "perfect fourth", "perfect fifth"],
};

export { semitone, noteNames, intervalValues, intervalNames, chordStructures };
