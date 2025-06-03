/*
 *  Deletes all screenshots in an instant.
 *  Created On 04 June 2025
 */

import { showToast, Toast, getPreferenceValues, closeMainWindow } from '@raycast/api'
import { promises as fs } from 'fs'
import { join } from 'path'
import commaNumber from 'comma-number'

interface Preferences {
    folder: string
}

export default async function main() {
    try {
        const preferences = getPreferenceValues<Preferences>()
        const targetFolder = preferences.folder

        await showToast({
            style: Toast.Style.Animated,
            title: 'Scanning for screenshots...',
        })

        // read the directory contents
        const files = await fs.readdir(targetFolder)

        // filter for screenshot png files
        const pngFiles = files.filter(file =>
            file.toLowerCase().endsWith('.png') &&
            file.toLowerCase().startsWith('screenshot')
        )

        if (pngFiles.length === 0) {
            await closeMainWindow()
            await showToast({
                style: Toast.Style.Success,
                title: `Deleted ${commaNumber(0)} screenshots`
            })
            return
        }

        // delete each png file
        const deletePromises = pngFiles.map(async (file) => {
            const filePath = join(targetFolder, file)
            await fs.unlink(filePath)
            return file
        })

        const deletedFiles = await Promise.all(deletePromises)

        await closeMainWindow()
        await showToast({
            style: Toast.Style.Success,
            title: `Deleted ${commaNumber(deletedFiles.length)} screenshots`
        })

    } catch (error) {
        console.error('Error deleting PNG files:', error)

        await showToast({
            style: Toast.Style.Failure,
            title: 'Failed to delete PNG files',
            message: error instanceof Error ? error.message : 'Unknown error occurred',
        })
    }
}