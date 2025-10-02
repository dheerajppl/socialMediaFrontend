import { useLazyGetPreSignedUrlQuery, useUploadToS3Mutation } from "@/service";
import { useEffect, useState } from "react";

const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const [
    getPreSignedUrl,
    { data: preSignedData,
      isLoading: isGettingUrl,
      isError: isGetUrlError,
      error: getUrlError,
      isSuccess: isGetUrlSuccess
    }
  ] = useLazyGetPreSignedUrlQuery();
  const [
    uploadToS3,
    {
      isLoading: isUploading,
      isError: isUploadError,
      error: uploadError,
      isSuccess: isUploadSuccess
    },
  ] = useUploadToS3Mutation()

  useEffect(() => {
    if (isGetUrlSuccess && preSignedData) {
      uploadToS3({
        uploadUrl: preSignedData?.uploadUrl,
        file: file ,
      });
      setUploadData({ preSignedUrl: preSignedData.uploadUrl, fileId: preSignedData.fileId, url: previewUrl });
    }
  }, [isGetUrlSuccess, preSignedData])

  useEffect(() => {
    setIsLoading(false);
  }, [isUploadSuccess])

  useEffect(() => {
    if (isUploading || isGettingUrl) {
      setIsLoading(true);
    }
    if (isGetUrlError || isUploadError) {
      setPreviewUrl("");
      setIsLoading(false);
      setIsError(true);
      setError(getUrlError || uploadError || null);
    }
  }, [isGettingUrl, isUploading, isGetUrlError, isUploadError, getUrlError, uploadError]);

  const handleImageUpload = async (e) => {
    console.log("Uploading3333333333333...")

    if (e.target && e.target.files && e.target.files.length > 0) {
      console.log("Uploading...")
      const file = e.target.files[0];
      const fileName = file.name;
      const fileType = file.type;
      const fileSize = file.size;
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      getPreSignedUrl({ fileName, fileType, fileSize });

    }
  };


  return {
    handleImageUpload,
    uploadData,
    previewUrl,
    isError,
    isLoading,
    error,
  };
};

export default useUploadImage;
