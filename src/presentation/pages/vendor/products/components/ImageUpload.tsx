import React from 'react';
import { Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';

interface ImageUploadProps {
  imageFiles: UploadFile[];
  setImageFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageFiles, setImageFiles }) => {
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList.length <= 4) {
      setImageFiles(newFileList);
    } else {
      notification.error({ message: 'You can only upload up to 4 images.' });
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-card"
        fileList={imageFiles}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={4}
      >
        {imageFiles.length < 4 && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUpload;
