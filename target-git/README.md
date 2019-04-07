# @feedlifly/target-fs
======================

This module is capable of updating a repository that lies on the local file system

    yarn add @feedlify/target-fs

You can use `target-fs` to update a repository:

    import targetFs from '@feedlify/target-fs
    const report = await targetFs('/repo-root')

The file structure should be something like:

    index.json
    feed1/
      feed.json
      index.json
      data/
        0000.json
        0001.json
    feed2/
      ...

Basically a repository is a list of feed, each feed is a list of origins.
At every level there is an `index.json` file that contains informations
regarding the level itself.

At the root of the repository the `index.json` lists the available feeds:

    {
      "feeds": [
        {
          "ref": "general",
          "name": "general",
          "ctime": "2019-04-06T09:54:08.235Z",
          "mtime": "2019-04-06T12:09:10.946Z",
          "from": "2019-03-02T18:20:20.000Z",
          "to": "2019-04-05T16:07:26.000Z",
          "count": 156,
          "data_files_count": 3
        },
        {
          "ref": "tech",
          "name": "tech",
          "ctime": "2019-04-06T11:41:18.489Z",
          "mtime": "2019-04-06T12:09:10.948Z",
          "from": "2019-03-02T18:20:20.000Z",
          "to": "2019-04-05T16:07:26.000Z",
          "count": 104,
          "data_files_count": 2
        }
      ]
    }

Inside each feed folder we find the `feed.json` which contains the list of the
origins to be fetched, as well as the rules to apply.

All the data that is collected during updates is then stored into the `/data`
folder in json files named by date.

Another `index.json` helps listing all the available data files:

    {
      "ctime": "2019-04-06T09:54:08.235Z",
      "mtime": "2019-04-06T12:09:10.946Z",
      "from": "2019-03-02T18:20:20.000Z",
      "to": "2019-04-05T16:07:26.000Z",
      "count": 156,
      "data": [
        {
          "ctime": "2019-04-06T12:09:10.945Z",
          "fname": "20190406020910.json",
          "from": "2019-03-02T18:20:20.000Z",
          "to": "2019-04-05T16:07:26.000Z",
          "count": 52
        },
        {
          "ctime": "2019-04-06T09:54:08.235Z",
          "fname": "20190406115408.json",
          "from": "2019-03-02T18:20:20.000Z",
          "to": "2019-04-05T16:07:26.000Z",
          "count": 52
        },
        {
          "ctime": "2019-04-06T08:42:01.392Z",
          "fname": "20190406104201.json",
          "from": "2019-03-02T18:20:20.000Z",
          "to": "2019-04-05T16:07:26.000Z",
          "count": 52
        }
      ]
    }

Using this index file is then possible to build the full dataset for a given feed.


