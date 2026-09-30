// =====================================
// LINUX SHELL SIMULATOR
// Team Explorer
// =====================================
// HTML elements
const output =
  document.getElementById(
    "output"
  );


const commandInput =

  document.getElementById(
    "commandInput"
  );


const promptText =

  document.getElementById(
    "prompt"
  );


const terminal =

  document.getElementById(
    "terminal"
  );


const statusText =

  document.getElementById(
    "status"
  );



// =====================================
// VIRTUAL FILE SYSTEM
// =====================================


let fileSystem = {

  type: "folder",

  children: {

    home: {

      type: "folder",

      children: {

        student: {

          type: "folder",

          children: {

            Documents: {

              type: "folder",

              children: {}

            },


            Downloads: {

              type: "folder",

              children: {}

            },


            Projects: {

              type: "folder",

              children: {}

            },


            "welcome.txt": {

              type: "file",

              content:

                `Welcome to Linux Shell Simulator!

Type help to see all commands.`

            }

          }

        }

      }

    },


    etc: {

      type: "folder",

      children: {}

    },


    tmp: {

      type: "folder",

      children: {}

    }

  }

};



// Current folder

let currentPath =

  [
    "home",
    "student"
  ];



// Command history

let history = [];

let historyPosition = 0;



// =====================================
// TERMINAL FUNCTIONS
// =====================================


function print(

  text,

  className = ""

) {

  const line =

    document.createElement(
      "div"
    );


  line.className =

    "line " +

    className;


  line.textContent =

    text;


  output.appendChild(
    line
  );

}



function printCommand(

  command

) {

  print(

    promptText.textContent +

    " " +

    command,

    "command"

  );

}



function scrollDown() {

  terminal.scrollTop =

    terminal.scrollHeight;

}



// =====================================
// PATH FUNCTIONS
// =====================================


function getFullPath() {

  return

  "/" +

    currentPath.join(
      "/"
    );

}



function getPromptPath() {

  let path =

    getFullPath();


  if (

    path ===

    "/home/student"

  ) {

    return "~";

  }


  return path.replace(

    "/home/student",

    "~"

  );

}



function updatePrompt() {

  promptText.textContent =

    "student@linux:" +

    getPromptPath() +

    "$";

}



// =====================================
// FIND FOLDER OR FILE
// =====================================


function getNode(

  pathArray

) {

  let current =

    fileSystem;


  for (

    let name

    of

    pathArray

  ) {

    if (

      current.type !==

      "folder"

    ) {

      return null;

    }


    if (

      !current.children[name]

    ) {

      return null;

    }


    current =

      current.children[name];

  }


  return current;

}



// =====================================
// CONVERT PATH
// =====================================


function resolvePath(

  path

) {

  if (

    !path ||

    path === "~"

  ) {

    return [

      "home",

      "student"

    ];

  }


  let result;


  if (

    path.startsWith(
      "/"
    )

  ) {

    result = [];

  }

  else {

    result =

      [

        ...currentPath

      ];

  }


  let parts =

    path.split(
      "/"
    );


  for (

    let part

    of

    parts

  ) {

    if (

      part === ""

    ) {

      continue;

    }


    if (

      part === "."

    ) {

      continue;

    }


    if (

      part === ".."

    ) {

      result.pop();

    }


    else {

      result.push(
        part
      );

    }

  }


  return result;

}



// =====================================
// HELP COMMAND
// =====================================


function showHelp() {

  print(

    `AVAILABLE COMMANDS

help
Show all commands

pwd
Show current directory

ls
Show files and folders

cd folder
Change directory

mkdir name
Create a folder

touch name.txt
Create a file

cat file.txt
Read a file

rm file.txt
Delete a file

rm -r folder
Delete a folder

cp source destination
Copy a file

mv source destination
Move or rename

echo text
Print text

history
Show command history

date
Show current date

whoami
Show current user

clear
Clear terminal

tree
Show folder structure

tutorial
Show Linux tutorial

reset
Reset project

exit
Close terminal`

  );

}



// =====================================
// LS COMMAND
// =====================================


function commandLS(

  path = ""

) {

  let location =

    resolvePath(
      path
    );


  let node =

    getNode(
      location
    );


  if (

    node === null

  ) {

    print(

      "ls: folder not found",

      "error"

    );

    return;

  }


  if (

    node.type ===

    "file"

  ) {

    print(
      path
    );

    return;

  }


  let result = "";


  for (

    let name

    in

    node.children

  ) {

    if (

      node.children[name]
        .type

      ===

      "folder"

    ) {

      result +=

        name +

        "/     ";

    }

    else {

      result +=

        name +

        "     ";

    }

  }


  print(
    result
  );

}



// =====================================
// CD COMMAND
// =====================================


function commandCD(

  folder

) {

  if (

    !folder

  ) {

    currentPath = [

      "home",

      "student"

    ];


    updatePrompt();

    return;

  }


  let newPath =

    resolvePath(
      folder
    );


  let node =

    getNode(
      newPath
    );


  if (

    node === null

  ) {

    print(

      "cd: folder not found",

      "error"

    );

    return;

  }


  if (

    node.type !==

    "folder"

  ) {

    print(

      "cd: not a folder",

      "error"

    );

    return;

  }


  currentPath =

    newPath;


  updatePrompt();

}



// =====================================
// MKDIR COMMAND
// =====================================


function commandMKDIR(

  folderName

) {

  if (

    !folderName

  ) {

    print(

      "mkdir: folder name required",

      "error"

    );

    return;

  }


  let currentFolder =

    getNode(
      currentPath
    );


  if (

    currentFolder
      .children[
    folderName
    ]

  ) {

    print(

      "mkdir: folder already exists",

      "error"

    );

    return;

  }


  currentFolder
    .children[
    folderName
  ]

    = {

    type:

      "folder",

    children:

      {}

  };


  print(

    "Folder created: " +

    folderName,

    "success"

  );

}



// =====================================
// TOUCH COMMAND
// =====================================


function commandTOUCH(

  fileName

) {

  if (

    !fileName

  ) {

    print(

      "touch: file name required",

      "error"

    );

    return;

  }


  let currentFolder =

    getNode(
      currentPath
    );


  if (

    !currentFolder
      .children[
    fileName
    ]

  ) {

    currentFolder
      .children[
      fileName
    ]

      = {

      type:

        "file",

      content:

        ""

    };

  }


  print(

    "File created: " +

    fileName,

    "success"

  );

}



// =====================================
// CAT COMMAND
// =====================================


function commandCAT(

  fileName

) {

  if (

    !fileName

  ) {

    print(

      "cat: file name required",

      "error"

    );

    return;

  }


  let currentFolder =

    getNode(
      currentPath
    );


  let file =

    currentFolder
      .children[
    fileName
    ];


  if (

    !file

  ) {

    print(

      "cat: file not found",

      "error"

    );

    return;

  }


  if (

    file.type ===

    "folder"

  ) {

    print(

      "cat: this is a folder",

      "error"

    );

    return;

  }


  print(

    file.content

  );

}



// =====================================
// RM COMMAND
// =====================================


function commandRM(

  name

) {

  let currentFolder =

    getNode(
      currentPath
    );


  if (

    !currentFolder
      .children[
    name
    ]

  ) {

    print(

      "rm: file or folder not found",

      "error"

    );

    return;

  }


  delete

    currentFolder
      .children[
    name
    ];


  print(

    "Deleted: " +

    name,

    "success"

  );

}



// =====================================
// ECHO COMMAND
// =====================================


function commandECHO(

  text

) {

  print(
    text
  );

}



// =====================================
// TREE COMMAND
// =====================================


function showTree(

  node,

  space = ""

) {

  if (

    node.type ===

    "file"

  ) {

    return;

  }


  for (

    let name

    in

    node.children

  ) {

    let child =

      node.children[
      name
      ];


    if (

      child.type ===

      "folder"

    ) {

      print(

        space +

        "📁 " +

        name

      );


      showTree(

        child,

        space +

        "   "

      );

    }

    else {

      print(

        space +

        "📄 " +

        name

      );

    }

  }

}



// =====================================
// TUTORIAL
// =====================================


function showTutorial() {

  print(

    `LINUX BEGINNER TUTORIAL

Step 1:

pwd

Shows your current folder.


Step 2:

ls

Shows files and folders.


Step 3:

mkdir practice

Creates a folder.


Step 4:

cd practice

Opens the folder.


Step 5:

touch note.txt

Creates a file.


Step 6:

cat note.txt

Reads the file.`

  );

}



// =====================================
// MAIN COMMAND FUNCTION
// =====================================


function runCommand(

  command

) {

  let parts =

    command.trim()

      .split(
        " "
      );


  let mainCommand =

    parts[0];


  let argument =

    parts.slice(
      1
    )

      .join(
        " "
      );



  if (

    mainCommand ===

    "help"

  ) {

    showHelp();

  }


  else if (

    mainCommand ===

    "pwd"

  ) {

    print(

      getFullPath()

    );

  }


  else if (

    mainCommand ===

    "ls"

  ) {

    commandLS(
      argument
    );

  }


  else if (

    mainCommand ===

    "cd"

  ) {

    commandCD(
      argument
    );

  }


  else if (

    mainCommand ===

    "mkdir"

  ) {

    commandMKDIR(
      argument
    );

  }


  else if (

    mainCommand ===

    "touch"

  ) {

    commandTOUCH(
      argument
    );

  }


  else if (

    mainCommand ===

    "cat"

  ) {

    commandCAT(
      argument
    );

  }


  else if (

    mainCommand ===

    "rm"

  ) {

    commandRM(
      argument
    );

  }


  else if (

    mainCommand ===

    "echo"

  ) {

    commandECHO(
      argument
    );

  }


  else if (

    mainCommand ===

    "date"

  ) {

    print(

      new Date()

        .toString()

    );

  }


  else if (

    mainCommand ===

    "whoami"

  ) {

    print(

      "student"

    );

  }


  else if (

    mainCommand ===

    "history"

  ) {

    for (

      let i = 0;

      i < history.length;

      i++

    ) {

      print(

        (

          i + 1

        )

        +

        "  "

        +

        history[i]

      );

    }

  }


  else if (

    mainCommand ===

    "clear"

  ) {

    output.innerHTML =

      "";

  }


  else if (

    mainCommand ===

    "tree"

  ) {

    print(

      "Virtual Linux Filesystem"

    );


    showTree(

      fileSystem

    );

  }


  else if (

    mainCommand ===

    "tutorial"

  ) {

    showTutorial();

  }


  else if (

    mainCommand ===

    "reset"

  ) {

    location.reload();

  }


  else if (

    mainCommand ===

    "exit"

  ) {

    print(

      "Terminal closed.",

      "warning"

    );


    commandInput.disabled =

      true;

  }


  else {

    print(

      mainCommand +

      ": command not found",

      "error"

    );

  }

}



// =====================================
// USER INPUT
// =====================================


commandInput

  .addEventListener(

    "keydown",

    function (

      event

    ) {


      if (

        event.key ===

        "Enter"

      ) {


        let command =

          commandInput.value

            .trim();



        if (

          command !== ""

        ) {


          printCommand(

            command

          );


          history.push(

            command

          );


          historyPosition =

            history.length;


          runCommand(

            command

          );


          commandInput.value =

            "";


          scrollDown();

        }


      }


      else if (

        event.key ===

        "ArrowUp"

      ) {


        event.preventDefault();


        if (

          historyPosition > 0

        ) {


          historyPosition--;


          commandInput.value =

            history[
            historyPosition
            ];

        }


      }


      else if (

        event.key ===

        "ArrowDown"

      ) {


        event.preventDefault();


        if (

          historyPosition <

          history.length - 1

        ) {


          historyPosition++;


          commandInput.value =

            history[
            historyPosition
            ];

        }


        else {


          historyPosition =

            history.length;


          commandInput.value =

            "";

        }


      }


    }

  );



// =====================================
// BUTTONS
// =====================================


document

  .getElementById(

    "helpButton"

  )

  .onclick =

  function () {

    runCommand(
      "help"
    );

  };



document

  .getElementById(

    "clearButton"

  )

  .onclick =

  function () {

    output.innerHTML =

      "";

  };



document

  .getElementById(

    "resetButton"

  )

  .onclick =

  function () {

    location.reload();

  };



// =====================================
// START
// =====================================


updatePrompt();


print(

  "Welcome to Linux Shell Simulator!",

  "success"

);


print(

  'Type "help" to see all commands.',

  "info"

);


print(

  "Safe Mode: Your real computer files will not change.",

  "info"

);