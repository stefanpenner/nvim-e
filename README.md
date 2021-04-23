# nvim-e

Quick commandline tool to open a file from neovims `:terminal` into the parent neovim process rather then opening a sub-process neovim

Usage:

### with volta (recommended)
```sh
volta install nvim-e
```

### with npm

```sh
npm i -g nvim-e
```

### with yarn

```sh
yarn global add nvim-e
```

then when in a neovim's `:terminal` type:

```sh
nvim-e file-1 file-2 ... file-n
```

And one or more files will be opened in the parent vim process
