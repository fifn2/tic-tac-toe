# Contributing

Thank you for taking the time to help our project grow.
I'm sorry if this process is a bit confusing for you if you clicked on the link
on the homepage of the website,
not knowing where it would take you, but it really helps me with improving this
humble website.

## Issues with playing

If you find an issue with playing this, you can file an issue by replacing the
text between the brackets [here](https://github.com/fifn2/tic-tac-toe/issues/new),
 and then pressing the green submit button. I'll get back to you shortly.

## Suggestions

I love suggestions. You can make a suggestion the same way you would make an
issue (see "Issues with playing").

## People who know how to code

### My Vision For This

You may have noticed the "extreme" browser support that I have on this website
 (for example, the [25 different types of favicons](/assets/favicons)), and
  that's for a good reason.
   I think that for a new software project, discoverability will come much easier
    if we support a wide range of technologies. For the same reason, the website
    is fully responsive down to 350px in width, and complies with AAA accessibility.
     Anything you do to improve this will be greatly appreciated; maybe you know
      something I don't. Bear in mind, however, that I'm not a particularly
       experienced programmer, especially when it comes to things like test
        driven development, which I cannot wait to try on my next project.

### Incompletion

I'm fully aware that this game is not yet complete, and I plan to work on it in
 the future. Maybe you can help me finish, or maybe you can find other things to
  work on (sound effects?). I had a deadline of April 1st, 2019 for this and I
   thought this was better than nothing.

### Getting started

#### Prerequisites

To work on this project, you need:

* Latest version of [Node](https://nodejs.org)
  * I don't really know if it will work with other versions, but I don't know why
   you wouldn't want to use the latest version.
* Latest version of NPM (comes with node)
* Latest version of [git](https://git-scm.com/downloads)

#### Installing

First of all, `cd` into the parent directory of the directory you want this
 project to be installed, and run this shell command:

```shell
git clone https://github.com/fifn2/tic-tac-toe.git
```

And install the dependencies via:

```shell
npm i
```

If everything went right, the command `npm test` should output "Test is a success!".

#### Gulp build system

Get the build system ready to watch files for changes, process them, and reload
 the dev server via this shell command:

```shell
npm start
```

When you save a file in `src`, gulp should process and minify that file into the
 root folder and then reload the dev server. Good luck!
