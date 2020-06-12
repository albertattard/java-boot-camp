function getTextContent(copyCodeButton) {
    const dataCode = copyCodeButton.getAttribute('data-code');

    // Did not find another way to detect line breaks
    // than converting them to <br>s and back again
    return dataCode.replace("<br /> ", "\n");
}

const copyCode = (copyCodeButton) => {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.textContent = getTextContent(copyCodeButton);
  document.body.appendChild(tempTextArea);

  const selection = document.getSelection()
  selection.removeAllRanges()
  tempTextArea.select()
  document.execCommand("copy")
  selection.removeAllRanges()
  document.body.removeChild(tempTextArea)

  copyCodeButton.classList.add("copied")
  setTimeout(() => {
    copyCodeButton.classList.remove("copied")
  }, 2000)
}
