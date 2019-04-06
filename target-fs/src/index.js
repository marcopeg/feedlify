/**
 * targetFs
 * ========
 * 
 * It should be able to aim to a collection of feed definitions on a local
 * file system, determine which is best to update, and update it.
 * 
 * It should keep in sync all the index files involved in the process.
 */

import { createDataFile } from './create-data-file'

export default async (root) => {
    const report = createDataFile(root)
    
    
    return report
}
