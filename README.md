# secret-npm-pkg

Provide a command line tool `secret` for encrypt and decrypt.

```sh
pnpm i -g @reasonly8/secret

# print version
secret -v

# set private key storage path
secret -p {path}

# encrypt
secret -e {text}

# decrypt
secret -d {text}

# set alias name
secret -n {name} -d {text}

# show list
secret -l
```
