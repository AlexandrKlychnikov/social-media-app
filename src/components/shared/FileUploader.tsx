import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
    },
  });
  return (
    <div
      {...getRootProps()}
      className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
    >
      <input {...getInputProps()} className='cursor-pointer' />

      {fileUrl ? (
        <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img src={fileUrl} alt='image' className='file_uploader-img' />
          </div>
          <p className='file_uploader-label'>
            Кликните или перетяните фото чтобы заменить
          </p>
        </>
      ) : (
        <div className='file_uploader-box '>
          <img
            src='/assets/icons/file-upload.svg'
            alt='file upload'
            width={80}
            height={80}
          />

          <h3 className='base-medium text-light-2 mb-2 mt-6'>
            Перетяните фото сюда
          </h3>
          <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

          <Button type='button' className='shad-button_dark_4'>
            Выберите файл на диске
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
