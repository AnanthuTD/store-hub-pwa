import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import axiosInstance from '@/config/axios';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function getAvatar(avatar: string, loading: boolean = false): UploadFile[] {
  if (loading || avatar) {
    return [
      {
        uid: '0',
        name: 'current-avatar',
        status: loading ? 'uploading' : 'done',
        url: avatar,
      },
    ];
  }

  return [];
}

interface AvatarUploadProps {
  avatar: string;
  updateAvatar: (avatar: string) => void;
  url: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ avatar, updateAvatar, url }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useState<UploadFile[]>(getAvatar(avatar));

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  useEffect(() => {
    setFileList(getAvatar(avatar));
  }, [avatar]);

  const handleUpload = async (options: any) => {
    const formData = new FormData();
    formData.append('avatar', options.file);

    try {
      setFileList(getAvatar(avatar, true));

      const { data }: { data: { avatar: string } } = await axiosInstance.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      updateAvatar(data.avatar);

      message.success('Avatar uploaded successfully!');
    } catch (error) {
      setFileList(getAvatar(avatar));
      message.error('Failed to upload avatar.');
    }
  };

  const beforeUpload = (file: FileType) => {
    const isImage = ['image/png', 'image/jpeg'].includes(file.type);
    if (!isImage) {
      message.error('You can only upload png or jpeg images!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isImage && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        customRequest={handleUpload}
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default AvatarUpload;
