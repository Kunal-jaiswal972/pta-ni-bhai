import fs from "fs/promises";

export async function writeFileOnServer(content) {
  try {
    const jsonString = JSON.stringify(content, null, 2);
    const filePath = `./src/config/news.json`;

    await fs.writeFile(filePath, jsonString);
    console.log(`File written successfully to: ${filePath}`);
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
  }
}

export async function writeFileOnBackupFolder(content) {
  try {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const backupfilePath = `./src/config/backup/${formattedTime.replace(
      ":",
      "-"
    )}.json`;
    const jsonString = JSON.stringify(content, null, 2);
    await fs.writeFile(backupfilePath, jsonString);
    console.log(`File written successfully to: ${backupfilePath}`);
  } catch (error) {
    console.error(`Error writing file in backup folder: ${error.message}`);
  }
}

// export async function writeFileOnBackupFolder(content) {
//   try {
//     const currentDate = new Date();
//     const formattedTime = currentDate.toLocaleString("en-US", {
//       hour12: false,
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     const backupfilePath = `./src/config/backup/${formattedTime.replace(
//       ":",
//       "-"
//     )}.json`;

//     const dir = path.dirname(backupfilePath);
//     await fs.mkdir(dir, { recursive: true });

//     const jsonString = JSON.stringify(content, null, 2);
//     await fs.writeFile(backupfilePath, jsonString, {});
//     console.log(`File written successfully to: ${backupfilePath}`);
//   } catch (error) {
//     console.error(`Error writing file in backup folder: ${error.message}`);
//   }
// }
