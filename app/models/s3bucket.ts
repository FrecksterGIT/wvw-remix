import { S3 } from "aws-sdk";

const client = () => {
  const clientParams: S3.Types.ClientConfiguration = {
    apiVersion: "latest",
    region: "eu-central-1",
    credentials: {
      secretAccessKey: "",
      accessKeyId: "",
    },
  };

  return new S3(clientParams);
};

export const has = async (contentId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    client().headObject(
      {
        Bucket: "gw2-emblems",
        Key: contentId,
      },
      (err) => {
        if (err) {
          resolve(false);
        }
        resolve(true);
      }
    );
  });
};

export const get = async (contentId: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    client().getObject(
      {
        Bucket: "gw2-emblems",
        Key: contentId,
      },
      (err, data) => {
        if (err) {
          reject();
        }
        resolve(data.Body);
      }
    );
  });
};

export const set = async (
  contentId: string,
  content: Body | undefined
): Promise<void> => {
  return new Promise((resolve, reject) => {
    client().putObject(
      {
        ACL: 'public-read',
        Body: content,
        Bucket: "gw2-emblems",
        Key: contentId,
      },
      (err) => {
        if (err) {
          reject();
        }
        resolve();
      }
    );
  });
};
