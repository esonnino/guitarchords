var lyricsInput = document.getElementById('lyrics-input');
var chordDropdown = document.getElementById('chord-dropdown');
var chordList = document.getElementById('chord-list');

lyricsInput.addEventListener('keyup', showChordDropdown);
chordList.addEventListener('click', insertChord);

function showChordDropdown() {
  var lyrics = lyricsInput.value;
  var caretPosition = lyricsInput.selectionStart;
  var lyricsBeforeCaret = lyrics.substr(0, caretPosition);
  var lastSpaceIndex = lyricsBeforeCaret.lastIndexOf(' ');
  var word = lyricsBeforeCaret.substr(lastSpaceIndex + 1);
  
  if (lastSpaceIndex === -1) {
    word = lyricsBeforeCaret;
  }
  
  if (word) {
    var dropdownHTML = '';
    var chords = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Example list of chords
    
    chords.forEach(function(chord) {
      dropdownHTML += '<li>' + chord + '</li>';
    });
    
    chordList.innerHTML = dropdownHTML;
    chordDropdown.style.left = getCaretPosition(lyricsInput).left + 'px';
    chordDropdown.style.display = 'block';
  } else {
    chordDropdown.style.display = 'none';
  }
}

function insertChord(event) {
  var selectedChord = event.target.innerText;
  var currentLyrics = lyricsInput.value;
  var caretPosition = lyricsInput.selectionStart;
  var lyricsBeforeCaret = currentLyrics.substr(0, caretPosition);
  var lastSpaceIndex = lyricsBeforeCaret.lastIndexOf(' ');
  var newLyrics;
  
  if (lastSpaceIndex === -1) {
    newLyrics = '[' + selectedChord + '] ' + lyricsBeforeCaret;
  } else {
    var word = lyricsBeforeCaret.substr(lastSpaceIndex + 1);
    var updatedWord = '[' + selectedChord + '] ' + word;
    newLyrics = currentLyrics.substr(0, lastSpaceIndex + 1) + updatedWord + currentLyrics.substr(caretPosition);
  }
  
  lyricsInput.value = newLyrics;
  chordDropdown.style.display = 'none';
}

function getCaretPosition(input) {
  var caretOffset = 0;
  var doc = input.ownerDocument || input.document;
  var win = doc.defaultView || doc.parentWindow;
  var sel;

  if (typeof win.getSelection !== 'undefined') {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(input);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type !== 'Control') {
    var textRange = sel.createRange();
    var preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(input);
    preCaretTextRange.setEndPoint('EndToEnd', textRange);
    caretOffset = preCaretTextRange.text.length;
  }

  var rect = input.getBoundingClientRect();
  return { top: rect.top, left: rect.left + caretOffset * 7 };
}
