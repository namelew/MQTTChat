package randomizer

import (
	"crypto/rand"
	"unicode/utf8"
)

func RandomUTF8String(size uint16) string {
	// Create a rune slice to store the decoded runes.
	r := make([]rune, 0)

	// Iterate over the random byte slice and decode each byte into a rune.
	for len(r) < int(size) {
		b := make([]byte, utf8.UTFMax)
		_, err := rand.Read(b)
		if err != nil {
			continue
		}

		rn, _ := utf8.DecodeRune(b)

		// If the decoded rune is invalid, skip it.
		if !utf8.ValidRune(rn) {
			continue
		}

		// Add the decoded rune to the rune slice.
		r = append(r, rn)
	}

	// Convert the rune slice to a string.
	s := string(r)

	// Return the converted string.
	return s
}
