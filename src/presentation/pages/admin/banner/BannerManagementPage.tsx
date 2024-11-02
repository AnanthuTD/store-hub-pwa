import React, { useState } from 'react';
import BannerTable from './BannerTable';
import BannerCreationModal from './BannerCreationModal';

function BannerManagementPage() {
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  return (
    <div>
      <BannerCreationModal onAdd={() => setTriggerRefetch((prev) => !prev)} />
      <BannerTable triggerRefetch={triggerRefetch} />
    </div>
  );
}

export default BannerManagementPage;
