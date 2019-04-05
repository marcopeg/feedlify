# @feedlifly/target-fs
======================

This module is capable of updating a feed that lies on a local file system.

    yarn add @feedlify/target-fs

You can use `target-fs` to update a feed that lies in a specific folder:

    import targetFs from '@feedlify/target-fs

    const report = await targetFs(path.join(__dirname, 'feed.json'))

The report looks like:

    {

    }

