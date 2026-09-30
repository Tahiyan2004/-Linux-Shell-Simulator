# Linux Shell Simulator

**Team Explorer**

A browser-based Linux terminal simulator built with HTML, CSS, and JavaScript.

## How to Run

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

You can also open `index.html` directly in Chrome or Edge.

## Main Features

- Realistic terminal interface
- Virtual filesystem
- `ls`, `cd`, `pwd`, `mkdir`, `rm`, `cp`, `mv`, `touch`, `cat`
- `echo`, `history`, `date`, `whoami`, `clear`, `help`, `man`
- Command history with Up/Down arrow keys
- Command suggestions
- Output redirection: `>` and `>>`
- Basic piping: `grep`, `sort`, `wc`
- Browser localStorage persistence
- Terminal themes
- Built-in tutorial
- Safe sandbox: no real computer files are modified

## Example Commands

```bash
pwd
ls
mkdir PBL
cd PBL
touch project.txt
echo Linux Shell Simulator > project.txt
cat project.txt
cd ..
ls | sort
history
```

## Important Limitation

This is a simulator, not a real Linux operating system. Only the implemented commands work.
