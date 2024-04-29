# secret-npm-pkg

Provide a command line tool `secret` for encrypt and decrypt.

```sh
npm i -g @reasonly8/secret

# print version
secret -v

# help
secret -h

# set key storage path like: d:/
secret config -p d:/
# or
# secret config -p /d

# clear config
secret config -c

# encrypt
secret -e <plain_text>

# decrypt
secret -d <encrypted_data>

# save alias name
secret -s <name> -d <encrypted_data>

# show list
secret -l
```
