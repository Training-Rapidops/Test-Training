const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const path = require("path");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeDownloadProfilePhoto = require("./download-profile-photo");

const storage = {
  bucket: () => {
    // file: () => {
    //   download: () => {};
    // };
  },
};
const fs = {
  existsSync: () => {},
  mkdirSync: () => {},
};
const functionToMock = {
  getProfilePhoto: () => {},
};

const bucketStub = sandbox.stub(storage, "bucket");
bucketStub.callsFake((args) => {
  expect(args).deep.equal(config.gcpStorage.bucketName);

  function file(args) {
    expect(args).deep.equal(
      "trainee-data/safishaikh/71e14dfb-25ec-4a00-ae4f-d8f4cd331cad/file.odt"
    );

    function download(args) {
      expect(args).deep.equal({
        destination: `${path.join(
          __dirname,
          `../../downloads/f9fadbf7-019a-44a9-9bd0-31d833bda6e1/${"trainee-data/safishaikh/71e14dfb-25ec-4a00-ae4f-d8f4cd331cad/file.odt"
            .split("/")
            .pop()}`
        )}`,
      });
    }

    return { download };
  }

  return { file };
});

const existsSyncStub = sandbox.stub(fs, "existsSync");
existsSyncStub.callsFake((args) => {
  expect(args).deep.equal(
    `${path.join(
      __dirname,
      `../../downloads/f9fadbf7-019a-44a9-9bd0-31d833bda6e1/${"trainee-data/safishaikh/71e14dfb-25ec-4a00-ae4f-d8f4cd331cad/file.odt"
        .split("/")
        .pop()}`
    )}`
  );

  if (this.isFolderExists === "true") {
    return true;
  }
  return false;
});
const mkdirSyncStub = sandbox.stub(fs, "mkdirSync");
mkdirSyncStub.callsFake((args) => {
  expect(args).deep.equal(
    `${path.join(__dirname, `../../downloads/${this.id}/`)}`,
    {
      recursive: true,
    }
  );
});

const getProfilePhotoStub = sandbox.stub(functionToMock, "getProfilePhoto");
getProfilePhotoStub.callsFake((args) => {
  expect(args).deep.equal({ id: this.id });
  if (this.isEmployeeExists === "true") {
    return {
      profilePhoto:
        "trainee-data/safishaikh/71e14dfb-25ec-4a00-ae4f-d8f4cd331cad/file.odt",
    };
  }
  throw new NoDataFoundError(`NO Employee Data Found for id ${this.id}`);
});
const downloadProfilePhoto = makeDownloadProfilePhoto({
  Joi,
  getProfilePhoto: functionToMock.getProfilePhoto,
  path,
  fs,
  storage,
  ValidationError,
});

After(() => {
  this.id = undefined;
  this.isFolderExists = undefined;
  this.isEmployeeExists = undefined;

  sandbox.resetHistory();
});

Given(
  "employee id:{string}, isFolderExists:{string}, isEmployeeExists:{string} to download profile photo",
  (id, isFolderExists, isEmployeeExists) => {
    this.id = id || undefined;
    this.isFolderExists = isFolderExists || undefined;
    this.isEmployeeExists = isEmployeeExists || undefined;
  }
);

When("try to download profile photo", async () => {
  try {
    this.result = await downloadProfilePhoto({ id: this.id });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while downloading profile photo",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with photoPath:{string} while downloading profile photo",
  (photoPath) => {
    expect(this.result).deep.equal(JSON.parse(photoPath));
  }
);
Then(
  "bucket function will be called :{int} while downloading profile photo",
  (bucketFunctionCallCount) => {
    sinon.assert.callCount(bucketStub, bucketFunctionCallCount);
  }
);
// Then(
//   "file function will be called :{int} while downloading profile photo",
//   (fileFunctionCallCount) => {
//     sinon.assert.callCount(fileStub, fileFunctionCallCount);
//   }
// );

// Then(
//   "download function will be called :{int} while downloading profile photo",
//   (downloadFunctionCallCount) => {
//     sinon.assert.callCount(downloadStub, downloadFunctionCallCount);
//   }
// );
Then(
  "existsSync function will be called :{int} while downloading profile photo",
  (existsSyncFunctionCallCount) => {
    sinon.assert.callCount(existsSyncStub, existsSyncFunctionCallCount);
  }
);
Then(
  "mkdirSync function will be called :{int} while downloading profile photo",
  (mkdirSyncFunctionCallCount) => {
    sinon.assert.callCount(mkdirSyncStub, mkdirSyncFunctionCallCount);
  }
);
Then(
  "getProfilePhoto function will be called :{int} while downloading profile photo",
  (getProfilePhotoFunctionCallCount) => {
    sinon.assert.callCount(
      getProfilePhotoStub,
      getProfilePhotoFunctionCallCount
    );
  }
);
// Then(" function will be called :<FunctionCallCount> while downloading profile photo", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
