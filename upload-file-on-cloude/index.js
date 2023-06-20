const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  //   keyFile: "/home/ad.rapidops.com/safi.shaikh/Downloads/key.json",
  projectId: "experro-dev",
  bucketName: "experro-dev",
  keyFilename: "./gcp-service-account-key.json",
  folderName: "trainee-data",
});

const bucketName = "experro-dev";

// const bucketName = "safishaikh-data";

// async function createBucket() {
//   await storage.createBucket(bucketName);
//   console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);

// async function listBucket() {
//   const [bucket] = await storage.getBuckets();

//   bucket.forEach((bucket) => {
//     console.log(bucket.name);
//   });
// }

// listBucket().catch(console.error);

// async function listFiles() {
//   // Lists files in the bucket
//   const [files] = await storage.bucket("experro-dev").getFiles();

//   console.log("Files:");
//   files.forEach((file) => {
//     console.log(file.name);
//   });
// }

// listFiles().catch(console.error);

async function listFilesByPrefix() {
  const options = {
    prefix: "trainee-data/",
  };
  const [files] = await storage.bucket(bucketName).getFiles(options);

  console.log("Files:");
  files.forEach((file) => {
    console.log(file.name);
  });
}

listFilesByPrefix().catch(console.error);

// const fileName = "trainee-data/a434ca43-856a-4f4c-8727-eb3a1262f0d3 (1).jpeg";
// async function deleteFile() {
//   await storage.bucket(bucketName).file(fileName).delete();

//   console.log(`gs://${bucketName}/${fileName} deleted`);
// }

// deleteFile().catch(console.error);

// async function makePublic() {
//   await storage
//     .bucket(bucketName)
//     .file("trainee-data/safishaikh/kafka_commands.odt")
//     .makePublic();

//   console.log(
//     `gs://${bucketName}/${"trainee-data/safishaikh/kafka_commands.odt"} is now public.`
//   );
// }

// makePublic().catch(console.error);

// async function downloadPublicFile() {
//   const options = {
//     destination: "/home/ad.rapidops.com/safi.shaikh/Downloads/file.odt",
//   };

//   // Download public file.
//   await storage
//     .bucket(bucketName)
//     .file("trainee-data/safishaikh/kafka_commands.odt")
//     .download(options);

//   console.log(
//     `Downloaded public file ${"trainee-data/safishaikh/kafka_commands.odt"} from bucket name ${bucketName} to ${"/home/ad.rapidops.com/safi.shaikh/Downloads"}`
//   );
// }

// downloadPublicFile().catch(console.error);

// async function uploadFile() {
//   const options = {
//     destination: "trainee-data/safishaikh/2.png",
//     public: true,
//   };

//   await storage
//     .bucket("experro-dev")
//     .upload("/home/ad.rapidops.com/safi.shaikh/Pictures/2.png", options);
//   console.log(`kafka_commands.odt uploaded to experro-dev`);
// }

// uploadFile().catch(console.error);

// const bucket = storage.bucket("safishaikh-data");
// const transferManager = new TransferManager(bucket);
// async function uploadFile() {
//   const response = await transferManager.uploadManyFiles([
//     "/home/ad.rapidops.com/safi.shaikh/Desktop/Safi-Shaikh/kafka_commands.odt",
//   ]);
// }

// uploadFile().catch(console.error);
