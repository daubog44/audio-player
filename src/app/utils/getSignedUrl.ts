import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

export default function (s3ZipFolderObject: string) {
    const cloudfrontDistributionDomain = process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN;
    const s3ObjectKey = s3ZipFolderObject; //"zipFolder.zip";
    const url = `${cloudfrontDistributionDomain}/${s3ObjectKey}`;
    const privateKey = `-----BEGIN PRIVATE KEY-----
    ${process.env.PRIVATE_CLOUDFRONT_KEY}
-----END PRIVATE KEY-----
`;
    const keyPairId = process.env.KEY_PAIR_ID as string;
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toLocaleDateString() // 24hours
    const signedUrl = getSignedUrl({ keyPairId, privateKey, url, dateLessThan: "2025" })
    return signedUrl;
}