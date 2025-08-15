/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Screenshots Folder - Select the folder where your screenshots are stored */
  "folder": string,
  /** Additional delete options - Along with screenshots also delete screen recordings */
  "deleteRecordings": boolean,
  /** undefined - Along with screenshots delete images downloaded from WhatsApp */
  "deleteWhatsAppImages": boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `delete-screenshots` command */
  export type DeleteScreenshots = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `delete-screenshots` command */
  export type DeleteScreenshots = {}
}

