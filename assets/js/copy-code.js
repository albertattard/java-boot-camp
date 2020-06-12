const copyCode = (copyCodeButton) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.textContent = copyCodeButton.getAttribute('data-code');
    document.body.appendChild(tempTextArea);

    const selection = document.getSelection();
    selection.removeAllRanges();
    tempTextArea.select();
    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(tempTextArea);

    copyCodeButton.classList.add('copied');
    setTimeout(() => {
        copyCodeButton.classList.remove('copied');
    }, 2000);
};
