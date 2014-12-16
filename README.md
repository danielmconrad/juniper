Juniper
========

An nginx based multi-environment server.

### When and why would I want to use Juniper?
Let's say you want to serve out flat files for your site, run a node api on a subdomain, and redirect traffic from a subfolder to that subdomain. Well, this is perfect for you.

With Juniper, you can run all of these silultaneously:
  * http://www.yoursite.com
  * http://api.yoursite.com
  * http://www.yoursite.com/api

To add a new site to your server, just add a new key in the configuration file. Voila!

### When and why would I NOT want to use Juniper?
It's generally bad practice to run multiple environments (uat, production, etc.) on a single server, it means if that server goes down all of your sites are down. But sometimes you're on a budget, and don't want to use something like [Heroku](https://www.heroku.com/), which may require you to pay for multiple add-on services.

### Background & Reading
* [Nginx Primer](http://blog.martinfjordvald.com/2010/07/nginx-primer/)


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
  $ juniper start
```

Usage
-----

```
  $ juniper -h

  Usage: juniper [action] [options]

  Actions:

    create <project>    Create a new folder and init it as a juniper project.
    init                Initalize juniper based on config.
    start               Write nginx config, start server, start nginx.
    restart             Write nginx config, restart server, restart nginx.
    upstart             Pull repos, restart.
    destroy             Stop servers, remove all sites from nginx, stop nginx.

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -f, --force         suppress warnings about existing files/folders

```

Configuration
-------------
```cson
siteOne:
  serverName: 'www.site-one.com'
  type: 'folder'
  listenPort: 80
  rootFolder: '/var/www/site-one'

  # Optional: redirect traffic at www.site-one.com/api to api.site-one.com
  forwardFolders: [
    {dir: '/api', site: 'siteOneApi'}
    {dir: '/blog', site: 'siteOneBlog'}
  ]

siteOneApi:
  serverName: 'api.site-one.com'
  type: 'port'
  listenPort: 80
  redirectIP: '127.0.0.1'
  redirectPort: 8000

siteOneBlog:
  serverName: 'blog.site-one.com'
  type: 'port'
  listenPort: 80
  redirectIP: '127.0.0.1'
  redirectPort: 9000

siteTwo:
  serverName: 'www.site-two.com'
  type: 'folder'
  listenPort: 80
  rootFolder: '/var/www/site-two'
```
