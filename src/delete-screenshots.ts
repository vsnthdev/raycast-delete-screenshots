/*
 *  Deletes all screenshots in an instant.
 *  Created On 04 June 2025
 */

import { showToast, Toast, getPreferenceValues, closeMainWindow } from '@raycast/api'
import { promises as fs } from 'fs'
import { join } from 'path'
import commaNumber from 'comma-number'
import { glob } from 'glob'

interface Preferences {
    folder: string
    deleteWhatsAppImages: boolean
    deleteRecordings: boolean
}

export default async function main() {
    closeMainWindow()
    const preferences = getPreferenceValues<Preferences>()

    await showToast({
        style: Toast.Style.Animated,
        title: 'Scanning for screenshots...',
    })

    const promises: Promise<string[]>[] = [
        glob(join(preferences.folder, 'Screenshot [0-9][0-9][0-9][0-9]*.png'))
    ]

    if (preferences.deleteWhatsAppImages) {
        promises.push(
            glob(join(preferences.folder, 'WhatsApp Image [0-9][0-9][0-9][0-9]*.jpeg'))
        )
    }

    if (preferences.deleteRecordings) {
        promises.push(
            glob(join(preferences.folder, 'Screen Recording [0-9][0-9][0-9][0-9]*.mov'))
        )
    }

    const nested = await Promise.all(promises)
    const files = nested.flat(1)

    if (files.length == 0) {
        await showToast({
            style: Toast.Style.Success,
            title: `Deleted ${commaNumber(0)} screenshots`
        })
        return
    }

    // delete each png file
    const deletePromises = files.map(async (file) => {
        await fs.unlink(file)
        return file
    })

    const deletedFiles = await Promise.all(deletePromises)
    await showToast({
        style: Toast.Style.Success,
        title: `Deleted ${commaNumber(deletedFiles.length)} screenshots`
    })
}