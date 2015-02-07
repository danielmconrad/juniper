Juniper
========

An nginx based multi-environment server.

### When and why would I want to use Juniper?
Hosting ain't cheap, and running several sites from ones server takes a ton of work. Juniper makes things less painful.

Let's say you want to serve out flat files for your site, run a node api on a subdomain, and redirect traffic from a subfolder to that subdomain. Well, this is perfect for you.

With Juniper, you can run all of these simultaneously:
  * http://www.yoursite.com
  * http://api.yoursite.com
  * http://www.yoursite.com/api

To add a new site to your server, just add a new key in the configuration file, restart, and voila!

### When and why would I NOT want to use Juniper?
It's generally bad practice to run multiple environments (uat, production, etc.) on a single server, it means if that server goes down all of your sites are down. But sometimes you're on a budget, and don't want to use something like [Heroku](https://www.heroku.com/), which may require you to pay for multiple add-on services.

### Background & Reading
* [Nginx Primer](http://blog.martinfjordvald.com/2010/07/nginx-primer/)

### Upcoming Features
Please refer to the [project wiki](https://github.com/danmconrad/juniper/wiki/Upcoming-Features) for more details.

Installation
------------

  1. Install [Node](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
  2. Install [Nginx](http://wiki.nginx.org/Install)
  3. Install Juniper

```bash
  # From anywhere on your system, install the Juniper CLI globally
  $ npm install -g juniper

  # Create a new folder that will house your Juniper configuration
  $ juniper create my-sites

  # Update the `my-sites/config.cson` file that was just created.

  # Start your server
  $ cd my-sites
  $ juniper install
  $ juniper start
```

Usage
-----

```
  $ juniper -h

  Usage: juniper [action [options]]

  Actions:

    create <project>    Create a new folder and init it as a juniper project
    init                Initalize project
    install <siteName>  Install the dependencies of this project or site
    start <siteName>    Start project or site
    stop <siteName>     Stop project or site
    restart <siteName>  Restart project or site
    remove <siteName>   Remove all settings, stop all services for this project or site
    update <siteName>   Stop, update, and restart project or site

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
```


Config
------

```cson
nginx:
  mimetypes: []

sites:

  # DEFAULTS

  # siteName:                           # Required
    # domain: null                      # Required, string
    # repo: null                        # Required, string
    # branch: 'master'
    # port: 80
    # type: 'files'                     # string: 'files|process'

    # install: null                     # string, ex: 'npm install', 'make setup'
    # start: null                       # string, ex: 'npm start', 'grunt production', 'jake server:uat'
    # stop: null                        # string, ex: 'npm stop', 'gulp stop'

    # files:
    #   index: 'index.html index.htm'
    #   redirects: []                   # array: {dir, site}, limited to 'process' sites
    #   root: null                      # relative to the repo folder

    # process:
    #   port: null                      # Required, int
    #   address: '127.0.0.1'


  # EXAMPLES

  # Serving static files
  simpleFiles:
    domain: 'www.juniper-site-files.com'
    repo: 'https://github.com/danmconrad/juniper-site-files.git'


  # Running a node server
  simpleProcess:
    domain: 'www.juniper-site-process.com'
    repo: 'https://github.com/danmconrad/juniper-site-process.git'

    start: 'forever start ./index.js'
    stop: 'forever stop ./index.js'
    type: 'process'
    process:
      port: 1337


  # Serving a static site with redirected sub-folders
  filesWithApiAndBlog:
    domain: 'www.files-with-api-and-blog.com'
    repo: 'https://url-to-repo/files-with-api-and-blog.git'
    redirects: [
      {dir: '/api', site: 'api'}
      {dir: '/blog', site: 'blog'}
    ]

  api:
    domain: 'www.api.com'
    repo: 'https://url-to-repo/api.git'
    type: 'process'
    process:
      port: 6000

  blog:
    domain: 'www.blog.com'
    repo: 'https://url-to-repo/blog.git'
    type: 'process'
    process:
      port: 7000


  # Serving two version of the same site
  prodEmberCliSite:
    domain: 'www.ember-cli-site.com'
    repo: 'https://url-to-repo/ember-cli-site.git'
    branch: 'master'
    root: '/dist'
    install: 'npm install && bower install'
    start: 'ember build --environment=production'

  uatEmberCliSite:
    domain: 'uat.ember-cli-site.com'
    repo: 'https://url-to-repo/ember-cli-site.git'
    branch: 'develop'
    root: '/dist'
    install: 'npm install && bower install'
    start: 'ember build --environment=uat'
```
