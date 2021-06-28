ssh-keyman
=====

A sophisticated key manager cli tool to manage multiple ssh keys and switch between different ssh keys with ease & grace.

Overview
--------

Normally people have difficulty managing different ssh keys for different Github / Bitbucket / Gitlab accounts. This package makes your life easier by creating different ssh profiles & manage them for you. So you can concentrate on your work.


Installation
------------

``` sh
npm install -g ssh-keyman
```

Usage
-----

```
➜  ~  ssh-keyman -h

 Usage : ssh-keyman <command>
 Where <command> is one of:  -i, -c, -s, -d, -ls, -h, -v 

 Commands:
   -i            initialize keyman directory and default environment
   -c [name]     create new ssh environment
   -s [name]     switch to another ssh environment
   -d [name]     delete ssh environment
   -ls           list environments
   -h            help
   -v            version
```

#### Initialisation

Calling `ssh-keyman -i` creates a `~/.sshkeyman/` directory if it doesn't exist,
and copies your current `~/.ssh` as the 'default' ssh profile.
```
➜  ~  ssh-keyman -i
 Initialized ssh-keyman directory /Users/shahidullahkhan/.sshkeyman
 Initialized default environment /Users/shahidullahkhan/.sshkeyman/default
 Activating 'default' environment
```

#### Create a new ssh environment

```
➜  ~  ssh-keyman -c newenvironment
 Saved current ssh config to envioronment:  default
 Created directory for new environment :  /Users/shahidullahkhan/.sshkeyman/newenvironment
 Do you want to switch to newly created environment (newenvironment)? y
 Activated environment 'newenvironment'
```

A blank environment will be created. Then modify content of `~/.ssh/`. Then whenever you will switch to another environment, your changes will be saved.

#### List available ssh environments

```
➜  ~  ssh-keyman ls 
Available environments:
 default
 *newenvironment
```

#### Switch to a specific ssh environment 

```
➜  ~  ssh-keyman -s default
 Saved current ssh config to 'newenvironment'
 Activated environment 'default'
```

#### Delete a specific ssh environment 

```
➜  ~  ssh-keyman -d newenvironment
 Successfully deleted environment 'newenvironment'
```

#### Get the current ssh-keyman version 

```
➜  ~  ssh-keyman -v
 ssh-keyman version : 1.0.0
```
License
-------
ISC, a permissive free software license published by the Internet Software Consortium.

Contact
-------

* GitHub ([shahidullahkhan](http://github.com/shahidullahkhankhattak))
* Email ([shahid@shahidullahkhan.com](mailto:shahid@shahidullahkhan.com))

Made with ❤️ by Shahid Ullah Khan from Pakistan. Pakistan Zindabad!
